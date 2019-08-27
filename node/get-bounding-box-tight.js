"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_memoize_1 = require("flo-memoize");
const flo_vector2d_1 = require("flo-vector2d");
const get_bounding_box_1 = require("./get-bounding-box");
/**
 * Returns the tight bounding box of the given cubic bezier.
 * @returns The tight bounding box of the bezier as four ordered
 * points of a rotated rectangle.
 * TODO - test case of baseLength === 0
 */
let getBoundingBoxTight = flo_memoize_1.memoize(function (ps) {
    let [x0, y0] = ps[0];
    let [xE, yE] = ps[ps.length - 1];
    let baseLength = Math.sqrt((xE - x0) * (xE - x0) + (yE - y0) * (yE - y0));
    let sinθ = (yE - y0) / baseLength;
    let cosθ = (xE - x0) / baseLength;
    let box = getNormalizedBoundingBox(ps, sinθ, cosθ);
    let [[p0x, p0y], [p1x, p1y]] = box;
    let axisAlignedBox = [
        box[0], [p1x, p0y],
        box[1], [p0x, p1y]
    ];
    return flo_vector2d_1.rotateThenTranslatePs(sinθ, cosθ, ps[0], axisAlignedBox);
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
    let boundingPs = flo_vector2d_1.translateThenRotatePs(vectorToOrigin, -sinθ, cosθ, ps);
    return get_bounding_box_1.getBoundingBox(boundingPs);
}
//# sourceMappingURL=get-bounding-box-tight.js.map