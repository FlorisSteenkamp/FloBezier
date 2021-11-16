"use strict";
// Note: 
// Rrror counters of double-double will actually be slightly less but
// we can use this for both double and double-double precision.
exports.__esModule = true;
exports.getXY3ErrorCounters = exports.getXY2ErrorCounters = exports.getXY1ErrorCounters = void 0;
// For double precision the error bound === γ * <counter> * `error_`
// For double-double precision the error bound === γγ3 * <counter> * `error_`
var abs = Math.abs;
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
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var _x0 = abs(x0);
    var _x1 = abs(x1);
    var _y0 = abs(y0);
    var _y1 = abs(y1);
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
exports.getXY1ErrorCounters = getXY1ErrorCounters;
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
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var _x0 = abs(x0);
    var _x1 = abs(x1);
    var _x2 = abs(x2);
    var _y0 = abs(y0);
    var _y1 = abs(y1);
    var _y2 = abs(y2);
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
exports.getXY2ErrorCounters = getXY2ErrorCounters;
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
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    var _x0 = abs(x0);
    var _x1 = abs(x1);
    var _x2 = abs(x2);
    var _x3 = abs(x3);
    var _y0 = abs(y0);
    var _y1 = abs(y1);
    var _y2 = abs(y2);
    var _y3 = abs(y3);
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
exports.getXY3ErrorCounters = getXY3ErrorCounters;
