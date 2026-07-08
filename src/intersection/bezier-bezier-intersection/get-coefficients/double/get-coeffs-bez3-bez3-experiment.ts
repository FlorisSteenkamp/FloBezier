// TODO - finish - search for ////

// import { getImplicitForm3WithRunningError } from "../../../../implicit-form/double/get-implicit-form3-with-running-error.js";
// import { toPowerBasis3WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";

// const { abs } = Math;


// /**
//  * Returns a polynomial in 1 variable (including coefficientwise error bound)
//  * whose roots are the parameter values of the intersection points of 2 order 
//  * 3 bezier curves (i.e. 2 cubic bezier curves).
//  * 
//  * The returned polynomial degree will be 9
//  * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
//  * 
//  * The returned polynomial coefficients are given densely as an array of 
//  * double-double precision floating point numbers from highest to lowest power, 
//  * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
//  * 
//  * * intermediate calculations are done in double-double precision
//  * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
//  * 
//  * @param ps1 
//  * @param ps2 
//  * 
//  * @internal
//  */
// function getCoeffsBez3Bez3Z(
//         ps1: number[][], 
//         ps2: number[][]) {

//     //--------------------------------------------------------------------------
//     // See: error-analysis-double.txt
//     //--------------------------------------------------------------------------

//     const {
//         coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
//         errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
//     } = getImplicitForm3WithRunningError(ps1);

//     const {
//         coeffs: [[c3,c2,c1],[d3,d2,d1]],
//         errorBound: [[c3_,c2_,c1_],[d3_,d2_,d1_]]  // `c0` and `d0` are error free
//     } = toPowerBasis3WithRunningError(ps2);

//     const _vₓₓₓ = abs(vₓₓₓ);
//     const _vₓₓᵧ = abs(vₓₓᵧ);
//     const _vₓᵧᵧ = abs(vₓᵧᵧ);
//     const _vᵧᵧᵧ = abs(vᵧᵧᵧ);
//     const _vₓₓ  = abs(vₓₓ );
//     const _vₓᵧ  = abs(vₓᵧ );
//     const _vᵧᵧ  = abs(vᵧᵧ );
//     const _vₓ   = abs(vₓ  );
//     const _vᵧ   = abs(vᵧ  );

//     const _c1 = abs(c1);
//     const _c2 = abs(c2);
//     const _c3 = abs(c3);
//     const _d1 = abs(d1);
//     const _d2 = abs(d2);
//     const _d3 = abs(d3);

//     const c1c1 = c1*c1;
//     const c1c2 = c1*c2;
//     const c1c3 = c1*c3;
//     const c1d1 = c1*d1;
//     const c1d2 = c1*d2;
//     const c1d3 = c1*d3;
//     const c2d1 = c2*d1;
//     const c2c2 = c2*c2;
//     const c2c3 = c2*c3;
//     const c2d2 = c2*d2;
//     const c2d3 = c2*d3;
//     const c3c3 = c3*c3;
//     const c3d1 = c3*d1;
//     const c3d2 = c3*d2;
//     const c3d3 = c3*d3;
//     const d1d1 = d1*d1;
//     const d1d2 = d1*d2;
//     const d3d3 = d3*d3;
//     const d2d2 = d2*d2;
//     const d2d3 = d2*d3;
//     const d1d3 = d1*d3;

//     const _c1c1 = abs(c1c1);
//     const c1c1_ = 2*(c1_*_c1) + _c1c1;
//     const c1c2_ = c1_*_c2 + _c1*c2_ + abs(c1c2);
//     const c1c3_ = c1_*_c3 + _c1*c3_ + abs(c1c3);
//     const c1d1_ = c1_*_d1 + _c1*d1_ + abs(c1d1);
//     const c1d2_ = c1_*_d2 + _c1*d2_ + abs(c1d2);
//     const c1d3_ = c1_*_d3 + _c1*d3_ + abs(c1d3);
//     const c2d1_ = c2_*_d1 + _c2*d1_ + abs(c2d1);
//     const _c2c2 = abs(c2c2);
//     const c2c2_ = 2*(c2_*_c2) + _c2c2;
//     const c2c3_ = c2_*_c3 + _c2*c3_ + abs(c2c3);
//     const c2d2_ = c2_*_d2 + _c2*d2_ + abs(c2d2);
//     const c2d3_ = c2_*_d3 + _c2*d3_ + abs(c2d3);
//     const c3c3_ = 2*(c3_*_c3) + c3c3;
//     const c3d1_ = c3_*_d1 + _c3*d1_ + abs(c3d1);
//     const _c3d2 = abs(c3d2);
//     const c3d2_ = c3_*_d2 + _c3*d2_ + _c3d2;
//     const c3d3_ = c3_*_d3 + _c3*d3_ + abs(c3d3);

