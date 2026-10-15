import type { HausdorffDistanceOneSidedBounds, HausdorffDistanceOneSidedBoundsOptions } from './hausdorff-distance-types.js';
/**
 * Returns certified lower and upper bounds on the one-sided Hausdorff distance
 * `h(A,B)` from the bezier curve `A` to the (piecewise) bezier curve `B`,
 * stopping as soon as a requested decision can be made, together with the
 * parameter values and points where the lower bound is achieved.
 *
 * * the bounds are guaranteed up to floating point roundoff
 * * this is the implementation backing `hausdorffDistanceOneSided` and
 * `hausdorffDistanceOneSidedExtra`
 * * with `lowerStop === upperStop === d` it answers whether `h(A,B) <= d`:
 * once it stops, either `lower >= d` or `upper <= d`, unless `maxIterations`
 * was reached first (in which case `lower < d < upper`, i.e. undecided);
 * a conservative check is thus `upper > d`
 * * with `upperStop === d` and `lowerStop === d - δ` (`δ > 0`) it is
 * guaranteed to stop (with `maxIterations` set to `Infinity`) since one of the
 * two rules fires once `upper - lower <= δ`
 * * `A` is bisected into parameter intervals, best-first (by upper bound) if
 * a `tolerance` is in use, else depth-first (cheaper, and when only the
 * thresholds matter all intervals with an upper bound above `upperStop` must
 * be refined anyway); the upper bound on an interval `[tS,tE]` is the
 * smaller of
 *     * `(hS + hE + len)/2` where `hS`, `hE` are (upper bounds on) the
 *       distances from its endpoints to `B` and `len` is the control polygon
 *       length of `A` restricted to the interval, and
 *     * the maximum distance from the foot (on `B`) of either endpoint to the
 *       control points of `A` restricted to the interval (the convex hull
 *       property)
 * * the distances from the sample points on `A` to `B` are first found
 * cheaply by Newton iteration from the feet of the neighbouring samples
 * (giving upper bounds); the exact closest point on `B` (which may raise the
 * lower bound) is only calculated when this could change the outcome, i.e.
 * when the cheap value is `>= lowerStop` or, if a `tolerance` is in use, when
 * it is larger than the current lower bound; if no `tolerance` is in use the
 * returned `lower` is thus only as large as needed to make the decision (and
 * `upper` may be far from tight if `maxIterations` was reached)
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 *
 * @param A a bezier curve (the 'from' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve (the 'to' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`, or a piecewise bezier
 * curve given as an array of such curves (the pieces need not be connected)
 * @param options optional; see `HausdorffDistanceOneSidedBoundsOptions`; with
 * no options given it behaves as `hausdorffDistanceOneSidedExtra`
 *
 * @doc mdx
 */
declare function hausdorffDistanceOneSidedBounds(A: number[][], B: number[][] | number[][][], options?: HausdorffDistanceOneSidedBoundsOptions): HausdorffDistanceOneSidedBounds;
export { hausdorffDistanceOneSidedBounds };
