"use strict";
exports.__esModule = true;
exports.isQuadFlat = void 0;
var vector = require("flo-vector2d");
var is_quad_obtuse_js_1 = require("./is-quad-obtuse.js");
var eval_de_casteljau_js_1 = require("../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
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
    if ((0, is_quad_obtuse_js_1.isQuadObtuse)(ps)) {
        return false;
    }
    var _a = ps[0], x1 = _a[0], y1 = _a[1], _b = ps[2], x2 = _b[0], y2 = _b[1];
    if (x1 === x2 && y1 === y2) {
        return true;
    }
    var _c = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, 0.5), x0 = _c[0], y0 = _c[1];
    var numerator = Math.pow(((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1), 2);
    var denominator = vector.squaredDistanceBetween(ps[0], ps[2]);
    var dSquared = Math.abs(numerator / denominator);
    return dSquared < Math.pow(tolerance, 2);
}
exports.isQuadFlat = isQuadFlat;