//     const _d1d1 = abs(d1d1);
//     const d1d1_ = 2*(d1_*_d1) + _d1d1;
//     const d1d2_ = d1_*_d2 + _d1*d2_ + abs(d1d2);
//     const d3d3_ = 2*(d3_*_d3) + abs(d3d3);
//     const _d2d2 = abs(d2d2);
//     const d2d2_ = 2*(d2_*_d2) + _d2d2;
//     const d2d3_ = d2_*_d3 + _d2*d3_ + abs(d2d3);
//     const _d1d3 = abs(d1d3);
//     const d1d3_ = d1_*_d3 + _d1*d3_ + _d1d3;

//     const _c2c3 = abs(c2c3);
//     const _c3c3 = abs(c3c3);
//     const _c3d3 = abs(c3d3);
//     const _d2d3 = abs(d2d3);
//     const _d3d3 = abs(d3d3);
   

//     //-----------------------
//     //const v9 =  
//     //    (c3*c3c3)*vₓₓₓ + 
//     //    (c3*d3d3)*vₓᵧᵧ + 
//     //    (d3*c3c3)*vₓₓᵧ + 
//     //    (d3*d3d3)*vᵧᵧᵧ;
//     //-----------------------
//     const g1 = c3*c3c3;
//     const _g1 = _c3*_c3c3;
//     const g1_ = c3_*_c3c3 + _c3*c3c3_ + _g1;
//     const g2 = c3*d3d3;
//     const _g2 = _c3*_d3d3;
//     const g2_ = c3_*_d3d3 + _c3*d3d3_ + _g2;
//     const g3 = d3*c3c3;
//     const _g3 = _d3*_c3c3;
//     const g3_ = d3_*_c3c3 + _d3*c3c3_ + _g3;
//     const g4 = d3*d3d3;
//     const _g4 = _d3*_d3d3;
//     const g4_ = d3_*_d3d3 + _d3*d3d3_ + _g4;
//     const g5 = g1*vₓₓₓ;
//     const g5_ = g1_*_vₓₓₓ + _g1*vₓₓₓ_ + abs(g5);
//     const g6 = g2*vₓᵧᵧ;
//     const g6_ = g2_*_vₓᵧᵧ + _g2*vₓᵧᵧ_ + abs(g6);
//     const g7 = g3*vₓₓᵧ;
//     const g7_ = g3_*_vₓₓᵧ + _g3*vₓₓᵧ_ + abs(g7);
//     const g8 = g4*vᵧᵧᵧ;
//     const g8_ = g4_*_vᵧᵧᵧ + _g4*vᵧᵧᵧ_ + abs(g8);
//     const g9 = g5 + g6;
//     const g9_ = g5_ + g6_ + abs(g9);
//     const ga = g7 + g8;
//     const ga_ = g7_ + g8_ + abs(ga);
//     const v9 = g9 + ga;
//     const v9_ = g9_ + ga_ + abs(v9);


