/**
 * Returns the total absolute curvature of the given bezier curve over the
 * given interval
 *
 * * the result is given in radians.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * @param interval
 *
 * @doc mdx
 */
declare function totalAbsoluteCurvature(ps: number[][], interval?: number[]): number;
export { totalAbsoluteCurvature };
