/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates. This function is memoized on its points
 * parameter by object reference.
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x-coordinates.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * max bitlength increase === max shift === 5 (for cubics)
 * max bitlength increase === max shift === 3 (for quadratics)
 * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getDx(ps: number[][]): number[];
export { getDx };
