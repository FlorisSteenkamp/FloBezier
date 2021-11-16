"use strict";
exports.__esModule = true;
exports.toQuadraticFromCubic = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var big_float_ts_1 = require("big-float-ts");
var sce = big_float_ts_1.scaleExpansion;
var edif = big_float_ts_1.eDiff;
var estimate = big_float_ts_1.eEstimate;
var ts = big_float_ts_1.twoSum;
/**
 * Returns a quadratic closest to the given cubic bezier by taking the midpoint
 * of the moving line of the hybrid quadratic version of the cubic as the
 * new quadratics middle control point.
 * * the resulting quadratic will be exactly the cubic if the cubic is really
 * a quadratic in disguise and the bit-aligned bitlength of the coordinates of
 * the control points <= 52.
 *
 * @param ps a cubic bezier curve.
 *
 * @doc
 */
function toQuadraticFromCubic(ps) {
    // note: if cubic is really a quad then
    // x3 + 3*(x1 - x2) === x0 && 
    // y3 + 3*(y1 - y2) === y0
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    return [
        [x0, y0],
        [
            //[
            //  (3*(x1 + x2) - (x0 + x3)) / 4, 
            //  (3*(y1 + y2) - (y0 + y3)) / 4
            //]
            estimate(edif(sce(ts(x1 / 4, x2 / 4), 3), ts(x0 / 4, x3 / 4))),
            estimate(edif(sce(ts(y1 / 4, y2 / 4), 3), ts(y0 / 4, y3 / 4)))
        ],
        [x3, y3]
    ];
}
exports.toQuadraticFromCubic = toQuadraticFromCubic;
