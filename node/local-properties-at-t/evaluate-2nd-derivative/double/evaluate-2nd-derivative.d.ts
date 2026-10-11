/**
 * Returns the `[x,y]` value of the twice differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * uses double precision calculations internally
 * * **curried:** if `t` is omitted a function of `t` is returned instead (the
 * power basis conversion is then only done once which is much faster if the
 * derivative is to be evaluated at many `t` values for the same curve)
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter (may be omitted, see above)
 *
 * @doc mdx
 */
declare function evaluate2ndDerivative(ps: number[][]): (t: number) => number[];
declare function evaluate2ndDerivative(ps: number[][], t: number): number[];
export { evaluate2ndDerivative };
