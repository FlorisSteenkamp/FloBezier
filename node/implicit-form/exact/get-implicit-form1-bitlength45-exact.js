"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm1_bitlength45_exact = void 0;
const double_double_1 = require("double-double");
const get_xy_1 = require("../../to-power-basis/get-xy");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qdq = double_double_1.ddDiffDd;
/**
 * Returns the exact implicit form of the given linear bezier.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 48-bit aligned
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc
 */
function getImplicitForm1_bitlength45_exact(ps) {
    let [[a1, a0], [b1, b0]] = get_xy_1.getXY(ps);
    let vₓ = -b1;
    let vᵧ = a1;
    let v = qdq(tp(a0, b1), tp(a1, b0)); // 48-bit aligned => error free
    return { vₓ, vᵧ, v };
}
exports.getImplicitForm1_bitlength45_exact = getImplicitForm1_bitlength45_exact;
//# sourceMappingURL=get-implicit-form1-bitlength45-exact.js.map