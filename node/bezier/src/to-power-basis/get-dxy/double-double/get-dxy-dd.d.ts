/**
 * TODO docs
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getDxyDd(ps: number[][]): number[][][];
declare function getDxy3Dd(ps: number[][]): number[][][];
declare function getDxy2Dd(ps: number[][]): number[][][];
declare function getDxy1Dd(ps: number[][]): number[][][];
export { getDxyDd, getDxy1Dd, getDxy2Dd, getDxy3Dd };
