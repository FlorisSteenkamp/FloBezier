"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm2_bitlength16_double = void 0;
const get_xy_1 = require("../../../to-power-basis/get-xy");
const abs = Math.abs;
/**
 * Returns the implicit form of the given quadratic bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 16-bit aligned
 * * intermediate calculations are done in double precision and will thus be
 * reflected in the output error bound (which is approximately
 * n * Number.EPSILON * the condition number, where roughly 1 < n < 100 and
 * depends on the specific calculation)
 * * the error bound returned first needs to be multiplied by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 */
function getImplicitForm2_bitlength16_double(ps) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    // Bitlength increases = [2,2,0]
    let [[a2, a1, a0], [b2, b1, b0]] = get_xy_1.getXY(ps);
    let a2b1 = a2 * b1; // Max bitlength = 35 = (16+2) + (16+1)
    let a1b2 = a1 * b2; // Max bitlength = 35 = (16+2) + (16+1)
    let a2b0 = a2 * b0; // Max bitlength = 34 = (16+2) + (16+0)
    let a0b2 = a0 * b2; // Max bitlength = 34 = (16+2) + (16+0)
    let a1b0 = a1 * b0; // Max bitlength = 33 = (16+1) + (16+0)
    let a0b1 = a0 * b1; // Max bitlength = 33 = (16+1) + (16+0)
    let a2a2 = a2 * a2; // Max bitlength = 36 = (16+2) + (16+2)
    let a2b2 = a2 * b2; // Max bitlength = 36 = (16+2) + (16+2)
    let b2b2 = b2 * b2; // Max bitlength = 36 = (16+2) + (16+2)
    let q1 = a2b1 - a1b2; // Max bitlength = 36 = 35 + 1
    let q2 = a2b0 - a0b2; // Max bitlength = 35 = 34 + 1
    let q3 = a1b0 - a0b1; // Max bitlength = 34 = 33 + 1
    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + 
    // b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2
    // b2**2*x**2
    // -b2**2 *x**2
    let vₓₓ = -b2b2;
    // -2*a2*b2*x*y
    // 2*a2*b2 *x*y
    let vₓᵧ = 2 * a2b2;
    // a2**2*y**2
    // -a2**2 *y**2 
    let vᵧᵧ = -a2a2;
    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //let vₓ = b1*q1 - 2*b2*q2;
    let w1 = b1 * q1; // Max bitlength = 53 = (16+1) + 36
    let w2 = 2 * b2 * q2; // Max bitlength = 53 = (16+2) + 35
    let vₓ = w1 - w2;
    let vₓ_ = abs(vₓ);
    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    let w3 = 2 * a2 * q2; // Max bitlength = 53 = (16+2) + 35
    let w4 = a1 * q1; // Max bitlength = 53 = (16+1) + 36
    let vᵧ = w3 - w4;
    let vᵧ_ = abs(vᵧ);
    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    let w5 = q1 * q3; // Max bitlength = 53 = 36 + 34
    let w5_ = abs(w5);
    let w6 = q2 * q2; // Max bitlength = 53 = 35 + 35
    let w6_ = abs(w6);
    let v = w5 - w6;
    let v_ = w5_ + w6_ + abs(v);
    return {
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ } // vₓₓ_, vₓᵧ_, vᵧᵧ_  === 0 (error free)
    };
}
exports.getImplicitForm2_bitlength16_double = getImplicitForm2_bitlength16_double;
//# sourceMappingURL=get-implicit-form2-bitlength16-double.js.map