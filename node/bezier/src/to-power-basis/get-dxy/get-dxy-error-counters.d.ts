/**
 * TODO
 * Returns the derivative of the power basis representation of a line, quadratic or cubic bezier.
 *
 * * returns the derivative of the tpower basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * TODO
 * ```
 * errorBound: [[
 *		dx0,  // <D>
 * ], [
 *		dy0,  // <D>
 * ]]
 * ```
 * @param ps an order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
declare function getDxy1ErrorCounters(ps: number[][]): number[][];
/**
 *
 * TODO
 * ```
 * errorBound: [[
 *		dx1,  // <D+1>
 *		dx0,  // <D>
 * ],[
 *		dy1,  // <D+1>
 *		dy0,  // <D>
 * ]]
 * ```
 *
 * @param ps
 */
declare function getDxy2ErrorCounters(ps: number[][]): number[][];
/**
 *
 * TODO
 * ```
 * errorBound: [[
 *		dx2,  // <D+3>
 *		dx1,  // <D+2>
 *		dx0,  // <D+1>
 * ],[
 *		dy2,  // <D+3>
 *		dy1,  // <D+2>
 *		dy0,  // <D+1>
 * ]]
 * ```
 *
 * @param ps
 */
declare function getDxy3ErrorCounters(ps: number[][]): number[][];
export { getDxy1ErrorCounters, getDxy2ErrorCounters, getDxy3ErrorCounters };
