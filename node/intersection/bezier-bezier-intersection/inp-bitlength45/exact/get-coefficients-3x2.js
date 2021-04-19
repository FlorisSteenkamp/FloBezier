"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs3x2Exact = void 0;
const big_float_ts_1 = require("big-float-ts");
const double_double_1 = require("double-double");
const get_implicit_form3_bitlength45_exact_1 = require("../../../../implicit-form/inp-bitlength45/exact/get-implicit-form3-bitlength45-exact");
const get_xy_1 = require("../../../../to-power-basis/get-xy");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qm2 = double_double_1.ddMultBy2;
const qmd = double_double_1.ddMultDouble2;
const qaq = double_double_1.ddAddDd;
const sce = big_float_ts_1.scaleExpansion2;
const epr = big_float_ts_1.expansionProduct;
const fes = big_float_ts_1.fastExpansionSum;
const em2 = big_float_ts_1.eMultBy2;
const tp = big_float_ts_1.twoProduct;
function getCoeffs3x2Exact(ps1, ps2) {
    let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = get_implicit_form3_bitlength45_exact_1.getImplicitForm3_bitlength45_exact(ps1);
    let [[c2, c1, c0], [d2, d1, d0]] = get_xy_1.getXY(ps2);
    let c0c0 = tp(c0, c0);
    let c0c1 = tp(c0, c1);
    let c0c2 = tp(c0, c2);
    let c0d0 = tp(c0, d0);
    let c0d1 = tp(c0, d1);
    let c0d2 = tp(c0, d2);
    let c1c1 = tp(c1, c1);
    let c1c2 = tp(c1, c2);
    let c1d0 = tp(c1, d0);
    let c1d1 = tp(c1, d1);
    let c1d2 = tp(c1, d2);
    let c2d1 = tp(c2, d1);
    let c2c2 = tp(c2, c2);
    let c2d0 = tp(c2, d0);
    let c2d2 = tp(c2, d2);
    let d0d0 = tp(d0, d0);
    let d0d1 = tp(d0, d1);
    let d0d2 = tp(d0, d2);
    let d1d1 = tp(d1, d1);
    let d1d2 = tp(d1, d2);
    let d2d2 = tp(d2, d2);
    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //let v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    let e1 = sce(c2, vₓₓₓ);
    let e2 = sce(c2, vₓᵧᵧ);
    let e3 = sce(d2, vₓₓᵧ);
    let e4 = sce(d2, vᵧᵧᵧ);
    let e5 = fes(e1, e3);
    let e6 = fes(e2, e4);
    let e7 = epr(c2c2, e5);
    let e8 = epr(d2d2, e6);
    let v6 = fes(e7, e8);
    let z1 = qaq(c0c2, c1c1); // 48-bit aligned => error free
    let z2 = qaq(d0d2, d1d1); // 48-bit aligned => error free
    let z3 = qaq(qm2(c0c2), c1c1); // 48-bit aligned => error free
    let z4 = qaq(qm2(d0d2), d1d1); // 48-bit aligned => error free
    let z5 = qaq(qm2(c1d1), c2d0); // 48-bit aligned => error free
    let z6 = qaq(qm2(c1d1), c0d2); // 48-bit aligned => error free
    let z7 = qaq(qm2(c2d0), c1d1); // 48-bit aligned => error free
    let z8 = qaq(qmd(6, c0c2), c1c1); // 47-bit aligned => error free
    let z9 = qaq(qmd(6, d0d2), d1d1); // 47-bit aligned => error free
    let za = qaq(c1d2, c2d1); // 48-bit aligned => error free
    let zb = qaq(c0d2, c2d0); // 48-bit aligned => error free
    let zc = qaq(qm2(c1d0), c0d1); // 48-bit aligned => error free
    let zd = qaq(qm2(c0d1), c1d0); // 48-bit aligned => error free
    let zf = qaq(c0d2, c1d1); // 48-bit aligned => error free
    let ze = qaq(zf, c2d0); // 48-bit aligned => error free
    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //let v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    let s0 = qmd(3, c2c2); // 48-bit aligned => error free
    let t1 = qmd(3, d2d2); // 48-bit aligned => error free
    let s1 = epr(s0, vₓₓₓ);
    let s2 = epr(c2c2, vₓₓᵧ);
    let s3 = em2(epr(c2d2, vₓₓᵧ));
    let s4 = em2(epr(c2d2, vₓᵧᵧ));
    let s5 = epr(d2d2, vₓᵧᵧ);
    let s6 = epr(t1, vᵧᵧᵧ);
    let s7 = fes(s1, s3);
    let s8 = fes(s2, s4);
    let s9 = fes(s7, s5);
    let sa = fes(s8, s6);
    let sb = sce(c1, s9);
    let sc = sce(d1, sa);
    let v5 = fes(sb, sc);
    // 3*a0*a2**2*v_xxx + 2*a0*a2*b2*v_xxy + a0*b2**2*v_xyy + 
    // 3*a1**2*a2*v_xxx + a1**2*b2*v_xxy + 2*a1*a2*b1*v_xxy + 
    // 2*a1*b1*b2*v_xyy + a2**2*b0*v_xxy + a2**2*v_xx + 
    // 2*a2*b0*b2*v_xyy + a2*b1**2*v_xyy + a2*b2*v_xy + 
    // 3*b0*b2**2*v_yyy + 3*b1**2*b2*v_yyy + b2**2*v_yy
    //let v4 =
    //    3*c2*(c0c2 + c1c1)*vₓₓₓ + 
    //    3*d2*(d0d2 + d1d1)*vᵧᵧᵧ + 
    //    (d2*(2*c0c2 + c1c1) + c2*(2*c1d1 + c2d0))*vₓₓᵧ +
    //    (d2*(2*c1d1 + c0d2) + c2*(2*d0d2 + d1d1))*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    //let v4 =
    //    (3*c2)*z1*vₓₓₓ + 
    //    (3*d2)*z2*vᵧᵧᵧ + 
    //    (d2*z3 + c2*z5)*vₓₓᵧ +
    //    (d2*z6 + c2*z4)*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    let sd = sce(d2, z3);
    let se = sce(d2, z6);
    let sf = sce(c2, z5);
    let sg = sce(c2, z4);
    let sh = sce(3 * c2, z1); // 3*c2: 47-bit aligned => error free
    let si = sce(3 * d2, z2); // 3*d2: 47-bit aligned => error free
    let sj = fes(sd, sf);
    let sk = fes(se, sg);
    let sl = epr(sh, vₓₓₓ);
    let sm = epr(si, vᵧᵧᵧ);
    let sn = epr(sj, vₓₓᵧ);
    let so = epr(sk, vₓᵧᵧ);
    let sp = fes(sl, sm);
    let sq = fes(sn, so);
    let sr = epr(c2c2, vₓₓ);
    let ss = epr(d2d2, vᵧᵧ);
    let st = epr(c2d2, vₓᵧ);
    let su = fes(sr, ss);
    let sv = fes(sp, sq);
    let sw = fes(su, st);
    let v4 = fes(sv, sw);
    // 6*a0*a1*a2*v_xxx + 2*a0*a1*b2*v_xxy + 2*a0*a2*b1*v_xxy + 
    // 2*a0*b1*b2*v_xyy + a1**3*v_xxx + a1**2*b1*v_xxy + 
    // 2*a1*a2*b0*v_xxy + 2*a1*a2*v_xx + 2*a1*b0*b2*v_xyy + 
    // a1*b1**2*v_xyy + a1*b2*v_xy + 2*a2*b0*b1*v_xyy + 
    // a2*b1*v_xy + 6*b0*b1*b2*v_yyy + b1**3*v_yyy + 
    // 2*b1*b2*v_yy
    //let v3 =
    //    c1*(6*c0c2 + c1c1)*vₓₓₓ +
    //    d1*(6*d0d2 + d1d1)*vᵧᵧᵧ +        
    //    (2*c0*(c1d2 + c2d1) + c1*(c1d1 + 2*c2d0))*vₓₓᵧ +
    //    (2*d1*(c0d2 + c2d0) + c1*(d1d1 + 2*d0d2))*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    c1d2*vₓᵧ + c2d1*vₓᵧ;
    //let v3 =
    //    c1*z8*vₓₓₓ +
    //    d1*z9*vᵧᵧᵧ +        
    //    (2*c0*za + c1*z7)*vₓₓᵧ +
    //    (2*d1*zb + c1*z4)*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    za*vₓᵧ;
    let sx = sce(c1, z8);
    let sy = sce(d1, z9);
    let sz = sce(2 * c0, za);
    let o1 = sce(2 * d1, zb);
    let o2 = sce(c1, z7);
    let o3 = sce(c1, z4);
    let o4 = fes(sz, o2);
    let o5 = fes(o1, o3);
    let o6 = epr(d1d2, vᵧᵧ);
    let o7 = epr(c1c2, vₓₓ);
    let o8 = epr(za, vₓᵧ);
    let o9 = fes(o6, o7);
    let oa = epr(sx, vₓₓₓ);
    let ob = epr(o4, vₓₓᵧ);
    let oc = epr(sy, vᵧᵧᵧ);
    let od = epr(o5, vₓᵧᵧ);
    let oe = fes(oa, oc);
    let og = fes(ob, od);
    let oh = fes(oe, og);
    let oi = fes(em2(o9), o8);
    let v3 = fes(oh, oi);
    // 3*a0**2*a2*v_xxx + a0**2*b2*v_xxy + 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + 2*a0*a2*b0*v_xxy + 
    // 2*a0*a2*v_xx + 2*a0*b0*b2*v_xyy + a0*b1**2*v_xyy + a0*b2*v_xy + a1**2*b0*v_xxy + a1**2*v_xx + 
    // 2*a1*b0*b1*v_xyy + a1*b1*v_xy + a2*b0**2*v_xyy + a2*b0*v_xy + a2*v_x + 3*b0**2*b2*v_yyy + 
    // 3*b0*b1**2*v_yyy + 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //let v2 =
    //    (3*c0*(c0c2 + c1c1))*vₓₓₓ +
    //    (3*d0*(d0d2 + d1d1))*vᵧᵧᵧ +
    //    (c0*(2*c1d1 + c0d2) + d0*(2*c0c2 + c1c1))*vₓₓᵧ +
    //    (c0*(2*d0d2 + d1d1) + d0*(2*c1d1 + c2d0))*vₓᵧᵧ +
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    //let v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    let oj = sce(3 * c0, z1);
    let ok = sce(3 * d0, z2);
    let ol = sce(c0, z6);
    let om = sce(c0, z4);
    let on = sce(d0, z3);
    let oo = sce(d0, z5);
    let op = fes(ol, on);
    let oq = fes(om, oo);
    let or = epr(oj, vₓₓₓ);
    let os = epr(ok, vᵧᵧᵧ);
    let ot = epr(op, vₓₓᵧ);
    let ou = epr(oq, vₓᵧᵧ);
    let ov = epr(z3, vₓₓ);
    let ow = epr(z4, vᵧᵧ);
    let ox = epr(ze, vₓᵧ);
    let oy = sce(c2, vₓ);
    let oz = sce(d2, vᵧ);
    let p1 = fes(or, os);
    let p2 = fes(ot, ou);
    let p3 = fes(ov, ow);
    let p4 = fes(p1, p2);
    let p5 = fes(p3, ox);
    let p6 = fes(oy, oz);
    let p7 = fes(p4, p5);
    let v2 = fes(p7, p6);
    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + 
    // a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*(c0d1 + 2*c1d0)*vₓₓᵧ +
    //    d0*(c1d0 + 2*c0d1)*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    //let v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*zc*vₓₓᵧ +
    //    d0*zd*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    let p8 = sce(3 * c0, c0c1);
    let p9 = sce(3 * d0, d0d1);
    let pa = sce(c0, zc);
    let pb = sce(d0, zd);
    let pc = epr(c0c1, vₓₓ);
    let pd = epr(d0d1, vᵧᵧ);
    let pe = epr(c0d1, vₓᵧ);
    let pf = epr(c1d0, vₓᵧ);
    let pg = em2(fes(pc, pd));
    let ph = fes(pe, pf);
    let pi = sce(c1, vₓ);
    let pj = sce(d1, vᵧ);
    let pk = epr(p8, vₓₓₓ);
    let pl = epr(p9, vᵧᵧᵧ);
    let pm = epr(pa, vₓₓᵧ);
    let pn = epr(pb, vₓᵧᵧ);
    let po = fes(pk, pl);
    let pp = fes(pm, pn);
    let pq = fes(po, pp);
    let pr = fes(pg, ph);
    let ps = fes(pi, pj);
    let pt = fes(pq, pr);
    let v1 = fes(pt, ps);
    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    let pu = sce(c0, vₓₓₓ);
    let pv = sce(c0, vₓᵧᵧ);
    let pw = sce(d0, vₓₓᵧ);
    let px = sce(d0, vᵧᵧᵧ);
    let py = fes(pu, pw);
    let pz = fes(pv, px);
    let u1 = fes(py, vₓₓ);
    let u2 = fes(pz, vᵧᵧ);
    let u3 = epr(c0c0, u1);
    let u4 = epr(d0d0, u2);
    let u5 = epr(c0d0, vₓᵧ);
    let u6 = sce(c0, vₓ);
    let u7 = sce(d0, vᵧ);
    let u8 = fes(u3, u4);
    let u9 = fes(u8, u5);
    let ua = fes(u6, u7);
    let ub = fes(u9, ua);
    let v0 = fes(ub, v);
    return [v6, v5, v4, v3, v2, v1, v0];
}
exports.getCoeffs3x2Exact = getCoeffs3x2Exact;
//# sourceMappingURL=get-coefficients-3x2.js.map