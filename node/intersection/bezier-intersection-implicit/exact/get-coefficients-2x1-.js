"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_implicit_form2_1 = require("../../../implicit-form/exact/get-implicit-form2-");
const flo_numerical_1 = require("flo-numerical");
const get_xy_1 = require("../../../to-power-basis/get-xy");
const qaq = flo_numerical_1.qAddQuad;
const sce = flo_numerical_1.scaleExpansion2;
const epr = flo_numerical_1.expansionProduct;
const fes = flo_numerical_1.fastExpansionSum;
const em2 = flo_numerical_1.eMultBy2;
function getCoeffs2x1Exact_(ps1, ps2) {
    let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = get_implicit_form2_1.getImplicitForm2Exact_(ps1);
    let [[c1, c0], [d1, d0]] = get_xy_1.getXY(ps2);
    let c0c0 = flo_numerical_1.twoProduct(c0, c0);
    let c0c1 = flo_numerical_1.twoProduct(c0, c1);
    let c0d0 = flo_numerical_1.twoProduct(c0, d0);
    let c0d1 = flo_numerical_1.twoProduct(c0, d1);
    let c1c1 = flo_numerical_1.twoProduct(c1, c1);
    let c1d0 = flo_numerical_1.twoProduct(c1, d0);
    let c1d1 = flo_numerical_1.twoProduct(c1, d1);
    let d0d0 = flo_numerical_1.twoProduct(d0, d0);
    let d0d1 = flo_numerical_1.twoProduct(d0, d1);
    let d1d1 = flo_numerical_1.twoProduct(d1, d1);
    // a1**2*vₓₓ + a1*b1*vₓᵧ + b1**2*vᵧᵧ
    let p1 = epr(c1c1, vₓₓ);
    let p2 = epr(d1d1, vᵧᵧ);
    let p3 = epr(c1d1, vₓᵧ);
    let p4 = fes(p1, p2);
    let v2 = fes(p4, p3);
    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*vₓ + 2*b0*b1*vᵧᵧ + b1*vᵧ
    let p5 = epr(c0c1, vₓₓ);
    let p6 = epr(d0d1, vᵧᵧ);
    let p7 = qaq(c0d1, c1d0); // 48-bit aligned => error free
    let pn = epr(p7, vₓᵧ);
    let p8 = em2(fes(p5, p6));
    let p9 = fes(p8, pn);
    let pa = sce(c1, vₓ);
    let pb = sce(d1, vᵧ);
    let pc = fes(pa, pb);
    let v1 = fes(p9, pc);
    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*vₓ + b0**2*vᵧᵧ + b0*vᵧ + v_0
    let pe = epr(c0c0, vₓₓ);
    let pf = epr(c0d0, vₓᵧ);
    let pg = epr(d0d0, vᵧᵧ);
    let ph = fes(pe, pf);
    let pi = fes(ph, pg);
    let pj = sce(c0, vₓ);
    let pk = sce(d0, vᵧ);
    let pl = fes(pj, pk);
    let pm = fes(pi, pl);
    let v0 = fes(pm, v);
    return [v2, v1, v0];
}
exports.getCoeffs2x1Exact_ = getCoeffs2x1Exact_;
//# sourceMappingURL=get-coefficients-2x1-.js.map