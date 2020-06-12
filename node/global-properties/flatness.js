"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatness = void 0;
const length_upper_bound_1 = require("./length/length-upper-bound");
const flo_vector2d_1 = require("flo-vector2d");
/**
 * Returns a flatness measure of the given curve - calculated as the total
 * distance between consecutive control points divided by the distance between
 * the endpoints.
 * @param ps An order 1,2 or 3 bezier curve.
 */
function flatness(ps) {
    return length_upper_bound_1.lengthUpperBound(ps) / flo_vector2d_1.distanceBetween(ps[0], ps[ps.length - 1]);
}
exports.flatness = flatness;
//# sourceMappingURL=flatness.js.map