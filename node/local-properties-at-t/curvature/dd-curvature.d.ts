/**
 * Returns the numerator and denominator of curvature `[N,D]`, i.e. `κ = N/D`
 *
 */
declare function ddCurvatureND(ps: number[][], t: number): [number[], number[]];
/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[[0],[0]],[[1],[1]],[[2],[1]],[[2],[0]]]`
 * @param t the parameter value where the curvature should be evaluated
 */
declare function ddCurvature(ps: number[][], t: number): number[];
/**
 * Returns the radius of curvature.
 *
 * @param ps
 * @param t
 */
declare function ddRadiusOfCurvature(ps: number[][], t: number): number[];
export { ddCurvature, ddRadiusOfCurvature, ddCurvatureND };
