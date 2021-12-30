"use strict";
exports.__esModule = true;
exports.getClosestOnBezier1FromPoint = void 0;
function getClosestOnBezier1FromPoint(ps, p) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var xp = p[0], yp = p[1];
    var xx0 = x0 - xp;
    var xx1 = x1 - xp;
    var yy0 = y0 - yp;
    var yy1 = y1 - yp;
    var x01 = xx0 * xx1;
    var y01 = yy0 * yy1;
    var s1 = x01 + y01;
    var s2 = yy0 * yy0 + xx0 * xx0;
    var t1 = (xx1 * xx1 + yy1 * yy1) + (s2 - 2 * s1);
    var t0 = s1 - s2;
    return [t1, t0];
}
exports.getClosestOnBezier1FromPoint = getClosestOnBezier1FromPoint;
