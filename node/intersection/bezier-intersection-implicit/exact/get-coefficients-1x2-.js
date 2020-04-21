"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1-");
const flo_numerical_1 = require("flo-numerical");
const get_xy_1 = require("../../../to-power-basis/get-xy");
function getCoeffs1x2Exact_(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact_(ps1);
    let [[c2, c1, c0], [d2, d1, d0]] = get_xy_1.getXY(ps2);
    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p1 = flo_numerical_1.twoProduct(c2, vₓ); // vₓ is a double => error free
    let p2 = flo_numerical_1.twoProduct(d2, vᵧ); // vᵧ is a double => error free
    let v2 = flo_numerical_1.qAddQuad(p1, p2); // 48-bit aligned => error free
    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p3 = flo_numerical_1.twoProduct(c1, vₓ); // vₓ is a double => error free
    let p4 = flo_numerical_1.twoProduct(d1, vᵧ); // vᵧ is a double => error free
    let v1 = flo_numerical_1.qAddQuad(p3, p4); // 48-bit aligned => error free
    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p5 = flo_numerical_1.twoProduct(c0, vₓ); // vₓ is a double => error free
    let p6 = flo_numerical_1.twoProduct(d0, vᵧ); // vᵧ is a double => error free
    let p7 = flo_numerical_1.qAddQuad(p5, p6); // 48-bit aligned => error free
    let v0 = flo_numerical_1.qAddQuad(p7, v); // 48-bit aligned => error free
    return [v2, v1, v0];
}
exports.getCoeffs1x2Exact_ = getCoeffs1x2Exact_;
//# sourceMappingURL=get-coefficients-1x2-.js.map