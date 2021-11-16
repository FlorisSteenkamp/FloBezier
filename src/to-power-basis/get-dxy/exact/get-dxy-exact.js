"use strict";
exports.__esModule = true;
exports.getDxy3Exact = exports.getDxy2Exact = exports.getDxy1Exact = exports.getDxyExact = void 0;
var big_float_ts_1 = require("big-float-ts");
var td = big_float_ts_1.twoDiff;
var ts = big_float_ts_1.twoSum;
var sce = big_float_ts_1.scaleExpansion2;
var eadd = big_float_ts_1.eAdd;
var ge = big_float_ts_1.growExpansion;
/**
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getDxyExact(ps) {
    if (ps.length === 4) {
        return getDxy3Exact(ps);
    }
    if (ps.length === 3) {
        return getDxy2Exact(ps);
    }
    if (ps.length === 2) {
        return getDxy1Exact(ps);
    }
    // TODO - add case of degenerate point
    throw new Error('The given bezier curve is invalid.');
}
exports.getDxyExact = getDxyExact;
function getDxy3Exact(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    return [[
            sce(3, eadd(td(x3, x0), sce(3, td(x1, x2)))),
            sce(6, ge(ts(x2, x0), -2 * x1)),
            sce(3, td(x1, x0))
        ], [
            sce(3, eadd(td(y3, y0), sce(3, td(y1, y2)))),
            sce(6, ge(ts(y2, y0), -2 * y1)),
            sce(3, td(y1, y0))
        ]];
}
exports.getDxy3Exact = getDxy3Exact;
function getDxy2Exact(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    return [[
            ge(ts(2 * x2, 2 * x0), -4 * x1),
            td(2 * x1, 2 * x0),
        ], [
            ge(ts(2 * y2, 2 * y0), -4 * y1),
            td(2 * y1, 2 * y0),
        ]];
}
exports.getDxy2Exact = getDxy2Exact;
function getDxy1Exact(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            td(x1, x0),
        ], [
            td(y1, y0),
        ]];
}
exports.getDxy1Exact = getDxy1Exact;
