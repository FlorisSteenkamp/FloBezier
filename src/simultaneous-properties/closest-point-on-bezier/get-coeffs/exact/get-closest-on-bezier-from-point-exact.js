"use strict";
exports.__esModule = true;
exports.getClosestOnBezier1FromPointExact = exports.getClosestOnBezier2FromPointExact = exports.getClosestOnBezier3FromPointExact = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var big_float_ts_1 = require("big-float-ts");
var td = big_float_ts_1.twoDiff;
var emult = big_float_ts_1.eMult;
var sce = big_float_ts_1.scaleExpansion2;
var em2 = big_float_ts_1.eMultBy2;
var emn2 = big_float_ts_1.eMultByNeg2;
var eadd = big_float_ts_1.eAdd;
var ediff = big_float_ts_1.eDiff;
/**
 * Returns the result of multiplying a floating point expansion by 4.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function em4(e) {
    var e_ = [];
    for (var i = 0; i < e.length; i++) {
        e_.push(4 * e[i]);
    }
    return e_;
}
/**
 *  * TODO - not really tangent??, but closest?
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier at `t`.
 * * **precondition** TODO - underflow/overflow (106 bits - see experiments-new)
 * * if the coefficients of the curve and point is bit-aligned bitlength <= 46
 * then the resulting coefficients are guaranteed to have max bitlength 106 (so it
 * can fit in a double-double)
 *
 * @param ps
 * @param p
 */
function getClosestOnBezier3FromPointExact(ps, p) {
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
    var xx0 = td(x0, x);
    var xx1 = td(x1, x);
    var xx2 = td(x2, x);
    var xx3 = td(x3, x);
    var yy0 = td(y0, y);
    var yy1 = td(y1, y);
    var yy2 = td(y2, y);
    var yy3 = td(y3, y);
    var x00 = emult(xx0, xx0);
    var x01 = sce(6, emult(xx0, xx1));
    var x02 = sce(6, emult(xx0, xx2));
    var x03 = em2(emult(xx0, xx3));
    var x11 = sce(9, emult(xx1, xx1));
    var x12 = sce(18, emult(xx1, xx2));
    var x13 = sce(6, emult(xx1, xx3));
    var x22 = sce(9, emult(xx2, xx2));
    var x23 = sce(6, emult(xx2, xx3));
    var x33 = emult(xx3, xx3);
    var y00 = emult(yy0, yy0);
    var y01 = sce(6, emult(yy0, yy1));
    var y02 = sce(6, emult(yy0, yy2));
    var y03 = em2(emult(yy0, yy3));
    var y11 = sce(9, emult(yy1, yy1));
    var y12 = sce(18, emult(yy1, yy2));
    var y13 = sce(6, emult(yy1, yy3));
    var y22 = sce(9, emult(yy2, yy2));
    var y23 = sce(6, emult(yy2, yy3));
    var y33 = emult(yy3, yy3);
    var q1 = eadd(x13, x22);
    var q2 = eadd(x03, x12);
    var q3 = eadd(x02, x11);
    var r1 = eadd(y13, y22);
    var r2 = eadd(y03, y12);
    var r3 = eadd(y02, y11);
    //const t5 = 6*((x33 - x23 + q1 - q2 + q3 - x01 + x00) + 
    //              (y33 - y23 + r1 - r2 + r3 - y01 + y00));
    var t5a = ediff(eadd(eadd(x33, x00), eadd(q1, q3)), (eadd(eadd(q2, x23), x01)));
    var t5b = ediff(eadd(eadd(y33, y00), eadd(r1, r3)), (eadd(eadd(r2, y23), y01)));
    var t5 = sce(6, eadd(t5a, t5b));
    //const t4 = 5*((x23 - 2*(q1 + 2*q3 + 3*x00) + 3*q2 + 5*x01) +
    //              (y23 - 2*(r1 + 2*r3 + 3*y00) + 3*r2 + 5*y01));
    var t4a = eadd(emn2(eadd(eadd(q1, em2(q3)), sce(3, x00))), eadd(eadd(x23, sce(3, q2)), sce(5, x01)));
    var t4b = eadd(emn2(eadd(eadd(r1, em2(r3)), sce(3, y00))), eadd(eadd(y23, sce(3, r2)), sce(5, y01)));
    var t4 = sce(5, eadd(t4a, t4b));
    //const t3 = 4*((q1 - 3*(q2 - 2*q3) - 5*(2*x01 - 3*x00)) +
    //              (r1 - 3*(r2 - 2*r3) - 5*(2*y01 - 3*y00)));
    var t3a = eadd(eadd(q1, sce(3, (ediff(em2(q3), q2)))), sce(5, (ediff(sce(3, x00), em2(x01)))));
    var t3b = eadd(eadd(r1, sce(3, (ediff(em2(r3), r2)))), sce(5, (ediff(sce(3, y00), em2(y01)))));
    var t3 = sce(4, eadd(t3a, t3b));
    //const t2 = 3*((q2 - 2*(2*q3 - 5*(x01 - 2*x00))) +
    //              (r2 - 2*(2*r3 - 5*(y01 - 2*y00))));
    var t2a = ediff(q2, em2(ediff(em2(q3), sce(5, (ediff(x01, em2(x00)))))));
    var t2b = ediff(r2, em2(ediff(em2(r3), sce(5, (ediff(y01, em2(y00)))))));
    var t2 = sce(3, eadd(t2a, t2b));
    //const t1 = 2*((q3 - 5*(x01 - 3*x00)) +
    //              (r3 - 5*(y01 - 3*y00)));
    var t1a = ediff(q3, sce(5, (ediff(x01, sce(3, x00)))));
    var t1b = ediff(r3, sce(5, (ediff(y01, sce(3, y00)))));
    var t1 = em2(eadd(t1a, t1b));
    //const t0 = ((x01 - 6*x00) +
    //            (y01 - 6*y00));
    var t0a = ediff(x01, sce(6, x00));
    var t0b = ediff(y01, sce(6, y00));
    var t0 = eadd(t0a, t0b);
    return [t5, t4, t3, t2, t1, t0];
}
exports.getClosestOnBezier3FromPointExact = getClosestOnBezier3FromPointExact;
/**
 * * **precondition** TODO underflow/overflow
 * @param ps
 * @param p
 */