//     //-----------------------
//     //const v8 =  
//     //    2*c2*c3d3*vₓₓᵧ + 
//     //    2*c3*d2d3*vₓᵧᵧ + 
//     //      c2*d3d3*vₓᵧᵧ + 
//     //      d2*c3c3*vₓₓᵧ + 
//     //    3*c2*c3c3*vₓₓₓ + 
//     //    3*d2*d3d3*vᵧᵧᵧ;  
//     //-----------------------
//     const w1 = 2*c2d3 + c3d2;
//     const _w1 = abs(w1);
//     const w1_ = 2*c2d3_ + c3d2_ + _w1;
//     const w2 = 2*c3d2 + c2d3;
//     const _w2 = abs(w2);
//     const w2_ = 2*c3d2_ + c2d3_ + abs(w2);
//     const w3 = c3*w1;
//     const _w3 = abs(w3);
//     const w3_ = c3_*_w1 + _c3*w1_ + _w3;
//     const w4 = d3*w2;
//     const _w4 = abs(w4);
//     const w4_ = d3_*_w2 + _d3*w2_ + _w4;
//     const w5 = c2*c3c3;
//     const _w5 = abs(w5);
//     const w5_ = c2_*_c3c3 + _c2*c3c3_ + _w5;
//     const w6 = d2*d3d3;
//     const _w6 = abs(w6);
//     const w6_ = d2_*_d3d3 + _d2*d3d3_ + _w6;
//     const w7 = vₓₓₓ*w5;
//     const w7_ = w5_*_vₓₓₓ + _vₓₓₓ*w5_ + abs(w7);
//     const u1 = vᵧᵧᵧ*w6;
//     const u1_ = w6_*_vᵧᵧᵧ + _vᵧᵧᵧ*w6_ + abs(u1);
//     const u2 = vₓₓᵧ*w3;
//     const u2_ = w3_*_vₓₓᵧ + _vₓₓᵧ*w3_ + abs(u2);
//     const u3 = vₓᵧᵧ*w4;
//     const u3_ = w4_*_vₓᵧᵧ + _vₓᵧᵧ*w4_ + abs(u3);
//     const u4 = u2 + u3;
//     const u4_ = u2_ + u3_ + abs(u4);
//     const u5 = 3*(w7 + u1);
//     const u5_ = 3*(w7_ + u1_) + abs(u5);
//     const v8 = u4 + u5;
//     const v8_ = u4_ + u5_ + abs(v8);


//     //-----------------------
//     //const v7 =  
//     //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
//     //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
//     //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
//     //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
//     //-----------------------
//     const o1 = c1*c3d3;
//     const o1_ = c1_*_c3d3 + _c1*c3d3_ + abs(o1);
//     const o2 = d1*c3c3;
//     const o2_ = d1_*_c3c3 + _d1*c3c3_ + abs(o2);
//     const o3 = c2*d2d3;
//     const o3_ = c2_*_d2d3 + _c2*d2d3_ + abs(o3);
//     const o4 = c1*d3d3;
//     const o4_ = c1_*_d3d3 + _c1*d3d3_ + abs(o4);
//     const o5 = c2*c3d2;
//     const o5_ = c2_*_c3d2 + _c2*c3d2_ + abs(o5);
//     const o6 = d3*c2c2;
//     const o6_ = d3_*_c2c2 + _d3*c2c2_ + abs(o6);
//     const o7 = c3*d1d3;
//     const o7_ = c3_*_d1d3 + _c3*d1d3_ + abs(o7);
//     const o8 = d2*c3d2;
//     const o8_ = d2_*_c3d2 + _d2*c3d2_ + abs(o8);
//     const w8 = o1 + o5;
//     const w8_ = o1_ + o5_ + abs(w8);
//     const w9 = o2 + o6;
//     const w9_ = o2_ + o6_ + abs(w9);
//     const wa = o3 + o7;
//     const wa_ = o3_ + o7_ + abs(wa);
//     const wb = o4 + o8;
//     const wb_ = o4_ + o8_ + abs(wb);
//     const wc = c1c3 + c2c2;
//     const _wc = abs(wc);
//     const wc_ = c1c3_ + c2c2_ + _wc;
//     const wd = d1d3 + d2d2;
//     const _wd = abs(wd);
//     const wd_ = d1d3_ + d2d2_ + _wd;
//     const we = 2*w8 + w9;
//     const _we = abs(we);
//     const we_ = 2*w8_ + w9_ + _we;
//     const wf = 2*wa + wb;
//     const _wf = abs(wf);
//     const wf_ = 2*wa_ + wb_ + _wf;
//     const wg = vₓₓᵧ*we;
//     const wg_ = vₓₓᵧ_*_we + _vₓₓᵧ*we_ + abs(wg);
//     const wh = vₓᵧᵧ*wf;
//     const wh_ = vₓᵧᵧ_*_wf + _vₓᵧᵧ*wf_ + abs(wh);
//     const wi = c3*wc;
//     const _wi = abs(wi);
//     const wi_ = c3_*_wc + _c3*wc_ + _wi;
//     const wj = d3*wd;
//     const _wj = abs(wj);
//     const wj_ = d3_*_wd + _d3*wd_ + _wj;
//     const wk = vₓₓₓ*wi;
//     const wk_ = vₓₓₓ_*_wi + _vₓₓₓ*wi_ + abs(wk);
//     const wl = vᵧᵧᵧ*wj;
//     const wl_ = vᵧᵧᵧ_*_wj + _vᵧᵧᵧ*wj_ + abs(wl);
//     const wm = wg + wh;
//     const wm_ = wg_ + wh_ + abs(wm);
//     const wn = 3*(wk + wl);
//     const wn_ = 3*(wk_ + wl_) + abs(wn);
//     const v7 = wm + wn;
//     const v7_ = wm_ + wn_ + abs(v7);


