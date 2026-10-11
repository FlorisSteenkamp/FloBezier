/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 * * **curried:** if `t` is omitted a function of `t` is returned instead (the
 * power basis conversion is then only done once which is much faster if the
 * curvature is to be evaluated at many `t` values for the same curve)
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated (may
 * be omitted, see above)
 *
 * @doc mdx
 */
declare function curvature(ps: number[][]): (t: number) => number;
declare function curvature(ps: number[][], t: number): number;
/**
 * Alias for [[curvature]].
 *
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * **alias**: [[curvature]]
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 *
 * @doc
 */
declare const κ: typeof curvature;
/**
 * Returns the radius of curvature of the given linear, quadratic or cubic
 * bezier curve at a specific given parameter value `t`.
 *
 * * **curried:** if `t` is omitted a function of `t` is returned instead (see
 * [[curvature]])
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the radius of curvature should be
 * evaluated (may be omitted, see above)
 */
declare function radiusOfCurvature(ps: number[][]): (t: number) => number;
declare function radiusOfCurvature(ps: number[][], t: number): number;
/**
 * Returns the numerator and denominator of curvature `[N,D]`, i.e. `κ = N/D`
 * of the given linear, quadratic or cubic bezier curve at a specific given
 * parameter value `t`.
 *
 * * **curried:** if `t` is omitted a function of `t` is returned instead (see
 * [[curvature]])
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value (may be omitted, see above)
 */
declare function curvatureND(ps: number[][]): (t: number) => [number, number];
declare function curvatureND(ps: number[][], t: number): [number, number];
export { κ, curvature, radiusOfCurvature, curvatureND };
