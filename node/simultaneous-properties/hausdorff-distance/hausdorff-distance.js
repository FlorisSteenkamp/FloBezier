import { hausdorffDistanceOneSided } from "./hausdorff-distance-one-sided.js";
/** @internal */
const max = Math.max;
/**
 * Calculates and returns the (two-sided) Hausdorff distance between the bezier
 * curves `A` and `B` as `[min,max]` where `min` is the minimum
 * guaranteed and `max` is the maximum guaranteed Hausdorff distance. The `min`
 * value will be a *much* more accurate result in general.
 *
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 *
 * @param A a bezier curve given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance optional; defaults to `Math.max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
 * if the calculated absolute error bound is less than this, the result is
 * returned; this is *not* a hard tolerance and the returned bound can be less
 * accurate in hard cases (due to the `maxIterations` parameter). Luckily
 * however, specifically the lower bound returned will be very accurate due to
 * its fast convergence in such hard cases (see the paper)
 * @param maxIterations optional; defaults to `50`; if the desired guaranteed error bound
 * has not been achieved after `maxIterations` then the result will be returned
 *
 * @doc mdx
 */
function hausdorffDistance(A, B, tolerance, maxIterations) {
    const AB = hausdorffDistanceOneSided(A, B, tolerance, maxIterations);
    const BA = hausdorffDistanceOneSided(B, A, tolerance, maxIterations);
    return max(AB, BA);
}
export { hausdorffDistance };
//# sourceMappingURL=hausdorff-distance.js.map