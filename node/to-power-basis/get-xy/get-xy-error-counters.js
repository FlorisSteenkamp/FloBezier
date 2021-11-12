// Note: 
// Rrror counters of double-double will actually be slightly less but
// we can use this for both double and double-double precision.
// For double precision the error bound === γ * <counter> * `error_`
// For double-double precision the error bound === γγ3 * <counter> * `error_`
const abs = Math.abs;
// TODO - fix docs - uses Wilkinson error counters
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
function getXY1ErrorCounters(ps) {
    const [[x0, y0], [x1, y1]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    return [
        [
            // <1> <= <1>(<0>x1 - <0>x0)
            _x1 + _x0,
            0,
        ], [
            _y1 + _y0,
            0,
        ]
    ];
}
// TODO - fix docs
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
function getXY2ErrorCounters(ps) {
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    return [
        [
            _x2 + _x0 + 2 * _x1,
            2 * (_x1 + _x0),
            0,
        ], [
            _y2 + _y0 + 2 * _y1,
            2 * (_y1 + _y0),
            0,
        ]
    ];
}
// TODO - fix docs
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
function getXY3ErrorCounters(ps) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    const _x0 = abs(x0);
    const _x1 = abs(x1);
    const _x2 = abs(x2);
    const _x3 = abs(x3);
    const _y0 = abs(y0);
    const _y1 = abs(y1);
    const _y2 = abs(y2);
    const _y3 = abs(y3);
    return [
        [
            _x3 + _x0 + 3 * (_x1 + _x2),
            3 * (_x2 + _x0 + 2 * _x1),
            3 * (_x1 + _x0),
            0,
        ], [
            _y3 + _y0 + 3 * (_y1 + _y2),
            3 * (_y2 + _y0 + 2 * _y1),
            3 * (_y1 + _y0),
            0,
        ]
    ];
}
export { getXY1ErrorCounters, getXY2ErrorCounters, getXY3ErrorCounters };
//# sourceMappingURL=get-xy-error-counters.js.map