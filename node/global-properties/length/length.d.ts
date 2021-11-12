/**
 * Returns the curve length (linear, quadratic or cubic bezier) in the
 * specified interval calculated using Gaussian Quadrature.
 *
 * @param ps a bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param interval the paramter interval over which the length is
 * to be calculated (typically `=== [0,1]`).
 *
 * @doc mdx
 */
declare function length(interval: number[], ps: number[][]): number;
export { length };
