/**
 * Returns the numerator and denominator of curvature `[N,D]`, i.e. `κ = N/D`
 *
 * @param ps
 * @param t
 */
declare function curvatureND(ps: number[][], t: number): [number, number];
/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 *
 * @doc mdx
 */
declare function curvature(ps: number[][], t: number): number;
/**
 * Returns the radius of curvature.
 *
 * @param ps
 * @param t
 */
declare function radiusOfCurvature(ps: number[][], t: number): number;
/**
 * Alias for [[κ]].
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
export { κ, curvature, radiusOfCurvature, curvatureND };
