/**
 * Returns the approximate power basis representation of a line, quadratic or
 * cubic bezier's x-coordinates.
 *
 * If certain preconditions are met (see below) it returns the exact result.
 *
 * Returns the power basis polynomial from highest power to lowest,
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === max shift === 4 (for cubics)
 * (due to 'multiplication' by 12 (3x 6x 3x) -> ceil(log2(12)) === 4
 * * max bitlength increase === max shift === 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)  -> ceil(log2(4)) === 2
 * * max bitlength increase === max shift === 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x) -> ceil(log2(2)) === 1
 *
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
declare function getX(ps: number[][]): number[];
declare function getXExact(ps: number[][]): number[][];
export { getX, getXExact };
