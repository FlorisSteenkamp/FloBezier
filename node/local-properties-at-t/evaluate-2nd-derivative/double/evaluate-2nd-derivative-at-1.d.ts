/**
 * Returns the normal, i.e. returns the result, `[x,y]`, of evaluating the 2nd
 * derivative of a linear, quadratic or cubic bezier curve's power basis
 * at `t === 1`.
 *
 * * uses double precision calculations internally
 *
 * @param ps An order 0,1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function evaluate2ndDerivativeAt1(ps: number[][]): number[];
export { evaluate2ndDerivativeAt1 };