//     //const v6 =
//     //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + 2*c3*c2d1) +
//     //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + 2*d3*c1d2) +
//     //    vₓₓₓ*(c2*c2c2 + 6*c3*c1c2) +
//     //    vᵧᵧᵧ*(d2*d2d2 + 6*d3*d1d2) +
//     //    vₓₓ *c3c3 +
//     //    vᵧᵧ *d3d3 +
//     //    vₓᵧ *c3d3;
//     const wo = c2d3 + c3d2; 
//     const _wo = abs(wo);
//     const wo_ = c2d3_ + c3d2_ + _wo;
//     const zc = d2*c2c2;
//     const zc_ = d2_*_c2c2 + _d2*c2c2_ + abs(zc);
//     const zd = 2*c1*wo;
//     const zd_ = 2*(c1_*_wo + _c1*wo_) + abs(zd);
//     const wp = zc + zd;
//     const wp_ = zc_ + zd_ + abs(wp);
//     const ws = wp; ////
//     const _ws = abs(ws);
//     const ws_ = wp_ + _ws;
//     const zf = c2*d2d2;
//     const zf_ = c2_*_d2d2 + _c2*d2d2_ + abs(zf);
//     const zg = 2*d1*wo;
//     const zg_ = 2*(d1_*_wo + _d1*wo_) + abs(zg);
//     const wt = zf + zg;
//     const wt_ = zf_ + zg_ + abs(wt); 
//     const wu = 2*c1d2;  ////
//     const wu_ = 2*c1d2_;
//     const wv = wu;  ////
//     const _wv = abs(wv);
//     const wv_ = wu_;
//     const zh = d3*wv;
//     const zh_ = d3_*_wv + _d3*wv_ + abs(zh);
//     const ww = wt + zh;
//     const _ww = abs(ww);
//     const ww_ = wt_ + zh_ + _ww;
//     const wx = c2*c2c2;
//     const wx_ = c2_*_c2c2 + _c2*c2c2_ + abs(wx);
//     const wy = 2*c1c2;  ////
//     const _wy = abs(wy);
//     const wy_ = 2*c1c2_;
//     const q1 = 3*c3;
//     const _q1 = abs(q1);
//     const q1_ = 3*c3_ + _q1;
//     const wz = q1*wy;
//     const wz_ = q1_*_wy + _q1*wy_ + abs(wz);
//     const z1 = wx + wz;
//     const _z1 = abs(z1);
//     const z1_ = wx_ + wz_ + _z1;
//     const z2 = d2*d2d2;
//     const z2_ = d2_*_d2d2 + _d2*d2d2_ + abs(z2);
//     const z3 = 2*d1d2;  ////
//     const _z3 = abs(z3);
//     const z3_ = 2*d1d2_;
//     const q2 = 3*d3;
//     const _q2 = abs(q2);
//     const q2_ = 3*d3_ + _q2;
//     const z4 = q2*z3;
//     const z4_ = q2_*_z3 + _q2*z3_ + abs(z4);
//     const z5 = z2 + z4;
//     const _z5 = abs(z5);
//     const z5_ = z2_ + z4_ + _z5;
//     const zi = vₓₓᵧ*ws;
//     const zi_ = vₓₓᵧ_*_ws + _vₓₓᵧ*ws_ + abs(zi);
//     const zj = vₓᵧᵧ*ww;
//     const zj_ = vₓᵧᵧ_*_ww + _vₓᵧᵧ*ww_ + abs(zj);
//     const z6 = zi + zj;
//     const z6_ = zi_ + zj_ + abs(z6);
//     const zk = vₓₓₓ*z1;
//     const zk_ = vₓₓₓ_*_z1 + _vₓₓₓ*z1_ + abs(zk);
//     const zl = vᵧᵧᵧ*z5;
//     const zl_ = vᵧᵧᵧ_*_z5 + _vᵧᵧᵧ*z5_ + abs(zl);
//     const z7 = zk + zl;
//     const z7_ = zk_ + zl_ + abs(z7);
//     const zm = vₓₓ*c3c3;
//     const zm_ = c3c3_*_vₓₓ + _c3c3*vₓₓ_ + abs(zm);
//     const zn = vᵧᵧ*d3d3;
//     const zn_ = d3d3_*_vᵧᵧ + _d3d3*vᵧᵧ_ + abs(zn);
//     const z8 = zm + zn;
//     const z8_ = zm_ + zn_ + abs(z8);
//     const z9 = vₓᵧ*c3d3;
//     const z9_ = c3d3_*_vₓᵧ + _c3d3*vₓᵧ_ + abs(z9);
//     const za = z6 + z7;
//     const za_ = z6_ + z7_ + abs(za);
//     const zb = z8 + z9;
//     const zb_ = z8_ + z9_ + abs(zb);
//     const v6 = za + zb;
//     const v6_ = za_ + zb_ + abs(v6);


