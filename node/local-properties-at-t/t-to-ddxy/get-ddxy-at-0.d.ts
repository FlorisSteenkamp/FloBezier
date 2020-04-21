/**
 * Returns the 2nd derivative of the power basis representation of a line,
 * quadratic or cubic bezier's x and y-coordinates when evaluated at t === 0.
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 5 (for cubics)
 * * max bitlength increase === max shift === 3 (for quadratics)
 * * max bitlength increase === max shift === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getDdxyAt0(ps: number[][]): number[];
export { getDdxyAt0 };
