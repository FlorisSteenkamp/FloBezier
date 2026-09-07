import { hausdorffDistanceOneSidedExtra } from "./hausdorff-distance-one-sided-extra.js";
/**
 * Calculates and returns the (two-sided) Hausdorff distance between the bezier
 * curves `A` and `B`, together with the parameter values and points on both
 * curves where the distance is (approximately) achieved.
 *
 * * this is the implementation backing `hausdorffDistance`, which simply
 * returns the `.d` property of this function's result
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 *
 * @param A a bezier curve given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance optional; defaults to `max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
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
function hausdorffDistanceExtra(A, B, tolerance, maxIterations) {
    const ab = hausdorffDistanceOneSidedExtra(A, B, tolerance, maxIterations);
    const ba = hausdorffDistanceOneSidedExtra(B, A, tolerance, maxIterations);
    if (ab.d >= ba.d) {
        return { d: ab.d, side: 'ab', tA: ab.tA, pA: ab.pA, tB: ab.tB, pB: ab.pB };
    }
    // `ba` was computed as h(B,A), so its `tA`/`pA` lie on `B` and `tB`/`pB` on `A`
    return { d: ba.d, side: 'ba', tA: ba.tB, pA: ba.pB, tB: ba.tA, pB: ba.pA };
}
export { hausdorffDistanceExtra };
//# sourceMappingURL=hausdorff-distance-extra.js.map