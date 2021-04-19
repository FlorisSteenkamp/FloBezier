"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm1_bitlength16_double = void 0;
const get_xy_1 = require("../../../to-power-basis/get-xy");
/**
 * Returns the implicit form of the given linear bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 16-bit aligned
 * * intermediate calculations are done in double precision and will thus be
 * reflected in the output error bound (which is approximately
 * n * Number.EPSILON * the condition number, where roughly 1 < n < 100 and
 * depends on the specific calculation)
 * * the error bound returned needs first be multiplied by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 */
function getImplicitForm1_bitlength16_double(ps) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    let [[a1, a0], [b1, b0]] = get_xy_1.getXY(ps); // Max bitlength increase = 1
    let vₓ = -b1;
    let vᵧ = a1;
    //let v = a1*b0 - a0*b1;
    let w1 = a1 * b0;
    let w2 = a0 * b1;
    let v = w2 - w1;
    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: {} // vₓ_, vᵧ_, v_ => zero
    };
}
exports.getImplicitForm1_bitlength16_double = getImplicitForm1_bitlength16_double;
//# sourceMappingURL=get-implicit-form1-bitlength16-double.js.map