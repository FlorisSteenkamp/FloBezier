"use strict";
exports.__esModule = true;
exports.getClosestOnBezier1FromPointDd = void 0;
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var tp = double_double_1.twoProduct;
var qaq = double_double_1.ddAddDd;
var qmn2 = double_double_1.ddMultByNeg2;
var qdifq = double_double_1.ddDiffDd;
/**
 * * **precondition** TODO underflow/overflow
 * @param ps
 * @param p
 */
function getClosestOnBezier1FromPointDd(ps, p) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var x = p[0], y = p[1];
    var xx0 = x0 - x;
    var xx1 = x1 - x;
    var yy0 = y0 - y;
    var yy1 = y1 - y;
    var x00 = tp(xx0, xx0);
    var x01 = tp(xx0, xx1);
    var x11 = tp(xx1, xx1);
    var y00 = tp(yy0, yy0);
    var y01 = tp(yy0, yy1);
    var y11 = tp(yy1, yy1);
    var s1 = qaq(x01, y01);
    var s2 = qaq(y00, x00);
    //const t1 = (x11 + y11) + (s2 - 2*s1)
    var t1 = qaq(qaq(x11, y11), qaq(s2, qmn2(s1)));
    //const t0 = s1 - s2;
    var t0 = qdifq(s1, s2);
    return [t1, t0];
}
exports.getClosestOnBezier1FromPointDd = getClosestOnBezier1FromPointDd;
