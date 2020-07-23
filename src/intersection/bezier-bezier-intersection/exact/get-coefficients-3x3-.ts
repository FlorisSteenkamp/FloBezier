
import { 
    twoProduct, scaleExpansion2, expansionProduct, fastExpansionSum, 
    eMultBy2 } from "big-float-ts";
import { ddMultBy2, ddAddDd } from 'double-double';
import { getImplicitForm3Exact_ } from "../../../implicit-form/exact/get-implicit-form3-";
import { getXY } from "../../../to-power-basis/get-xy";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qm2 = ddMultBy2;
const qaq = ddAddDd;
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const tp = twoProduct;


// TODO - better docs
/**
 * * **precondition**: 47-bit bit-aligned coefficient bitlength (this is to 
 * improve speed considerably)
 * @param ps1 
 * @param ps2 
 */
function getCoeffs3x3Exact_(ps1: number[][], ps2: number[][]) {
    let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm3Exact_(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    let c0c0 = tp(c0,c0);
    let c0c1 = tp(c0,c1);
    let c0c2 = tp(c0,c2);
    let c0c3 = tp(c0,c3);
    let c0d0 = tp(c0,d0);
    let c0d1 = tp(c0,d1);
    let c0d2 = tp(c0,d2);
    let c0d3 = tp(c0,d3);
    let c1c1 = tp(c1,c1);
    let c1c2 = tp(c1,c2);
    let c1c3 = tp(c1,c3);
    let c1d0 = tp(c1,d0);
    let c1d1 = tp(c1,d1);
    let c1d2 = tp(c1,d2);
    let c1d3 = tp(c1,d3);
    let c2d1 = tp(c2,d1);
    let c2c2 = tp(c2,c2);    
    let c2c3 = tp(c2,c3);
    let c2d0 = tp(c2,d0);
    let c2d2 = tp(c2,d2);
    let c2d3 = tp(c2,d3);
    let c3c3 = tp(c3,c3);
    let c3d0 = tp(c3,d0);
    let c3d1 = tp(c3,d1);
    let c3d2 = tp(c3,d2);
    let c3d3 = tp(c3,d3);

    let d0d0 = tp(d0,d0);
    let d0d1 = tp(d0,d1);
    let d0d2 = tp(d0,d2);
    let d0d3 = tp(d0,d3);
    let d1d1 = tp(d1,d1);
    let d1d2 = tp(d1,d2);
    let d3d3 = tp(d3,d3);
    let d2d2 = tp(d2,d2);
    let d2d3 = tp(d2,d3);
    let d1d3 = tp(d1,d3);


    //let v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    let g1 = sce(c3,c3c3);  // c3*c3c3
    let g2 = sce(c3,d3d3);  // c3*d3d3
    let g3 = sce(d3,c3c3);  // d3*c3c3
    let g4 = sce(d3,d3d3);  // d3*d3d3
    let g5 = epr(g1,vₓₓₓ);  // g1*vₓₓₓ
    let g6 = epr(g2,vₓᵧᵧ);  // g2*vₓᵧᵧ
    let g7 = epr(g3,vₓₓᵧ);  // g3*vₓₓᵧ 
    let g8 = epr(g4,vᵧᵧᵧ);  // g4*vᵧᵧᵧ
    let g9 = fes(g5,g6);    // g5 + g6
    let ga = fes(g7,g8);    // g7 + g8
    let v9 = fes(g9,ga);    // g9 + ga

    //let v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    let w1 = qaq(qm2(c2d3),c3d2);  // 47-bit aligned => error free
    let w2 = qaq(qm2(c3d2),c2d3);  // 47-bit aligned => error free
    let w3 = sce(c3,w1);
    let w4 = sce(d3,w2);
    let w5 = sce(c2,c3c3);
    let w6 = sce(d2,d3d3);
    let w7 = epr(vₓₓₓ,w5);
    let u1 = epr(vᵧᵧᵧ,w6);
    let u2 = epr(vₓₓᵧ,w3);
    let u3 = epr(vₓᵧᵧ,w4);
    let u4 = fes(u2,u3);
    let u5 = sce(3,fes(w7,u1));
    let v8 = fes(u4,u5);


    //let v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    let o1 = sce(c1,c3d3);
    let o2 = sce(d1,c3c3);
    let o3 = sce(c2,d2d3);
    let o4 = sce(c1,d3d3);
    let o5 = sce(c2,c3d2);
    let o6 = sce(d3,c2c2);
    let o7 = sce(c3,d1d3);
    let o8 = sce(d2,c3d2);
    let w8 = fes(o1,o5);
    let w9 = fes(o2,o6);
    let wa = fes(o3,o7);
    let wb = fes(o4,o8);
    let wc = qaq(c1c3,c2c2);  // 48-bit aligned => error free
    let wd = qaq(d1d3,d2d2);  // 48-bit aligned => error free
    let we = fes(em2(w8),w9);
    let wf = fes(em2(wa),wb);
    let wg = epr(vₓₓᵧ,we);
    let wh = epr(vₓᵧᵧ,wf);
    let wi = sce(c3,wc);
    let wj = sce(d3,wd);
    let wk = epr(vₓₓₓ,wi);
    let wl = epr(vᵧᵧᵧ,wj);
    let wm = fes(wg,wh);
    let wn = sce(3,fes(wk,wl));
    let v7 = fes(wm,wn);


    //let v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    let wo = qaq(c2d3,c3d2);  // 48-bit aligned => error free
    let zc = sce(d2,c2c2);
    let zd = em2(sce(c1,wo));
    let wp = fes(zc,zd);
    let wq = qm2(qaq(c0d3,c2d1));  // 48-bit aligned => error free
    let wr = qaq(wq,c3d0);  // 47-bit aligned => error free
    let ze = sce(c3,wr);
    let ws = fes(wp,ze);
    let zf = sce(c2,d2d2);
    let zg = em2(sce(d1,wo));
    let wt = fes(zf,zg);
    let wu = qm2(qaq(c1d2,c3d0));  // 48-bit aligned => error free
    let wv = qaq(wu,c0d3);  // 47-bit aligned => error free
    let zh = sce(d3,wv);
    let ww = fes(wt,zh);
    let wx = sce(c2,c2c2);
    let wy = qaq(qm2(c1c2),c0c3);  // 48-bit aligned => error free
    let wz = sce(3*c3,wy); // 3*c3: 47-bit aligned => error free
    let z1 = fes(wx,wz);
    let z2 = sce(d2,d2d2);
    let z3 = qaq(qm2(d1d2),d0d3);  // 47-bit aligned => error free
    let z4 = sce(3*d3,z3); // 3*d3: 47-bit aligned => error free
    let z5 = fes(z2,z4);
    let zi = epr(vₓₓᵧ,ws);
    let zj = epr(vₓᵧᵧ,ww);
    let z6 = fes(zi,zj);
    let zk = epr(vₓₓₓ,z1);
    let zl = epr(vᵧᵧᵧ,z5);
    let z7 = fes(zk,zl);
    let zm = epr(c3c3,vₓₓ);
    let zn = epr(d3d3,vᵧᵧ);
    let z8 = fes(zm,zn);
    let z9 = epr(c3d3,vₓᵧ);
    let za = fes(z6,z7);
    let zb = fes(z8,z9);
    let v6 = fes(za,zb);


    //let r4 = c2d2 + c3d1;
    //let r5 = c1d3 + c2d2;
    //let v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    let r4 = qaq(c2d2,c3d1);  // 48-bit aligned => error free
    let r5 = qaq(c1d3,c2d2);  // 48-bit aligned => error free
    let k1 = sce(c0,wo);  // wo: 48-bit aligned => error free
    let k2 = sce(d0,wo);
    let k3 = sce(c1,r4);
    let k4 = sce(d1,r5);
    let k5 = qaq(qm2(c3d0),c2d1);  // 48-bit aligned => error free
    let k6 = qaq(qm2(c0d3),c1d2);  // 48-bit aligned => error free
    let k7 = sce(d3,c1c1);
    let k8 = sce(c3,d1d1);
    let k9 = sce(c2,k5);
    let ka = sce(d2,k6);
    let kb = em2(fes(k1,k3));
    let kc = em2(fes(k2,k4));
    let kd = em2(sce(c0,c2c3));
    let ke = em2(sce(d0,d2d3));
    let kf = sce(c1,wc);
    let kg = sce(d1,wd);
    let kh = epr(c2c3,vₓₓ);
    let ki = epr(d2d3,vᵧᵧ);
    let kj = fes(kb,k7);
    let kk = fes(kc,k8);
    let kl = fes(kj,k9);
    let km = fes(kk,ka);
    let kn = fes(kd,kf);
    let ko = fes(ke,kg);
    let kp = em2(fes(kh,ki));
    let kq = epr(vₓₓᵧ,kl);
    let kr = epr(vₓᵧᵧ,km);
    let ks = epr(vₓₓₓ,kn);
    let kt = epr(vᵧᵧᵧ,ko);
    let ku = fes(kq,kr);
    let kv = sce(3,fes(ks,kt));
    let kw = epr(vₓᵧ,wo);
    let kx = fes(ku,kv);
    let ky = fes(kw,kp);
    let v5 = fes(kx,ky);
    
    
    //let r1 = c1d3 + r4;
    //let r2 = 2*c1c3 + c2c2;
    //let r3 = 2*d1d3 + d2d2;
    //let v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    let r1 = qaq(c1d3,r4);  // 48-bit aligned => error free
    let r2 = qaq(qm2(c1c3),c2c2);  // 48-bit aligned => error free
    let r3 = qaq(qm2(d1d3),d2d2);  // 48-bit aligned => error free
    let s1 = sce((2*c0),r1);
    let s2 = sce((2*d0),r1);
    let s5 = qaq(c1d2,qm2(c2d1));  // 48-bit aligned => error free
    let s6 = qaq(c2d1,qm2(c1d2));  // 48-bit aligned => error free
    let s3 = sce(d0,r2);
    let s4 = sce(c0,r3);
    let s7 = sce(c1,s5);
    let s8 = sce(d1,s6);
    let s9 = sce(c0,r2);
    let sa = sce(d0,r3);
    let sb = sce(c2,c1c1);
    let sc = sce(d2,d1d1);
    let sd = fes(s1,s3);
    let se = fes(s2,s4);
    let sf = fes(sd,s7);
    let sg = fes(se,s8);
    let sh = fes(s9,sb);
    let si = fes(sa,sc);
    let sj = epr(vₓₓᵧ,sf);
    let sk = epr(vₓᵧᵧ,sg);
    let sl = epr(vₓₓₓ,sh);
    let sm = epr(vᵧᵧᵧ,si);
    let sn = fes(sl,sm);
    let so = fes(sj,sk);
    let sp = fes(so,sce(3,sn));
    let ss = epr(vₓᵧ,r1);
    let st = epr(vₓₓ,r2);
    let sq = fes(ss,st);
    let su = epr(vᵧᵧ,r3);
    let sr = fes(sq,su);
    let v4 = fes(sp,sr);


    //let r6 = c1d2 + c2d1;
    //let r7 = c3d0 + c0d3;
    //let r8 = c1c2 + c0c3;
    //let r9 = d1d2 + d0d3;
    //let v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
    // 48-bit aligned => error free
    let r6 = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    let r7 = qaq(c3d0,c0d3);  // 48-bit aligned => error free
    let r8 = qaq(c1c2,c0c3);  // 48-bit aligned => error free
    let r9 = qaq(d1d2,d0d3);  // 48-bit aligned => error free
    let m1 = qaq(qm2(r6),c3d0);  // 47-bit aligned => error free
    let m2 = qaq(qm2(r6),c0d3);  // 47-bit aligned => error free
    let m3 = qaq(qm2(c2d0),c1d1);  // 48-bit aligned => error free
    let m4 = qaq(qm2(c0d2),c1d1);  // 48-bit aligned => error free
    let m5 = qaq(r8,c1c2);  // 48-bit aligned => error free
    let m6 = qaq(r9,d1d2);  // 48-bit aligned => error free
    let m7 = sce(3*c0,m5);  // 3*c0: 47-bit aligned => error free
    let m8 = sce(3*d0,m6);  // 3*c0: 47-bit aligned => error free
    let m9 = sce(c1,c1c1);
    let ma = sce(d1,d1d1);
    let mb = epr(vₓₓ,r8);
    let mc = epr(vᵧᵧ,r9);
    let md = fes(m1,r7);
    let me = fes(m2,r7);
    let mf = sce(c0,md);
    let mg = sce(d0,me);
    let mh = sce(c1,m3);
    let mi = sce(d1,m4);
    let mj = sce(c3,vₓ);
    let mk = sce(d3,vᵧ);
    let ml = fes(mf,mh);
    let mm = fes(mg,mi);
    let mn = fes(m7,m9);
    let mo = fes(m8,ma);
    let mp = qaq(r7,r6);  // 47-bit aligned => error free
    let mq = em2(fes(mb,mc));
    let mr = epr(vₓₓᵧ,ml);
    let ms = epr(vₓᵧᵧ,mm);
    let mt = epr(vₓₓₓ,mn);
    let mu = epr(vᵧᵧᵧ,mo);
    let mv = epr(vₓᵧ,mp);
    let mw = fes(mr,ms);
    let mx = fes(mt,mu);
    let my = fes(mv,mq);
    let mz = fes(mj,mk);
    let n1 = fes(mw,mx);
    let n2 = fes(my,mz);
    let v3 = fes(n1,n2);


    //let ra = c1d1 + c2d0;
    //let rb = c1d1 + c0d2;
    //let v2 =
    //    vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
    //    vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
    //    3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
    //    3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
    //    vₓᵧ*(ra + c0d2) +
    //    vₓₓ*(2*c0c2 + c1c1) + 
    //    vᵧᵧ*(2*d0d2 + d1d1) +
    //    c2*vₓ + d2*vᵧ;
    let ra = qaq(c1d1,c2d0);  // 48-bit aligned => error free
    let rb = qaq(c1d1,c0d2);  // 48-bit aligned => error free
    let l1 = qaq(qm2(ra),c0d2);  // 47-bit aligned => error free
    let l2 = qaq(qm2(rb),c2d0);  // 47-bit aligned => error free
    let l3 = sce(c0,l1);
    let l4 = sce(d0,c1c1);
    let l5 = sce(d0,l2);
    let l6 = sce(c0,d1d1);
    let l7 = sce(c0,c1c1);
    let l8 = sce(c2,c0c0);
    let l9 = sce(d0,d1d1);
    let la = sce(d2,d0d0);
    let lb = fes(l3,l4);
    
    let lc = fes(l5,l6);
    
    let ld = fes(l7,l8);
    
    let le = fes(l9,la);
    
    let lf = epr(vₓₓₓ,ld);
    let lg = epr(vᵧᵧᵧ,le);
    let lh = sce(3,fes(lf,lg));
    let li = qaq(ra,c0d2);  // 48-bit aligned => error free
    let lj = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    let lk = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    let ll = epr(vₓₓᵧ,lb);
    let lm = epr(vₓᵧᵧ,lc);
    let ln = epr(vₓᵧ,li);
    let lo = epr(vₓₓ,lj);
    let lp = epr(vᵧᵧ,lk);
    let lq = sce(c2,vₓ);
    let lr = sce(d2,vᵧ);
    let ls = fes(lq,lr);
    let lt = fes(ll,lm);
    let lu = fes(lh,ln);
    let lv = fes(lo,lp);
    let lw = fes(lt,lu);
    let lx = fes(lv,ls);
    let v2 = fes(lw,lx);


    //let rc = c1d0 + c0d1;
    //let v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    let rc = qaq(c1d0,c0d1);  // 48-bit aligned => error free
    let rd = sce(c0,vₓₓᵧ);
    
    let re = sce(d0,vₓᵧᵧ);
    
    let rf = qaq(rc,c1d0);  // 48-bit aligned => error free
    let rg = qaq(rc,c0d1);  // 48-bit aligned => error free
    let rx = sce(c1,c0c0);
    let rh = epr(rx,vₓₓₓ);
    let ry = sce(d1,d0d0);
    let ri = epr(ry,vᵧᵧᵧ);
    let rj = epr(vₓᵧ,rc);
    let rk = epr(c0c1,vₓₓ);
    let rl = epr(d0d1,vᵧᵧ);
    let rm = fes(rk,rl);
    let rn = sce(c1,vₓ);
    let ro = sce(d1,vᵧ);
    let rp = fes(rn,ro);
    let rq = epr(rd,rf);
    let rr = epr(re,rg);
    let rs = fes(rq,rr);
    let rt = sce(3,fes(rh,ri));
    let ru = fes(rj,em2(rm));
    let rv = fes(rs,rt);
    let rw = fes(ru,rp);
    let v1 = fes(rv,rw);


    // v0
    let t1 = sce(c0,vₓₓₓ);
    let t2 = sce(d0,vₓₓᵧ);
    let p4 = fes(t1,t2);
    let t3 = sce(c0,vₓᵧᵧ);
    let t4 = sce(d0,vᵧᵧᵧ);
    let p5 = fes(t3,t4);
    let p7 = fes(p4,vₓₓ);
    
    let p8 = fes(p5,vᵧᵧ);
    
    let pc = epr(c0c0,p7);
    let pd = epr(d0d0,p8);
    let p6 = fes(pc,pd);
    let pe = epr(c0d0,vₓᵧ);
    let p9 = fes(p6,pe);
    let pf = sce(c0,vₓ);
    let pg = sce(d0,vᵧ);
    let pa = fes(pf,pg);
    let pb = fes(p9,pa);
    let v0 = fes(pb,v);


    return [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffs3x3Exact_ }
