"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs1x3 = void 0;
const get_implicit_form1_bitlength45_double_1 = require("../../../../implicit-form/inp-bitlength45/double/get-implicit-form1-bitlength45-double");
const error_analysis_1 = require("../../../../error-analysis/error-analysis");
const get_xy_1 = require("../../../../to-power-basis/get-xy");
const abs = Math.abs;
const γ1 = error_analysis_1.γ(1);
function getCoeffs1x3(ps1, ps2) {
    let { coeffs: { vₓ, vᵧ, v }, errorBound: { v_ } // vₓ_, vᵧ_ === 0
     } = get_implicit_form1_bitlength45_double_1.getImplicitForm1_bitlength45_double(ps1);
    let [[c3, c2, c1, c0], [d3, d2, d1, d0]] = get_xy_1.getXY(ps2);
    // a3*v_x + b3*v_y
    //let v3 = c3*vₓ + d3*vᵧ;
    let p1 = c3 * vₓ; // vₓ_ === 0
    let p1_ = abs(p1);
    let p2 = d3 * vᵧ; // vᵧ_ === 0
    let p2_ = abs(p2);
    let v3 = p1 + p2;
    let v3_ = p1_ + p2_ + abs(v3);
    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p3 = c2 * vₓ;
    let p3_ = abs(p3); // vₓ_ === 0
    let p4 = d2 * vᵧ;
    let p4_ = abs(p4); // vᵧ_ === 0
    let v2 = p3 + p4;
    let v2_ = p3_ + p4_ + abs(v2);
    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p5 = c1 * vₓ;
    let p5_ = abs(p5); // vₓ_ === 0
    let p6 = d1 * vᵧ;
    let p6_ = abs(p6); // vᵧ_ === 0
    let v1 = p5 + p6;
    let v1_ = p5_ + p6_ + abs(v1);
    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p7 = c0 * vₓ;
    let p7_ = abs(p7); // vₓ_ === 0
    let p8 = d0 * vᵧ;
    let p8_ = abs(p8); // vᵧ_ === 0
    let p9 = p7 + p8;
    let p9_ = p7_ + p8_ + abs(p9);
    let v0 = p9 + v;
    let v0_ = p9_ + v_ + abs(v0);
    return {
        coeffs: [v3, v2, v1, v0],
        errBound: [v3_, v2_, v1_, v0_].map(c => γ1 * c)
    };
}
exports.getCoeffs1x3 = getCoeffs1x3;
//# sourceMappingURL=get-coefficients-1x3.js.map