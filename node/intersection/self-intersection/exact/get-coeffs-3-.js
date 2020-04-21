"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
const get_xy_1 = require("../../../to-power-basis/get-xy");
const tp = flo_numerical_1.twoProduct;
const qdq = flo_numerical_1.qDiffQuad;
const epr = flo_numerical_1.expansionProduct;
const fes = flo_numerical_1.fastExpansionSum;
/**
 * Returns the self-intersection poly to solve of the given cubic bezier curve.
 * see http://www.mare.ee/indrek/misc/2d.pdf
 * * precondition: max 47 bit bit-aligned coefficient bitlength
 * @param ps An order 3 bezier curve.
 */
function getCoeffs3Exact_(ps) {
    let [[a3, a2, a1], [b3, b2, b1]] = get_xy_1.getXY(ps); // 49-bit aligned => error free
    let a2b3 = tp(a2, b3); // => error free
    let a3b2 = tp(a3, b2); // => error free
    let a3b1 = tp(a3, b1); // => error free
    let a1b3 = tp(a1, b3); // => error free
    let a2b1 = tp(a2, b1); // => error free
    let a1b2 = tp(a1, b2); // => error free
    let f4 = qdq(a2b3, a3b2); // 48-bit aligned => error free
    let f5 = qdq(a1b3, a3b1); // 48-bit aligned => error free
    let f6 = qdq(a2b1, a1b2); // 48-bit aligned => error free
    //let u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    let u2 = epr(f4, f4);
    //let u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    let u1 = epr(f4, f5);
    //let u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    let g7 = epr(f4, f6);
    let g9 = epr(f5, f5);
    let u0 = fes(g7, g9);
    // Solve: u2*t**2 + u1*t + u0 = 0
    return [u2, u1, u0];
}
exports.getCoeffs3Exact_ = getCoeffs3Exact_;
//# sourceMappingURL=get-coeffs-3-.js.map