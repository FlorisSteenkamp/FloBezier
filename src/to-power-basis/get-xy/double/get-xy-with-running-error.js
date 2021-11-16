"use strict";
exports.__esModule = true;
exports.getXY3WithRunningError = exports.getXY2WithRunningError = exports.getXY1WithRunningError = void 0;
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
function getXY3WithRunningError(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    // ----------------------------
    // xx3 = (x3 - x0) + 3*(x1 - x2)
    // ----------------------------
    var xa = x3 - x0;
    var _xa_ = abs(xa);
    var xb = x1 - x2;
    var _xb_ = abs(xb);
    var xc = 3 * xb;
    var xc_ = 6 * _xb_; // === 3*_xb_ + 3*abs(xc)
    var xx3 = xa + xc;
    var xx3_ = _xa_ + xc_ + abs(xx3);
    // ----------------------------
    // xx2 = 3*((x2 + x0) - 2*x1)
    // ----------------------------
    var xd = x2 + x0;
    var _xd_ = abs(xd);
    var xe = xd - 2 * x1;
    var _xe_ = _xd_ + abs(xe);
    var xx2 = 3 * xe;
    var xx2_ = 6 * _xe_; // 3*_xe_ + abs(xx2)
    // ----------------------------
    // xx1 = 3*(x1 - x0)
    // ----------------------------
    var xg = x1 - x0;
    var _xg_ = abs(xg);
    var xx1 = 3 * xg;
    var xx1_ = 6 * _xg_; // 3*_xg_ + abs(3*xg)
    // ------------------------------
    // yy3 = (y3 - y0) + 3*(y1 - y2)
    // ------------------------------
    var ya = y3 - y0;
    var _ya_ = abs(ya);
    var yb = y1 - y2;
    var _yb_ = abs(yb);
    var yc = 3 * yb;
    var yc_ = 6 * _yb_; // === 3*_yb_ + 3*abs(yc)
    var yy3 = ya + yc;
    var yy3_ = _ya_ + yc_ + abs(yy3);
    // ----------------------------
    // yy2 = 3*((y2 + y0) - 2*y1)
    // ----------------------------
    var yd = y2 + y0;
    var _yd_ = abs(yd);
    var ye = yd - 2 * y1;
    var _ye_ = _yd_ + abs(ye);
    var yy2 = 3 * ye;
    var yy2_ = 6 * _ye_; // 3*_ye_ + abs(yy2)
    // ----------------------------
    // yy1 = 3*(y1 - y0)
    // ----------------------------
    var yg = y1 - y0;
    var _yg_ = abs(yg);
    var yy1 = 3 * yg;
    var yy1_ = 6 * _yg_; // 3*_yg_ + abs(3*yg)
    return {
        coeffs: [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]],
        errorBound: [[xx3_, xx2_, xx1_, 0], [yy3_, yy2_, yy1_, 0]]
    };
}
exports.getXY3WithRunningError = getXY3WithRunningError;
/**
 * only quadratic monomial coefficient has an error, the others are exact
 * @param ps
 */
function getXY2WithRunningError(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    // ---------------------
    // xx2 = (x2 + x0) - 2*x1
    // ---------------------
    var xa = x2 + x0;
    var _xa_ = abs(xa);
    var xx2 = xa - 2 * x1;
    var xx2_ = _xa_ + abs(xx2);
    // ---------------------
    // xx1 = 2*(x1 - x0)
    // ---------------------
    var xx1 = 2 * (x1 - x0);
    var xx1_ = abs(xx1);
    // ---------------------
    // yy2 = (y2 + y0) - 2*y1
    // ---------------------
    var ya = y2 + y0;
    var _ya_ = abs(ya);
    var yy2 = ya - 2 * y1;
    var yy2_ = _ya_ + abs(yy2);
    // ---------------------
    // yy1 = 2*(y1 - y0)
    // ---------------------
    var yy1 = 2 * (y1 - y0);
    var yy1_ = abs(yy1);
    return {
        coeffs: [[xx2, xx1, x0], [yy2, yy1, y0]],
        errorBound: [[xx2_, xx1_, 0], [yy2_, yy1_, 0]]
    };
}
exports.getXY2WithRunningError = getXY2WithRunningError;
/**
 * * exact for any bitlength
 * @param ps linear bezier curve
 */
function getXY1WithRunningError(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var xx1 = x1 - x0;
    var xx1_ = abs(xx1);
    var yy1 = y1 - y0;
    var yy1_ = abs(yy1);
    return {
        coeffs: [[xx1, x0], [yy1, y0]],
        errorBound: [[xx1_, 0], [yy1_, 0]]
    };
}
exports.getXY1WithRunningError = getXY1WithRunningError;
