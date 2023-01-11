import { distanceBetween } from 'flo-vector2d';
import { maxAbsCoordinate  } from '../../error-analysis/max-abs-coordinate.js';
import { DistanceInterval } from './distance-interval.js';
import { getMinDistance } from './get-min-max-distance.js';
import { distanceCompareMinDesc } from './distance-compare.js';
import { Heap } from '../heap.js';
import { PointsWithDistance } from './points-with-distance.js';
import { fromTo } from '../../transformation/split/from-to.js';
import { controlPointLinesLength } from '../../global-properties/length/control-point-lines-length.js';
import { evalDeCasteljau } from '../../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { closestPointOnBezier } from '../closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';


/** @internal */
const { min, max } = Math;

// We need to calculate `dMin(A,B)`, the minimum distance between
// bezier curves `A` and `B`.

// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }

// where: δS = max[ (1 ≤ i ≤ M+1)(ti − ti−1) ] is the maximum distance between 
// two consecutive parameter values

// Lemma 2.1: 
//   h(A,S) ≤ ωf(δS/2) and
//   h(B,T) ≤ ωg(δT/2)

// Theorem 2.3: (both curves discretized)
//   |h(S,T) − h(A,B)| ≤ max[ h(A,S), h(B,T) ] 
//                     ≤ max[ ωf(δS/2), ωg(δT/2) ]

// (only A discretized)
// |h(S,B) − h(A,B)| ≤ ωf(δS/2)


/**
 * Calculates and returns an accurate approximation to the minimum distance
 * between the two given bezier curves. (Actually returns the parameter values
 * from which the distance can then easily be calculated.)
 * 
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 * 
 * @param A a bezier curve given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance optional; defaults to `Math.max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
 * if the calculated absolute error bound is less than this, the result is 
 * returned; this is *not* a hard tolerance and the bound can be less
 * accurate in hard cases (due to the `maxIterations` parameter). Luckily 
 * however, specifically the upper bound will be very accurate due to 
 * its fast convergence in such hard cases (see the paper)
 * @param maxIterations optional; defaults to `50`; if the desired guaranteed error bound 
 * has not been achieved after `maxIterations` then the result will be returned
 * 
 * @doc mdx
 */
function closestPointsBetweenBeziers(
        A: number[][], 
        B: number[][],
        tolerance?: number,
        maxIterations = 50): PointsWithDistance[] {

    if (A.length === 1) {
        const cp = closestPointOnBezier(B,A[0]);
        return [{ pA: { p: A[0], t: 0 }, pB: cp, d: cp.d }];
    }

    if (B.length === 1) {
        const cp = closestPointOnBezier(A,B[0]);
        return [{ pA: cp, pB: { p: B[0], t: 0 }, d: cp.d }];
    }

    if (A.length === 2 && B.length === 2) {
        // Seperately handle the simple case of two lines

        // Find minimum distance from endpoints of A to B:
        const EA0 = closestPointOnBezier(B,A[0]);
        const EA1 = closestPointOnBezier(B,A[1]);
        // Find minimum distance from endpoints of B to A:
        const EB0 = closestPointOnBezier(A,B[0]);
        const EB1 = closestPointOnBezier(A,B[1]);

        const cps = [EA0,EA1,EB0,EB1].sort((a,b) => a.d - b.d);
        const d = cps[0].d;

        const pwds: PointsWithDistance[] = [];
        if (EA0.d === d) {
            pwds.push({ pA: { p: A[0], t: 0 }, pB: EA0, d });
        }
        if (EA1.d === d) {
            pwds.push({ pA: { p: A[1], t: 1 }, pB: EA1, d });
        }
        if (EB0.d === d) {
            pwds.push({ pA: EB0, pB: { p: B[0], t: 0 }, d });
        }
        if (EB1.d === d) {
            pwds.push({ pA: EB1, pB: { p: B[1], t: 1 }, d });
        }

        return pwds;
    }

    const l = max(maxAbsCoordinate(A),maxAbsCoordinate(B));
    tolerance = tolerance || l/1000_000;

    // an array of intervals
    const [eL,eR] = calcHErrorBound(A,0,1);
    const dL = closestPointOnBezier(B,A[0]).d;
    const dR = closestPointOnBezier(B,A[A.length-1]).d;
    const initialInterval: DistanceInterval = {
        tS: 0, tE: 1, dL, dR, eL, eR, pL: A[0], pR: A[A.length-1]
    };
    // const heap = new Heap(distanceCompareMaxAsc);
    const heap = new Heap(distanceCompareMinDesc);
    heap.insert(initialInterval);

    let j = 0;
    let bestUpperD = Number.POSITIVE_INFINITY;
    let bestLowerD = Number.NEGATIVE_INFINITY;
    let bestUpper: PointsWithDistance;
    while (true) {
        // const interval = heap.heap[0];  // peek max
        const interval = heap.heap[0];  // peek min
        const { tS, tE, dL, dR, pL, pR } = interval;

        const tM = (tS + tE)/2;
        const [eLL,eLR] = calcHErrorBound(A,tS,tM);
        const [eRL,eRR] = calcHErrorBound(A,tM,tE);

        //---- get dM ---------------------------
        const pM = evalDeCasteljau(A, tM);
        const pB = closestPointOnBezier(B, pM);
        const dM = distanceBetween(pM, pB.p);
        //---------------------------------------

        // const h = max(dL, dM, dR);
        const d = min(dL, dM, dR);
        if (d < bestUpperD) { 
            bestUpperD = d;
            if (dL <= dM && dL <= dR) {
                bestUpper = { pA: { p: pL, t: tS }, pB, d };                
            } else if (dM <= dL && dM <= dR) {
                bestUpper = { pA: { p: pM, t: tM }, pB, d };
            } else if (dR <= dL && dR <= dM) {
                bestUpper = { pA: { p: pR, t: tE }, pB, d };                
            }
        }

        // bestHUpper = getMaxDistance(interval);
        bestLowerD = getMinDistance(interval);

        if (bestUpperD - bestLowerD < tolerance) {
            // The upper bound is by far the best approximation for difficult cases (see the paper).
            return [bestUpper!];
        }

        if (j++ > maxIterations) {
            // The upper bound is by far the best approximation for difficult cases (see the paper).
            return [bestUpper!];
        }

        const iL: DistanceInterval = { tS: tS, tE: tM, dL: dL, dR: dM, eL: eLL, eR: eLR, pL: pL, pR: pM };
        const iR: DistanceInterval = { tS: tM, tE: tE, dL: dM, dR: dR, eL: eRL, eR: eRR, pL: pM, pR: pR };
        heap.swapMinOrMax(iL);
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


export { closestPointsBetweenBeziers }
