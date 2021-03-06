"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadraticToCubic = void 0;
/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic
 * bezier curves can always be represented by cubics - the converse is false.
 * @param ps a quadratic bezier curve.
 */
function quadraticToCubic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [
        [x0, y0],
        [(1 / 3) * x0 + (2 / 3) * x1, (1 / 3) * y0 + (2 / 3) * y1],
        [(2 / 3) * x1 + (1 / 3) * x2, (2 / 3) * y1 + (1 / 3) * y2],
        [x2, y2]
    ];
}
exports.quadraticToCubic = quadraticToCubic;
//# sourceMappingURL=quadratic-to-cubic.js.map