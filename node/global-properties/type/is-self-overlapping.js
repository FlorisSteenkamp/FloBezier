"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelfOverlapping = void 0;
const is_line_1 = require("./is-line");
/**
 * Returns true if the given bezier is a line and self-overlapping, i.e. if it
 * intersects itself at an infinite number of points.
 *
 * Note: A bezier curve can only intersect itself at an infinite number of
 * points if is a self-overlapping line.
 *
 * Robust: This function is robust via adaptive infinite precision floating
 * point arithmetic.
 *
 * @param ps An order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
function isSelfOverlapping(ps) {
    if (!is_line_1.isLine(ps)) {
        return false;
    }
    // Check if control points are non-strict monotone
    let xs = ps.map(p => p[0]);
    let ys = ps.map(p => p[1]);
    return !(isMonotone(xs) && isMonotone(ys));
}
exports.isSelfOverlapping = isSelfOverlapping;
/**
 * Returns true if the given array of numbers are non-strict monotone increasing.
 * @param xs An array of numbers
 */
function isMonotoneIncreasing(xs) {
    for (let i = 1; i < xs.length; i++) {
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
    for (let i = 1; i < xs.length; i++) {
        if (xs[i - 1] < xs[i]) {
            return false;
        }
    }
    return true;
}
function isMonotone(xs) {
    return isMonotoneIncreasing(xs) || isMonotoneDecreasing(xs);
}
//# sourceMappingURL=is-self-overlapping.js.map