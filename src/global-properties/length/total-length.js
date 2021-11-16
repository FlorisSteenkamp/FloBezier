"use strict";
exports.__esModule = true;
exports.totalLength = void 0;
var length_bez1_js_1 = require("./length-bez1.js");
var length_bez2_js_1 = require("./length-bez2.js");
var length_bez3_js_1 = require("./length-bez3.js");
/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified
 * interval calculated using Gaussian Quadrature.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is
 * to be calculated (usually === [0,1]).
 *
 * @doc mdx
 */
function totalLength(ps) {
    if (ps.length === 4) {
        return (0, length_bez3_js_1.lengthBez3)([0, 1], ps);
    }
    if (ps.length === 3) {
        return (0, length_bez2_js_1.lengthBez2)([0, 1], ps);
    }
    if (ps.length === 2) {
        return (0, length_bez1_js_1.lengthBez1)([0, 1], ps);
    }
    if (ps.length === 1) {
        return 0;
    }
    throw new Error('The given bezier curve is invalid.');
}
exports.totalLength = totalLength;
