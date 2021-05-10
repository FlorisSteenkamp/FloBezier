"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x1Quad = void 0;
const double_double_1 = require("double-double");
const get_implicit_form1_bitlength45_double_double_1 = require("../../../../implicit-form/double-double/get-implicit-form1-bitlength45-double-double");
const get_xy_1 = require("../../../../to-power-basis/get-xy");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qaq = double_double_1.ddAddDd;
// TODO - better docs
function getCoeffs1x1Quad(ps1, ps2) {
    let { coeffs: { vₓ, vᵧ, v } // vₓ, vᵧ, v:  48-bit aligned => error free
     } = get_implicit_form1_bitlength45_double_double_1.getImplicitForm1_bitlength45_doubleDouble(ps1);
    let [[c1, c0], [d1, d0]] = get_xy_1.getXY(ps2);
    //let v1 = c1*vₓ + d1*vᵧ;
    let p1 = tp(c1, vₓ); // vₓ is a double => error free
    let p2 = tp(d1, vᵧ); // vᵧ is a double => error free
    let v1 = qaq(p1, p2); // 48-bit aligned => error free
    //let v0 = c0*vₓ + d0*vᵧ + v_0;
    let p3 = tp(c0, vₓ); // vₓ is a double => error free
    let p4 = tp(d0, vᵧ); // vᵧ is a double => error free
    let p5 = qaq(p3, p4); // 48-bit aligned => error free
    let v0 = qaq(p5, v); // 48-bit aligned => error free 
    return {
        coeffs: [v1, v0],
        errBound: [0, 0] // 48-bit aligned => completely error free
    };
}
exports.getCoeffs1x1Quad = getCoeffs1x1Quad;
//# sourceMappingURL=get-coefficients-1x1.js.map