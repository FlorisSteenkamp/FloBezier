"use strict";
exports.__esModule = true;
exports.isCubicReallyQuad = void 0;
var big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
var tp = big_float_ts_1.twoProduct;
var fes = big_float_ts_1.fastExpansionSum;
var esign = big_float_ts_1.eSign;
var ediff = big_float_ts_1.eDiff;
var u = Number.EPSILON / 2;
var abs = Math.abs;
/**
 * Returns true if the given cubic bezier curve is really a quadratic curve.
 *
 * * **exact:** for any bitlength of the coefficients
 *
 * @param ps a cubic bezier curve
 *
 * @doc mdx
 */
function isCubicReallyQuad(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    // The line below is unrolled (uses a toHybridQuadratic condition (points same?))
    //if ((x3 + 3*x1) - (x0 + 3*x2) === 0 && 
    //    (y3 + 3*y1) - (y0 + 3*y2) === 0) {
    // Calculate an approximation of the above with error bounds and use it as
    // a fast filter.
    var u1 = 3 * x1;
    var u1_ = abs(3 * x1); // the absolute error in u1
    var u2 = x3 + u1;
    var u2_ = u1_ + abs(u2); // the absolute error in u2
    var v1 = 3 * x2;
    var v1_ = abs(3 * x2); // the absolute error in v1
    var v2 = x0 + v1;
    var v2_ = v1_ + abs(v2); // the absolute error in v2
    var w = u2 - v2;
    var w_ = u2_ + v2_ + abs(w); // the absolute error in w
    // if w cannot possibly be zero, i.e. if the error is smaller than the value
    if (abs(w) - u * w_ > 0) {
        // fast filter 1 passed
        return false;
    }
    var q1 = 3 * y1;
    var q1_ = abs(3 * y1); // the absolute error in q1
    var q2 = y3 + q1;
    var q2_ = q1_ + abs(q2); // the absolute error in q2
    var r1 = 3 * y2;
    var r1_ = abs(3 * y2); // the absolute error in r1
    var r2 = y0 + r1;
    var r2_ = r1_ + abs(r2); // the absolute error in r2
    var s = q2 - r2;
    var s_ = q2_ + r2_ + abs(s); // the absolute error in s
    if (abs(s) - u * s_ > 0) {
        // fast filter 2 passed
        return false;
    }
    // unable to filter - go slow and exact
    return (esign(ediff(fes([x3], tp(3, x1)), fes([x0], tp(3, x2)))) === 0 &&
        esign(ediff(fes([y3], tp(3, y1)), fes([y0], tp(3, y2)))) === 0);
}
exports.isCubicReallyQuad = isCubicReallyQuad;
