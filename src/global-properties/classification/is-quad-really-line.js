"use strict";
exports.__esModule = true;
exports.isQuadReallyLine = void 0;
var big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
var ediff = big_float_ts_1.eDiff;
var esign = big_float_ts_1.eSign;
var ts = big_float_ts_1.twoSum;
var u = Number.EPSILON / 2;
var abs = Math.abs;
/**
 * Returns true if the given quadratic bezier curve is really a linear curve.
 *
 * * the required condition is met if: `x0 + x2 = 2*x1` and `y0 + y2 = 2*y1`
 * * **exact:** for any input
 *
 * @param ps a quadratic bezier curve
 *
 * @doc mdx
 */
function isQuadReallyLine(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    //if (x0 + x2 === 2*x1) && (y0 + y2 === 2*y1)
    // Calculate an approximation of the above with error bounds and use it as
    // a fast filter.
    var q = x0 + x2;
    var _q_ = abs(q); // the absolute error bound in q (after multipliciation by `u`)
    var w = q - 2 * x1;
    var w_ = _q_ + abs(w); // the absolute error bound in w
    // if w cannot possibly be zero, i.e. if the error is smaller than the value
    if (abs(w) - w_ > 0) {
        // fast filter passed
        return false;
    }
    var r = y0 + y2;
    var _r_ = abs(r); // the absolute error bound in r (after multipliciation by `u`)
    var z = r - 2 * y1;
    var z_ = _r_ + abs(z); // the absolute error bound in w
    // if the error is smaller than the value
    if (abs(z) - z_ > 0) {
        // fast filter passed
        return false;
    }
    // unable to filter - go slow and exact
    return (esign(ediff(ts(x0, x2), [2 * x1])) === 0 &&
        esign(ediff(ts(y0, y2), [2 * y1])) === 0);
}
exports.isQuadReallyLine = isQuadReallyLine;
