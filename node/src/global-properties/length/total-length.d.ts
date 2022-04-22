/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified
 * interval calculated using Gaussian Quadrature.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is
 * to be calculated (usually === [0,1]).
 *
 * @doc mdx
 */
declare function totalLength(ps: number[][], maxCurviness?: number, gaussOrder?: 4 | 16 | 64): number;
export { totalLength };
