/**
 * Returns the unit tangent vector of an order 0,1,2 or 3 bezier curve at a
 * specific given parameter value `t`.
 *
 * * uses double precision calculations internally
 * * returns `undefined` if the tangent vanishes at `t` (e.g. at a cusp) since
 * the curve has no well-defined direction there
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
declare function unitTangent(ps: number[][], t: number): number[] | undefined;
export { unitTangent };
