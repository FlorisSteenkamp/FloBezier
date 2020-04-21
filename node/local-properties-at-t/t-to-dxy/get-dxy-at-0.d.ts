/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x and y-coordinates when evaluated at t === 0.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength increase === max shift === 3 (for cubics)
 * * max bitlength increase === max shift === 2 (for quadratics)
 * * max bitlength increase === max shift === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getDxyAt0(ps: number[][]): number[];
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's x and y-coordinates when evaluated at t === 0.
 *
 * The result is exact due to infinite precision floating point arithmetic and
 * represented as a non-overlapping floating point expansion,
 * see e.g. Shewchuk https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
export { getDxyAt0 };
