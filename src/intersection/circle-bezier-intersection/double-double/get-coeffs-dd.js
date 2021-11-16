"use strict";
exports.__esModule = true;
exports.getCoeffsLinearDd = exports.getCoeffsQuadraticDd = exports.getCoeffsCubicDd = void 0;
var get_xy_dd_js_1 = require("../../../to-power-basis/get-xy/double-double/get-xy-dd.js");
var double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var tp = double_double_1.twoProduct;
var qaq = double_double_1.ddAddDd;
var qm2 = double_double_1.ddMultBy2;
var qmn2 = double_double_1.ddMultByNeg2;
var qdifq = double_double_1.ddDiffDd;
var qmq = double_double_1.ddMultDd;
var qmd = double_double_1.ddMultDouble2;
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * @internal
 */
function getCoeffsCubicDd(circle, ps) {
    var r = circle.radius, _a = circle.center, cx = _a[0], cy = _a[1];
    var _b = (0, get_xy_dd_js_1.getXY3Dd)(ps), _c = _b[0], a3 = _c[0], a2 = _c[1], a1 = _c[2], a0 = _c[3], _d = _b[1], b3 = _d[0], b2 = _d[1], b1 = _d[2], b0 = _d[3];
    // a3*a3 + b3*b3
    var t6 = qaq(qmq(a3, a3), qmq(b3, b3));
    // 2*(a2*a3 + b2*b3)
    var t5 = qm2(qaq(qmq(a2, a3), qmq(b2, b3)));
    // 2*(a1*a3 + b1*b3) + (a2*a2 + b2*b2)
    var t4 = qaq(qm2(qaq(qmq(a1, a3), qmq(b1, b3))), qaq(qmq(a2, a2), qmq(b2, b2)));
    // ((2*a0*a3 + 2*a1*a2) + (2*b0*b3 + 2*b1*b2)) + (-2*a3*cx + -2*b3*cy)
    var t3 = qaq(qaq(qaq(qmd(2 * a0, a3), qmq(qm2(a1), a2)), qaq(qmd(2 * b0, b3), qmq(qm2(b1), b2))), qaq(qmd(-2 * cx, a3), qmd(-2 * cy, b3)));
    // ((2*a0*a2 + 2*b0*b2) + (a1*a1 + b1*b1)) + (-2*a2*cx + -2*b2*cy)
    var t2 = qaq(qaq(qaq(qmd(2 * a0, a2), qmd(2 * b0, b2)), qaq(qmq(a1, a1), qmq(b1, b1))), qaq(qmd(-2 * cx, a2), qmd(-2 * cy, b2)));
    // (2*a0*a1 + 2*b0*b1) - (2*a1*cx + 2*b1*cy)
    var t1 = qdifq(qaq(qmd(2 * a0, a1), qmd(2 * b0, b1)), qaq(qmd(2 * cx, a1), qmd(2 * cy, b1)));
    // - 2*(a0*cx + b0*cy) + (((a0**2 + b0**2) + (cx**2 + cy**2)) - r**2)
    var t0 = qaq(qmn2(qaq(tp(a0, cx), tp(b0, cy))), // -2*(a0*cx + b0*cy)
    qdifq(qaq(qaq(tp(a0, a0), tp(b0, b0)), // a0**2 + b0**2
    qaq(tp(cx, cx), tp(cy, cy)) // cx**2 + cy**2
    ), tp(r, r) // r**2
    ));
    return [t6, t5, t4, t3, t2, t1, t0];
}
exports.getCoeffsCubicDd = getCoeffsCubicDd;
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 *
 * @internal
 */
function getCoeffsQuadraticDd(circle, ps) {
    var r = circle.radius, _a = circle.center, cx = _a[0], cy = _a[1];
    var _b = (0, get_xy_dd_js_1.getXY2Dd)(ps), _c = _b[0], a2 = _c[0], a1 = _c[1], a0 = _c[2], _d = _b[1], b2 = _d[0], b1 = _d[1], b0 = _d[2];
    // a2*a2 + b2*b2
    var t4 = qaq(qmq(a2, a2), qmq(b2, b2));
    // 2*a1*a2 + 2*b1*b2 
    var t3 = qaq(qmq(qm2(a1), a2), qmq(qm2(b1), b2));
    // ((2*a0*a2 + 2*b0*b2) + (a1*a1 + b1*b1)) + (-2*a2*cx + -2*b2*cy)
    var t2 = qaq(qaq(qaq(qmd(2 * a0, a2), qmd(2 * b0, b2)), qaq(qmq(a1, a1), qmq(b1, b1))), qaq(qmd(-2 * cx, a2), qmd(-2 * cy, b2)));
    // (2*a0*a1 + 2*b0*b1) + (-2*a1*cx + -2*b1*cy)
    var t1 = qaq(qaq(qmd(2 * a0, a1), qmd(2 * b0, b1)), qaq(qmd(-2 * cx, a1), qmd(-2 * cy, b1)));
    // ((a0*a0 + b0*b0) + (-2*a0*cx + -2*b0*cy)) + ((cx*cx + cy*cy) - r*r)
    var t0 = qaq(qaq(qaq(tp(a0, a0), tp(b0, b0)), qaq(tp(-2 * a0, cx), tp(-2 * b0, cy))), qdifq(qaq(tp(cx, cx), tp(cy, cy)), tp(r, r)));
    return [t4, t3, t2, t1, t0];
}
exports.getCoeffsQuadraticDd = getCoeffsQuadraticDd;
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 *
 * @internal
 */
function getCoeffsLinearDd(circle, ps) {
    var r = circle.radius, _a = circle.center, cx = _a[0], cy = _a[1];
    var _b = (0, get_xy_dd_js_1.getXY1Dd)(ps), _c = _b[0], a1 = _c[0], a0 = _c[1], _d = _b[1], b1 = _d[0], b0 = _d[1];
    // a1**2 + b1**2
    var t2 = qaq(qmq(a1, a1), qmq(b1, b1));
    // 2*((a0*a1 + b0*b1) - (a1*cx + b1*cy))
    var t1 = qm2(qdifq(qaq(qmd(a0, a1), qmd(b0, b1)), qaq(qmd(cx, a1), qmd(cy, b1))));
    // ((-2*a0*cx + -2*b0*cy) + (a0*a0 + b0*b0)) + ((cx*cx + cy*cy) - r*r)
    var t0 = qaq(qaq(qmn2(qaq(tp(a0, cx), tp(b0, cy))), qaq(tp(a0, a0), tp(b0, b0))), qdifq(qaq(tp(cx, cx), tp(cy, cy)), tp(r, r)));
    return [t2, t1, t0];
}
exports.getCoeffsLinearDd = getCoeffsLinearDd;