//     //const r4 = c2d2 + c3d1;
//     //const r5 = c1d3 + c2d2;
//     //const v5 =
//     //    vₓₓᵧ*(2*c1*r4 + d3*c1c1 + c2*c2d1) +
//     //    vₓᵧᵧ*(2*d1*r5 + c3*d1d1 + d2*c1d2) +
//     //    3*(vₓₓₓ*c1*wc + vᵧᵧᵧ*d1*wd) +
//     //    vₓᵧ*wo +
//     //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
//     const r4 = c2d2 + c3d1;
//     const _r4 = abs(r4);
//     const r4_ = c2d2_ + c3d1_ + _r4;
//     const r5 = c1d3 + c2d2;
//     const _r5 = abs(r5);
//     const r5_ = c1d3_ + c2d2_ + _r5;
//     const k3 = c1*r4;
//     const k3_ = c1_*_r4 + _c1*r4_ + abs(k3);
//     const k4 = d1*r5;
//     const k4_ = d1_*_r5 + _d1*r5_ + abs(k4);
//     const k5 = c2d1;  ////
//     const _k5 = abs(k5);
//     const k5_ = c2d1_;
//     const k6 = c1d2;  ////
//     const _k6 = abs(k6);
//     const k6_ = c1d2_;
//     const k7 = d3*c1c1;
//     const k7_ = d3_*_c1c1 + _d3*c1c1_ + abs(k7);
//     const k8 = c3*d1d1;
//     const k8_ = c3_*_d1d1 + _c3*d1d1_ + abs(k8);
//     const k9 = c2*k5;
//     const k9_ = c2_*_k5 + _c2*k5_ + abs(k9);
//     const ka = d2*k6;
//     const ka_ = d2_*_k6 + _d2*k6_ + abs(ka);
//     const kb = 2*k3;  ////
//     const kb_ = 2*k3_;
//     const kc = 2*k4;  ////
//     const kc_ = 2*k4_;
//     const kf = c1*wc;
//     const kf_ = c1_*_wc + _c1*wc_ + abs(kf);
//     const kg = d1*wd;
//     const kg_ = d1_*_wd + _d1*wd_ + abs(kg);
//     const kh = vₓₓ*c2c3;
//     const kh_ = c2c3_*_vₓₓ + _c2c3*vₓₓ_ + abs(kh);
//     const ki = vᵧᵧ*d2d3;
//     const ki_ = d2d3_*_vᵧᵧ + _d2d3*vᵧᵧ_ + abs(ki);
//     const kj = kb + k7;
//     const _kj = abs(kj);
//     const kj_ = kb_ + k7_ + _kj;
//     const kk = kc + k8;
//     const _kk = abs(kk);
//     const kk_ = kc_ + k8_ + _kk;
//     const kl = kj + k9;
//     const _kl = abs(kl)
//     const kl_ = kj_ + k9_ + _kl;
//     const km = kk + ka;
//     const _km = abs(km)
//     const km_ = kk_ + ka_ + _km;
//     const kn = kf;  ////
//     const _kn = abs(kn)
//     const kn_ = kf_;
//     const ko = kg;  ////
//     const _ko = abs(ko)
//     const ko_ = kg_;
//     const kp = 2*(kh + ki);
//     const kp_ = 2*(kh_ + ki_) + abs(kp); 
//     const kq = vₓₓᵧ*kl;
//     const kq_ = vₓₓᵧ_*_kl + _vₓₓᵧ*kl_ + abs(kq);
//     const kr = vₓᵧᵧ*km;
//     const kr_ = vₓᵧᵧ_*_km + _vₓᵧᵧ*km_ + abs(kr);
//     const ks = vₓₓₓ*kn;
//     const ks_ = vₓₓₓ_*_kn + _vₓₓₓ*kn_ + abs(ks);
//     const kt = vᵧᵧᵧ*ko;
//     const kt_ = vᵧᵧᵧ_*_ko + _vᵧᵧᵧ*ko_ + abs(kt);
//     const ku = kq + kr;
//     const ku_ = kq_ + kr_ + abs(ku);
//     const kv = 3*(ks + kt);
//     const kv_ = 3*(ks_ + kt_) + abs(kv);
//     const kw = vₓᵧ*wo;
//     const kw_ = vₓᵧ_*_wo + _vₓᵧ*wo_ + abs(kw);
//     const kx = ku + kv;
//     const kx_ = ku_ + kv_ + abs(kx);
//     const ky = kw + kp;
//     const ky_ = kw_ + kp_ + abs(ky);
//     const v5 = kx + ky;
//     const v5_ = kx_ + ky_ + abs(v5);
    
    
//     //const r1 = c1d3 + r4;
//     //const r2 = 2*c1c3 + c2c2;
//     //const r3 = 2*d1d3 + d2d2;
//     //const v4 =
//     //    vₓₓᵧ*(c1*(c1d2 + 2*c2d1)) +
//     //    vₓᵧᵧ*(d1*(c2d1 + 2*c1d2)) +
//     //    vₓₓₓ*3*c2*c1c1 +
//     //    vᵧᵧᵧ*3*d2*d1d1 +
//     //    vₓᵧ*r1 +
//     //    vₓₓ*r2 +
//     //    vᵧᵧ*r3;
//     const r1 = c1d3 + r4;
//     const _r1 = abs(r1);
//     const r1_ = c1d3_ + r4_ + _r1;
//     const r2 = 2*c1c3 + c2c2;
//     const _r2 = abs(r2);
//     const r2_ = 2*c1c3_ + c2c2_ + _r2;
//     const r3 = 2*d1d3 + d2d2;
//     const _r3 = abs(r3);
//     const r3_ = 2*d1d3_ + d2d2_ + _r3;
//     const s5 = c1d2 + 2*c2d1;
//     const _s5 = abs(s5)
//     const s5_ = c1d2_ + 2*c2d1_ + _s5;
//     const s6 = c2d1 + 2*c1d2;
//     const _s6 = abs(s6);
//     const s6_ = c2d1_ + 2*c1d2_ + _s6;
//     const s7 = c1*s5;
//     const s7_ = c1_*_s5 + _c1*s5_ + abs(s7);
//     const s8 = d1*s6;
//     const s8_ = d1_*_s6 + _d1*s6_ + abs(s8);
//     const sb = c2*c1c1;
//     const sb_ = c2_*_c1c1 + _c2*c1c1_ + abs(sb);
//     const sc = d2*d1d1;
//     const sc_ = d2_*_d1d1 + _d2*d1d1_ + abs(sc);
//     const sf = s7;  ////
//     const _sf = abs(sf);
//     const sf_ = s7_;
//     const sg = s8;  ////
//     const _sg = abs(sg);
//     const sg_ = s8_;
//     const sh = sb;  ////
//     const _sh = abs(sh);
//     const sh_ = sb_;
//     const si = sc;  ////
//     const _si = abs(si);
//     const si_ = sc_;
//     const sj = vₓₓᵧ*sf;
//     const sj_ = vₓₓᵧ_*_sf + _vₓₓᵧ*sf_ + abs(sj);
//     const sk = vₓᵧᵧ*sg;
//     const sk_ = vₓᵧᵧ_*_sg + _vₓᵧᵧ*sg_ + abs(sk);
//     const sl = vₓₓₓ*sh;
//     const sl_ = vₓₓₓ_*_sh + _vₓₓₓ*sh_ + abs(sl);
//     const sm = vᵧᵧᵧ*si;
//     const sm_ = vᵧᵧᵧ_*_si + _vᵧᵧᵧ*si_ + abs(sm);
//     const sn = sl + sm;
//     const _sn = abs(sn);
//     const sn_ = sl_ + sm_ + _sn;
//     const so = sj + sk;
//     const so_ = sj_ + sk_ + abs(so);
//     const sp = so + 3*sn;
//     const sp_ = so_ + 3*(sn_ + _sn) + abs(sp);
//     const ss = vₓᵧ*r1;
//     const ss_ = vₓᵧ_*_r1 + _vₓᵧ*r1_ + abs(ss);
//     const st = vₓₓ*r2;
//     const st_ = vₓₓ_*_r2 + _vₓₓ*r2_ + abs(st);
//     const sq = ss + st;
//     const sq_ = ss_ + st_ + abs(sq);
//     const su = vᵧᵧ*r3;
//     const su_ = vᵧᵧ_*_r3 + _vᵧᵧ*r3_ + abs(su);
//     const sr = sq + su;
//     const sr_ = sq_ + su_ + abs(sr);
//     const v4 = sp + sr;
//     const v4_ = sp_ + sr_ + abs(v4);


