/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
declare function evaluatePowerBasis_1stDerivativeExact(ps: number[][], t: number): number[][];
export { evaluatePowerBasis_1stDerivativeExact };
