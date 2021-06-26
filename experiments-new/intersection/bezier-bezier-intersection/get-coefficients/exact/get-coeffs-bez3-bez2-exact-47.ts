import { getImplicitForm3Exact47 } from "../../../../implicit-form/exact/get-implicit-form3-exact-47";
import { 
    twoProduct, scaleExpansion2, expansionProduct, fastExpansionSum, 
    eMultBy2 } from "big-float-ts";
import { ddMultBy2, ddAddDd, ddMultDouble2 } from 'double-double';
import { getXY } from "../../../../../src/to-power-basis/get-xy";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qaq = ddAddDd;
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const tp = twoProduct;


/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order 
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * Shewchuk floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez3Bez2Exact47(ps1: number[][], ps2: number[][]) {
    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm3Exact47(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    const c0c0 = tp(c0,c0);
    const c0c1 = tp(c0,c1);
    const c0c2 = tp(c0,c2);
    const c0d0 = tp(c0,d0);
    const c0d1 = tp(c0,d1);
    const c0d2 = tp(c0,d2);
    const c1c1 = tp(c1,c1);
    const c1c2 = tp(c1,c2);
    const c1d0 = tp(c1,d0);
    const c1d1 = tp(c1,d1);
    const c1d2 = tp(c1,d2);
    const c2d1 = tp(c2,d1);
    const c2c2 = tp(c2,c2);    
    const c2d0 = tp(c2,d0);
    const c2d2 = tp(c2,d2);
    const d0d0 = tp(d0,d0);
    const d0d1 = tp(d0,d1);
    const d0d2 = tp(d0,d2);
    const d1d1 = tp(d1,d1);
    const d1d2 = tp(d1,d2);
    const d2d2 = tp(d2,d2);
    

    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //const v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    const e1 = sce(c2,vₓₓₓ);
    const e2 = sce(c2,vₓᵧᵧ);
    const e3 = sce(d2,vₓₓᵧ);
    const e4 = sce(d2,vᵧᵧᵧ);
    const e5 = fes(e1,e3);
    const e6 = fes(e2,e4);
    const e7 = epr(c2c2,e5);
    const e8 = epr(d2d2,e6);
    const v6 = fes(e7,e8);


    const z1 = qaq(c0c2,c1c1);  // 48-bit aligned => error free
    const z2 = qaq(d0d2,d1d1);  // 48-bit aligned => error free
    const z3 = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    const z4 = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    const z5 = qaq(qm2(c1d1),c2d0);  // 48-bit aligned => error free
    const z6 = qaq(qm2(c1d1),c0d2);  // 48-bit aligned => error free
    const z7 = qaq(qm2(c2d0),c1d1);  // 48-bit aligned => error free
    const z8 = qaq(qmd(6,c0c2),c1c1);  // 47-bit aligned => error free
    const z9 = qaq(qmd(6,d0d2),d1d1);  // 47-bit aligned => error free
    const za = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    const zb = qaq(c0d2,c2d0);  // 48-bit aligned => error free
    const zc = qaq(qm2(c1d0),c0d1);  // 48-bit aligned => error free
    const zd = qaq(qm2(c0d1),c1d0);  // 48-bit aligned => error free
    const zf = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    const ze = qaq(zf,c2d0);  // 48-bit aligned => error free
    


    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //const v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    const s0 = qmd(3,c2c2);  // 48-bit aligned => error free
    const t1 = qmd(3,d2d2);  // 48-bit aligned => error free
    const s1 = epr(s0,vₓₓₓ);
    const s2 = epr(c2c2,vₓₓᵧ);
    const s3 = em2(epr(c2d2,vₓₓᵧ));
    const s4 = em2(epr(c2d2,vₓᵧᵧ));
    const s5 = epr(d2d2,vₓᵧᵧ);
    const s6 = epr(t1,vᵧᵧᵧ);
    const s7 = fes(s1,s3);
    const s8 = fes(s2,s4);
    const s9 = fes(s7,s5);
    const sa = fes(s8,s6);
    const sb = sce(c1,s9);
    const sc = sce(d1,sa);
    const v5 = fes(sb,sc);


    // 3*a0*a2**2*v_xxx + 2*a0*a2*b2*v_xxy + a0*b2**2*v_xyy + 
    // 3*a1**2*a2*v_xxx + a1**2*b2*v_xxy + 2*a1*a2*b1*v_xxy + 
    // 2*a1*b1*b2*v_xyy + a2**2*b0*v_xxy + a2**2*v_xx + 
    // 2*a2*b0*b2*v_xyy + a2*b1**2*v_xyy + a2*b2*v_xy + 
    // 3*b0*b2**2*v_yyy + 3*b1**2*b2*v_yyy + b2**2*v_yy
    //const v4 =
    //    3*c2*(c0c2 + c1c1)*vₓₓₓ + 
    //    3*d2*(d0d2 + d1d1)*vᵧᵧᵧ + 
    //    (d2*(2*c0c2 + c1c1) + c2*(2*c1d1 + c2d0))*vₓₓᵧ +
    //    (d2*(2*c1d1 + c0d2) + c2*(2*d0d2 + d1d1))*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    //const v4 =
    //    (3*c2)*z1*vₓₓₓ + 
    //    (3*d2)*z2*vᵧᵧᵧ + 
    //    (d2*z3 + c2*z5)*vₓₓᵧ +
    //    (d2*z6 + c2*z4)*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    const sd = sce(d2,z3);
    const se = sce(d2,z6);
    const sf = sce(c2,z5);
    const sg = sce(c2,z4);
    const sh = sce(3*c2,z1);  // 3*c2: 47-bit aligned => error free
    const si = sce(3*d2,z2);  // 3*d2: 47-bit aligned => error free
    const sj = fes(sd,sf);
    const sk = fes(se,sg);
    const sl = epr(sh,vₓₓₓ);
    const sm = epr(si,vᵧᵧᵧ);
    const sn = epr(sj,vₓₓᵧ);
    const so = epr(sk,vₓᵧᵧ);
    const sp = fes(sl,sm);
    const sq = fes(sn,so);
    const sr = epr(c2c2,vₓₓ);
    const ss = epr(d2d2,vᵧᵧ);
    const st = epr(c2d2,vₓᵧ);
    const su = fes(sr,ss);
    const sv = fes(sp,sq);
    const sw = fes(su,st);
    const v4 = fes(sv,sw);


    // 6*a0*a1*a2*v_xxx + 2*a0*a1*b2*v_xxy + 2*a0*a2*b1*v_xxy + 
    // 2*a0*b1*b2*v_xyy + a1**3*v_xxx + a1**2*b1*v_xxy + 
    // 2*a1*a2*b0*v_xxy + 2*a1*a2*v_xx + 2*a1*b0*b2*v_xyy + 
    // a1*b1**2*v_xyy + a1*b2*v_xy + 2*a2*b0*b1*v_xyy + 
    // a2*b1*v_xy + 6*b0*b1*b2*v_yyy + b1**3*v_yyy + 
    // 2*b1*b2*v_yy
    //const v3 =
    //    c1*(6*c0c2 + c1c1)*vₓₓₓ +
    //    d1*(6*d0d2 + d1d1)*vᵧᵧᵧ +        
    //    (2*c0*(c1d2 + c2d1) + c1*(c1d1 + 2*c2d0))*vₓₓᵧ +
    //    (2*d1*(c0d2 + c2d0) + c1*(d1d1 + 2*d0d2))*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    c1d2*vₓᵧ + c2d1*vₓᵧ;
    //const v3 =
    //    c1*z8*vₓₓₓ +
    //    d1*z9*vᵧᵧᵧ +        
    //    (2*c0*za + c1*z7)*vₓₓᵧ +
    //    (2*d1*zb + c1*z4)*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    za*vₓᵧ;
    const sx = sce(c1,z8);
    const sy = sce(d1,z9);
    const sz = sce(2*c0,za);
    const o1 = sce(2*d1,zb);
    const o2 = sce(c1,z7);
    const o3 = sce(c1,z4);
    const o4 = fes(sz,o2);
    const o5 = fes(o1,o3);
    const o6 = epr(d1d2,vᵧᵧ);
    const o7 = epr(c1c2,vₓₓ);
    const o8 = epr(za,vₓᵧ);
    const o9 = fes(o6,o7);
    const oa = epr(sx,vₓₓₓ);
    const ob = epr(o4,vₓₓᵧ);
    const oc = epr(sy,vᵧᵧᵧ);
    const od = epr(o5,vₓᵧᵧ);
    const oe = fes(oa,oc);
    const og = fes(ob,od);
    const oh = fes(oe,og);
    const oi = fes(em2(o9),o8);
    const v3 = fes(oh,oi);


    // 3*a0**2*a2*v_xxx + a0**2*b2*v_xxy + 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + 2*a0*a2*b0*v_xxy + 
    // 2*a0*a2*v_xx + 2*a0*b0*b2*v_xyy + a0*b1**2*v_xyy + a0*b2*v_xy + a1**2*b0*v_xxy + a1**2*v_xx + 
    // 2*a1*b0*b1*v_xyy + a1*b1*v_xy + a2*b0**2*v_xyy + a2*b0*v_xy + a2*v_x + 3*b0**2*b2*v_yyy + 
    // 3*b0*b1**2*v_yyy + 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //const v2 =
    //    (3*c0*(c0c2 + c1c1))*vₓₓₓ +
    //    (3*d0*(d0d2 + d1d1))*vᵧᵧᵧ +
    //    (c0*(2*c1d1 + c0d2) + d0*(2*c0c2 + c1c1))*vₓₓᵧ +
    //    (c0*(2*d0d2 + d1d1) + d0*(2*c1d1 + c2d0))*vₓᵧᵧ +
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    //const v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    const oj = sce(3*c0,z1);
    const ok = sce(3*d0,z2);
    const ol = sce(c0,z6);
    const om = sce(c0,z4);
    const on = sce(d0,z3);
    const oo = sce(d0,z5);
    const op = fes(ol,on);
    const oq = fes(om,oo);
    const or = epr(oj,vₓₓₓ);
    const os = epr(ok,vᵧᵧᵧ);
    const ot = epr(op,vₓₓᵧ);
    const ou = epr(oq,vₓᵧᵧ);
    const ov = epr(z3,vₓₓ);
    const ow = epr(z4,vᵧᵧ);
    const ox = epr(ze,vₓᵧ);
    const oy = sce(c2,vₓ);
    const oz = sce(d2,vᵧ);
    const p1 = fes(or,os);
    const p2 = fes(ot,ou);
    const p3 = fes(ov,ow);
    const p4 = fes(p1,p2);
    const p5 = fes(p3,ox);
    const p6 = fes(oy,oz);
    const p7 = fes(p4,p5);
    const v2 = fes(p7,p6);


    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + 
    // a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*(c0d1 + 2*c1d0)*vₓₓᵧ +
    //    d0*(c1d0 + 2*c0d1)*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*zc*vₓₓᵧ +
    //    d0*zd*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    const p8 = sce(3*c0,c0c1);
    const p9 = sce(3*d0,d0d1);
    const pa = sce(c0,zc);
    const pb = sce(d0,zd);
    const pc = epr(c0c1,vₓₓ);
    const pd = epr(d0d1,vᵧᵧ);
    const pe = epr(c0d1,vₓᵧ);
    const pf = epr(c1d0,vₓᵧ);
    const pg = em2(fes(pc,pd));
    const ph = fes(pe,pf);
    const pi = sce(c1,vₓ);
    const pj = sce(d1,vᵧ);
    const pk = epr(p8,vₓₓₓ);
    const pl = epr(p9,vᵧᵧᵧ);
    const pm = epr(pa,vₓₓᵧ);
    const pn = epr(pb,vₓᵧᵧ);
    const po = fes(pk,pl);
    const pp = fes(pm,pn);
    const pq = fes(po,pp);
    const pr = fes(pg,ph);
    const ps = fes(pi,pj);
    const pt = fes(pq,pr);
    const v1 = fes(pt,ps);


    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const pu = sce(c0,vₓₓₓ);
    const pv = sce(c0,vₓᵧᵧ);
    const pw = sce(d0,vₓₓᵧ);
    const px = sce(d0,vᵧᵧᵧ);
    const py = fes(pu,pw);
    const pz = fes(pv,px);
    const u1 = fes(py,vₓₓ);
    const u2 = fes(pz,vᵧᵧ);
    const u3 = epr(c0c0,u1);
    const u4 = epr(d0d0,u2);
    const u5 = epr(c0d0,vₓᵧ);
    const u6 = sce(c0,vₓ);
    const u7 = sce(d0,vᵧ);
    const u8 = fes(u3,u4);
    const u9 = fes(u8,u5);
    const ua = fes(u6,u7);
    const ub = fes(u9,ua);
    const v0 = fes(ub,v);

    return [v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez3Bez2Exact47 }
