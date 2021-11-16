"use strict";
exports.__esModule = true;
exports.flatness = void 0;
var length_upper_bound_js_1 = require("./length/length-upper-bound.js");
var flo_vector2d_1 = require("flo-vector2d");
/**
 * Returns a flatness measure of the given curve - calculated as the total
 * distance between consecutive control points divided by the distance between
 * the endpoints.
 *
 * @param ps An order 1,2 or 3 bezier curve.
 *
 * @doc mdx
 */
function flatness(ps) {
    return (0, length_upper_bound_js_1.lengthUpperBound)(ps) / (0, flo_vector2d_1.distanceBetween)(ps[0], ps[ps.length - 1]);
}
exports.flatness = flatness;
