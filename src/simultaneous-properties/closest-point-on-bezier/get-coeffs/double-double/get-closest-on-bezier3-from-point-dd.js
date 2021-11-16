"use strict";
exports.__esModule = true;
exports.getClosestOnBezier3FromPointDd = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var td = double_double_1.twoDiff;
var qaq = double_double_1.ddAddDd;
var qmd = double_double_1.ddMultDouble2;
var qmq = double_double_1.ddMultDd;
var qm2 = double_double_1.ddMultBy2;
var qm4 = double_double_1.ddMultBy4;
var qmn2 = double_double_1.ddMultByNeg2;
var qdq = double_double_1.ddDiffDd;
/**
 * * **precondition** TODO underflow/overflow
 * @param ps
 * @param p
 */
function getClosestOnBezier3FromPointDd(ps, p) {
    //const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
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
    var x = p[0], y = p[1];
    var xx0 = td(x0, x); // exact
    var xx1 = td(x1, x); // exact
    var xx2 = td(x2, x); // exact
    var xx3 = td(x3, x); // exact
    var yy0 = td(y0, y); // exact
    var yy1 = td(y1, y); // exact
    var yy2 = td(y2, y); // exact
    var yy3 = td(y3, y); // exact
    var x00 = qmq(xx0, xx0);
    var x01 = qmd(6, qmq(xx0, xx1));
    var x02 = qmd(6, qmq(xx0, xx2));
    var x03 = qm2(qmq(xx0, xx3));
    var x11 = qmd(9, qmq(xx1, xx1));
    var x12 = qmd(18, qmq(xx1, xx2));
    var x13 = qmd(6, qmq(xx1, xx3));
    var x22 = qmd(9, qmq(xx2, xx2));
    var x23 = qmd(6, qmq(xx2, xx3));
    var x33 = qmq(xx3, xx3);
    var y00 = qmq(yy0, yy0);
    var y01 = qmd(6, qmq(yy0, yy1));
    var y02 = qmd(6, qmq(yy0, yy2));
    var y03 = qm2(qmq(yy0, yy3));
    var y11 = qmd(9, qmq(yy1, yy1));
    var y12 = qmd(18, qmq(yy1, yy2));
    var y13 = qmd(6, qmq(yy1, yy3));
    var y22 = qmd(9, qmq(yy2, yy2));
    var y23 = qmd(6, qmq(yy2, yy3));
    var y33 = qmq(yy3, yy3);
    var q1 = qaq(x13, x22);
    var q2 = qaq(x03, x12);
    var q3 = qaq(x02, x11);
    var r1 = qaq(y13, y22);
    var r2 = qaq(y03, y12);
    var r3 = qaq(y02, y11);
    // const t5 = 6*(((((x33 - x23) + (x00 - x01)) + q1) + (q3 - q2)) + 
    //               ((((y33 - y23) + (y00 - y01)) + r1) + (r3 - r2)));
    var t5 = qmd(6, qaq(qaq(qaq(qaq(qdq(x33, x23), qdq(x00, x01)), q1), qdq(q3, q2)), qaq(qaq(qaq(qdq(y33, y23), qdq(y00, y01)), r1), qdq(r3, r2))));
    //const t4 = 5*((((x23 + 5*x01) + 3*q2) - 2*(q1 + 2*q3 + 3*x00)) +
    //              (((y23 + 5*y01) + 3*r2) - 2*(r1 + 2*r3 + 3*y00)));
    var t4 = qmd(5, qaq(qdq(qaq(qaq(x23, qmd(5, x01)), qmd(3, q2)), qm2(qaq(qaq(q1, qm2(q3)), qmd(3, x00)))), qdq(qaq(qaq(y23, qmd(5, y01)), qmd(3, r2)), qm2(qaq(qaq(r1, qm2(r3)), qmd(3, y00))))));
    //const t3 = 4*(((q1 - 3*(q2 - 2*q3)) - 5*(2*x01 - 3*x00)) +
    //              ((r1 - 3*(r2 - 2*r3)) - 5*(2*y01 - 3*y00)));
    var t3 = qm4(qaq(qdq(qdq(q1, qmd(3, (qdq(q2, qm2(q3))))), qmd(5, qdq(qm2(x01), qmd(3, x00)))), qdq(qdq(r1, qmd(3, (qdq(r2, qm2(r3))))), qmd(5, qdq(qm2(y01), qmd(3, y00))))));
    //const t2 = 3*((q2 - 2*(2*q3 - 5*(x01 - 2*x00))) +
    //              (r2 - 2*(2*r3 - 5*(y01 - 2*y00))));
    var t2 = qmd(3, qaq(qdq(q2, qm2(qdq(qm2(q3), qmd(5, qdq(x01, qm2(x00)))))), qdq(r2, qm2(qdq(qm2(r3), qmd(5, qdq(y01, qm2(y00))))))));
    //const t1 = 2*((q3 - 5*(x01 - 3*x00)) +
    //              (r3 - 5*(y01 - 3*y00)));
    var t1 = qm2(qaq(qdq(q3, qmd(5, (qdq(x01, qmd(3, x00))))), qdq(r3, qmd(5, (qdq(y01, qmd(3, y00)))))));
    //const t0 = ((x01 - 6*x00) +
    //            (y01 - 6*y00));
    var t0 = qaq(qdq(x01, qmd(6, x00)), qdq(y01, qmd(6, y00)));
    return [t5, t4, t3, t2, t1, t0];
}
exports.getClosestOnBezier3FromPointDd = getClosestOnBezier3FromPointDd;
