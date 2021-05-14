import { getImplicitForm3InclError } from "../../../../implicit-form/double-incl-error/get-implicit-form3-incl-error";
import { γ } from '../../../../error-analysis/error-analysis';
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of 2 order 
 * 3 bezier curves (i.e. 2 cubic bezier curves).
 * 
 * The returned polynomial degree will be 9
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * intermediate calculations are done in double precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez3Bez3InclError(ps1: number[][], ps2: number[][]) {

    const { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3InclError(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2); // Assume exact -> max bitlength = 47

    const _vₓₓₓ = abs(vₓₓₓ);
    const _vₓₓᵧ = abs(vₓₓᵧ);
    const _vₓᵧᵧ = abs(vₓᵧᵧ);
    const _vᵧᵧᵧ = abs(vᵧᵧᵧ);
    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);

    const c0c0 = c0*c0;
    const c0c1 = c0*c1;
    const c0c2 = c0*c2;
    const c0c3 = c0*c3;
    const c0d0 = c0*d0;
    const c0d1 = c0*d1;
    const c0d2 = c0*d2;
    const c0d3 = c0*d3;
    const c1c1 = c1*c1;
    const c1c2 = c1*c2;
    const c1c3 = c1*c3;
    const c1d0 = c1*d0;
    const c1d1 = c1*d1;
    const c1d2 = c1*d2;
    const c1d3 = c1*d3;
    const c2d1 = c2*d1;
    const c2c2 = c2*c2;    
    const c2c3 = c2*c3;
    const c2d0 = c2*d0;
    const c2d2 = c2*d2;
    const c2d3 = c2*d3;
    const c3c3 = c3*c3;
    const c3d0 = c3*d0;
    const c3d1 = c3*d1;
    const c3d2 = c3*d2;
    const c3d3 = c3*d3;
    
    const d0d0 = d0*d0;
    const d0d1 = d0*d1;
    const d0d2 = d0*d2;
    const d0d3 = d0*d3;
    const d1d1 = d1*d1;
    const d1d2 = d1*d2;
    const d3d3 = d3*d3;
    const d2d2 = d2*d2;
    const d2d3 = d2*d3;
    const d1d3 = d1*d3;
    
    const _c0c0 = abs(c0c0);
    const _c0c1 = abs(c0c1);
    const _c0c2 = abs(c0c2);
    const _c0c3 = abs(c0c3);
    const _c0d1 = abs(c0d1);
    const _c0d2 = abs(c0d2);
    const _c0d3 = abs(c0d3);
    const _c1c1 = abs(c1c1);
    const _c1c2 = abs(c1c2);    
    const _c1c3 = abs(c1c3);
    const _c2c2 = abs(c2c2);
    const _c2c3 = abs(c2c3);
    const _c2d2 = abs(c2d2);
    const _c1d0 = abs(c1d0);
    const _c1d1 = abs(c1d1);
    const _c1d2 = abs(c1d2);
    const _c1d3 = abs(c1d3);
    const _c2d0 = abs(c2d0);
    const _c2d1 = abs(c2d1);
    const _c2d3 = abs(c2d3);
    const _c3c3 = abs(c3c3);
    const _c3d0 = abs(c3d0);
    const _c3d1 = abs(c3d1);
    const _c3d2 = abs(c3d2);
    const _c3d3 = abs(c3d3);
    const _c0d0 = abs(c0d0);

    const _d0d0 = abs(d0d0);
    const _d0d1 = abs(d0d1);
    const _d0d2 = abs(d0d2);
    const _d0d3 = abs(d0d3);
    const _d1d1 = abs(d1d1);
    const _d1d2 = abs(d1d2);
    const _d1d3 = abs(d1d3);
    const _d2d2 = abs(d2d2);
    const _d2d3 = abs(d2d3);
    const _d3d3 = abs(d3d3);
   
    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _c2 = abs(c2);
    const _c3 = abs(c3);
    const _d0 = abs(d0);
    const _d1 = abs(d1);
    const _d2 = abs(d2);
    const _d3 = abs(d3);

    //const v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    const g1 = c3*c3c3;
    const _g1 = _c3*_c3c3;
    const g1_ = 2*_g1;
    const g2 = c3*d3d3;
    const _g2 = _c3*_d3d3;
    const g2_ = 2*_g2;
    const g3 = d3*c3c3;
    const _g3 = _d3*_c3c3;
    const g3_ = 2*_g3;
    const g4 = d3*d3d3;
    const _g4 = _d3*_d3d3;
    const g4_ = 2*_g4;
    const g5 = g1*vₓₓₓ;
    const g5_ = g1_*_vₓₓₓ + _g1*vₓₓₓ_ + abs(g5);
    const g6 = g2*vₓᵧᵧ;
    const g6_ = g2_*_vₓᵧᵧ + _g2*vₓᵧᵧ_ + abs(g2);
    const g7 = g3*vₓₓᵧ;
    const g7_ = g3_*_vₓₓᵧ + _g3*vₓₓᵧ_ + abs(g3);
    const g8 = g4*vᵧᵧᵧ;
    const g8_ = g4_*_vᵧᵧᵧ + _g4*vᵧᵧᵧ_ + abs(g4);
    const g9 = g5 + g6;
    const g9_ = g5_ + g6_ + abs(g9);
    const ga = g7 + g8;
    const ga_ = g7_ + g8_ + abs(ga);
    const v9 = g9 + ga;
    const v9_ = g9_ + ga_ + abs(v9);

    //const v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    const w1 = 2*c2d3 + c3d2;
    const w1_ = 2*_c2d3 + _c3d2 + abs(w1);
    const w2 = 2*c3d2 + c2d3;
    const w2_ = 2*_c3d2 + _c2d3 + abs(w2);
    const w3 = c3*w1;
    const _w3 = abs(w3);
    const w3_ = _c3*w1_ + _w3;
    const w4 = d3*w2;
    const _w4 = abs(w4);
    const w4_ = _d3*w2_ + w4;
    const w5 = c2*c3c3;
    const _w5 = abs(w5);
    const w5_ = _c2*_c3c3 + w5;
    const w6 = d2*d3d3;
    const _w6 = abs(w6);
    const w6_ = _d2*_d3d3 + w6;
    const w7 = vₓₓₓ*w5;
    const w7_ = vₓₓₓ_*_w5 + _vₓₓₓ*w5_ + abs(w7);
    const u1 = vᵧᵧᵧ*w6;
    const u1_ = vᵧᵧᵧ_*_w6 + _vᵧᵧᵧ*w6_ + abs(u1);
    const u2 = vₓₓᵧ*w3;
    const u2_ = vₓₓᵧ_*_w3 + _vₓₓᵧ*w3_ + abs(u2);
    const u3 = vₓᵧᵧ*w4;
    const u3_ = vₓᵧᵧ_*_w4 + _vₓᵧᵧ*w4_ + abs(u3);
    const u4 = u2 + u3;
    const u4_ = u2_ + u3_ + abs(u4);
    const u5 = 3*(w7 + u1);
    const u5_ = 3*(w7_ + u1_) + 2*abs(u5)
    const v8 = u4 + u5;
    const v8_ = u4_ + u5_ + abs(v8);

    //const w1 = c2*vₓₓᵧ + d2*vₓᵧᵧ;
    //const _w1 = abs(w1);
    //const w1_ = _c2*vₓₓᵧ_ + _d2*vₓᵧᵧ_ + _w1;
    //const w2 = d2*vₓₓᵧ + 3*c2*vₓₓₓ;
    //const _w2 = abs(w2);
    //const w2_ = _d2*vₓₓᵧ_ + 3*_c2*vₓₓₓ_ + _w2;
    //const w3 = c2*vₓᵧᵧ + 3*d2*vᵧᵧᵧ;
    //const _w3 = abs(w3);
    //const w3_ = _c2*vₓᵧᵧ_ + _d2*vᵧᵧᵧ_ + _w3;
    //const w5 = c3c3*w2;
    //const w5_ = _c3c3*(_w2 + w2_) + abs(w5);
    //const w6 = d3d3*w3;
    //const w6_ = _d3d3*(_w3 + w3_) + abs(w6);
    //const w4 = w5 + w6;
    //const _w4 = abs(w4);
    //const w4_ = w5_ + w6_ + _w4;
    //const w7 = 2*c3d3*w1;
    //const _w7 = abs(w7);
    //const w7_ = 2*(_c3d3*_w1 + _c3d3*w1_ + _w7);
    //const v8 = w7 + w4;
    //const v8_ = w7_ + w4_ + abs(v8);


    //const v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    const o1 = c1*c3d3;
    const o1_ = _c1*_c3d3 + abs(o1);
    const o2 = d1*c3c3;
    const o2_ = _d1*_c3c3 + abs(o2);
    const o3 = c2*d2d3;
    const o3_ = _c2*_d2d3 + abs(o3);
    const o4 = c1*d3d3;
    const o4_ = _c1*_d3d3 + abs(o4);
    const o5 = c2*c3d2;
    const o5_ = _c2*_c3d2 + abs(o5);
    const o6 = d3*c2c2;
    const o6_ = _d3*_c2c2 + abs(o6);
    const o7 = c3*d1d3;
    const o7_ = _c3*_d1d3 + abs(o7);
    const o8 = d2*c3d2;
    const o8_ = _d2*_c3d2 + abs(o8);
    const w8 = o1 + o5;
    const w8_ = o1_ + o5_ + abs(w8);
    const w9 = o2 + o6;
    const w9_ = o2_ + o6_ + abs(w9);
    const wa = o3 + o7;
    const wa_ = o3_ + o7_ + abs(wa);
    const wb = o4 + o8;
    const wb_ = o4_ + o8_ + abs(wb);
    const wc = c1c3 + c2c2;
    const wc_ = _c1c3 + _c2c2 + abs(wc);
    const wd = d1d3 + d2d2;
    const wd_ = _d1d3 + _d2d2 + abs(wd);
    const we = 2*w8 + w9;
    const _we = abs(we);
    const we_ = 2*w8_ + w9_ + _we;
    const wf = 2*wa + wb;
    const _wf = abs(wf);
    const wf_ = 2*wa_ + wb_ + _wf;
    const wg = vₓₓᵧ*we;
    const wg_ = vₓₓᵧ_*_we + _vₓₓᵧ*we_ + abs(wg);
    const wh = vₓᵧᵧ*wf;
    const wh_ = vₓᵧᵧ_*_wf + _vₓᵧᵧ*wf_ + abs(wh);
    const wi = c3*wc;
    const _wi = abs(wi);
    const wi_ = _c3*wc_ + _wi;
    const wj = d3*wd;
    const _wj = abs(wj);
    const wj_ = _d3*wd_ + _wj;
    const wk = vₓₓₓ*wi;
    const wk_ = vₓₓₓ_*_wi + _vₓₓₓ*wi_ + abs(wk);
    const wl = vᵧᵧᵧ*wj;
    const wl_ = vᵧᵧᵧ_*_wj + _vᵧᵧᵧ*wj_ + abs(wl);
    const wm = wg + wh;
    const wm_ = wg_ + wh_ + abs(wm);
    const wn = 3*(wk + wl);
    const wn_ = 3*(wk_ + wl_) + 2*abs(wn);
    const v7 = wm + wn;
    const v7_ = wm_ + wn_ + abs(v7);

    //const v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    const wo = c2d3 + c3d2;
    const _wo = abs(wo);
    const wo_ = _c2d3 + _c3d2 + _wo;
    const zc = d2*c2c2;
    const zc_ = _d2*_c2c2 + abs(zc);
    const zd = 2*c1*wo;
    const zd_ = 2*(_c1*wo_) + abs(zd);
    const wp = zc + zd;
    const wp_ = zc_ + zd_ + abs(wp);
    const wq = 2*(c0d3 + c2d1);
    const wq_ = 2*(_c0d3 + _c2d1) + abs(wq);
    const wr = wq + c3d0;
    const wr_ = wq_ + _c3d0 + abs(wr);
    const ze = c3*wr;
    const ze_ = _c3*wr_ + abs(ze)
    const ws = wp + ze;
    const _ws = abs(ws);
    const ws_ = wp_ + ze_ + _ws;
    const zf = c2*d2d2;
    const zf_ = _c2*_d2d2 + abs(zf);
    const zg = 2*d1*wo;
    const zg_ = 2*(_d1*wo_) + abs(zg);
    const wt = zf + zg;
    const wt_ = zf_ + zg_ + abs(wt); 
    const wu = 2*(c1d2 + c3d0);
    const wu_ = 2*(_c1d2 + _c3d0) + abs(wu);
    const wv = wu + c0d3;
    const wv_ = wu_ + _c0d3 + abs(wv);
    const zh = d3*wv;
    const zh_ = _d3*wv_ + abs(zh)
    const ww = wt + zh;
    const _ww = abs(ww);
    const ww_ = wt_ + zh_ + _ww;
    const wx = c2*c2c2;
    const wx_ = _c2*_c2c2 + abs(wx);
    const wy = 2*c1c2 + c0c3;
    const wy_ = 2*_c1c2 + _c0c3 + abs(wy);
    const wz = 3*(c3*wy);
    const wz_ = 3*_c3*wy_ + 2*abs(wz);
    const z1 = wx + wz;
    const _z1 = abs(z1);
    const z1_ = wx_ + wz_ + _z1;
    const z2 = d2*d2d2;
    const z2_ = _d2*_d2d2 + abs(z2);
    const z3 = 2*d1d2 + d0d3;
    const z3_ = 2*_d1d2 + _d0d3 + abs(z3);
    const z4 = 3*(d3*z3);
    const z4_ = 3*(_d3*z3_) + 2*abs(z4);
    const z5 = z2 + z4;
    const _z5 = abs(z5);
    const z5_ = z2_ + z4_ + _z5;
    const zi = vₓₓᵧ*ws;
    const zi_ = vₓₓᵧ_*_ws + _vₓₓᵧ*ws_ + abs(zi);
    const zj = vₓᵧᵧ*ww;
    const zj_ = vₓᵧᵧ_*_ww + _vₓᵧᵧ*ww_ + abs(zj);
    const z6 = zi + zj;
    const z6_ = zi_ + zj_ + abs(z6);
    const zk = vₓₓₓ*z1;
    const zk_ = vₓₓₓ_*_z1 + _vₓₓₓ*z1_ + abs(zk);
    const zl = vᵧᵧᵧ*z5;
    const zl_ = vᵧᵧᵧ_*_z5 + _vᵧᵧᵧ*z5_ + abs(zl);
    const z7 = zk + zl;
    const z7_ = zk_ + zl_ + abs(z7);
    const zm = vₓₓ*c3c3;
    const zm_ = _c3c3*(vₓₓ_ + _vₓₓ) + abs(zm);
    const zn = vᵧᵧ*d3d3;
    const zn_ = _d3d3*(vᵧᵧ_ + _vᵧᵧ) + abs(zn);
    const z8 = zm + zn;
    const z8_ = zm_ + zn_ + abs(z8);
    const z9 = vₓᵧ*c3d3;
    const z9_ = _c3d3*(vₓᵧ_ + _vₓᵧ) + abs(z9);
    const za = z6 + z7;
    const za_ = z6_ + z7_ + abs(za);
    const zb = z8 + z9;
    const zb_ = z8_ + z9_ + abs(zb);
    const v6 = za + zb;
    const v6_ = za_ + zb_ + abs(z6);


    //const r4 = c2d2 + c3d1;
    //const r5 = c1d3 + c2d2;
    //const v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    const r4 = c2d2 + c3d1;
    const r4_ = _c2d2 + _c3d1 + abs(r4);
    const r5 = c1d3 + c2d2;
    const r5_ = _c1d3 + _c2d2 + abs(r5);
    const k1 = c0*wo;
    const k1_ = _c0*wo_ + abs(k1);
    const k2 = d0*wo;
    const k2_ = _d0*wo_ + abs(k2);
    const k3 = c1*r4;
    const k3_ = _c1*r4_ + abs(k3);
    const k4 = d1*r5;
    const k4_ = _d1*r5_ + abs(k4);
    const k5 = 2*c3d0 + c2d1;
    const k5_ = 2*_c3d0 + _c2d1 + abs(k5);
    const k6 = 2*c0d3 + c1d2;
    const k6_ = 2*_c0d3 + _c1d2 + abs(k6);
    const k7 = d3*c1c1;
    const k7_ = _d3*_c1c1 + abs(k7);
    const k8 = c3*d1d1;
    const k8_ = _c3*_d1d1 + abs(k8);
    const k9 = c2*k5;
    const k9_ = _c2*k5_ + abs(k9);
    const ka = d2*k6;
    const ka_ = _d2*k6_ + abs(ka);
    const kb = 2*(k1 + k3);
    const kb_ = 2*(k1_ + k3_) + abs(kb);
    const kc = 2*(k2 + k4);
    const kc_ = 2*(k2_ + k4_) + abs(kc);
    const kd = 2*c0*c2c3;
    const kd_ = 2*(_c0*_c2c3) + abs(kd);
    const ke = 2*d0*d2d3;
    const ke_ = 2*(_d0*_d2d3) + abs(ke);
    const kf = c1*wc;
    const kf_ = _c1*wc_ + abs(kf);
    const kg = d1*wd;
    const kg_ = _d1*wd_ + abs(kg);
    const kh = vₓₓ*c2c3;
    const kh_ = _c2c3*(vₓₓ_ + _vₓₓ) + abs(kh);
    const ki = vᵧᵧ*d2d3;
    const ki_ = _d2d3*(vᵧᵧ_ + _vᵧᵧ) + abs(ki);
    const kj = kb + k7;
    const kj_ = kb_ + k7_ + abs(kj);
    const kk = kc + k8;
    const kk_ = kc_ + k8_ + abs(kk);
    const kl = kj + k9;
    const _kl = abs(kl)
    const kl_ = kj_ + k9_ + _kl;
    const km = kk + ka;
    const _km = abs(km)
    const km_ = kk_ + ka_ + _km;
    const kn = kd + kf;
    const _kn = abs(kn)
    const kn_ = kd_ + kf_ + _kn;
    const ko = ke + kg;
    const _ko = abs(ko)
    const ko_ = ke_ + kg_ + _ko;
    const kp = 2*(kh + ki);
    const kp_ = 2*(kh_ + ki_) + abs(kp); 
    const kq = vₓₓᵧ*kl;
    const kq_ = vₓₓᵧ_*_kl + _vₓₓᵧ*kl_ + abs(kq);
    const kr = vₓᵧᵧ*km;
    const kr_ = vₓᵧᵧ_*_km + _vₓᵧᵧ*km_ + abs(kr);
    const ks = vₓₓₓ*kn;
    const ks_ = vₓₓₓ_*_kn + _vₓₓₓ*kn_ + abs(ks);
    const kt = vᵧᵧᵧ*ko;
    const kt_ = vᵧᵧᵧ_*_ko + _vᵧᵧᵧ*ko_ + abs(kt);
    const ku = kq + kr;
    const ku_ = kq_ + kr_ + abs(ku);
    const kv = 3*(ks + kt);
    const kv_ = 3*(ks_ + kt_) + 2*abs(kv);
    const kw = vₓᵧ*wo;
    const kw_ = vₓᵧ_*_wo + _vₓᵧ*wo_ + abs(kw);
    const kx = ku + kv;
    const kx_ = ku_ + kv_ + abs(kx);
    const ky = kw + kp;
    const ky_ = kw_ + kp_ + abs(ky);
    const v5 = kx + ky;
    const v5_ = kx_ + ky_ + abs(v5);
    

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
    const r1 = c1d3 + r4;
    const _r1 = abs(r1);
    const r1_ = _c1d3 + r4_ + _r1;
    const r2 = 2*c1c3 + c2c2;
    const _r2 = abs(r2);
    const r2_ = 2*_c1c3 + _c2c2 + _r2;
    const r3 = 2*d1d3 + d2d2;
    const _r3 = abs(r3);
    const r3_ = 2*_d1d3 + _d2d2 + _r3;
    const s1 = 2*c0*r1;
    const s1_ = 2*_c0*r1_ + abs(s1);
    const s2 = 2*d0*r1;
    const s2_ = 2*_d0*r1_ + abs(s2);
    const s5 = c1d2 + 2*c2d1;
    const s5_ = _c1d2 + 2*_c2d1 + abs(s5);
    const s6 = c2d1 + 2*c1d2;
    const s6_ = _c2d1 + 2*_c1d2 + abs(s6);
    const s3 = d0*r2;
    const s3_ = _d0*r2_ + abs(s3);
    const s4 = c0*r3;
    const s4_ = _c0*r3_ + abs(s4);
    const s7 = c1*s5;
    const s7_ = _c1*s5_ + abs(s7);
    const s8 = d1*s6;
    const s8_ = _d1*s6_ + abs(s8);
    const s9 = c0*r2;
    const s9_ = _c0*r2_ + abs(s9);
    const sa = d0*r3;
    const sa_ = _d0*r3_ + abs(sa);
    const sb = c2*c1c1;
    const sb_ = _c2*_c1c1 + abs(sb);
    const sc = d2*d1d1;
    const sc_ = _d2*_d1d1 + abs(sc);
    const sd = s1 + s3;
    const sd_ = s1_ + s3_ + abs(sd);
    const se = s2 + s4;
    const se_ = s2_ + s4_ + abs(se);
    const sf = sd + s7;
    const _sf = abs(sf);
    const sf_ = sd_ + s7_ + _sf;
    const sg = se + s8;
    const _sg = abs(sg);
    const sg_ = se_ + s8_ + _sg;
    const sh = s9 + sb;
    const _sh = abs(sh);
    const sh_ = s9_ + sb_ + _sh;
    const si = sa + sc;
    const _si = abs(si);
    const si_ = sa_ + sc_ + _si;
    const sj = vₓₓᵧ*sf;
    const sj_ = vₓₓᵧ_*_sf + _vₓₓᵧ*sf_ + abs(sj);
    const sk = vₓᵧᵧ*sg;
    const sk_ = vₓᵧᵧ_*_sg + _vₓᵧᵧ*sg_ + abs(sk);
    const sl = vₓₓₓ*sh;
    const sl_ = vₓₓₓ_*_sh + _vₓₓₓ*sh_ + abs(sl);
    const sm = vᵧᵧᵧ*si;
    const sm_ = vᵧᵧᵧ_*_si + _vᵧᵧᵧ*si_ + abs(sm);
    const sn = sl + sm;
    const _sn = abs(sn);
    const sn_ = sl_ + sm_ + _sn;
    const so = sj + sk;
    const so_ = sj_ + sk_ + abs(so);
    const sp = so + 3*sn;
    const sp_ = so_ + 3*(sn_ + _sn) + abs(sp);
    const ss = vₓᵧ*r1;
    const ss_ = vₓᵧ_*_r1 + _vₓᵧ*r1_ + abs(ss);
    const st = vₓₓ*r2;
    const st_ = vₓₓ_*_r2 + _vₓₓ*r2_ + abs(st);
    const sq = ss + st;
    const sq_ = ss_ + st_ + abs(sq);
    const su = vᵧᵧ*r3;
    const su_ = vᵧᵧ_*_r3 + _vᵧᵧ*r3_ + abs(su);
    const sr = sq + su;
    const sr_ = sq_ + su_ + abs(sr);
    const v4 = sp + sr;
    const v4_ = sp_ + sr_ + abs(v4);


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
    const r6 = c1d2 + c2d1;
    const r6_ = _c1d2 + _c2d1 + abs(r6);
    const r7 = c3d0 + c0d3;
    const r7_ = _c3d0 + _c0d3 + abs(r7);
    const r8 = c1c2 + c0c3;
    const _r8 = abs(r8);
    const r8_ = _c1c2 + _c0c3 + _r8;
    const r9 = d1d2 + d0d3;
    const _r9 = abs(r9);
    const r9_ = _d1d2 + _d0d3 + _r9;
    const m1 = 2*r6 + c3d0;
    const m1_ = 2*r6_ + _c3d0 + abs(m1)
    const m2 = 2*r6 + c0d3;
    const m2_ = 2*r6_ + _c0d3 + abs(m2)
    const m3 = 2*c2d0 + c1d1;
    const m3_ = 2*_c2d0 + _c1d1 + abs(m3)
    const m4 = 2*c0d2 + c1d1;
    const m4_ = 2*_c0d2 + _c1d1 + abs(m4)
    const m5 = r8 + c1c2;
    const m5_ = r8_ + _c1c2 + abs(m5);
    const m6 = r9 + d1d2;
    const m6_ = r9_ + _d1d2 + abs(m6);
    const m7 = 3*c0*m5;
    const m7_ = 3*(_c0*m5_) + 2*abs(m7);
    const m8 = 3*d0*m6;
    const m8_ = 3*(_d0*m6_) + 2*abs(m8);
    const m9 = c1*c1c1;
    const m9_ = _c1*_c1c1 + abs(m9);
    const ma = d1*d1d1;
    const ma_ = _d1*_d1d1 + abs(ma);
    const mb = vₓₓ*r8;
    const mb_ = vₓₓ_*_r8 + _vₓₓ*r8_ + abs(mb);
    const mc = vᵧᵧ*r9;
    const mc_ = vᵧᵧ_*_r9 + _vᵧᵧ*r9_ + abs(mc);
    const md = m1 + r7;
    const md_ = m1_ + r7_ + abs(md);
    const me = m2 + r7;
    const me_ = m2_ + r7_ + abs(me);
    const mf = c0*md;
    const mf_ = _c0*md_ + abs(mf);
    const mg = d0*me;
    const mg_ = _d0*me_ + abs(mg);
    const mh = c1*m3;
    const mh_ = _c1*m3_ + abs(mh);
    const mi = d1*m4;
    const mi_ = _d1*m4_ + abs(mi);
    const mj = c3*vₓ;
    const mj_ = _c3*vₓ_ + abs(mj);
    const mk = d3*vᵧ;
    const mk_ = _d3*vᵧ_ + abs(mk);
    const ml = mf + mh;
    const _ml = abs(ml);
    const ml_ = mf_ + mh_ + _ml;
    const mm = mg + mi;
    const _mm = abs(mm);
    const mm_ = mg_ + mi_ + _mm;
    const mn = m7 + m9;
    const _mn = abs(mn);
    const mn_ = m7_ + m9_ + _mn;
    const mo = m8 + ma;
    const _mo = abs(mo);
    const mo_ = m8_ + ma_ + _mo;
    const mp = r7 + r6;
    const _mp = abs(mp);
    const mp_ = r7_ + r6_ + _mp;
    const mq = 2*(mb + mc);
    const mq_ = 2*(mb_ + mc_) + abs(mq);
    const mr = vₓₓᵧ*ml;
    const mr_ = vₓₓᵧ_*_ml + _vₓₓᵧ*ml_ + abs(mr);
    const ms = vₓᵧᵧ*mm;
    const ms_ = vₓᵧᵧ_*_mm + _vₓᵧᵧ*mm_ + abs(ms);
    const mt = vₓₓₓ*mn;
    const mt_ = vₓₓₓ_*_mn + _vₓₓₓ*mn_ + abs(mt);
    const mu = vᵧᵧᵧ*mo;
    const mu_ = vᵧᵧᵧ_*_mo + _vᵧᵧᵧ*mo_ + abs(mu);
    const mv = vₓᵧ *mp;
    const mv_ = vₓᵧ_*_mp + _vₓᵧ*mp_ + abs(mv);
    const mw = mr + ms;
    const mw_ = mr_ + ms_ + abs(mw);
    const mx = mt + mu;
    const mx_ = mt_ + mu_ + abs(mx);
    const my = mv + mq;
    const my_ = mv_ + mq_ + abs(my);
    const mz = mj + mk;
    const mz_ = mj_ + mk_ + abs(mz);
    const n1 = mw + mx;
    const n1_ = mw_ + mx_ + abs(n1);
    const n2 = my + mz;
    const n2_ = my_ + mz_ + abs(n2);
    const v3 = n1 + n2;
    const v3_ = n1_ + n2_ + abs(v3);


//    const ra = c1d1 + c2d0;
//    const rb = c1d1 + c0d2;
//    const v2 =
//        vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
//        vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
//        3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
//        3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
//        vₓᵧ*(ra + c0d2) +
//        vₓₓ*(2*c0c2 + c1c1) + 
//        vᵧᵧ*(2*d0d2 + d1d1) +
//        c2*vₓ + d2*vᵧ;
    const ra = c1d1 + c2d0;
    const ra_ = _c1d1 + _c2d0 + abs(ra);
    const rb = c1d1 + c0d2;
    const rb_ = _c1d1 + _c0d2 + abs(rb);
    const l1 = 2*ra + c0d2;
    const l1_ = 2*ra_ + _c0d2 + abs(l1);
    const l2 = 2*rb + c2d0;
    const l2_ = 2*rb_ + _c2d0 + abs(l2);
    const l3 = c0*l1;
    const l3_ = _c0*l1_ + abs(l3);
    const l4 = d0*c1c1;
    const l4_ = _d0*_c1c1 + abs(l4);
    const l5 = d0*l2;
    const l5_ = _d0*l2_ + abs(l5);
    const l6 = c0*d1d1;
    const l6_ = _c0*_d1d1 + abs(l6);
    const l7 = c0*c1c1;
    const l7_ = _c0*_c1c1 + abs(l7);
    const l8 = c2*c0c0;
    const l8_ = _c2*_c0c0 + abs(l8);
    const l9 = d0*d1d1;
    const l9_ = _d0*_d1d1 + abs(l9);
    const la = d2*d0d0;
    const la_ = _d2*_d0d0 + abs(la);
    const lb = l3 + l4;
    const _lb = abs(lb);
    const lb_ = l3_ + l4_ + _lb;
    const lc = l5 + l6;
    const _lc = abs(lc);
    const lc_ = l5_ + l6_ + _lc;
    const ld = l7 + l8;
    const _ld = abs(ld);
    const ld_ = l7_ + l8_ + _ld;
    const le = l9 + la;
    const _le = abs(le);
    const le_ = l9_ + la_ + _le;
    const lf = vₓₓₓ*ld;
    const lf_ = vₓₓₓ_*_ld + _vₓₓₓ*ld_ + abs(lf);
    const lg = vᵧᵧᵧ*le;
    const lg_ = vᵧᵧᵧ_*_le + _vᵧᵧᵧ*le_ + abs(lg);
    const lh = 3*(lf + lg);
    const lh_ = 3*(lf_ + lg_) + 2*abs(lh);
    const li = ra + c0d2;
    const _li = abs(li);
    const li_ = ra_ + _c0d2 + _li;
    const lj = 2*c0c2 + c1c1;
    const _lj = abs(lj);
    const lj_ = 2*_c0c2 + _c1c1 + _lj;
    const lk = 2*d0d2 + d1d1;
    const _lk = abs(lk);
    const lk_ = 2*_d0d2 + _d1d1 + _lk;
    const ll = vₓₓᵧ*lb;
    const ll_ = vₓₓᵧ_*_lb + _vₓₓᵧ*lb_ + abs(ll);
    const lm = vₓᵧᵧ*lc;
    const lm_ = vₓᵧᵧ_*_lc + _vₓᵧᵧ*lc_ + abs(lm);
    const ln = vₓᵧ*li;
    const ln_ = vₓᵧ_*_li + _vₓᵧ*li_ + abs(ln);
    const lo = vₓₓ*lj;
    const lo_ = vₓₓ_*_lj + _vₓₓ*lj_ + abs(lo);
    const lp = vᵧᵧ*lk;
    const lp_ = vᵧᵧ_*_lk + _vᵧᵧ*lk_ + abs(lp);
    const lq = c2*vₓ; 
    const lq_ = _c2*vₓ_ + abs(lq);
    const lr = d2*vᵧ;
    const lr_ = _d2*vᵧ_ + abs(lr);
    const ls = lq + lr;
    const ls_ = lq_ + lr_ + abs(ls);
    const lt = ll + lm;
    const lt_ = ll_ + lm_ + abs(lt);
    const lu = lh + ln;
    const lu_ = lh_ + ln_ + abs(lu);
    const lv = lo + lp;
    const lv_ = lo_ + lp_ + abs(lv);
    const lw = lt + lu;
    const lw_ = lt_ + lu_ + abs(lw);
    const lx = lv + ls;
    const lx_ = lv_ + ls_ + abs(lx);
    const v2 = lw + lx;
    const v2_ = lw_ + lx_ + abs(v2);


    //const rc = c1d0 + c0d1;
    //const v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    const rc = c1d0 + c0d1;
    const _rc = abs(rc);
    const rc_ = _c1d0 + _c0d1 + _rc;
    const rd = c0*vₓₓᵧ;
    const _rd = abs(rd);
    const rd_ = _c0*vₓₓᵧ_ + _rd;
    const re = d0*vₓᵧᵧ;
    const _re = abs(re);
    const re_ = _d0*vₓᵧᵧ_ + _re;
    const rf = rc + c1d0;
    const _rf = abs(rf);
    const rf_ = rc_ + _c1d0 + _rf;
    const rg = rc + c0d1;
    const _rg = abs(rg);
    const rg_ = rc_ + _c0d1 + _rg;
    const rx = c1*c0c0;
    const _rx = abs(rx);
    const rx_ = _c1*_c0c0 + _rx;
    const rh = rx*vₓₓₓ;
    const rh_ = rx_*_vₓₓₓ + _rx*vₓₓₓ_ + abs(rh);
    const ry = d1*d0d0;
    const _ry = abs(ry);
    const ry_ = _d1*_d0d0 + _ry;
    const ri = ry*vᵧᵧᵧ;
    const ri_ = ry_*_vᵧᵧᵧ + _ry*vᵧᵧᵧ_ + abs(ri);
    const rj = vₓᵧ*rc;
    const rj_ = vₓᵧ_*_rc + _vₓᵧ*rc_ + abs(rj);
    const rk = c0c1*vₓₓ;
    const rk_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(rk);
    const rl = d0d1*vᵧᵧ;
    const rl_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(rl);
    const rm = rk + rl;
    const rm_ = rk_ + rl_ + abs(rm);
    const rn = c1*vₓ;
    const rn_ = _c1*vₓ_ + abs(rn);
    const ro = d1*vᵧ;
    const ro_ = _d1*vᵧ_ + abs(ro);
    const rp = rn + ro;
    const rp_ = rn_ + ro_ + abs(rp);
    const rq = rd*rf;
    const rq_ = rd_*_rf + _rd*rf_ + abs(rq);
    const rr = re*rg;
    const rr_ = re_*_rg + _re*rg_ + abs(rr);
    const rs = rq + rr;
    const rs_ = rq_ + rr_ + abs(rs);
    const rt = 3*(rh + ri);
    const rt_ = 3*(rh_ + ri_) + 2*abs(rt);
    const ru = rj + 2*rm;
    const ru_ = rj_ + 2*rm_ + abs(ru);
    const rv = rs + rt;
    const rv_ = rs_ + rt_ + abs(rv);
    const rw = ru + rp; 
    const rw_ = ru_ + rp_ + abs(rw);
    const v1 = rv + rw;
    const v1_ = rv_ + rw_ + abs(v1);


    // v0
    const t1 = c0*vₓₓₓ;
    const t1_ = _c0*vₓₓₓ_ + abs(t1);
    const t2 = d0*vₓₓᵧ;
    const t2_ = _d0*vₓₓᵧ_ + abs(t2);
    const p4 = t1 + t2;
    const p4_ = t1_ + t2_ + abs(p4);
    const t3 = c0*vₓᵧᵧ;
    const t3_ = _c0*vₓᵧᵧ_ + abs(t3);
    const t4 = d0*vᵧᵧᵧ;
    const t4_ = _d0*vᵧᵧᵧ_ + abs(t4);
    const p5 = t3 + t4;
    const p5_ = t3_ + t4_ + abs(p5);
    const p7 = p4 + vₓₓ;
    const _p7 = abs(p7);
    const p7_ = p4_ + vₓₓ_ + _p7;
    const p8 = p5 + vᵧᵧ;
    const _p8 = abs(p8);
    const p8_ = p5_ + vᵧᵧ_ + _p8;
    const pc = c0c0*p7;
    const pc_ = _c0c0*(_p7 + p7_) + abs(pc);
    const pd = d0d0*p8;
    const pd_ = _d0d0*(_p8 + p8_) + abs(pd);
    const p6 = pc + pd;
    const p6_ = pc_ + pd_ + abs(p6);
    const pe = c0d0*vₓᵧ;
    const pe_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(pe);
    const p9 = p6 + pe;
    const p9_ = p6_ + pe_ + abs(p9);
    const pf = c0*vₓ;
    const pf_ = _c0*vₓ_ + abs(pf);
    const pg = d0*vᵧ;
    const pg_ = _d0*vᵧ_ + abs(pg);
    const pa = pf + pg;
    const pa_ = pf_ + pg_ + abs(pa);
    const pb = p9 + pa;
    const pb_ = p9_ + pa_ + abs(pb);
    const v0 = pb + v;
    const v0_ = pb_ + v_ + abs(v0);

    return {
        coeffs:   [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0],
        errBound: [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez3Bez3InclError }
