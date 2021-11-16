"use strict";
exports.__esModule = true;
exports.lengthUpperBound = void 0;
var flo_vector2d_1 = require("flo-vector2d");
/**
 * Returns an upper bound for the length of the given bezier curve - this bound
 * is not very strict as it uses the sum of the straight-line distances between
 * control points as a measure.
 *
 * @param ps
 *
 * @doc mdx
 */
function lengthUpperBound(ps) {
    var totalLength = 0;
    for (var i = 0; i < ps.length - 1; i++) {
        totalLength += (0, flo_vector2d_1.distanceBetween)(ps[i], ps[i + 1]);
    }
    return totalLength;
}
exports.lengthUpperBound = lengthUpperBound;
