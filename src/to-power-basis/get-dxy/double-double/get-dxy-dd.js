"use strict";
exports.__esModule = true;
exports.getDxy3Dd = exports.getDxy2Dd = exports.getDxy1Dd = exports.getDxyDd = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var ts = double_double_1.twoSum; // error -> 0
var td = double_double_1.twoDiff; // error -> 0
var qmd = double_double_1.ddMultDouble2; // error -> 3*u²
var qaq = double_double_1.ddAddDd;
var qad = double_double_1.ddAddDouble; // error -> 2*u²
var abs = Math.abs;
/**
 * TODO docs
 * Returns the derivative of the power basis representation of a line, quadratic
 * or cubic bezier's.
 *
 * @param ps An order 1,2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 *
 * @doc
 */
function getDxyDd(ps) {
    if (ps.length === 4) {
        return getDxy3Dd(ps);
    }
    if (ps.length === 3) {
        return getDxy2Dd(ps);
    }
    if (ps.length === 2) {
        return getDxy1Dd(ps);
    }
    throw new Error('The given bezier curve must be of order 1, 2 or 3.');
}
exports.getDxyDd = getDxyDd;
function getDxy3Dd(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    return [[
            qmd(3, qaq(td(x3, x0), qmd(3, td(x1, x2)))),
            qmd(6, qad(ts(x2, x0), -2 * x1)),
            qmd(3, td(x1, x0))
        ], [
            qmd(3, qaq(td(y3, y0), qmd(3, td(y1, y2)))),
            qmd(6, qad(ts(y2, y0), -2 * y1)),
            qmd(3, td(y1, y0))
        ]];
}
exports.getDxy3Dd = getDxy3Dd;
function getDxy2Dd(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    return [[
            qad(ts(2 * x2, 2 * x0), -4 * x1),
            td(2 * x1, 2 * x0),
        ], [
            qad(ts(2 * y2, 2 * y0), -4 * y1),
            td(2 * y1, 2 * y0),
        ]];
}
exports.getDxy2Dd = getDxy2Dd;
function getDxy1Dd(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            td(x1, x0),
        ], [
            td(y1, y0),
        ]];
}
exports.getDxy1Dd = getDxy1Dd;
