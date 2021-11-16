"use strict";
exports.__esModule = true;
exports.getBoundingBoxTight = void 0;
var flo_vector2d_1 = require("flo-vector2d");
var get_bounding_box_js_1 = require("./get-bounding-box.js");
var length_squared_upper_bound_js_1 = require("../length/length-squared-upper-bound.js");
var eval_de_casteljau_js_1 = require("../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
/**
 * Returns a **non-certified**, **rotated**, **tight** bounding box of the given
 * order 1, 2 or 3 bezier curve as four ordered points of a rotated rectangle.
 * (Each point is given as `[x,y]`)
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function getBoundingBoxTight(ps) {
    var _a = ps[0], xS = _a[0], yS = _a[1];
    var _b = ps[ps.length - 1], xE = _b[0], yE = _b[1];
    var sinθ;
    var cosθ;
    // take care of the case the endpoints are close together
    var len = (0, length_squared_upper_bound_js_1.lengthSquaredUpperBound)(ps);
    if ((0, flo_vector2d_1.squaredDistanceBetween)(ps[0], ps[ps.length - 1]) * Math.pow(2, 8) < len) {
        var _c = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, 0.5), xE_ = _c[0], yE_ = _c[1];
        var hypotenuse = Math.sqrt((xE_ - xS) * (xE_ - xS) + (yE_ - yS) * (yE_ - yS));
        sinθ = (yE_ - yS) / hypotenuse;
        cosθ = (xE_ - xS) / hypotenuse;
    }
    else {
        var hypotenuse = Math.sqrt((xE - xS) * (xE - xS) + (yE - yS) * (yE - yS));
        sinθ = (yE - yS) / hypotenuse;
        cosθ = (xE - xS) / hypotenuse;
    }
    var box = getNormalizedBoundingBox(ps, sinθ, cosθ);
    var _d = box[0], p0x = _d[0], p0y = _d[1], _e = box[1], p1x = _e[0], p1y = _e[1];
    var axisAlignedBox = [
        box[0], [p1x, p0y],
        box[1], [p0x, p1y]
    ];
    var rotate_ = (0, flo_vector2d_1.rotate)(sinθ, cosθ);
    return axisAlignedBox.map(function (p) { return (0, flo_vector2d_1.translate)(ps[0], rotate_(p)); });
}
exports.getBoundingBoxTight = getBoundingBoxTight;
/**
 * Helper function. Returns the bounding box of the normalized (i.e. first point
 * moved to origin and rotated so that last point lies on x-axis) given cubic
 * bezier.
 *
 * * returns the bounding box in the form [[minX, minY], [maxX,maxY]
 *
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param sinθ - Sine of angle made by line from first bezier point to
 * last with x-axis.
 * @param cosθ - Cosine of angle made by line from first bezier point
 * to last with x-axis.
 *
 * @internal
 */
function getNormalizedBoundingBox(ps, sinθ, cosθ) {
    var vectorToOrigin = ps[0].map(function (x) { return -x; });
    var f = (0, flo_vector2d_1.translate)(vectorToOrigin);
    var boundingPs = ps.map(function (p) { return (0, flo_vector2d_1.rotate)(-sinθ, cosθ, f(p)); });
    return (0, get_bounding_box_js_1.getBoundingBox)(boundingPs);
}
