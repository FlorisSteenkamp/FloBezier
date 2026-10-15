import type { HausdorffDistanceOneSidedExtra } from './hausdorff-distance-types.js';
/**
 * Calculates and returns an accurate approximation to the one-sided Hausdorff
 * distance from the bezier curve `A` to the bezier curve `B`, together with the
 * parameter values and points on both curves where the distance is
 * (approximately) achieved.
 *
 * * this is the implementation backing `hausdorffDistanceOneSided`, which simply
 * returns the `.d` property of this function's result
 * * the returned distance is the guaranteed *lower* bound of
 * `hausdorffDistanceOneSidedBounds`; use that function to also get a
 * guaranteed upper bound or to stop early on thresholds
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 *
 * @param A a bezier curve (the 'from' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve (the 'to' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance optional; defaults to `max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`
 * (only if not given, i.e. `0` is a valid tolerance in which case the result
 * is refined until `maxIterations` is reached);
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
declare function hausdorffDistanceOneSidedExtra(A: number[][], B: number[][], tolerance?: number, maxIterations?: number): HausdorffDistanceOneSidedExtra;
export { hausdorffDistanceOneSidedExtra };
