"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cubicToQuadratic = void 0;
/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier.
 * * the input and output bezier endpoints will differ in general
 * @param ps - A cubic bezier curve.
 */
function cubicToQuadratic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
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
//# sourceMappingURL=cubic-to-quadratic.js.map