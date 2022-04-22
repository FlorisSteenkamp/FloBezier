/**
 * Returns the `[x,y]` value of the twice differentiated (with respect to `t`)
 * bezier curve when evaluated at `t`.
 *
 * @param ps a cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
declare function evaluateDdxyExact(ps: number[][], t: number): number[][];
export { evaluateDdxyExact };
