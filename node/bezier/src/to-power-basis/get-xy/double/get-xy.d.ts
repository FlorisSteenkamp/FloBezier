/**
 * Returns the power basis representation of a linear, quadratic or cubic bezier curve.
 *
 * * **non-exact:** if certain preconditions are met (see below) it returns the
 * exact result, else round-off may have occured during intermediate calculation.
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * * **bitlength:** If the coordinates of the control points are bit-aligned then:
 *  * max bitlength increase = 4 (for cubics)
 * (due to 'multiplication' by 9 (3x 6x 3x)
 *  * max bitlength increase = 2 (for quadratics)
 * (due to 'multiplication' by 4 (1x 2x 1x)
 *  * max bitlength increase = 1 (for lines)
 * (due to 'multiplication' by 4 (1x 1x)
 *
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getXY(ps: number[][]): number[][];
declare function getXY3(ps: number[][]): number[][];
declare function getXY2(ps: number[][]): number[][];
declare function getXY1(ps: number[][]): number[][];
declare function getXY0(ps: number[][]): number[][];
export { getXY, getXY3, getXY2, getXY1, getXY0 };
