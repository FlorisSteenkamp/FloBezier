"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x3Exact_ = void 0;
const get_implicit_form1_1 = require("../../../implicit-form/exact/get-implicit-form1-");
const flo_numerical_1 = require("flo-numerical");
const get_xy_1 = require("../../../to-power-basis/get-xy");
function getCoeffs1x3Exact_(ps1, ps2) {
    let { vₓ, vᵧ, v } = get_implicit_form1_1.getImplicitForm1Exact_(ps1);
    let [[c3, c2, c1, c0], [d3, d2, d1, d0]] = get_xy_1.getXY(ps2);
    // a3*v_x + b3*v_y
    //let v3 = c3*vₓ + d3*vᵧ;
    let p1 = flo_numerical_1.twoProduct(c3, vₓ); // vₓ is a double => error free
    let p2 = flo_numerical_1.twoProduct(d3, vᵧ); // vᵧ is a double => error free
    let v3 = flo_numerical_1.qAddQuad(p1, p2); // 48-bit aligned => error free
    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p3 = flo_numerical_1.twoProduct(c2, vₓ); // vₓ is a double => error free
    let p4 = flo_numerical_1.twoProduct(d2, vᵧ); // vᵧ is a double => error free
    let v2 = flo_numerical_1.qAddQuad(p3, p4); // 48-bit aligned => error free
    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p5 = flo_numerical_1.twoProduct(c1, vₓ); // vₓ is a double => error free
    let p6 = flo_numerical_1.twoProduct(d1, vᵧ); // vᵧ is a double => error free
    let v1 = flo_numerical_1.qAddQuad(p5, p6); // 48-bit aligned => error free
    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p7 = flo_numerical_1.twoProduct(c0, vₓ); // vₓ is a double => error free
    let p8 = flo_numerical_1.twoProduct(d0, vᵧ); // vᵧ is a double => error free
    let p9 = flo_numerical_1.qAddQuad(p7, p8); // 48-bit aligned => error free
    let v0 = flo_numerical_1.qAddQuad(p9, v); // 48-bit aligned => error free
    return [v3, v2, v1, v0];
}
exports.getCoeffs1x3Exact_ = getCoeffs1x3Exact_;
//# sourceMappingURL=get-coefficients-1x3-.js.map