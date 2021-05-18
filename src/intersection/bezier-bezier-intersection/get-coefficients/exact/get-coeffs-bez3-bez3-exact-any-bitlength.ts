import { getImplicitForm3ExactAnyBitlength } from "../../../../implicit-form/exact/get-implicit-form3-exact-any-bitlength";
import { getXYExactAnyBitlength3 } from "../../../../to-power-basis/any-bitlength/exact/get-xy-exact-any-bitlength";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { 
    twoProduct, expansionProduct, fastExpansionSum, scaleExpansion2, 
    eMultBy2
} from "big-float-ts";

const tp  = twoProduct;    // error -> 0
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;


/**
 * Returns an error-free polynomial in in 1 variable
 * whose roots are the parameter values of the intersection points of 2 order 
 * 3 bezier curves (i.e. 2 cubic bezier curves).
 * 
 * The returned polynomial degree will be 9
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
function getCoeffsBez3Bez3ExactAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm3ExactAnyBitlength(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXYExactAnyBitlength3(ps2);

    const c0c0 = tp(c0,c0);
    const c0c1 = sce(c0,c1);
    const c0c2 = sce(c0,c2);
    const c0c3 = sce(c0,c3);
    const c0d0 = tp(c0,d0);
    const c0d1 = sce(c0,d1);
    const c0d2 = sce(c0,d2);
    const c0d3 = sce(c0,d3);
    const c1c1 = epr(c1,c1);
    const c1c2 = epr(c1,c2);
    const c1c3 = epr(c1,c3);
    const c1d0 = sce(d0,c1);
    const c1d1 = epr(c1,d1);
    const c1d2 = epr(c1,d2);
    const c1d3 = epr(c1,d3);
    const c2d1 = epr(c2,d1);
    const c2c2 = epr(c2,c2);    
    const c2c3 = epr(c2,c3);
    const c2d0 = sce(d0,c2);
    const c2d2 = epr(c2,d2);
    const c2d3 = epr(c2,d3);
    const c3c3 = epr(c3,c3);
    const c3d0 = sce(d0,c3);
    const c3d1 = epr(c3,d1);
    const c3d2 = epr(c3,d2);
    const c3d3 = epr(c3,d3);

    const d0d0 = tp(d0,d0);
    const d0d1 = sce(d0,d1);
    const d0d2 = sce(d0,d2);
    const d0d3 = sce(d0,d3);
    const d1d1 = epr(d1,d1);
    const d1d2 = epr(d1,d2);
    const d3d3 = epr(d3,d3);
    const d2d2 = epr(d2,d2);
    const d2d3 = epr(d2,d3);
    const d1d3 = epr(d1,d3);


    //const v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    const g1 = epr(c3,c3c3);  // c3*c3c3
    const g2 = epr(c3,d3d3);  // c3*d3d3
    const g3 = epr(d3,c3c3);  // d3*c3c3
    const g4 = epr(d3,d3d3);  // d3*d3d3
    const g5 = epr(g1,vₓₓₓ);  // g1*vₓₓₓ
    const g6 = epr(g2,vₓᵧᵧ);  // g2*vₓᵧᵧ
    const g7 = epr(g3,vₓₓᵧ);  // g3*vₓₓᵧ 
    const g8 = epr(g4,vᵧᵧᵧ);  // g4*vᵧᵧᵧ
    const g9 = fes(g5,g6);    // g5 + g6
    const ga = fes(g7,g8);    // g7 + g8
    const v9 = fes(g9,ga);    // g9 + ga

    //const v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    const w1 = fes(em2(c2d3),c3d2);
    const w2 = fes(em2(c3d2),c2d3);
    const w3 = epr(c3,w1);
    const w4 = epr(d3,w2);
    const w5 = epr(c2,c3c3);
    const w6 = epr(d2,d3d3);
    const w7 = epr(vₓₓₓ,w5);
    const u1 = epr(vᵧᵧᵧ,w6);
    const u2 = epr(vₓₓᵧ,w3);
    const u3 = epr(vₓᵧᵧ,w4);
    const u4 = fes(u2,u3);
    const u5 = sce(3,fes(w7,u1));
    const v8 = fes(u4,u5);


    //const v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    const o1 = epr(c1,c3d3);
    const o2 = epr(d1,c3c3);
    const o3 = epr(c2,d2d3);
    const o4 = epr(c1,d3d3);
    const o5 = epr(c2,c3d2);
    const o6 = epr(d3,c2c2);
    const o7 = epr(c3,d1d3);
    const o8 = epr(d2,c3d2);
    const w8 = fes(o1,o5);
    const w9 = fes(o2,o6);
    const wa = fes(o3,o7);
    const wb = fes(o4,o8);
    const wc = fes(c1c3,c2c2);
    const wd = fes(d1d3,d2d2);
    const we = fes(em2(w8),w9);
    const wf = fes(em2(wa),wb);
    const wg = epr(vₓₓᵧ,we);
    const wh = epr(vₓᵧᵧ,wf);
    const wi = epr(c3,wc);
    const wj = epr(d3,wd);
    const wk = epr(vₓₓₓ,wi);
    const wl = epr(vᵧᵧᵧ,wj);
    const wm = fes(wg,wh);
    const wn = sce(3,fes(wk,wl));
    const v7 = fes(wm,wn);


    //const v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    const wo = fes(c2d3,c3d2);
    const zc = epr(d2,c2c2);
    const zd = em2(epr(c1,wo));
    const wp = fes(zc,zd);
    const wq = em2(fes(c0d3,c2d1));
    const wr = fes(wq,c3d0);
    const ze = epr(c3,wr);
    const ws = fes(wp,ze);
    const zf = epr(c2,d2d2);
    const zg = em2(epr(d1,wo));
    const wt = fes(zf,zg);
    const wu = em2(fes(c1d2,c3d0));
    const wv = fes(wu,c0d3);
    const zh = epr(d3,wv);
    const ww = fes(wt,zh);
    const wx = epr(c2,c2c2);
    const wy = fes(em2(c1c2),c0c3);
    const wz = epr(sce(3,c3),wy); // 3*c3: 47-bit aligned => error free
    const z1 = fes(wx,wz);
    const z2 = epr(d2,d2d2);
    const z3 = fes(em2(d1d2),d0d3);
    const z4 = epr(sce(3,d3),z3); // 3*d3: 47-bit aligned => error free
    const z5 = fes(z2,z4);
    const zi = epr(vₓₓᵧ,ws);
    const zj = epr(vₓᵧᵧ,ww);
    const z6 = fes(zi,zj);
    const zk = epr(vₓₓₓ,z1);
    const zl = epr(vᵧᵧᵧ,z5);
    const z7 = fes(zk,zl);
    const zm = epr(c3c3,vₓₓ);
    const zn = epr(d3d3,vᵧᵧ);
    const z8 = fes(zm,zn);
    const z9 = epr(c3d3,vₓᵧ);
    const za = fes(z6,z7);
    const zb = fes(z8,z9);
    const v6 = fes(za,zb);


    //const r4 = c2d2 + c3d1;
    //const r5 = c1d3 + c2d2;
    //const v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    const r4 = fes(c2d2,c3d1);
    const r5 = fes(c1d3,c2d2);
    const k1 = sce(c0,wo);  // wo: 48-bit aligned => error free
    const k2 = sce(d0,wo);
    const k3 = epr(c1,r4);
    const k4 = epr(d1,r5);
    const k5 = fes(em2(c3d0),c2d1);
    const k6 = fes(em2(c0d3),c1d2);
    const k7 = epr(d3,c1c1);
    const k8 = epr(c3,d1d1);
    const k9 = epr(c2,k5);
    const ka = epr(d2,k6);
    const kb = em2(fes(k1,k3));
    const kc = em2(fes(k2,k4));
    const kd = em2(sce(c0,c2c3));
    const ke = em2(sce(d0,d2d3));
    const kf = epr(c1,wc);
    const kg = epr(d1,wd);
    const kh = epr(c2c3,vₓₓ);
    const ki = epr(d2d3,vᵧᵧ);
    const kj = fes(kb,k7);
    const kk = fes(kc,k8);
    const kl = fes(kj,k9);
    const km = fes(kk,ka);
    const kn = fes(kd,kf);
    const ko = fes(ke,kg);
    const kp = em2(fes(kh,ki));
    const kq = epr(vₓₓᵧ,kl);
    const kr = epr(vₓᵧᵧ,km);
    const ks = epr(vₓₓₓ,kn);
    const kt = epr(vᵧᵧᵧ,ko);
    const ku = fes(kq,kr);
    const kv = sce(3,fes(ks,kt));
    const kw = epr(vₓᵧ,wo);
    const kx = fes(ku,kv);
    const ky = fes(kw,kp);
    const v5 = fes(kx,ky);
    
    
    //const r1 = c1d3 + r4;
    //const r2 = 2*c1c3 + c2c2;
    //const r3 = 2*d1d3 + d2d2;
    //const v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    const r1 = fes(c1d3,r4);
    const r2 = fes(em2(c1c3),c2c2);
    const r3 = fes(em2(d1d3),d2d2);
    const s1 = sce((2*c0),r1);
    const s2 = sce((2*d0),r1);
    const s5 = fes(c1d2,em2(c2d1));
    const s6 = fes(c2d1,em2(c1d2));
    const s3 = sce(d0,r2);
    const s4 = sce(c0,r3);
    const s7 = epr(c1,s5);
    const s8 = epr(d1,s6);
    const s9 = sce(c0,r2);
    const sa = sce(d0,r3);
    const sb = epr(c2,c1c1);
    const sc = epr(d2,d1d1);
    const sd = fes(s1,s3);
    const se = fes(s2,s4);
    const sf = fes(sd,s7);
    const sg = fes(se,s8);
    const sh = fes(s9,sb);
    const si = fes(sa,sc);
    const sj = epr(vₓₓᵧ,sf);
    const sk = epr(vₓᵧᵧ,sg);
    const sl = epr(vₓₓₓ,sh);
    const sm = epr(vᵧᵧᵧ,si);
    const sn = fes(sl,sm);
    const so = fes(sj,sk);
    const sp = fes(so,sce(3,sn));
    const ss = epr(vₓᵧ,r1);
    const st = epr(vₓₓ,r2);
    const sq = fes(ss,st);
    const su = epr(vᵧᵧ,r3);
    const sr = fes(sq,su);
    const v4 = fes(sp,sr);


    //const r6 = c1d2 + c2d1;
    //const r7 = c3d0 + c0d3;
    //const r8 = c1c2 + c0c3;
    //const r9 = d1d2 + d0d3;
    //const v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
  
    const r6 = fes(c1d2,c2d1);
    const r7 = fes(c3d0,c0d3);
    const r8 = fes(c1c2,c0c3);
    const r9 = fes(d1d2,d0d3);
    const m1 = fes(em2(r6),c3d0);
    const m2 = fes(em2(r6),c0d3);
    const m3 = fes(em2(c2d0),c1d1);
    const m4 = fes(em2(c0d2),c1d1);
    const m5 = fes(r8,c1c2);
    const m6 = fes(r9,d1d2);
    const m7 = sce(3*c0,m5);  // 3*c0: 47-bit aligned => error free
    const m8 = sce(3*d0,m6);  // 3*c0: 47-bit aligned => error free
    const m9 = epr(c1,c1c1);
    const ma = epr(d1,d1d1);
    const mb = epr(vₓₓ,r8);
    const mc = epr(vᵧᵧ,r9);
    const md = fes(m1,r7);
    const me = fes(m2,r7);
    const mf = sce(c0,md);
    const mg = sce(d0,me);
    const mh = epr(c1,m3);
    const mi = epr(d1,m4);
    const mj = epr(c3,vₓ);
    const mk = epr(d3,vᵧ);
    const ml = fes(mf,mh);
    const mm = fes(mg,mi);
    const mn = fes(m7,m9);
    const mo = fes(m8,ma);
    const mp = fes(r7,r6);
    const mq = em2(fes(mb,mc));
    const mr = epr(vₓₓᵧ,ml);
    const ms = epr(vₓᵧᵧ,mm);
    const mt = epr(vₓₓₓ,mn);
    const mu = epr(vᵧᵧᵧ,mo);
    const mv = epr(vₓᵧ,mp);
    const mw = fes(mr,ms);
    const mx = fes(mt,mu);
    const my = fes(mv,mq);
    const mz = fes(mj,mk);
    const n1 = fes(mw,mx);
    const n2 = fes(my,mz);
    const v3 = fes(n1,n2);


    //const ra = c1d1 + c2d0;
    //const rb = c1d1 + c0d2;
    //const v2 =
    //    vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
    //    vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
    //    3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
    //    3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
    //    vₓᵧ*(ra + c0d2) +
    //    vₓₓ*(2*c0c2 + c1c1) + 
    //    vᵧᵧ*(2*d0d2 + d1d1) +
    //    c2*vₓ + d2*vᵧ;
    const ra = fes(c1d1,c2d0);
    const rb = fes(c1d1,c0d2);
    const l1 = fes(em2(ra),c0d2);
    const l2 = fes(em2(rb),c2d0);
    const l3 = sce(c0,l1);
    const l4 = sce(d0,c1c1);
    const l5 = sce(d0,l2);
    const l6 = sce(c0,d1d1);
    const l7 = sce(c0,c1c1);
    const l8 = epr(c2,c0c0);
    const l9 = sce(d0,d1d1);
    const la = epr(d2,d0d0);
    const lb = fes(l3,l4);
    
    const lc = fes(l5,l6);
    
    const ld = fes(l7,l8);
    
    const le = fes(l9,la);
    
    const lf = epr(vₓₓₓ,ld);
    const lg = epr(vᵧᵧᵧ,le);
    const lh = sce(3,fes(lf,lg));
    const li = fes(ra,c0d2);
    const lj = fes(em2(c0c2),c1c1);
    const lk = fes(em2(d0d2),d1d1);
    const ll = epr(vₓₓᵧ,lb);
    const lm = epr(vₓᵧᵧ,lc);
    const ln = epr(vₓᵧ,li);
    const lo = epr(vₓₓ,lj);
    const lp = epr(vᵧᵧ,lk);
    const lq = epr(c2,vₓ);
    const lr = epr(d2,vᵧ);
    const ls = fes(lq,lr);
    const lt = fes(ll,lm);
    const lu = fes(lh,ln);
    const lv = fes(lo,lp);
    const lw = fes(lt,lu);
    const lx = fes(lv,ls);
    const v2 = fes(lw,lx);


    //const rc = c1d0 + c0d1;
    //const v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    const rc = fes(c1d0,c0d1);
    const rd = sce(c0,vₓₓᵧ);
    
    const re = sce(d0,vₓᵧᵧ);
    
    const rf = fes(rc,c1d0);
    const rg = fes(rc,c0d1);
    const rx = epr(c1,c0c0);
    const rh = epr(rx,vₓₓₓ);
    const ry = epr(d1,d0d0);
    const ri = epr(ry,vᵧᵧᵧ);
    const rj = epr(vₓᵧ,rc);
    const rk = epr(c0c1,vₓₓ);
    const rl = epr(d0d1,vᵧᵧ);
    const rm = fes(rk,rl);
    const rn = epr(c1,vₓ);
    const ro = epr(d1,vᵧ);
    const rp = fes(rn,ro);
    const rq = epr(rd,rf);
    const rr = epr(re,rg);
    const rs = fes(rq,rr);
    const rt = sce(3,fes(rh,ri));
    const ru = fes(rj,em2(rm));
    const rv = fes(rs,rt);
    const rw = fes(ru,rp);
    const v1 = fes(rv,rw);


    // v0
    const t1 = sce(c0,vₓₓₓ);
    const t2 = sce(d0,vₓₓᵧ);
    const p4 = fes(t1,t2);
    const t3 = sce(c0,vₓᵧᵧ);
    const t4 = sce(d0,vᵧᵧᵧ);
    const p5 = fes(t3,t4);
    const p7 = fes(p4,vₓₓ);
    const p8 = fes(p5,vᵧᵧ);
    const pc = epr(c0c0,p7);
    const pd = epr(d0d0,p8);
    const p6 = fes(pc,pd);
    const pe = epr(c0d0,vₓᵧ);
    const p9 = fes(p6,pe);
    const pf = sce(c0,vₓ);
    const pg = sce(d0,vᵧ);
    const pa = fes(pf,pg);
    const pb = fes(p9,pa);
    const v0 = fes(pb,v);


    return [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez3Bez3ExactAnyBitlength }
