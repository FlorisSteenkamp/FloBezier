"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs2x1 = void 0;
const error_analysis_1 = require("../../../../error-analysis/error-analysis");
const get_xy_1 = require("../../../../to-power-basis/get-xy");
const get_implicit_form2_bitlength45_double_1 = require("../../../../implicit-form/double/get-implicit-form2-bitlength45-double");
const abs = Math.abs;
const γ1 = error_analysis_1.γ(1);
function getCoeffs2x1(ps1, ps2) {
    let { coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v }, errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } } = get_implicit_form2_bitlength45_double_1.getImplicitForm2_bitlength45_double(ps1);
    let _vₓₓ = abs(vₓₓ);
    let _vₓᵧ = abs(vₓᵧ);
    let _vᵧᵧ = abs(vᵧᵧ);
    let [[c1, c0], [d1, d0]] = get_xy_1.getXY(ps2);
    let _c0 = abs(c0);
    let _d0 = abs(d0);
    let _c1 = abs(c1);
    let _d1 = abs(d1);
    let c0d1 = c0 * d1;
    let c1c1 = c1 * c1;
    let d1d1 = d1 * d1;
    let c1d1 = c1 * d1;
    let c0c1 = c0 * c1;
    let d0d1 = d0 * d1;
    let c1d0 = c1 * d0;
    let c0c0 = c0 * c0;
    let c0d0 = c0 * d0;
    let d0d0 = d0 * d0;
    let _c0d1 = abs(c0d1);
    let _c1c1 = abs(c1c1);
    let _d1d1 = abs(d1d1);
    let _c1d1 = abs(c1d1);
    let _c0c1 = abs(c0c1);
    let _d0d1 = abs(d0d1);
    let _c1d0 = abs(c1d0);
    let _c0c0 = abs(c0c0);
    let _c0d0 = abs(c0d0);
    let _d0d0 = abs(d0d0);
    // c1c1*vₓₓ + c1d1*vₓᵧ + d1d1*vᵧᵧ
    let p1 = c1c1 * vₓₓ;
    let p1_ = _c1c1 * (_vₓₓ + vₓₓ_) + abs(p1);
    let p2 = d1d1 * vᵧᵧ;
    let p2_ = _d1d1 * (_vᵧᵧ + vᵧᵧ_) + abs(p2);
    let p3 = c1d1 * vₓᵧ;
    let p3_ = _c1d1 * (_vₓᵧ + vₓᵧ_) + abs(p3);
    let p4 = p1 + p2;
    let p4_ = p1_ + p2_ + abs(p4);
    let v2 = p4 + p3;
    let v2_ = p4_ + p3_ + abs(v2);
    // 2*c0c1*vₓₓ + c0d1*vₓᵧ + c1d0*vₓᵧ + c1*vₓ + 2*d0d1*vᵧᵧ + d1*vᵧ
    //let v1 = 
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) + 
    //    (c0d1 + c1d0)*vₓᵧ + 
    //    c1*vₓ + 
    //    d1*vᵧ
    let p5 = c0c1 * vₓₓ;
    let p5_ = _c0c1 * (_vₓₓ + vₓₓ_) + abs(p5);
    let p6 = d0d1 * vᵧᵧ;
    let p6_ = _d0d1 * (_vᵧᵧ + vᵧᵧ_) + abs(p6);
    let p7 = c0d1 + c1d0;
    let _p7 = abs(p7);
    let p7_ = _c0d1 + _c1d0 + _p7;
    let pn = p7 * vₓᵧ;
    let pn_ = p7_ * _vₓᵧ + _p7 * vₓᵧ_ + _p7;
    let p8 = 2 * (p5 + p6);
    let p8_ = 2 * (p5_ + p6_) + abs(p8);
    let p9 = p8 + pn;
    let p9_ = p8_ + pn_ + abs(p9);
    let pa = c1 * vₓ;
    let pa_ = _c1 * vₓ_ + abs(pa);
    let pb = d1 * vᵧ;
    let pb_ = _d1 * vᵧ_ + abs(pb);
    let pc = pa + pb;
    let pc_ = pa_ + pb_ + abs(pc);
    let v1 = p9 + pc;
    let v1_ = p9_ + pc_ + abs(v1);
    // c0c0*vₓₓ + c0d0*vₓᵧ + c0*vₓ + d0d0*vᵧᵧ + d0*vᵧ + v_0
    let pe = c0c0 * vₓₓ;
    let pe_ = _c0c0 * (_vₓₓ + vₓₓ_) + abs(pe);
    let pf = c0d0 * vₓᵧ;
    let pf_ = _c0d0 * (_vₓᵧ + vₓᵧ_) + abs(pf);
    let pg = d0d0 * vᵧᵧ;
    let pg_ = _d0d0 * (_vᵧᵧ + vᵧᵧ_) + abs(pg);
    let ph = pe + pf;
    let ph_ = pe_ + pf_ + abs(ph);
    let pi = ph + pg;
    let pi_ = ph_ + pg_ + abs(pi);
    let pj = c0 * vₓ;
    let pj_ = _c0 * vₓ_ + abs(pj);
    let pk = d0 * vᵧ;
    let pk_ = _d0 * vᵧ_ + abs(pk);
    let pl = pj + pk;
    let pl_ = pj_ + pk_ + abs(pl);
    let pm = pi + pl;
    let pm_ = pi_ + pl_ + abs(pm);
    let v0 = pm + v;
    let v0_ = pm_ + v_ + abs(v0);
    return {
        coeffs: [v2, v1, v0],
        errBound: [v2_, v1_, v0_].map(c => γ1 * c)
    };
}
exports.getCoeffs2x1 = getCoeffs2x1;
//# sourceMappingURL=get-coefficients-2x1.js.map