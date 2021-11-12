/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getDxyExact(ps: number[][]): number[][][];
declare function getDxy3Exact(ps: number[][]): number[][][];
declare function getDxy2Exact(ps: number[][]): number[][][];
declare function getDxy1Exact(ps: number[][]): number[][][];
export { getDxyExact, getDxy1Exact, getDxy2Exact, getDxy3Exact };
