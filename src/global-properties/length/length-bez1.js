"use strict";
exports.__esModule = true;
exports.lengthBez1 = void 0;
var flo_vector2d_1 = require("flo-vector2d");
/**
 * @param interval
 * @param ps
 *
 * @internal
 */
function lengthBez1(interval, ps) {
    var t1 = interval[0], t2 = interval[1];
    if (t1 === t2) {
        return 0;
    }
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    // Keep line below to ensure zero length curve returns zero!
    if (x0 === x1 && y0 === y1) {
        return 0;
    }
    var p1 = [x0 + t1 * (x1 - x0), y0 + t1 * (y1 - y0)];
    var p2 = [x0 + t2 * (x1 - x0), y0 + t2 * (y1 - y0)];
    return (0, flo_vector2d_1.distanceBetween)(p1, p2);
}
exports.lengthBez1 = lengthBez1;
