"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQuadraticFromCubic = void 0;
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns a quadratic closest to the given cubic bezier by taking the midpoint
 * of the moving line of the hybrid quadratic version of the cubic as the
 * new quadratics middle control point.
 * * the resulting quadratic will be exactly the cubic if the cubic is really
 * a quadratic in disguise and the bit-aligned bitlength of the coordinates of
 * the control points <= 52.
 * @param ps a cubic bezier curve.
 */
function toQuadraticFromCubic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [
        [x0, y0],
        [
            //[(3*(x1+x2) - (x0+x3)) / 4, 
            //(3*(y1+y2) - (y0+y3)) / 4]
            flo_numerical_1.estimate(flo_numerical_1.expansionDiff(flo_numerical_1.scaleExpansion(flo_numerical_1.twoSum(x1 / 4, x2 / 4), 3), flo_numerical_1.twoSum(x0 / 4, x3 / 4))),
            flo_numerical_1.estimate(flo_numerical_1.expansionDiff(flo_numerical_1.scaleExpansion(flo_numerical_1.twoSum(y1 / 4, y2 / 4), 3), flo_numerical_1.twoSum(y0 / 4, y3 / 4)))
        ],
        [x3, y3]
    ];
}
exports.toQuadraticFromCubic = toQuadraticFromCubic;
//# sourceMappingURL=to-quad-from-cubic.js.map