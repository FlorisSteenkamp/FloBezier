import type { HausdorffDistanceOneSidedExtra, HausdorffDistanceExtra } from '../hausdorff-distance/hausdorff-distance-types.js';
/**
 * The candidate types (see Kim & McLean, "Computing the Hausdorff distance
 * between two sets of parametric curves"):
 *
 * * `EA` - an endpoint of `A`
 * * `EB` - the closest point on `B` is an endpoint of `B`
 * * `I` - interior closest point; `A(t) - B(s)` is normal to both curves
 * * `MA-ends` - `A(t)` is equidistant to both endpoints of `B`
 * * `MA-end-interior` - equidistant to an endpoint and an interior footpoint
 * * `MA-interiors` - equidistant to two interior footpoints
 * * `iterative` - not a candidate: `B` is a cubic with a zero derivative at an
 *   end point, for which `hausdorffDistanceOneSidedExtra` was used instead
 */
type Kind = 'EA' | 'EB' | 'I' | 'MA-ends' | 'MA-end-interior' | 'MA-interiors' | 'iterative';
/**
 * The one-sided Hausdorff distance from `A` to `B` together with where it is
 * attained (see `hausdorffDistanceOneSidedDirect`).
 */
interface HausdorffDistanceOneSidedDirect extends HausdorffDistanceOneSidedExtra {
    /** the candidate type that attained the maximum */
    readonly kind: Kind;
}
/**
 * The (two-sided) Hausdorff distance between two bezier curves together with
 * where it is attained (see `hausdorffDistanceDirect`).
 */
interface HausdorffDistanceDirect extends HausdorffDistanceExtra {
    /**
     * the candidate type that attained the maximum (of the one-sided distance
     * given by `side`)
     */
    readonly kind: Kind;
}
/**
 * Returns the one-sided Hausdorff distance `h(A,B) = max_t min_s |A(t) - B(s)|`
 * (and where it is attained) directly, i.e. by evaluating `min_s |A(t) - B(s)|`
 * at a (small) superset of the parameter values `t` where the maximum can be
 * attained, as opposed to the iterative bounding approach of `hausdorffDistance`.
 *
 * Implementation details:
 * * curves of order 0 to 3 (points, lines, quadratics and cubics)
 * * the candidate `t` values are of the following kinds (Kim & McLean):
 *   * `EA`: the endpoints of `A`
 *   * `EB`: points on `A` closest to an endpoint of `B`
 *   * `I`: intersections of `A` and `B`
 *   * `MA-ends`: points on `A` equidistant from both endpoints of `B`
 *   * `MA-end-interior`: points on `A` equidistant from an endpoint of `B` and
 *     a footpoint in the interior of `B`
 *   * `MA-interiors`: points on `A` equidistant from two footpoints in the
 *     interior of `B` (points of the medial axis of `B`)
 * * `B` is first normalized by a similarity transform (`B(0) = 0`,
 *   `B'(0) = (1,0)`) so that the systems' coefficients are polynomials in few
 *   variables; if `B′` is zero at an end point a line or quadratic `B` is
 *   replaced by the lower order curve with the same points, and for a cubic
 *   `B` the iterative `hausdorffDistanceOneSidedExtra` is used instead (with
 *   `kind` `'iterative'`)
 * * the resultants eliminating `s` (for `I` and `MA-end-interior`) are
 *   precomputed exactly (sympy, fraction-free Bareiss) by
 *   `experiments/hausdorff/gen-resultants.py` and evaluated as generated
 *   straight-line code (with common subexpressions eliminated) or as compact
 *   data programs for the larger ones
 * * univariate roots are found in the Bernstein basis on `[0,1]` and polished
 *   by Newton's method
 * * `MA-interiors` for cubic `B` is solved in the symmetric variables
 *   `σ = s1 + s2`, `π = s1*s2` (removing the trivial solutions `s1 = s2`):
 *   `π` is eliminated pointwise (no global resultant), the resulting function
 *   of `σ` (and its derivative) is evaluated on a grid of `GRID` cells and its
 *   roots are found via Hermite cubics per cell (revealing close pairs of
 *   roots); test points are added at the roots of the leading coefficient and
 *   at folds of the projection where the `σ` projection degenerates; each
 *   solution is Newton-polished in `(σ,π)` and the medial axis point is then
 *   mapped to its closest point on `A`
 * * `MA-interiors` for quadratic `B` is solved directly since then `σ` is a
 *   constant
 * * candidates are scored by an upper bound (distance to 17 samples of `B`)
 *   first so that most need no exact closest point; closest points are found
 *   by the roots of the footpoint polynomial
 * * since `min_s |A(t) - B(s)|` has a kink at a medial axis maximum, a winning
 *   medial axis candidate is refined by a golden-section search in
 *   `t ± 1e-4`
 * * plain double precision; no error bounds; in tests the error is typically
 *   around `1e-15` and at worst around `1e-12` (relative to the curves' size)
 * * a few times faster than `hausdorffDistance` (e.g. about `45μs` for two
 *   quadratics and under `1ms` for two cubics)
 *
 * @param A the curve from which the distance is measured, given as an array
 * of its control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B the curve to which the distance is measured
 */
declare function hausdorffDistanceOneSidedDirect(A: number[][], B: number[][]): HausdorffDistanceOneSidedDirect;
/**
 * Returns the (two-sided) Hausdorff distance `max(h(A,B), h(B,A))` between the
 * given bezier curves directly, together with the parameter values and points
 * on both curves where it is attained (see `hausdorffDistanceOneSidedDirect`
 * for the one-sided version and its implementation details).
 *
 * Implementation details:
 * * curves of order 0 to 3 (points, lines, quadratics and cubics)
 * * two calls to `hausdorffDistanceOneSidedDirect` (candidate enumeration
 *   with precomputed resultants and medial-axis root finding)
 * * plain double precision; no error bounds; in tests the error is typically
 *   around `1e-15` and at worst around `1e-12` (relative to the curves' size)
 *
 * @param A a bezier curve given as an array of its control points, e.g.
 * `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B another bezier curve
 */
declare function hausdorffDistanceDirect(A: number[][], B: number[][]): HausdorffDistanceDirect;
export { hausdorffDistanceOneSidedDirect, hausdorffDistanceDirect };
export type { HausdorffDistanceOneSidedDirect, HausdorffDistanceDirect, Kind as HausdorffDirectKind };
