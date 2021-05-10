/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified
 * interval calculated using Gaussian Quadrature. This function is curried.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is
 * to be calculated (usually === [0,1]).
 *
 * @doc mdx
 */
declare function length(interval: number[], ps: number[][]): number;
declare function length(interval: number[]): (ps: number[][]) => number;
export { length };
