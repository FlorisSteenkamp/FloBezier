"use strict";
exports.__esModule = true;
exports.cubicThroughPointGiven013 = void 0;
/**
 * Generates and returns a cubic bezier curve going through a specific point
 * given control points 0, 1 and 3.
 * * **non-exact:** the returned bezier does not necessarily go through the
 * point *exactly* (due to floating-point round-off).
 *
 * @param ps cubic bezier points given as `[[x0,y0], [x1,y1], , [x3,y3]]`,
 * e.g. `[[1,2], [3,4], ,[5,6]]` (note the 3rd point is not given)
 * @param p a point through which the bezier should go
 * @param t a t parameter value at which the bezier should go through the
 * point - this is necessary due to a degree of freedom still left
 *
 * @example
 * ```typescript
 * cubicThroughPointGiven013([[1,1], [10.53125,4.8125], ,[18,0.5]], [14.6875,3.34375], 0.75);
 * //=> [[1, 1], [10.53125, 4.8125], [13.26736111111111, 5.784722222222222], [18, 0.5]]
 * ```
 *
 * @doc mdx
 */
function cubicThroughPointGiven013(ps, p, t) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[3], x3 = _c[0], y3 = _c[1];
    var x = p[0], y = p[1];
    var x2 = (Math.pow(t, 3) * (-x0 + 3 * x1 + x3) + 3 * Math.pow(t, 2) * (x0 - 2 * x1) - 3 * t * (x0 - x1) - x + x0) / (3 * Math.pow(t, 2) * (t - 1));
    var y2 = (Math.pow(t, 3) * (-y0 + 3 * y1 + y3) + 3 * Math.pow(t, 2) * (y0 - 2 * y1) - 3 * t * (y0 - y1) - y + y0) / (3 * Math.pow(t, 2) * (t - 1));
    return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
}
exports.cubicThroughPointGiven013 = cubicThroughPointGiven013;
