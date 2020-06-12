"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffsLinearQuad = exports.getCoeffsQuadraticQuad = exports.getCoeffsCubicQuad = void 0;
const flo_numerical_1 = require("flo-numerical");
const get_xy_1 = require("../../../to-power-basis/get-xy");
const tp = flo_numerical_1.twoProduct;
const qaq = flo_numerical_1.qAddQuad;
const qm2 = flo_numerical_1.qMultBy2;
const qmn2 = flo_numerical_1.qMultByNeg2;
const qdifq = flo_numerical_1.qDiffQuad;
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 * @param circle a circle
 * @param ps a cubic bezier curve
 */
function getCoeffsCubicQuad(circle, ps) {
    let { radius: r, center: [cx, cy] } = circle;
    let [[a3, a2, a1, a0], [b3, b2, b1, b0]] = get_xy_1.getXY(ps); // exact if bitlength <= 49
    // bitlength 48 -> saves 2 bits -> 1-4 summands
    // bitlength 47 -> saves 4 bits -> 5-16 summands
    // bitlength 46 -> saves 6 bits -> 17-64 summands
    // (a3**2 + b3**2)*t**6 + 
    let t6 = qaq(tp(a3, a3), tp(b3, b3)); // exact if bitlength <= 48 - 2 summands
    // (2*a2*a3 + 2*b2*b3)*t**5 + 
    let t5 = qm2(qaq(tp(a2, a3), tp(b2, b3))); // exact if bitlength <= 48 - 2 summands
    // (2*a1*a3 + a2*a2 + 2*b1*b3 + b2*b2)*t**4 + 
    let t4 = qaq(qm2(qaq(tp(a1, a3), tp(b1, b3))), qaq(tp(a2, a2), tp(b2, b2))); // exact if bitlength <= 47 - 6 summands
    // (2*a0*a3 + 2*a1*a2 - 2*a3*cx + 2*b0*b3 + 2*b1*b2 - 2*b3*cy)*t**3 + 
    let t3 = qm2(qdifq(qaq(qaq(tp(a0, a3), tp(a1, a2)), qaq(tp(b0, b3), tp(b1, b2))), (qaq(tp(a3, cx), tp(b3, cy))))); // exact if bitlength <= 47 - 6 summands
    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    let t2 = qaq(qm2(qdifq(qaq(tp(a0, a2), tp(b0, b2)), (qaq(tp(a2, cx), tp(b2, cy))))), qaq(tp(a1, a1), tp(b1, b1))); // exact if bitlength <= 47 - 10 summands
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = qm2(qdifq(qaq(tp(a0, a1), tp(b0, b1)), (qaq(tp(a1, cx), tp(b1, cy))))); // exact if bitlength <= 48 - 4 summands
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    let t0 = qaq(qmn2(qaq(tp(a0, cx), tp(b0, cy))), qdifq(qaq(qaq(tp(a0, a0), tp(b0, b0)), qaq(tp(cx, cx), tp(cy, cy))), tp(r, r))); // exact if bitlength <= 47 - 9 summands
    return [t6, t5, t4, t3, t2, t1, t0];
}
exports.getCoeffsCubicQuad = getCoeffsCubicQuad;
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
function getCoeffsQuadraticQuad(circle, ps) {
    let { radius: r, center: [cx, cy] } = circle;
    let [[a2, a1, a0], [b2, b1, b0]] = get_xy_1.getXY(ps); // exact if bitlength <= 49
    // (a2*a2 + b2*b2)*t**4 + 
    let t4 = qaq(tp(a2, a2), tp(b2, b2)); // exact if bitlength <= 48 - 2 summands
    // (2*a1*a2 + 2*b1*b2)*t**3 + 
    let t3 = qm2(qaq(tp(a1, a2), tp(b1, b2))); // exact if bitlength <= 48 - 2 summands
    // (2*a0*a2 + a1*a1 - 2*a2*cx + 2*b0*b2 + b1*b1 - 2*b2*cy)*t**2 + 
    let t2 = qaq(qm2(qdifq(qaq(tp(a0, a2), tp(b0, b2)), (qaq(tp(a2, cx), tp(b2, cy))))), qaq(tp(a1, a1), tp(b1, b1))); // exact if bitlength <= 47 - 10 summands
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = qm2(qdifq(qaq(tp(a0, a1), tp(b0, b1)), (qaq(tp(a1, cx), tp(b1, cy))))); // exact if bitlength <= 48 - 4 summands
    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    let t0 = qaq(qmn2(qaq(tp(a0, cx), tp(b0, cy))), qdifq(qaq(qaq(tp(a0, a0), tp(b0, b0)), qaq(tp(cx, cx), tp(cy, cy))), tp(r, r))); // exact if bitlength <= 47 - 9 summands
    return [t4, t3, t2, t1, t0];
}
exports.getCoeffsQuadraticQuad = getCoeffsQuadraticQuad;
/**
 * * **precondition** bit-algined bitlength of coefficients <= 47
 * @param circle a circle
 * @param ps a linear bezier curve
 */
function getCoeffsLinearQuad(circle, ps) {
    let { radius: r, center: [cx, cy] } = circle;
    let [[a1, a0], [b1, b0]] = get_xy_1.getXY(ps); // exact if bitlength <= 49
    // (a1**2 + b1**2)*t**2 +
    let t2 = qaq(tp(a1, a1), tp(b1, b1)); // exact if bitlength <= 48 - 2 summands
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    let t1 = qm2(qdifq(qaq(tp(a0, a1), tp(b0, b1)), (qaq(tp(a1, cx), tp(b1, cy))))); // exact if bitlength <= 48 - 4 summands
    // a0*a0 - 2*a0*cx + b0*b0 - 2*b0*cy + cx*cx + cy*cy - r*r
    let t0 = qaq(qmn2(qaq(tp(a0, cx), tp(b0, cy))), qdifq(qaq(qaq(tp(a0, a0), tp(b0, b0)), qaq(tp(cx, cx), tp(cy, cy))), tp(r, r))); // exact if bitlength <= 47 - 9 summands
    return [t2, t1, t0];
}
exports.getCoeffsLinearQuad = getCoeffsLinearQuad;
//# sourceMappingURL=get-coeffs-quad.js.map