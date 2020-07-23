"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQuadraticFromCubic = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const sce = big_float_ts_1.scaleExpansion;
const edif = big_float_ts_1.eDiff;
const estimate = big_float_ts_1.eEstimate;
const ts = big_float_ts_1.twoSum;
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
            estimate(edif(sce(ts(x1 / 4, x2 / 4), 3), ts(x0 / 4, x3 / 4))),
            estimate(edif(sce(ts(y1 / 4, y2 / 4), 3), ts(y0 / 4, y3 / 4)))
        ],
        [x3, y3]
    ];
}
exports.toQuadraticFromCubic = toQuadraticFromCubic;
//# sourceMappingURL=to-quad-from-cubic.js.map