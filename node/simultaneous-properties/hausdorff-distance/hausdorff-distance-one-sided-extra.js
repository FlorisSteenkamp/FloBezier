import { distanceBetween } from 'flo-vector2d';
import { controlPointLinesLength } from '../../global-properties/length/control-point-lines-length.js';
import { evalDeCasteljau } from '../../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { closestPointOnBezier } from '../closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { furthestPointOnBezier } from '../closest-and-furthest-point-on-bezier/furthest-point-on-bezier.js';
import { maxAbsCoordinate } from '../../error-analysis/max-abs-coordinate.js';
import { getMaxHausdorff } from './get-max-hausdorff.js';
import { hausdorffCompare } from './hausdorff-compare.js';
import { Heap } from '../heap.js';
import { fromTo } from '../../transformation/split/from-to.js';
/** @internal */
const { max } = Math;
/**
 * Calculates and returns an accurate approximation to the one-sided Hausdorff
 * distance from the bezier curve `A` to the bezier curve `B`, together with the
 * parameter values and points on both curves where the distance is
 * (approximately) achieved.
 *
 * * this is the implementation backing `hausdorffDistanceOneSided`, which simply
 * returns the `.d` property of this function's result
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 *
 * @param A a bezier curve (the 'from' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve (the 'to' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance optional; defaults to `max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
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
function hausdorffDistanceOneSidedExtra(A, B, tolerance, maxIterations = 50) {
    if (A.length === 1) {
        const c = closestPointOnBezier(B, A[0]);
        return { d: c.d, tA: 0, pA: A[0], tB: c.t, pB: c.p };
    }
    if (B.length === 1) {
        const f = furthestPointOnBezier(A, B[0]);
        return { d: f.d, tA: f.t, pA: f.p, tB: 0, pB: B[0] };
    }
    if (A.length === 2 && B.length === 2) {
        // Seperately handle the simple case of two lines
        // Find minimum distance from endpoints of A to B:
        const c0 = closestPointOnBezier(B, A[0]);
        const c1 = closestPointOnBezier(B, A[A.length - 1]);
        return c0.d > c1.d
            ? { d: c0.d, tA: 0, pA: A[0], tB: c0.t, pB: c0.p }
            : { d: c1.d, tA: 1, pA: A[A.length - 1], tB: c1.t, pB: c1.p };
    }
    const l = max(maxAbsCoordinate(A), maxAbsCoordinate(B));
    tolerance = tolerance || l / 1000_000;
    // an array of intervals
    const [eL, eR] = calcHErrorBound(A, 0, 1);
    const d0 = closestPointOnBezier(B, A[0]).d;
    const d1 = closestPointOnBezier(B, A[A.length - 1]).d;
    const initialInterval = {
        tS: 0, tE: 1,
        hL: d0, hR: d1, hEL: eL, hER: eR
    };
    const heap = new Heap(hausdorffCompare);
    heap.insert(initialInterval);
    let j = 0;
    let bestHLower = -Infinity;
    let bestTA = 0; // parameter on `A` achieving the running max lower bound
    while (true) {
        const interval = heap.heap[0]; // peek max
        const { tS, tE, hL, hR } = interval;
        const tM = (tS + tE) / 2;
        const [ELL, ELR] = calcHErrorBound(A, tS, tM);
        const [ERL, ERR] = calcHErrorBound(A, tM, tE);
        //---- get hM ---------------------------
        const pM = evalDeCasteljau(A, tM);
        const pB = closestPointOnBezier(B, pM).p;
        const hM = distanceBetween(pM, pB);
        //---------------------------------------
        // track *which* of the three parameters (tS, tM, tE) achieves the max
        let hBest = hL, tABest = tS;
        if (hM > hBest) {
            hBest = hM;
            tABest = tM;
        }
        if (hR > hBest) {
            hBest = hR;
            tABest = tE;
        }
        if (hBest > bestHLower) {
            bestHLower = hBest;
            bestTA = tABest;
        }
        const bestHUpper = getMaxHausdorff(interval);
        if (bestHUpper - bestHLower < tolerance) {
            // The lower bound is by far the best approximation for difficult cases (see the paper).
            break;
        }
        if (j++ > maxIterations) {
            // The lower bound is by far the best approximation for difficult cases (see the paper).
            break;
        }
        const iL = { tS, tE: tM, hL, hR: hM, hEL: ELL, hER: ELR };
        const iR = { tS: tM, tE, hL: hM, hR, hEL: ERL, hER: ERR };
        heap.swapMinOrMax(iL);
        heap.insert(iR);
    }
    const pA = evalDeCasteljau(A, bestTA);
    const cB = closestPointOnBezier(B, pA);
    return { d: bestHLower, tA: bestTA, pA, tB: cB.t, pB: cB.p };
}
// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }
//
// |h(S,B) − h(A,B)| ≤ ωf(δS/2)
// where: δS = max_(1≤i≤M+1)[ (ti − ti−1) ] is the maximum distance between 
// two consecutive parameter values
/**
 * @internal
 */
function calcHErrorBound(A, tS, tE) {
    // To calculate an upper bound for ωf(δS/2) we can either check the max 
    // absolute tangent values on curve segments or use the control point 
    // lengths as an upper bound.
    const tM = (tE + tS) / 2; // since the formula says `δS/2` so divide by 2
    const psL = fromTo(A, tS, tM);
    const psR = fromTo(A, tM, tE);
    const eL = controlPointLinesLength(psL);
    const eR = controlPointLinesLength(psR);
    return [eL, eR];
}
export { hausdorffDistanceOneSidedExtra };
//# sourceMappingURL=hausdorff-distance-one-sided-extra.js.map