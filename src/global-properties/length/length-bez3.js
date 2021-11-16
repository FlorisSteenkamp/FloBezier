"use strict";
exports.__esModule = true;
exports.lengthBez3 = void 0;
var ds_js_1 = require("../../local-properties-at-t/ds.js");
var flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
/**
 * Returns the curve length in the specified interval.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is to be
 * calculated (often === [0,1]).
 *
 * @internal
 */
function lengthBez3(interval, ps) {
    if (interval[0] === interval[1]) {
        return 0;
    }
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    // Keep line below to ensure zero length curve returns zero!
    if (x0 === x1 && x1 === x2 && x2 === x3 &&
        y0 === y1 && y1 === y2 && y2 === y3) {
        return 0;
    }
    var evDs = (0, ds_js_1.ds)(ps);
    return (0, flo_gauss_quadrature_1.gaussQuadrature)(evDs, interval);
}
exports.lengthBez3 = lengthBez3;
