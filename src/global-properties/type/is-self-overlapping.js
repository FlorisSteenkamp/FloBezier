"use strict";
exports.__esModule = true;
exports.isSelfOverlapping = void 0;
var is_line_js_1 = require("./is-line.js");
/**
 * Returns true if the given bezier is a line and self-overlapping, i.e. if it
 * intersects itself at an infinite number of points.
 *
 * * a bezier curve can only intersect itself at an infinite number of
 * points if is a self-overlapping line.
 *
 * * **Robust** via adaptive infinite precision floating point arithmetic.
 *
 * @param ps An order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
function isSelfOverlapping(ps) {
    if (!(0, is_line_js_1.isLine)(ps)) {
        return false;
    }
    // Check if control points are non-strict monotone
    var xs = ps.map(function (p) { return p[0]; });
    var ys = ps.map(function (p) { return p[1]; });
    return !(isMonotone(xs) && isMonotone(ys));
}
exports.isSelfOverlapping = isSelfOverlapping;
/**
 * Returns true if the given array of numbers are non-strict monotone increasing.
 * @param xs An array of numbers
 */
function isMonotoneIncreasing(xs) {
    for (var i = 1; i < xs.length; i++) {
        if (xs[i - 1] > xs[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Returns true if the given array of numbers are non-strict monotone decreasing.
 * @param xs An array of numbers
 */
function isMonotoneDecreasing(xs) {
    for (var i = 1; i < xs.length; i++) {
        if (xs[i - 1] < xs[i]) {
            return false;
        }
    }
    return true;
}
function isMonotone(xs) {
    return isMonotoneIncreasing(xs) || isMonotoneDecreasing(xs);
}
