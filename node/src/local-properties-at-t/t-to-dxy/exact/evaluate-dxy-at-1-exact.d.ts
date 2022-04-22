/**
 * Returns the exact result (`[x,y]`) of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve at `t === 1`.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function evaluateDxyAt1Exact(ps: number[][]): number[][];
export { evaluateDxyAt1Exact };