//     //const r6 = c1d2 + c2d1;
//     //const v3 =
//     //    vₓₓᵧ*(c1*c1d1) +
//     //    vₓᵧᵧ*(d1*c1d1) +
//     //    vₓₓₓ*(c1*c1c1) + 
//     //    vᵧᵧᵧ*(d1*d1d1) +
//     //    vₓᵧ*(r6) +
//     //    2*(vₓₓ*c1c2 + vᵧᵧ*d1d2) +
//     //    vₓ*c3 + vᵧ*d3;
//     const r6 = c1d2 + c2d1;
//     const r6_ = c1d2_ + c2d1_ + abs(r6);
//     const r8 = c1c2;  ////
//     const r8_ = c1c2_;
//     const _r8 = abs(r8);
//     const r9 = d1d2;  ////
//     const r9_ = d1d2_;
//     const _r9 = abs(r9);
//     const m1 = 2*r6;  ////
//     const m1_ = 2*r6_;
//     const m2 = 2*r6;  ////
//     const m2_ = 2*r6_;
//     const m3 = c1d1;  ////
//     const _m3 = abs(m3);
//     const m3_ = c1d1_;
//     const m4 = c1d1;  ////
//     const _m4 = abs(m4);
//     const m4_ = c1d1_;
//     const m5 = r8 + c1c2;
//     const m5_ = r8_ + c1c2_ + abs(m5);
//     const m6 = r9 + d1d2;
//     const m6_ = r9_ + d1d2_ + abs(m6);
//     const m9 = c1*c1c1;
//     const m9_ = c1_*_c1c1 + _c1*c1c1_ + abs(m9);
//     const ma = d1*d1d1;
//     const ma_ = d1_*_d1d1 + _d1*d1d1_ + abs(ma);
//     const mb = vₓₓ*r8;
//     const mb_ = vₓₓ_*_r8 + _vₓₓ*r8_ + abs(mb);
//     const mc = vᵧᵧ*r9;
//     const mc_ = vᵧᵧ_*_r9 + _vᵧᵧ*r9_ + abs(mc);
//     const mh = c1*m3;
//     const mh_ = c1_*_m3 + _c1*m3_ + abs(mh);
//     const mi = d1*m4;
//     const mi_ = d1_*_m4 + _d1*m4_ + abs(mi);
//     const mj = c3*vₓ;
//     const mj_ = c3_*_vₓ + _c3*vₓ_ + abs(mj);
//     const mk = d3*vᵧ;
//     const mk_ = d3_*_vᵧ + _d3*vᵧ_ + abs(mk);
//     const ml = mh;  ////
//     const _ml = abs(ml);
//     const ml_ = mh_;
//     const mm = mi;  ////
//     const _mm = abs(mm);
//     const mm_ = mi_;
//     const mn = m9;  ////
//     const _mn = abs(mn);
//     const mn_ = m9_;
//     const mo = ma;  ////
//     const _mo = abs(mo);
//     const mo_ = ma_;
//     const mp = r6;  ////
//     const _mp = abs(mp);
//     const mp_ = r6_;
//     const mq = 2*(mb + mc);
//     const mq_ = 2*(mb_ + mc_) + abs(mq);
//     const mr = vₓₓᵧ*ml;
//     const mr_ = vₓₓᵧ_*_ml + _vₓₓᵧ*ml_ + abs(mr);
//     const ms = vₓᵧᵧ*mm;
//     const ms_ = vₓᵧᵧ_*_mm + _vₓᵧᵧ*mm_ + abs(ms);
//     const mt = vₓₓₓ*mn;
//     const mt_ = vₓₓₓ_*_mn + _vₓₓₓ*mn_ + abs(mt);
//     const mu = vᵧᵧᵧ*mo;
//     const mu_ = vᵧᵧᵧ_*_mo + _vᵧᵧᵧ*mo_ + abs(mu);
//     const mv = vₓᵧ*mp;
//     const mv_ = vₓᵧ_*_mp + _vₓᵧ*mp_ + abs(mv);
//     const mw = mr + ms;
//     const mw_ = mr_ + ms_ + abs(mw);
//     const mx = mt + mu;
//     const mx_ = mt_ + mu_ + abs(mx);
//     const my = mv + mq;
//     const my_ = mv_ + mq_ + abs(my);
//     const mz = mj + mk;
//     const mz_ = mj_ + mk_ + abs(mz);
//     const n1 = mw + mx;
//     const n1_ = mw_ + mx_ + abs(n1);
//     const n2 = my + mz;
//     const n2_ = my_ + mz_ + abs(n2);
//     const v3 = n1 + n2;
//     const v3_ = n1_ + n2_ + abs(v3);


