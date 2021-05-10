"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lengthSquaredUpperBound = void 0;
const flo_vector2d_1 = require("flo-vector2d");
/**
 * Returns an upper bound for the length of the given order 1, 2 or 3 bezier
 * curve.
 *
 * The curve has lenhth 0 iff this bound is zero.
 *
 * This bound is quite loose as it uses the sum of the straight-line distances
 * between control points as a measure.
 * @param ps
 *
 * @doc mdx
 */
function lengthSquaredUpperBound(ps) {
    let totalLength = 0;
    for (let i = 0; i < ps.length - 1; i++) {
        totalLength += flo_vector2d_1.squaredDistanceBetween(ps[i], ps[i + 1]);
    }
    return totalLength;
}
exports.lengthSquaredUpperBound = lengthSquaredUpperBound;
//# sourceMappingURL=length-squared-upper-bound.js.map