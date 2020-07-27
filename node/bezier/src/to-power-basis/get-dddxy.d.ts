/**
 * Returns the 3rd derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x and y-coordinates.
 *
 * Note: this is a constant value and the same for all t-values and, in
 * particular, zero for a line or quadratic.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 6 (for cubics)
 * * max bitlength increase === max shift === 0 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getDddxy(ps: number[][]): number[];
export { getDddxy };
