import { hausdorffDistanceOneSidedExtra } from "./hausdorff-distance-one-sided-extra.js";
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
 * * to also obtain the parameter values and points at which the distance is
 * achieved, use `hausdorffDistanceOneSidedExtra`
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
function hausdorffDistanceOneSided(A, B, tolerance, maxIterations = 50) {
    return hausdorffDistanceOneSidedExtra(A, B, tolerance, maxIterations).d;
}
export { hausdorffDistanceOneSided };
//# sourceMappingURL=hausdorff-distance-one-sided.js.map