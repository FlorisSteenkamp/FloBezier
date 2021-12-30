"use strict";
exports.__esModule = true;
exports.getClosestOnBezier3FromPoint = void 0;
function getClosestOnBezier3FromPoint(ps, p) {
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    //const [xp, yp] = p;
    var p0 = ps[0];
    var p1 = ps[1];
    var p2 = ps[2];
    var p3 = ps[3];
    var x0 = p0[0];
    var y0 = p0[1];
    var x1 = p1[0];
    var y1 = p1[1];
    var x2 = p2[0];
    var y2 = p2[1];
    var x3 = p3[0];
    var y3 = p3[1];
    var xp = p[0];
    var yp = p[1];
    var xx0 = x0 - xp;
    var xx1 = x1 - xp;
    var xx2 = x2 - xp;
    var xx3 = x3 - xp;
    var yy0 = y0 - yp;
    var yy1 = y1 - yp;
    var yy2 = y2 - yp;
    var yy3 = y3 - yp;
    var x00 = xx0 * xx0;
    var x01 = 6 * xx0 * xx1;
    var x02 = 6 * xx0 * xx2;
    var x03 = 2 * xx0 * xx3;
    var x11 = 9 * xx1 * xx1;
    var x12 = 18 * xx1 * xx2;
    var x13 = 6 * xx1 * xx3;
    var x22 = 9 * xx2 * xx2;
    var x23 = 6 * xx2 * xx3;
    var x33 = xx3 * xx3;
    var y00 = yy0 * yy0;
    var y01 = 6 * yy0 * yy1;
    var y02 = 6 * yy0 * yy2;
    var y03 = 2 * yy0 * yy3;
    var y11 = 9 * yy1 * yy1;
    var y12 = 18 * yy1 * yy2;
    var y13 = 6 * yy1 * yy3;
    var y22 = 9 * yy2 * yy2;
    var y23 = 6 * yy2 * yy3;
    var y33 = yy3 * yy3;
    var q1 = x13 + x22;
    var q2 = x03 + x12;
    var q3 = x02 + x11;
    var r1 = y13 + y22;
    var r2 = y03 + y12;
    var r3 = y02 + y11;
    var t5 = 6 * (((((x33 - x23) + (x00 - x01)) + q1) + (q3 - q2)) +
        ((((y33 - y23) + (y00 - y01)) + r1) + (r3 - r2)));
    var t4 = 5 * ((((x23 + 5 * x01) + 3 * q2) - 2 * (q1 + 2 * q3 + 3 * x00)) +
        (((y23 + 5 * y01) + 3 * r2) - 2 * (r1 + 2 * r3 + 3 * y00)));
    var t3 = 4 * (((q1 - 3 * (q2 - 2 * q3)) - 5 * (2 * x01 - 3 * x00)) +
        ((r1 - 3 * (r2 - 2 * r3)) - 5 * (2 * y01 - 3 * y00)));
    var t2 = 3 * ((q2 - 2 * (2 * q3 - 5 * (x01 - 2 * x00))) +
        (r2 - 2 * (2 * r3 - 5 * (y01 - 2 * y00))));
    var t1 = 2 * ((q3 - 5 * (x01 - 3 * x00)) +
        (r3 - 5 * (y01 - 3 * y00)));
    var t0 = ((x01 - 6 * x00) +
        (y01 - 6 * y00));
    return [t5, t4, t3, t2, t1, t0];
}
exports.getClosestOnBezier3FromPoint = getClosestOnBezier3FromPoint;
