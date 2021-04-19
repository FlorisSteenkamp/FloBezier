"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundingBoxTight = void 0;
const flo_memoize_1 = require("flo-memoize");
const flo_vector2d_1 = require("flo-vector2d");
const get_bounding_box_1 = require("./get-bounding-box");
const length_squared_upper_bound_1 = require("../length/length-squared-upper-bound");
const eval_de_casteljau_1 = require("../../local-properties-at-t/t-to-xy/eval-de-casteljau");
/**
 * Returns a **non-certified**, **rotated**, **tight** bounding box of the given
 * order 1, 2 or 3 bezier curve as four ordered points of a rotated rectangle.
 */
const getBoundingBoxTight = flo_memoize_1.memoize(function getBoundingBoxTight(ps) {
    let [xS, yS] = ps[0];
    let [xE, yE] = ps[ps.length - 1];
    let sinθ;
    let cosθ;
    // take care of the case the endpoints are close together
    let len = length_squared_upper_bound_1.lengthSquaredUpperBound(ps);
    if (flo_vector2d_1.squaredDistanceBetween(ps[0], ps[ps.length - 1]) * 2 ** 8 < len) {
        let [xE_, yE_] = eval_de_casteljau_1.evalDeCasteljau(ps, 0.5);
        let hypotenuse = Math.sqrt((xE_ - xS) * (xE_ - xS) + (yE_ - yS) * (yE_ - yS));
        sinθ = (yE_ - yS) / hypotenuse;
        cosθ = (xE_ - xS) / hypotenuse;
    }
    else {
        let hypotenuse = Math.sqrt((xE - xS) * (xE - xS) + (yE - yS) * (yE - yS));
        sinθ = (yE - yS) / hypotenuse;
        cosθ = (xE - xS) / hypotenuse;
    }
    let box = getNormalizedBoundingBox(ps, sinθ, cosθ);
    let [[p0x, p0y], [p1x, p1y]] = box;
    let axisAlignedBox = [
        box[0], [p1x, p0y],
        box[1], [p0x, p1y]
    ];
    let rotate_ = flo_vector2d_1.rotate(sinθ, cosθ);
    return axisAlignedBox.map(p => flo_vector2d_1.translate(ps[0], rotate_(p)));
});
exports.getBoundingBoxTight = getBoundingBoxTight;
/**
 * Helper function. Returns the bounding box of the normalized (i.e. first point
 * moved to origin and rotated so that last point lies on x-axis) given cubic
 * bezier.
 * @ignore
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param sinθ - Sine of angle made by line from first bezier point to
 * last with x-axis.
 * @param cosθ - Cosine of angle made by line from first bezier point
 * to last with x-axis.
 * @returns Bounding box in the form [[minX, minY], [maxX,maxY]
 */
function getNormalizedBoundingBox(ps, sinθ, cosθ) {
    let vectorToOrigin = ps[0].map(x => -x);
    const f = flo_vector2d_1.translate(vectorToOrigin);
    let boundingPs = ps.map(p => flo_vector2d_1.rotate(-sinθ, cosθ, f(p)));
    return get_bounding_box_1.getBoundingBox(boundingPs);
}
//# sourceMappingURL=get-bounding-box-tight.js.map