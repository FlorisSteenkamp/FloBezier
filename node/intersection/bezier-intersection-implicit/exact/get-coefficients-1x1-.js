"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x1Exact_ = void 0;
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1-");
const get_xy_1 = require("../../../to-power-basis/get-xy");
const double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qaq = double_double_1.ddAddDd;
function getCoeffs1x1Exact_(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact_(ps1);
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
    return [v1, v0];
}
exports.getCoeffs1x1Exact_ = getCoeffs1x1Exact_;
//# sourceMappingURL=get-coefficients-1x1-.js.map