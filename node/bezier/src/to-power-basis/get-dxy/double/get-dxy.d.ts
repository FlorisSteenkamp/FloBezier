/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's.
 *
 * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getDxy(ps: number[][]): number[][];
export { getDxy };
