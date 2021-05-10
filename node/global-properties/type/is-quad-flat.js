"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQuadFlat = void 0;
const vector = require("flo-vector2d");
const is_quad_obtuse_1 = require("./is-quad-obtuse");
const eval_de_casteljau_1 = require("../../local-properties-at-t/t-to-xy/eval-de-casteljau");
/**
 * Returns true if the given quadratic bezier curve is acute (see isQuadObtuse)
 * and can be approximated with a line segment with maximum Hausdorff distance
 * <= the given tolerance.
 *
 * @param ps A quadratic bezier curve.
 *
 * @internal
 */
function isQuadFlat(ps, tolerance) {
    if (is_quad_obtuse_1.isQuadObtuse(ps)) {
        return false;
    }
    let [[x1, y1], , [x2, y2]] = ps;
    if (x1 === x2 && y1 === y2) {
        return true;
    }
    let [x0, y0] = eval_de_casteljau_1.evalDeCasteljau(ps, 0.5);
    let numerator = ((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) ** 2;
    let denominator = vector.squaredDistanceBetween(ps[0], ps[2]);
    let dSquared = Math.abs(numerator / denominator);
    return dSquared < tolerance ** 2;
}
exports.isQuadFlat = isQuadFlat;
//# sourceMappingURL=is-quad-flat.js.map