"use strict";
exports.__esModule = true;
exports.getXYExact = exports.getXY3Exact = exports.getXY2Exact = exports.getXY1Exact = void 0;
var big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var td = big_float_ts_1.twoDiff;
var ts = big_float_ts_1.twoSum;
var sce = big_float_ts_1.scaleExpansion2;
var ge = big_float_ts_1.growExpansion;
var eAdd = big_float_ts_1.eAdd;
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 * * the precision of the returned coefficients can be high, e.g. for a cubic
 * the precision can require 6 doubles for the t^3 term.
 *
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXYExact(ps) {
    if (ps.length === 4) {
        return getXY3Exact(ps);
    }
    if (ps.length === 3) {
        return getXY2Exact(ps);
    }
    return getXY1Exact(ps);
}
exports.getXYExact = getXYExact;
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXY3Exact(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    return [[
            // (x3 - x0) + 3*(x1 - x2)
            eAdd(td(x3, x0), sce(3, td(x1, x2)))
            // OR
            // (x3 - x0) - (2*x2 + x2) + (2*x1 + x1)
            //eAdd(eAdd(td(x3,x0), ts(-2*x2, -x2)), ts(2*x1, x1))
            ,
            // 3*((x2 + x0) - 2*x1)
            sce(3, ge(ts(x2, x0), -2 * x1)),
            // 3*(x1 - x0)
            sce(3, td(x1, x0)),
            // x0
            x0
        ], [
            //ge(ge(sce(3, td(y1, y2)), y3), -y0),
            eAdd(td(y3, y0), sce(3, td(y1, y2))),
            //sce(3, ge(td(y2, 2*y1), y0)),
            sce(3, ge(ts(y2, y0), -2 * y1)),
            sce(3, td(y1, y0)),
            y0
        ]];
}
exports.getXY3Exact = getXY3Exact;
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps A quadratic bezier curve, e.g. [[0,0],[1,1],[2,0]]
 *
 * @doc
 */
function getXY2Exact(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    return [[
            // x2 - 2*x1 + x0
            ge(ts(x2, x0), -2 * x1),
            // 2*(x1 - x0)
            td(2 * x1, 2 * x0),
            //x0
            x0
        ], [
            ge(ts(y2, y0), -2 * y1),
            td(2 * y1, 2 * y0),
            y0
        ]];
}
exports.getXY2Exact = getXY2Exact;
/**
 * Returns the exact power basis representation of a line, quadratic or
 * cubic bezier.
 *
 * * returns the power basis polynomial from highest power to lowest,
 * e.g. `at^3 + bt^2 + ct + d` is returned as `[a,b,c,d]`
 *
 * @param ps An order 1 bezier curve (a line), e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getXY1Exact(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            //x1 - x0,
            td(x1, x0),
            //x0
            x0
        ], [
            td(y1, y0),
            y0
        ]];
}
exports.getXY1Exact = getXY1Exact;
