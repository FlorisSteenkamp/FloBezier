/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates.
 *
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics - 5,5,3)
 * * max bitlength increase === max shift === 3 (for quadratics - 3,2)
 * * max bitlength increase === max shift === 1 (for lines - 1)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getDx(ps: number[][]): number[];
/**
 * Returns the exact derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x-coordinates.
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getDxExact(ps: number[][]): number[][];
export { getDx, getDxExact };
