/**
 * Returns the total absolute curvature of the given bezier curve over the
 * given interval
 *
 * * the result is given in radians.
 *
 * @param ps a cubic bezier
 * @param interval
 *
 * @doc mdx
 */
declare function totalAbsoluteCurvature(ps: number[][], interval?: number[]): number;
/**
 * Returns the total curvature of the bezier over the given interval.
 *
 * * the result is given in radians.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the interval of integration (often === [0,1])
 *
 * @doc mdx
 */
declare function totalCurvature(ps: number[][], interval?: number[]): number;
export { totalCurvature, totalAbsoluteCurvature };
