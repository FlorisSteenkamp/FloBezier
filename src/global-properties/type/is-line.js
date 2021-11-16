"use strict";
exports.__esModule = true;
exports.isVerticalLine = exports.isHorizontalLine = exports.isLine = void 0;
var big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
var orient2d = big_float_ts_1.operators.orient2d;
/**
 * Returns true if the given bezier curve is a line or if all control points
 * are collinear.
 *
 * * if you need to know whether a given bezier curve can be converted to an
 * order 1 bezier curve (a line) such that the same `(x,y)` point is returned
 * for the same `t` value then use e.g. [[isQuadReallyLine]] instead.
 * * **exact:** for any bitlength of the given coordinates.
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc mdx
 */
function isLine(ps) {
    if (ps.length === 4) {
        // Cubic bezier
        return (orient2d(ps[0], ps[1], ps[2]) === 0 &&
            orient2d(ps[1], ps[2], ps[3]) === 0 &&
            // The below check is necessary for if ps[1] === ps[2]
            orient2d(ps[0], ps[2], ps[3]) === 0);
    }
    if (ps.length === 3) {
        // Quadratic bezier
        return orient2d(ps[0], ps[1], ps[2]) === 0;
    }
    if (ps.length === 2 || ps.length === 1) {
        // Line (or point)
        return true;
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.isLine = isLine;
/**
 * Returns true if the given bezier degenerates to a horizontal line (possibly
 * self-overlapping)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
function isHorizontalLine(ps) {
    var y = ps[0][1];
    for (var i = 1; i < ps.length; i++) {
        if (ps[i][1] !== y) {
            return false;
        }
    }
    return true;
}
exports.isHorizontalLine = isHorizontalLine;
/**
 * Returns true if the given bezier degenerates to a vertical line (possibly
 * self-overlapping)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
function isVerticalLine(ps) {
    var x = ps[0][0];
    for (var i = 1; i < ps.length; i++) {
        if (ps[i][0] !== x) {
            return false;
        }
    }
    return true;
}
exports.isVerticalLine = isVerticalLine;
