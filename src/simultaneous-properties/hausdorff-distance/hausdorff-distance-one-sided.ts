import { distanceBetween } from 'flo-vector2d';
import { controlPointLinesLength } from '../../global-properties/length/control-point-lines-length.js';
import { evalDeCasteljau } from '../../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { closestPointOnBezier } from '../closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { furthestPointOnBezier } from '../closest-and-furthest-point-on-bezier/furthest-point-on-bezier.js';
import { maxAbsCoordinate } from '../../error-analysis/max-abs-coordinate.js';
import { HausdorffInterval } from './hausdorff-interval.js';
import { getMaxHausdorff } from './get-max-hausdorff.js';
import { hausdorffCompare } from './hausdorff-compare.js';
import { Heap } from './heap.js';
import { fromTo } from '../../transformation/split/from-to.js';


/** @internal */
const max = Math.max;

// We need to calculate `H(A,B)`, the two sided Hausdorff distance between
// the bezier curves `A` and `B` which equals `max(h(A,B), h(B,A))`, where
// `h(A,B)` is the one sided Hausdorff distance from `A` to `B`

// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }

// where: δS = max[ (1 ≤ i ≤ M+1)(ti − ti−1) ] is the maximum distance between 
// two consecutive parameter values

// Lemma 2.1: 
//   h(A,S) ≤ ωf(δS/2) and
//   h(B,T) ≤ ωg(δT/2)

// Theorem 2.3: (both curves discretized)
//   |h(S,T) − h(A,B)| ≤ max[ h(A,S), h(B,T) ] 
//                     ≤ max[ ωf(δS/2), ωg(δT/2) ]
//  

// (only A discretized)
// |h(S,B) − h(A,B)| ≤ ωf(δS/2)


/**
 * Calculates and returns an accurate approximation to the one-sided Hausdorff 
 * distance from the bezier curve `A` to the bezier curve `B`.
 * 
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 * 
 * @param A a bezier curve (the 'from' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve (the 'to' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance optional; defaults to `Math.max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
 * if the calculated absolute error bound is less than this, the result is 
 * returned; this is *not* a hard tolerance and the bound can be less
 * accurate in hard cases (due to the `maxIterations` parameter). Luckily 
 * however, specifically the lower bound will be very accurate due to 
 * its fast convergence in such hard cases (see the paper)
 * @param maxIterations optional; defaults to `50`; if the desired guaranteed error bound 
 * has not been achieved after `maxIterations` then the result will be returned
 * 
 * @doc mdx
 */
function hausdorffDistanceOneSided(
        A: number[][], 
        B: number[][],
        tolerance?: number,
        maxIterations = 50): number {

    if (A.length === 1) {
        return closestPointOnBezier(B,A[0]).d;
    }

    if (B.length === 1) {
        return furthestPointOnBezier(A,B[0]).d;
    }

    if (A.length === 2 && B.length === 2) {
        // Seperately handle the simple case of two lines

        // Find minimum distance from endpoints of A to B:
        const EA0 = closestPointOnBezier(B,A[0]).d;
        const EA1 = closestPointOnBezier(B,A[A.length-1]).d;

        return EA0 > EA1 ? EA0 : EA1;
    }

    const l = max(maxAbsCoordinate(A),maxAbsCoordinate(B));
    tolerance = tolerance || l/1000_000;

    // an array of intervals
    const [eL,eR] = calcHErrorBound(A,0,1);
    const d0 = closestPointOnBezier(B,A[0]).d;
    const d1 = closestPointOnBezier(B,A[A.length-1]).d;
    const initialInterval: HausdorffInterval = {
        tS: 0, tE: 1,
        hL: d0, hR: d1, hEL: eL, hER: eR
    }
    const heap = new Heap(hausdorffCompare);
    heap.insert(initialInterval);

    let j = 0;
    let bestHUpper = Number.POSITIVE_INFINITY;
    let bestHLower = Number.NEGATIVE_INFINITY;
    while (true) {
        const interval = heap.heap[0];  // peek max
        const { tS, tE, hL, hR } = interval;

        const tM = (tS + tE)/2;
        const [ELL,ELR] = calcHErrorBound(A,tS,tM);
        const [ERL,ERR] = calcHErrorBound(A,tM,tE);

        //---- get hM ---------------------------
        const pM = evalDeCasteljau(A, tM);
        const pB = closestPointOnBezier(B, pM).p;
        const hM = distanceBetween(pM, pB);
        //---------------------------------------

        const h = max(hL, hM, hR);
        if (h > bestHLower) { 
            bestHLower = h;
        }

        bestHUpper = getMaxHausdorff(interval);
        if (bestHUpper - bestHLower < tolerance) {
            // The lower bound is by far the best approximation for difficult cases (see the paper).
            return bestHLower;
        }

        if (j++ > maxIterations) {
            // The lower bound is by far the best approximation for difficult cases (see the paper).
            return bestHLower;
        }

        const iL = { tS, tE: tM, hL, hR: hM, hEL: ELL, hER: ELR };
        const iR = { tS: tM, tE, hL: hM, hR, hEL: ERL, hER: ERR };
        heap.swapMax(iL);
        heap.insert(iR);
    }
}


// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }
//
// |h(S,B) − h(A,B)| ≤ ωf(δS/2)
// where: δS = max_(1≤i≤M+1)[ (ti − ti−1) ] is the maximum distance between 
// two consecutive parameter values
/**
 * @internal
 */
function calcHErrorBound(
        A: number[][],
        tS: number,
        tE: number) {

    // To calculate an upper bound for ωf(δS/2) we can either check the max 
    // absolute tangent values on curve segments or use the control point 
    // lengths as an upper bound.

    const tM = (tE + tS) / 2;  // since the formula says `δS/2` so divide by 2
    const psL = fromTo(A, tS, tM);
    const psR = fromTo(A, tM, tE);
    const eL = controlPointLinesLength(psL);
    const eR = controlPointLinesLength(psR);

    return [eL,eR];
}


export { hausdorffDistanceOneSided }