//     //const ra = c1d1;
//     //const rb = c1d1;
//     //const v2 =
//     //    vₓᵧ*ra +
//     //    vₓₓ*(c1c1) + 
//     //    vᵧᵧ*(d1d1) +
//     //    c2*vₓ + d2*vᵧ;
//     const ra = c1d1;  ////
//     const ra_ = c1d1_;
//     const li = ra;  ////
//     const _li = abs(li);
//     const li_ = ra_;
//     const lj = c1c1;  ////
//     const _lj = abs(lj);
//     const lj_ = c1c1_;
//     const lk = d1d1;  ////
//     const _lk = abs(lk);
//     const lk_ = d1d1_;
//     const ln = vₓᵧ*li;
//     const ln_ = vₓᵧ_*_li + _vₓᵧ*li_ + abs(ln);
//     const lo = vₓₓ*lj;
//     const lo_ = vₓₓ_*_lj + _vₓₓ*lj_ + abs(lo);
//     const lp = vᵧᵧ*lk;
//     const lp_ = vᵧᵧ_*_lk + _vᵧᵧ*lk_ + abs(lp);
//     const lq = c2*vₓ;
//     const lq_ = c2_*_vₓ + _c2*vₓ_ + abs(lq);
//     const lr = d2*vᵧ;
//     const lr_ = d2_*_vᵧ + _d2*vᵧ_ + abs(lr);
//     const ls = lq + lr;
//     const ls_ = lq_ + lr_ + abs(ls);
//     const lu = ln;  ////
//     const lu_ = ln_;
//     const lv = lo + lp;
//     const lv_ = lo_ + lp_ + abs(lv);
//     const lw = lu;  ////
//     const lw_ = lu_;
//     const lx = lv + ls;
//     const lx_ = lv_ + ls_ + abs(lx);
//     const v2 = lw + lx;
//     const v2_ = lw_ + lx_ + abs(v2);


//     // const v1 = c1*vₓ + d1*vᵧ
//     const rn = c1*vₓ;
//     const rn_ = c1_*_vₓ + _c1*vₓ_ + abs(rn);
//     const ro = d1*vᵧ;
//     const ro_ = d1_*_vᵧ + _d1*vᵧ_ + abs(ro);
//     const v1 = rn + ro;
//     const v1_ = rn_ + ro_ + abs(v1);


//     return {
//         coeffs:   [v9, v8, v7, v6, v5, v4, v3, v2, v1],
//         errBound: [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_]  // still to be multiplied by `γ1`
//     };
// }


// export { getCoeffsBez3Bez3Z }
