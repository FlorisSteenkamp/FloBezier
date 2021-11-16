"use strict";
exports.__esModule = true;
exports.getXY3Dd = exports.getXY2Dd = exports.getXY1Dd = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var td = double_double_1.twoDiff; // error -> 0
var qmd = double_double_1.ddMultDouble2; // error -> 3*u²
var qaq = double_double_1.ddAddDd;
var qad = double_double_1.ddAddDouble; // error -> 2*u²
var ts = double_double_1.twoSum;
// TODO - modify docs (the doc below is from `getXY`)
/**
 * Returns the power basis representation of a line, quadratic or cubic bezier.
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
function getXY3Dd(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    // ----------------------------
    // xx3 = (x3 - x0) + 3*(x1 - x2)
    // ----------------------------
    var xx3 = qaq(td(x3, x0), qmd(3, td(x1, x2)));
    // ----------------------------
    // xx2 = 3*((x2 + x0) - 2*x1)
    // ----------------------------
    var xx2 = qmd(3, qad(ts(x2, x0), -2 * x1));
    // ----------------------------
    // xx1 = 3*(x1 - x0)
    // ----------------------------
    var xx1 = qmd(3, td(x1, x0));
    // ----------------------------
    // yy3 = (y3 - y0) + 3*(y1 - y2)
    // ----------------------------
    var yy3 = qaq(td(y3, y0), qmd(3, td(y1, y2)));
    // ----------------------------
    // yy2 = 3*((y2 + y0) - 2*y1)
    // ----------------------------
    var yy2 = qmd(3, qad(ts(y2, y0), -2 * y1));
    // ----------------------------
    // yy1 = 3*(y1 - y0)
    // ----------------------------
    var yy1 = qmd(3, td(y1, y0));
    return [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]];
}
exports.getXY3Dd = getXY3Dd;
/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps
 */
function getXY2Dd(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    // ---------------------
    // xx2 = x2 + x0 - 2*x1
    // ---------------------
    var xx2 = qad(ts(x2, x0), -2 * x1);
    // ---------------------
    // xx1 = 2*(x1 - x0)
    // ---------------------
    var xx1 = td(2 * x1, 2 * x0); // error free
    // ---------------------
    // yy2 = y2 + y0 - 2*y1
    // ---------------------
    var yy2 = qad(ts(y2, y0), -2 * y1);
    // ---------------------
    // yy1 = 2*(y1 - y0)
    // ---------------------
    var yy1 = td(2 * y1, 2 * y0); // error free
    return [[xx2, xx1, x0], [yy2, yy1, y0]];
}
exports.getXY2Dd = getXY2Dd;
/**
 * * exact for any bitlength
 * @param ps linear bezier curve
 */
function getXY1Dd(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            td(x1, x0),
            x0,
        ], [
            td(y1, y0),
            y0,
        ]];
}
exports.getXY1Dd = getXY1Dd;
