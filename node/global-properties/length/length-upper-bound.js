"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_vector2d_1 = require("flo-vector2d");
/**
 * Returns an upper bound for the length of the given bezier curve - this bound
 * is not very strict as it uses the sum of the straight-line distances between
 * control points as a measure.
 * @param ps
 */
function lengthUpperBound(ps) {
    let totalLength = 0;
    for (let i = 0; i < ps.length - 1; i++) {
        totalLength += flo_vector2d_1.distanceBetween(ps[i], ps[i + 1]);
    }
    return totalLength;
}
exports.lengthUpperBound = lengthUpperBound;
//# sourceMappingURL=length-upper-bound.js.map