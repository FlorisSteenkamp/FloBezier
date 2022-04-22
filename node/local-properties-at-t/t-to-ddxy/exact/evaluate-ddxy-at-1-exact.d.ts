/**
 * Returns the result (`[x,y]`) of evaluating the 2nd derivative of a linear,
 * quadratic or cubic bezier curve at `t === 1`.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function evaluateDdxyAt1Exact(ps: number[][]): number[][];
export { evaluateDdxyAt1Exact };
