/**
 * Returns the tangent vector (in double-double precision not necessarily of
 * unit length) of an order 0,1,2 or 3 bezier curve at a specific given
 * parameter value `t`, i.e. returns the `[x,y]` value of the once
 * differentiated (with respect to `t`) bezier curve's power basis when
 * evaluated at `t`.
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 *
 * @doc mdx
 */
declare function ddTangent(ps: number[][], t: number): number[][];
export { ddTangent };
