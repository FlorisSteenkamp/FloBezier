"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs2x3Exact = void 0;
const big_float_ts_1 = require("big-float-ts");
const double_double_1 = require("double-double");
const get_implicit_form2_bitlength45_exact_1 = require("../../../../implicit-form/inp-bitlength45/exact/get-implicit-form2-bitlength45-exact");
const get_xy_1 = require("../../../../to-power-basis/get-xy");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qaq = double_double_1.ddAddDd;
const qm2 = double_double_1.ddMultBy2;
const sce = big_float_ts_1.scaleExpansion2;
const epr = big_float_ts_1.expansionProduct;
const fes = big_float_ts_1.fastExpansionSum;
const em2 = big_float_ts_1.eMultBy2;
const tp = big_float_ts_1.twoProduct;
function getCoeffs2x3Exact(ps1, ps2) {
    let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = get_implicit_form2_bitlength45_exact_1.getImplicitForm2_bitlength45_exact(ps1);
    let [[c3, c2, c1, c0], [d3, d2, d1, d0]] = get_xy_1.getXY(ps2);
    let c0c0 = tp(c0, c0);
    let c0c1 = tp(c0, c1);
    let c0c2 = tp(c0, c2);
    let c0c3 = tp(c0, c3);
    let c0d0 = tp(c0, d0);
    let c0d1 = tp(c0, d1);
    let c0d2 = tp(c0, d2);
    let c0d3 = tp(c0, d3);
    let c1c1 = tp(c1, c1);
    let c1c2 = tp(c1, c2);
    let c1c3 = tp(c1, c3);
    let c1d0 = tp(c1, d0);
    let c1d1 = tp(c1, d1);
    let c1d2 = tp(c1, d2);
    let c1d3 = tp(c1, d3);
    let c2d1 = tp(c2, d1);
    let c2c2 = tp(c2, c2);
    let c2c3 = tp(c2, c3);
    let c2d0 = tp(c2, d0);
    let c2d2 = tp(c2, d2);
    let c2d3 = tp(c2, d3);
    let c3c3 = tp(c3, c3);
    let c3d0 = tp(c3, d0);
    let c3d1 = tp(c3, d1);
    let c3d2 = tp(c3, d2);
    let c3d3 = tp(c3, d3);
    let d0d0 = tp(d0, d0);
    let d0d1 = tp(d0, d1);
    let d0d2 = tp(d0, d2);
    let d0d3 = tp(d0, d3);
    let d1d1 = tp(d1, d1);
    let d1d2 = tp(d1, d2);
    let d3d3 = tp(d3, d3);
    let d2d2 = tp(d2, d2);
    let d2d3 = tp(d2, d3);
    let d1d3 = tp(d1, d3);
    // a3**2*vₓₓ + a3*b3*vₓᵧ + b3**2*vᵧᵧ
    //let v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    let p1 = epr(c3c3, vₓₓ);
    let p2 = epr(c3d3, vₓᵧ);
    let p3 = epr(d3d3, vᵧᵧ);
    let p4 = fes(p1, p2);
    let v6 = fes(p4, p3);
    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //let v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    vₓᵧ*(c2d3 + c3d2);
    let p5 = epr(c2c3, vₓₓ);
    let p6 = epr(d2d3, vᵧᵧ);
    let p7 = fes(p5, p6);
    let p8 = qaq(c2d3, c3d2); // 48-bit aligned => error free
    let p9 = epr(p8, vₓᵧ);
    let v5 = fes(em2(p7), p9);
    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //let v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    let pa = qaq(qm2(c1c3), c2c2); // 48-bit aligned => error free
    let pb = qaq(qm2(d1d3), d2d2); // 48-bit aligned => error free
    let pc = qaq(c1d3, c2d2); // 48-bit aligned => error free
    let pd = qaq(pc, c3d1); // 48-bit aligned => error free
    let pe = epr(pa, vₓₓ);
    let pf = epr(pb, vᵧᵧ);
    let pg = fes(pe, pf);
    let rp = epr(pd, vₓᵧ);
    let v4 = fes(pg, rp);
    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    // a3*v_x + 2*b0*b3*vᵧᵧ + 2*b1*b2*vᵧᵧ + b3*v_y
    //let v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    let ph = qaq(c0c3, c1c2); // 48-bit aligned => error free
    let pi = qaq(d0d3, d1d2); // 48-bit aligned => error free
    let pj = qaq(c0d3, c1d2); // 48-bit aligned => error free
    let pk = qaq(c2d1, c3d0); // 48-bit aligned => error free
    let pl = qaq(pj, pk); // 48-bit aligned => error free
    let pm = epr(ph, vₓₓ);
    let pn = epr(pi, vᵧᵧ);
    let po = em2(fes(pm, pn));
    let pp = epr(pl, vₓᵧ);
    let rn = sce(c3, vₓ);
    let ro = sce(d3, vᵧ);
    let pq = fes(rn, ro);
    let pr = fes(po, pp);
    let v3 = fes(pr, pq);
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    // a1*b1*vₓᵧ + a2*b0*vₓᵧ + a2*v_x + 
    // 2*b0*b2*vᵧᵧ + b1**2*vᵧᵧ + b2*v_y
    //let v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    let ps = qaq(qm2(c0c2), c1c1); // 48-bit aligned => error free
    let pt = qaq(qm2(d0d2), d1d1); // 48-bit aligned => error free
    let pu = qaq(c0d2, c1d1); // 48-bit aligned => error free
    let pv = qaq(pu, c2d0); // 48-bit aligned => error free
    let pw = epr(ps, vₓₓ);
    let px = epr(pt, vᵧᵧ);
    let py = epr(pv, vₓᵧ);
    let pz = fes(pw, px);
    let r1 = fes(pz, py);
    let r2 = sce(c2, vₓ);
    let r3 = sce(d2, vᵧ);
    let r4 = fes(r2, r3);
    let v2 = fes(r1, r4);
    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*v_x + 2*b0*b1*vᵧᵧ + b1*v_y
    //let v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    let r5 = epr(c0c1, vₓₓ);
    let r6 = epr(d0d1, vᵧᵧ);
    let r7 = qaq(c0d1, c1d0); // 48-bit aligned => error free
    let r8 = epr(r7, vₓᵧ);
    let r9 = em2(fes(r5, r6));
    let ra = fes(r9, r8);
    let rb = sce(c1, vₓ);
    let rc = sce(d1, vᵧ);
    let rd = fes(rb, rc);
    let v1 = fes(ra, rd);
    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*v_x + b0**2*vᵧᵧ + b0*v_y + v_0
    //let v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    let re = epr(c0c0, vₓₓ);
    let rf = epr(c0d0, vₓᵧ);
    let rg = epr(d0d0, vᵧᵧ);
    let rh = sce(c0, vₓ);
    let ri = sce(d0, vᵧ);
    let rj = fes(re, rf);
    let rk = fes(rj, rg);
    let rl = fes(rh, ri);
    let rm = fes(rk, rl);
    let v0 = fes(rm, v);
    return [v6, v5, v4, v3, v2, v1, v0];
}
exports.getCoeffs2x3Exact = getCoeffs2x3Exact;
//# sourceMappingURL=get-coefficients-2x3.js.map