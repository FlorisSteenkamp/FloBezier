"use strict";
exports.__esModule = true;
exports.isLineReallyPoint = void 0;
/**
 * Returns true if the given linear bezier curve is really a point.
 *
 * * the required condition is met if: `x0 === x1` and `y0 === y1`
 * * **exact:** for any input
 *
 * @param ps a linear bezier curve
 *
 * @doc mdx
 */
function isLineReallyPoint(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    //if (x0 === x1) && (y0 === y1)
    return (x0 === x1 && y0 === y1);
}
exports.isLineReallyPoint = isLineReallyPoint;
