"use strict";
exports.__esModule = true;
exports.getXY3DdWithRunningError = exports.getXY2DdWithRunningError = exports.getXY1DdWithRunningError = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var td = double_double_1.twoDiff; // error -> 0
var qmd = double_double_1.ddMultDouble2; // error -> 3*u²
var qaq = double_double_1.ddAddDd;
var qad = double_double_1.ddAddDouble; // error -> 2*u²
var abs = Math.abs;
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
function getXY3DdWithRunningError(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    // ----------------------------
    // xx3 = (x3 - x0) + 3*(x1 - x2)
    // ----------------------------
    var xa = td(x3, x0); // error free
    var xb = td(x1, x2); // error free
    var $xc = 3 * (x1 - x2);
    var xc = qmd(3, xb);
    var _xc_ = abs($xc);
    var xx3 = qaq(xa, xc);
    var xx3_ = _xc_ + abs(x3 - x0 + $xc);
    // ----------------------------
    // xx2 = 3*(x2 - 2*x1 + x0)
    // ----------------------------
    var xd = td(x2, 2 * x1); // error free
    var xe = qad(xd, x0);
    var _xe_ = abs(x2 - 2 * x1 + x0);
    var xx2 = qmd(3, xe);
    //const xx2_ = 3*_xe_ + 3*_xe_;
    var xx2_ = 6 * _xe_;
    // ----------------------------
    // xx1 = 3*(x1 - x0)
    // ----------------------------
    var xg = td(x1, x0); // error free
    var xx1 = qmd(3, xg);
    var xx1_ = abs(3 * (x1 - x0));
    // ----------------------------
    // yy3 = y3 + 3*(y1 - y2) - y0
    // ----------------------------
    var ya = td(y3, y0); // error free
    var yb = td(y1, y2); // error free
    var $yc = 3 * (y1 - y2);
    var yc = qmd(3, yb);
    var _yc_ = abs($yc);
    var yy3 = qaq(ya, yc);
    var yy3_ = _yc_ + abs(y3 - y0 + $yc);
    // ----------------------------
    // yy2 = 3*(y2 - 2*y1 + y0)
    // ----------------------------
    var yd = td(y2, 2 * y1); // error free
    var ye = qad(yd, y0);
    var _ye_ = abs(y2 - 2 * y1 + y0);
    var yy2 = qmd(3, ye);
    //const yy2_ = 3*_ye_ + 3*_ye_;
    var yy2_ = 6 * _ye_;
    // ----------------------------
    // yy1 = 3*(y1 - y0)
    // ----------------------------
    var yg = td(y1, y0); // error free
    var yy1 = qmd(3, yg);
    var yy1_ = abs(3 * (y1 - y0));
    return {
        coeffs: [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]],
        errorBound: [[xx3_, xx2_, xx1_, 0], [yy3_, yy2_, yy1_, 0]]
    };
}
exports.getXY3DdWithRunningError = getXY3DdWithRunningError;
/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps
 */
function getXY2DdWithRunningError(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    // ---------------------
    // xx2 = x2 - 2*x1 + x0
    // ---------------------
    var $a = x2 - 2 * x1;
    var a = td(x2, 2 * x1); // error free
    var xx2 = qad(a, x0);
    var xx2_ = abs($a + x0);
    // ---------------------
    // xx1 = 2*(x1 - x0)
    // ---------------------
    var xx1 = td(2 * x1, 2 * x0); // error free
    // ---------------------
    // yy2 = y2 - 2*y1 + y0
    // ---------------------
    var $b = y2 - 2 * y1;
    var b = td(y2, 2 * y1); // error free
    var yy2 = qad(b, y0);
    var yy2_ = abs($b + y0);
    // ---------------------
    // yy1 = 2*(y1 - y0)
    // ---------------------
    var yy1 = td(2 * y1, 2 * y0); // error free
    return {
        coeffs: [[xx2, xx1, x0], [yy2, yy1, y0]],
        errorBound: [[xx2_, 0, 0], [yy2_, 0, 0]]
    };
}
exports.getXY2DdWithRunningError = getXY2DdWithRunningError;
/**
 * * exact for any bitlength
 * @param ps linear bezier curve
 */
function getXY1DdWithRunningError(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    return [[
            td(x1, x0),
            x0,
        ], [
            td(y1, y0),
            y0,
        ]];
}
exports.getXY1DdWithRunningError = getXY1DdWithRunningError;
