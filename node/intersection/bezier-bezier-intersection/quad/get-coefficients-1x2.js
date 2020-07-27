"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x2Quad = void 0;
const double_double_1 = require("double-double");
const get_implicit_form1_1 = require("../../../implicit-form/quad/get-implicit-form1");
const get_xy_1 = require("../../../to-power-basis/get-xy");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qaq = double_double_1.ddAddDd;
// TODO - better docs
function getCoeffs1x2Quad(ps1, ps2) {
    let { coeffs: { vₓ, vᵧ, v } // vₓ, vᵧ, v:  48-bit aligned => error free
     } = get_implicit_form1_1.getImplicitForm1Quad(ps1);
    let [[c2, c1, c0], [d2, d1, d0]] = get_xy_1.getXY(ps2);
    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p1 = tp(c2, vₓ); // vₓ is a double => error free
    let p2 = tp(d2, vᵧ); // vᵧ is a double => error free
    let v2 = qaq(p1, p2); // 48-bit aligned => error free
    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p3 = tp(c1, vₓ); // vₓ is a double => error free
    let p4 = tp(d1, vᵧ); // vᵧ is a double => error free
    let v1 = qaq(p3, p4); // 48-bit aligned => error free
    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p5 = tp(c0, vₓ); // vₓ is a double => error free
    let p6 = tp(d0, vᵧ); // vᵧ is a double => error free
    let p7 = qaq(p5, p6); // 48-bit aligned => error free
    let v0 = qaq(p7, v); // 48-bit aligned => error free
    return {
        coeffs: [v2, v1, v0],
        errBound: [0, 0, 0] // 48-bit aligned => completely error free
    };
}
exports.getCoeffs1x2Quad = getCoeffs1x2Quad;
//# sourceMappingURL=get-coefficients-1x2.js.map