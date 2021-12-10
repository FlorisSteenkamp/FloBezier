/**
 * TODO - not calculated that way anymore - deprecate??
 * Returns a flatness measure of the given curve - calculated as the total
 * distance between consecutive control points divided by the distance between
 * the endpoints.
 *
 * * flatness is calculated as the sum of the absolute values of the dot products
 * between consecutive vectors formed by the control points of the curve
 * * the returned flatness, say `f` is such that `1 <= f <= ∞`, where `1` means
 * maximum flatness (all points collinear with monotone increasing coordinates)
 * and `∞` means minimum flatness (at least 3 points collinear with alternating
 * coordinates).
 *
 * @param ps An order 1,2 or 3 bezier curve.
 *
 * @doc mdx
 */
declare function flatness(ps: number[][]): number;
export { flatness };
