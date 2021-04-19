"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cubicThroughPointGiven013 = void 0;
/**
 * Generates a cubic bezier curve going through a specific point given control
 * points 0, 1 and 3.
 * @param ps cubic bezier points given as [[x0,y0], [x1,y1], [,], [x3,y3]],
 * e.g. [[1,2], [3,4], ,[5,6]] (note the 3rd point is not given)
 * @param p a point through which the bezier should go
 * @param t a t parameter value at which the bezier should go through the
 * point - this is necessary due to a degree of freedom still left
 *
 * * **non-exact:** the returned bezier does not necessarily go through the
 * point *exactly*.
 */
function cubicThroughPointGiven013(ps, p, t) {
    let [[x0, y0], [x1, y1], [,], [x3, y3]] = ps;
    let [x, y] = p;
    let x2 = (t ** 3 * (-x0 + 3 * x1 + x3) + 3 * t ** 2 * (x0 - 2 * x1) - 3 * t * (x0 - x1) - x + x0) / (3 * t ** 2 * (t - 1));
    let y2 = (t ** 3 * (-y0 + 3 * y1 + y3) + 3 * t ** 2 * (y0 - 2 * y1) - 3 * t * (y0 - y1) - y + y0) / (3 * t ** 2 * (t - 1));
    return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
}
exports.cubicThroughPointGiven013 = cubicThroughPointGiven013;
//# sourceMappingURL=cubic-through-point.js.map