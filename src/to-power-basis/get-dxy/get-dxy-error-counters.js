"use strict";
// For double precision the error bound === γ * <counter> * `error_`
// For double-double precision the error bound === γγ3 * <counter> * `error_`
exports.__esModule = true;
exports.getDxy3ErrorCounters = exports.getDxy2ErrorCounters = exports.getDxy1ErrorCounters = void 0;
var abs = Math.abs;
// TODO - fix docs - uses Wilkinson error counters
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
function getDxy1ErrorCounters(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var _x0 = abs(x0);
    var _x1 = abs(x1);
    var _y0 = abs(y0);
    var _y1 = abs(y1);
    // If intermediate calculations are done in double precision then:
    // `<D> === <1>` else if double-double precision then `<D> === <0>`.
    return [
        [
            // <D> <= <D>(<0>x1 - <0>x0)
            _x1 + _x0, // <D>
        ], [
            _y1 + _y0, // <D>
        ]
    ];
}
exports.getDxy1ErrorCounters = getDxy1ErrorCounters;
// TODO - fix docs
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
function getDxy2ErrorCounters(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var _x0 = abs(x0);
    var _x1 = abs(x1);
    var _x2 = abs(x2);
    var _y0 = abs(y0);
    var _y1 = abs(y1);
    var _y2 = abs(y2);
    // If intermediate calculations are done in double precision then:
    // `<D> === <1>` else if double-double precision then `<D> === <0>`.
    return [
        [
            // <D+1> <-- <D+1>(<D>(x2 + x0) - 2*x1)
            2 * ((_x2 + _x0) + 2 * _x1),
            // <D> <-- 2*<D>(x1 - x0)
            2 * (_x1 + _x0)
        ], [
            2 * ((_y2 + _y0) + 2 * _y1),
            2 * (_y1 + _y0)
        ]
    ];
}
exports.getDxy2ErrorCounters = getDxy2ErrorCounters;
// TODO - fix docs
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
function getDxy3ErrorCounters(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    var _x0 = abs(x0);
    var _x1 = abs(x1);
    var _x2 = abs(x2);
    var _x3 = abs(x3);
    var _y0 = abs(y0);
    var _y1 = abs(y1);
    var _y2 = abs(y2);
    var _y3 = abs(y3);
    // If intermediate calculations are done in double precision then:
    // `<D> === <1>` else if double-double precision then `<D> === <0>`.
    return [
        [
            // <D+3> <-- <D+3>(3*(<D+2>(<D>(x3 - x0) + <D+1>(3*<D>(x1 - x2)))))
            3 * ((_x3 + _x0) + 3 * (_x1 + _x2)),
            // <D+2> <-- <D+2>(6*<D+1>(<D>(x2 + x0) - 2*x1))
            6 * ((_x2 + _x0) + 2 * _x1),
            // <D+1> <-- <D+1>(3*<D>(x1 - x0))
            3 * (_x1 + _x0)
        ], [
            3 * ((_y3 + _y0) + 3 * (_y1 + _y2)),
            6 * ((_y2 + _y0) + 2 * _y1),
            3 * (_y1 + _y0)
        ]
    ];
}
exports.getDxy3ErrorCounters = getDxy3ErrorCounters;
