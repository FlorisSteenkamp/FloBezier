"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm2Exact = void 0;
const get_x_1 = require("../../to-power-basis/get-x");
const get_y_1 = require("../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the exact implicit form of the given quadratic bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function getImplicitForm2Exact(ps) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    let [a2, a1, a0] = get_x_1.getXExact(ps);
    let [b2, b1, b0] = get_y_1.getYExact(ps);
    // b2**2*x**2
    let vₓₓ = flo_numerical_1.expansionProduct(b2, b2);
    // -2*a2*b2*x*y
    let vₓᵧ = flo_numerical_1.calculateProduct([[-2], a2, b2]);
    // a2**2*y**2
    let vᵧᵧ = flo_numerical_1.expansionProduct(a2, a2);
    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    let vₓ = flo_numerical_1.calculate([
        [[-2], a0, b2, b2], [a1, b1, b2],
        [[2], a2, b0, b2], [[-1], a2, b1, b1]
    ]);
    // 2*a0*a2*b2 - a1**2*b2 + 
    // a1*a2*b1 - 2*a2**2*b0
    let vᵧ = flo_numerical_1.calculate([
        [[2], a0, a2, b2], [[-1], a1, a1, b2],
        [a1, a2, b1], [[-2], a2, a2, b0]
    ]);
    // a0**2*b2**2 - a0*a1*b1*b2 
    // - 2*a0*a2*b0*b2 + a0*a2*b1**2 + 
    // a1**2*b0*b2 - a1*a2*b0*b1 + 
    // a2**2*b0**2
    let v = flo_numerical_1.calculate([
        [a0, a0, b2, b2], [[-1], a0, a1, b1, b2],
        [[-2], a0, a2, b0, b2], [a0, a2, b1, b1],
        [a1, a1, b0, b2], [[-1], a1, a2, b0, b1],
        [a2, a2, b0, b0],
    ]);
    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}
exports.getImplicitForm2Exact = getImplicitForm2Exact;
//# sourceMappingURL=get-implicit-form2.js.map