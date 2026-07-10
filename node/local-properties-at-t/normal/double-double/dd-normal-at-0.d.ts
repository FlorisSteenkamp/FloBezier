/**
 * Returns the normal vector (in double-double precision not necessarily of
 * unit length) of an order 0,1,2 or 3 bezier curve at `t === 0`, i.e.
 * returns the result, `[x,y]`, of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 0`.
 *
 * * *exact* result for order <= 2 bezier curves
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function ddNormalAt0(ps: number[][]): number[][];
export { ddNormalAt0 };
