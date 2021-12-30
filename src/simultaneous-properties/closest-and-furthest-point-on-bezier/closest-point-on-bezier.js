"use strict";
exports.__esModule = true;
exports.closestPointOnBezier = void 0;
var get_closest_on_bezier3_from_point_js_1 = require("./get-coeffs/double/get-closest-on-bezier3-from-point.js");
var get_closest_on_bezier2_from_point_js_1 = require("./get-coeffs/double/get-closest-on-bezier2-from-point.js");
var get_closest_on_bezier1_from_point_js_1 = require("./get-coeffs/double/get-closest-on-bezier1-from-point.js");
var flo_vector2d_1 = require("flo-vector2d");
var flo_poly_1 = require("flo-poly");
var eval_de_casteljau_js_1 = require("../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
function closestPointOnBezier(ps, p) {
    var poly;
    if (ps.length === 4) {
        poly = (0, get_closest_on_bezier3_from_point_js_1.getClosestOnBezier3FromPoint)(ps, p);
    }
    else if (ps.length === 3) {
        poly = (0, get_closest_on_bezier2_from_point_js_1.getClosestOnBezier2FromPoint)(ps, p);
    }
    else if (ps.length === 2) {
        poly = (0, get_closest_on_bezier1_from_point_js_1.getClosestOnBezier1FromPoint)(ps, p);
    }
    else {
        // TODO - add case of degenerate point
        throw new Error('The given bezier curve is invalid.');
    }
    var ts = (0, flo_poly_1.allRoots)(poly, 0, 1);
    ts.push(0);
    ts.push(1);
    // Get point with minimum distance
    var minD = Number.POSITIVE_INFINITY;
    var minP = undefined;
    for (var _i = 0, ts_1 = ts; _i < ts_1.length; _i++) {
        var t = ts_1[_i];
        var p_ = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, t);
        var d = (0, flo_vector2d_1.squaredDistanceBetween)(p_, p);
        if (d < minD) {
            minD = d;
            minP = { p: p_, t: t };
        }
    }
    // keep TypeScript happy; `minP` cannot be `undefined` here
    return minP;
}
exports.closestPointOnBezier = closestPointOnBezier;
