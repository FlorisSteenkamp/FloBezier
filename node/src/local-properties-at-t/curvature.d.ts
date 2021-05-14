/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`. This function is curried.
 *
 * * **alias**: [[curvature]]
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 *
 * @doc mdx
 */
declare function curvature(ps: number[][], t: number): number;
declare function curvature(ps: number[][]): (t: number) => number;
/**
 * Compare the curvature, `κ`, between two curves at `t === 0`.
 *
 * Let `psI` be the curve going 'in' and `psO` be the curve coming 'out'. Then
 * this algorithm returns a positive number if `κ` for `psI` > `κ` for `psO`,
 * negative if `κ` for `psI < `κ` for `psO` or `0` if the curve extensions are
 * identical (i.e. in same K-family, or in other words if the curves are algebraically
 * identical up to endpoints).
 *
 * * **precondition:** the point `psI` evaluated at one must === the point `psO`
 * evaluated at zero.
 *
 * **exact:** returns the exact result if the bit-aligned bithlength of all
 * coordinates <= 47.
 *
 * @param psI an order 1, 2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * representing the incoming curve
 * @param psO another bezier representing the outgoing curve
 *
 * @internal
 */
declare function compareCurvaturesAtInterface(psI: number[][], psO: number[][]): number;
/**
 * Alias for [[κ]].
 *
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`. This function is curried.
 *
 * * **alias**: [[curvature]]
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 *
 * @doc
 */
declare const κ: typeof curvature;
export { κ, curvature, compareCurvaturesAtInterface };
