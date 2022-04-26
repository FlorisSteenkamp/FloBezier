/**
 * Returns the normal, i.e. returns the `[x,y]` value of the twice
 * differentiated (with respect to `t`) bezier curve's power basis when
 * evaluated at `t`.
 *
 * * uses double precision calculations internally
 *
 * @param ps a cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
declare function evaluate2ndDerivative(ps: number[][], t: number): number[];
export { evaluate2ndDerivative };
