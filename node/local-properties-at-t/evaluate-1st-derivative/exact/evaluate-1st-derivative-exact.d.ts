/**
 * Returns the *exact* result, `[x,y]`, of evaluating the 1st derivative of a
 * linear, quadratic or cubic bezier curve's power basis at `t`.
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
declare function evaluate1stDerivativeExact(ps: number[][], t: number): number[][];
export { evaluate1stDerivativeExact };
