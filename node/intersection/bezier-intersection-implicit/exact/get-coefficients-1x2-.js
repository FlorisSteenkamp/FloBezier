"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x2Exact_ = void 0;
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1-");
const get_xy_1 = require("../../../to-power-basis/get-xy");
const double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qaq = double_double_1.ddAddDd;
function getCoeffs1x2Exact_(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact_(ps1);
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
    return [v2, v1, v0];
}
exports.getCoeffs1x2Exact_ = getCoeffs1x2Exact_;
//# sourceMappingURL=get-coefficients-1x2-.js.map