function getClosestOnBezier2FromPointExact(ps, p) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var x = p[0], y = p[1];
    var xx0 = td(x0, x);
    var xx1 = td(x1, x);
    var xx2 = td(x2, x);
    var yy0 = td(y0, y);
    var yy1 = td(y1, y);
    var yy2 = td(y2, y);
    var x00 = emult(xx0, xx0);
    var x01 = emult(xx0, xx1);
    var x02 = emult(xx0, xx2);
    var x11 = emult(xx1, xx1);
    var x12 = emult(xx1, xx2);
    var x22 = emult(xx2, xx2);
    var y00 = emult(yy0, yy0);
    var y01 = emult(yy0, yy1);
    var y02 = emult(yy0, yy2);
    var y11 = emult(yy1, yy1);
    var y12 = emult(yy1, yy2);
    var y22 = emult(yy2, yy2);
    var q1 = eadd(y02, em2(y11));
    var r1 = eadd(x02, em2(x11));
    //const t3 = y22 + 2*q1 - 4*(y12 + y01) + y00 + 
    //           x22 + 2*r1 - 4*(x12 + x01) + x00;
    var t3a = eadd(ediff(eadd(x22, em2(r1)), em4(eadd(x12, x01))), x00);
    var t3b = eadd(ediff(eadd(y22, em2(q1)), em4(eadd(y12, y01))), y00);
    var t3 = eadd(t3a, t3b);
    //const t2 = 3*(y12 - q1 + 3*y01 - y00 + 
    //              x12 - r1 + 3*x01 - x00);
    var t2a = eadd(ediff(x12, r1), ediff(sce(3, x01), x00));
    var t2b = eadd(ediff(y12, q1), ediff(sce(3, y01), y00));
    var t2 = sce(3, eadd(t2a, t2b));
    //const t1 = q1 - 3*(2*y01 - y00) + 
    //           r1 - 3*(2*x01 - x00);
    var t1a = ediff(q1, sce(3, ediff(em2(y01), y00)));
    var t1b = ediff(r1, sce(3, ediff(em2(x01), x00)));
    var t1 = eadd(t1a, t1b);
    //const t0 = y01 - y00 + 
    //           x01 - x00;
    var t0a = ediff(y01, y00);
    var t0b = ediff(x01, x00);
    var t0 = eadd(t0a, t0b);
    return [t3, t2, t1, t0];
}
exports.getClosestOnBezier2FromPointExact = getClosestOnBezier2FromPointExact;
/**
 * * **precondition** TODO underflow/overflow
 * @param ps
 * @param p
 */
function getClosestOnBezier1FromPointExact(ps, p) {
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1];
    var x = p[0], y = p[1];
    var xx0 = td(x0, x);
    var xx1 = td(x1, x);
    var yy0 = td(y0, y);
    var yy1 = td(y1, y);
    var x00 = emult(xx0, xx0);
    var x01 = emult(xx0, xx1);
    var x11 = emult(xx1, xx1);
    var y00 = emult(yy0, yy0);
    var y01 = emult(yy0, yy1);
    var y11 = emult(yy1, yy1);
    var s1 = eadd(x01, y01);
    var s2 = eadd(y00, x00);
    //const t1 = x11 + y11 - 2*s1 + s2;
    var t1 = eadd(eadd(x11, y11), eadd(emn2(s1), s2));
    //const t0 = s1 - s2;
    var t0 = ediff(s1, s2);
    return [t1, t0];
}
exports.getClosestOnBezier1FromPointExact = getClosestOnBezier1FromPointExact;
