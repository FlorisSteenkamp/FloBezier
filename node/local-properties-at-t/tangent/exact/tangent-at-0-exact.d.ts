/**
 * Returns the *exact* tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at `t === 0`, i.e.
 * returns the result, `[x,y]`, of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 0`.
 *
 * @param ps an order 0,1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function tangentAt0Exact(ps: number[][]): number[][];
export { tangentAt0Exact };
