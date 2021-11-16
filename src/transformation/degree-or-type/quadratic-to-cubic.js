"use strict";
exports.__esModule = true;
exports.quadraticToCubic = void 0;
/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic
 * bezier curves can always be represented by cubics - the converse is false.
 *
 * @param ps a quadratic bezier curve.
 *
 * @internal
 */
function quadraticToCubic(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    return [
        [x0, y0],
        [(1 / 3) * x0 + (2 / 3) * x1, (1 / 3) * y0 + (2 / 3) * y1],
        [(2 / 3) * x1 + (1 / 3) * x2, (2 / 3) * y1 + (1 / 3) * y2],
        [x2, y2]
    ];
}
exports.quadraticToCubic = quadraticToCubic;
