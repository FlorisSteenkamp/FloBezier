/**
 * Returns the tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at `t === 1`, i.e.
 * Returns the result, `[x,y]`, of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve's power basis at `t === 1`.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function tangentAt1(ps: number[][]): number[];
export { tangentAt1 };
