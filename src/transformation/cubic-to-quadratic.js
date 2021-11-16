"use strict";
exports.__esModule = true;
exports.cubicToQuadratic = void 0;
/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier.
 * * the input and output bezier endpoints will differ in general
 *
 * @param ps - A cubic bezier curve.
 *
 * @doc
 */
function cubicToQuadratic(ps) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    return [
        [(19 / 20) * x0 + (3 / 20) * x1 + (-3 / 20) * x2 + (1 / 20) * x3,
            (19 / 20) * y0 + (3 / 20) * y1 + (-3 / 20) * y2 + (1 / 20) * y3],
        [(-1 / 4) * x0 + (3 / 4) * x1 + (3 / 4) * x2 + (-1 / 4) * x3,
            (-1 / 4) * y0 + (3 / 4) * y1 + (3 / 4) * y2 + (-1 / 4) * y3],
        [(1 / 20) * x0 + (-3 / 20) * x1 + (3 / 20) * x2 + (19 / 20) * x3,
            (1 / 20) * y0 + (-3 / 20) * y1 + (3 / 20) * y2 + (19 / 20) * y3]
    ];
}
exports.cubicToQuadratic = cubicToQuadratic;
