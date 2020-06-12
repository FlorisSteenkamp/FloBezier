"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerticalLine = exports.isHorizontalLine = exports.isLine = void 0;
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns true if the given bezier is a line or a line in diguise, i.e. if all
 * control points are collinear.
 *
 * Robust: Robust for any bitlength of the given coordinates.
 * @param ps An order 1, 2 or 3 bezier curve.
 */
function isLine(ps) {
    if (ps.length === 2) {
        // Line
        return true;
    }
    if (ps.length === 3) {
        // Quadratic bezier
        return flo_numerical_1.orient2d(ps[0], ps[1], ps[2]) === 0;
    }
    if (ps.length === 4) {
        // Cubic bezier
        return (flo_numerical_1.orient2d(ps[0], ps[1], ps[2]) === 0 &&
            flo_numerical_1.orient2d(ps[1], ps[2], ps[3]) === 0 &&
            // The below check is necessary for if ps[1] === ps[2]
            flo_numerical_1.orient2d(ps[0], ps[2], ps[3]) === 0);
    }
}
exports.isLine = isLine;
/**
 * Returns true if the given bezier degenerates to a horizontal line (possibly
 * self-overlapping)
 * @param ps An order 1, 2 or 3 bezier curve.
 */
function isHorizontalLine(ps) {
    let y = ps[0][1];
    for (let i = 1; i < ps.length; i++) {
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
 * @param ps An order 1, 2 or 3 bezier curve.
 */
function isVerticalLine(ps) {
    let x = ps[0][0];
    for (let i = 1; i < ps.length; i++) {
        if (ps[i][0] !== x) {
            return false;
        }
    }
    return true;
}
exports.isVerticalLine = isVerticalLine;
//# sourceMappingURL=is-line.js.map