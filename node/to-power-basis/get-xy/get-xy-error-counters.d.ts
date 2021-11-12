/**
 * Returns the power basis representation of a line, quadratic or cubic bezier.
 *
 * * **non-exact:** if certain preconditions are met (see below) it returns the
 * exact result, else round-off may have occured during intermediate calculation.
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * TODO
 * ```
 * errorBound: [[
 *		x1,  // <1>
 *		0
 * ], [
 *		y1,  // <1>
 *		0
 * ]]
 * ```
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getXY1ErrorCounters(ps: number[][]): number[][];
/**
 *
 * TODO
 * ```
 * errorBound: [[
 *		x2,  // <2>
 *		x1,  // <1>
 *		0,
 * ],[
 *		y2,  // <2>
 *		y1,  // <1>
 *		0,
 * ]]
 * ```
 *
 * @param ps
 */
declare function getXY2ErrorCounters(ps: number[][]): number[][];
/**
 *
 * TODO
 * ```
 * errorBound: [[
 *		x3,  // <3>
 *		x2,  // <3>
 *		x1,  // <2>
 *		0,
 * ],[
 *		y3,  // <3>
 *		y2,  // <3>
 *		y1,  // <2>
 *		0,
 * ]]
 * ```
 *
 * @param ps
 */
declare function getXY3ErrorCounters(ps: number[][]): number[][];
export { getXY1ErrorCounters, getXY2ErrorCounters, getXY3ErrorCounters };
