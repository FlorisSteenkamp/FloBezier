"use strict";
exports.__esModule = true;
exports.getClosestOnBezier2FromPoint = void 0;
function getClosestOnBezier2FromPoint(ps, p) {
    //const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    //const [xp, yp] = p;
    var p0 = ps[0];
    var p1 = ps[1];
    var p2 = ps[2];
    var x0 = p0[0];
    var y0 = p0[1];
    var x1 = p1[0];
    var y1 = p1[1];
    var x2 = p2[0];
    var y2 = p2[1];
    var xp = p[0];
    var yp = p[1];
    var xx0 = x0 - xp;
    var xx1 = x1 - xp;
    var xx2 = x2 - xp;
    var yy0 = y0 - yp;
    var yy1 = y1 - yp;
    var yy2 = y2 - yp;
    var x00 = xx0 * xx0;
    var x01 = xx0 * xx1;
    var x02 = xx0 * xx2;
    var x11 = xx1 * xx1;
    var x12 = xx1 * xx2;
    var x22 = xx2 * xx2;
    var y00 = yy0 * yy0;
    var y01 = yy0 * yy1;
    var y02 = yy0 * yy2;
    var y11 = yy1 * yy1;
    var y12 = yy1 * yy2;
    var y22 = yy2 * yy2;
    var q1 = y02 + 2 * y11;
    var r1 = x02 + 2 * x11;
    var t3 = ((y22 + y00) + 2 * q1 - 4 * (y12 + y01)) +
        ((x22 + x00) + 2 * r1 - 4 * (x12 + x01));
    var t2 = 3 * (((y12 - q1) + (3 * y01 - y00)) +
        ((x12 - r1) + (3 * x01 - x00)));
    var t1 = (q1 - 3 * (2 * y01 - y00)) +
        (r1 - 3 * (2 * x01 - x00));
    var t0 = (y01 - y00) +
        (x01 - x00);
    return [t3, t2, t1, t0];
}
exports.getClosestOnBezier2FromPoint = getClosestOnBezier2FromPoint;
