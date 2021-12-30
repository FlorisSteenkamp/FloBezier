"use strict";
exports.__esModule = true;
exports.getClosestOnBezier2FromPointDd = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var td = double_double_1.twoDiff;
var qaq = double_double_1.ddAddDd;
var qmd = double_double_1.ddMultDouble2;
var qmq = double_double_1.ddMultDd;
var qm2 = double_double_1.ddMultBy2;
var qdifq = double_double_1.ddDiffDd;
var qm4 = double_double_1.ddMultBy4;
/**
 * * **precondition** TODO - overflow/underflow
 * @param ps
 * @param p
 */
function getClosestOnBezier2FromPointDd(ps, p) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var x = p[0], y = p[1];
    var xx0 = td(x0, x);
    var xx1 = td(x1, x);
    var xx2 = td(x2, x);
    var yy0 = td(y0, y);
    var yy1 = td(y1, y);
    var yy2 = td(y2, y);
    var x00 = qmq(xx0, xx0);
    var x01 = qmq(xx0, xx1);
    var x02 = qmq(xx0, xx2);
    var x11 = qmq(xx1, xx1);
    var x12 = qmq(xx1, xx2);
    var x22 = qmq(xx2, xx2);
    var y00 = qmq(yy0, yy0);
    var y01 = qmq(yy0, yy1);
    var y02 = qmq(yy0, yy2);
    var y11 = qmq(yy1, yy1);
    var y12 = qmq(yy1, yy2);
    var y22 = qmq(yy2, yy2);
    var q1 = qaq(y02, qm2(y11));
    var r1 = qaq(x02, qm2(x11));
    //const t3 = ((y22 + y00) + 2*q1 - 4*(y12 + y01)) + 
    //           ((x22 + x00) + 2*r1 - 4*(x12 + x01));
    var t3 = qaq(qdifq(qaq(qaq(y22, y00), qm2(q1)), qm4(qaq(y12, y01))), qdifq(qaq(qaq(x22, x00), qm2(r1)), qm4(qaq(x12, x01))));
    //const t2 = 3*(((y12 - q1) + (3*y01 - y00)) + 
    //              ((x12 - r1) + (3*x01 - x00)));
    var t2 = qmd(3, qaq(qaq(qdifq(y12, q1), qdifq(qmd(3, y01), y00)), qaq(qdifq(x12, r1), qdifq(qmd(3, x01), x00))));
    //const t1 = (q1 - 3*(2*y01 - y00)) + 
    //           (r1 - 3*(2*x01 - x00));
    var t1 = qaq(qdifq(q1, qmd(3, qdifq(qm2(y01), y00))), qdifq(r1, qmd(3, qdifq(qm2(x01), x00))));
    //const t0 = (y01 - y00) + 
    //           (x01 - x00);
    var t0 = qaq(qdifq(y01, y00), qdifq(x01, x00));
    return [t3, t2, t1, t0];
}
exports.getClosestOnBezier2FromPointDd = getClosestOnBezier2FromPointDd;
