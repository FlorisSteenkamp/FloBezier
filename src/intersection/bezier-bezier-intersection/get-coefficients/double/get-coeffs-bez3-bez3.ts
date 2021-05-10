import { getImplicitForm3 } from "../../../../implicit-form/double/get-implicit-form3";
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
function getCoeffsBez3Bez3(ps1: number[][], ps2: number[][]) {

    let { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2); // Assume exact -> max bitlength = 47

    let _vₓₓₓ = abs(vₓₓₓ);
    let _vₓₓᵧ = abs(vₓₓᵧ);
    let _vₓᵧᵧ = abs(vₓᵧᵧ);
    let _vᵧᵧᵧ = abs(vᵧᵧᵧ);
    let _vₓₓ = abs(vₓₓ);
    let _vₓᵧ = abs(vₓᵧ);
    let _vᵧᵧ = abs(vᵧᵧ);

    let c0c0 = c0*c0;
    let c0c1 = c0*c1;
    let c0c2 = c0*c2;
    let c0c3 = c0*c3;
    let c0d0 = c0*d0;
    let c0d1 = c0*d1;
    let c0d2 = c0*d2;
    let c0d3 = c0*d3;
    let c1c1 = c1*c1;
    let c1c2 = c1*c2;
    let c1c3 = c1*c3;
    let c1d0 = c1*d0;
    let c1d1 = c1*d1;
    let c1d2 = c1*d2;
    let c1d3 = c1*d3;
    let c2d1 = c2*d1;
    let c2c2 = c2*c2;    
    let c2c3 = c2*c3;
    let c2d0 = c2*d0;
    let c2d2 = c2*d2;
    let c2d3 = c2*d3;
    let c3c3 = c3*c3;
    let c3d0 = c3*d0;
    let c3d1 = c3*d1;
    let c3d2 = c3*d2;
    let c3d3 = c3*d3;
    
    let d0d0 = d0*d0;
    let d0d1 = d0*d1;
    let d0d2 = d0*d2;
    let d0d3 = d0*d3;
    let d1d1 = d1*d1;
    let d1d2 = d1*d2;
    let d3d3 = d3*d3;
    let d2d2 = d2*d2;
    let d2d3 = d2*d3;
    let d1d3 = d1*d3;
    
    let _c0c0 = abs(c0c0);
    let _c0c1 = abs(c0c1);
    let _c0c2 = abs(c0c2);
    let _c0c3 = abs(c0c3);
    let _c0d1 = abs(c0d1);
    let _c0d2 = abs(c0d2);
    let _c0d3 = abs(c0d3);
    let _c1c1 = abs(c1c1);
    let _c1c2 = abs(c1c2);    
    let _c1c3 = abs(c1c3);
    let _c2c2 = abs(c2c2);
    let _c2c3 = abs(c2c3);
    let _c2d2 = abs(c2d2);
    let _c1d0 = abs(c1d0);
    let _c1d1 = abs(c1d1);
    let _c1d2 = abs(c1d2);
    let _c1d3 = abs(c1d3);
    let _c2d0 = abs(c2d0);
    let _c2d1 = abs(c2d1);
    let _c2d3 = abs(c2d3);
    let _c3c3 = abs(c3c3);
    let _c3d0 = abs(c3d0);
    let _c3d1 = abs(c3d1);
    let _c3d2 = abs(c3d2);
    let _c3d3 = abs(c3d3);
    let _c0d0 = abs(c0d0);

    let _d0d0 = abs(d0d0);
    let _d0d1 = abs(d0d1);
    let _d0d2 = abs(d0d2);
    let _d0d3 = abs(d0d3);
    let _d1d1 = abs(d1d1);
    let _d1d2 = abs(d1d2);
    let _d1d3 = abs(d1d3);
    let _d2d2 = abs(d2d2);
    let _d2d3 = abs(d2d3);
    let _d3d3 = abs(d3d3);
   
    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _c2 = abs(c2);
    let _c3 = abs(c3);
    let _d0 = abs(d0);
    let _d1 = abs(d1);
    let _d2 = abs(d2);
    let _d3 = abs(d3);

    //let v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    let g1 = c3*c3c3;
    let _g1 = _c3*_c3c3;
    let g1_ = 2*_g1;
    let g2 = c3*d3d3;
    let _g2 = _c3*_d3d3;
    let g2_ = 2*_g2;
    let g3 = d3*c3c3;
    let _g3 = _d3*_c3c3;
    let g3_ = 2*_g3;
    let g4 = d3*d3d3;
    let _g4 = _d3*_d3d3;
    let g4_ = 2*_g4;
    let g5 = g1*vₓₓₓ;
    let g5_ = g1_*_vₓₓₓ + _g1*vₓₓₓ_ + abs(g5);
    let g6 = g2*vₓᵧᵧ;
    let g6_ = g2_*_vₓᵧᵧ + _g2*vₓᵧᵧ_ + abs(g2);
    let g7 = g3*vₓₓᵧ;
    let g7_ = g3_*_vₓₓᵧ + _g3*vₓₓᵧ_ + abs(g3);
    let g8 = g4*vᵧᵧᵧ;
    let g8_ = g4_*_vᵧᵧᵧ + _g4*vᵧᵧᵧ_ + abs(g4);
    let g9 = g5 + g6;
    let g9_ = g5_ + g6_ + abs(g9);
    let ga = g7 + g8;
    let ga_ = g7_ + g8_ + abs(ga);
    let v9 = g9 + ga;
    let v9_ = g9_ + ga_ + abs(v9);

    //let v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    let w1 = 2*c2d3 + c3d2;
    let w1_ = 2*_c2d3 + _c3d2 + abs(w1);
    let w2 = 2*c3d2 + c2d3;
    let w2_ = 2*_c3d2 + _c2d3 + abs(w2);
    let w3 = c3*w1;
    let _w3 = abs(w3);
    let w3_ = _c3*w1_ + _w3;
    let w4 = d3*w2;
    let _w4 = abs(w4);
    let w4_ = _d3*w2_ + w4;
    let w5 = c2*c3c3;
    let _w5 = abs(w5);
    let w5_ = _c2*_c3c3 + w5;
    let w6 = d2*d3d3;
    let _w6 = abs(w6);
    let w6_ = _d2*_d3d3 + w6;
    let w7 = vₓₓₓ*w5;
    let w7_ = vₓₓₓ_*_w5 + _vₓₓₓ*w5_ + abs(w7);
    let u1 = vᵧᵧᵧ*w6;
    let u1_ = vᵧᵧᵧ_*_w6 + _vᵧᵧᵧ*w6_ + abs(u1);
    let u2 = vₓₓᵧ*w3;
    let u2_ = vₓₓᵧ_*_w3 + _vₓₓᵧ*w3_ + abs(u2);
    let u3 = vₓᵧᵧ*w4;
    let u3_ = vₓᵧᵧ_*_w4 + _vₓᵧᵧ*w4_ + abs(u3);
    let u4 = u2 + u3;
    let u4_ = u2_ + u3_ + abs(u4);
    let u5 = 3*(w7 + u1);
    let u5_ = 3*(w7_ + u1_) + 2*abs(u5)
    let v8 = u4 + u5;
    let v8_ = u4_ + u5_ + abs(v8);

    //let w1 = c2*vₓₓᵧ + d2*vₓᵧᵧ;
    //let _w1 = abs(w1);
    //let w1_ = _c2*vₓₓᵧ_ + _d2*vₓᵧᵧ_ + _w1;
    //let w2 = d2*vₓₓᵧ + 3*c2*vₓₓₓ;
    //let _w2 = abs(w2);
    //let w2_ = _d2*vₓₓᵧ_ + 3*_c2*vₓₓₓ_ + _w2;
    //let w3 = c2*vₓᵧᵧ + 3*d2*vᵧᵧᵧ;
    //let _w3 = abs(w3);
    //let w3_ = _c2*vₓᵧᵧ_ + _d2*vᵧᵧᵧ_ + _w3;
    //let w5 = c3c3*w2;
    //let w5_ = _c3c3*(_w2 + w2_) + abs(w5);
    //let w6 = d3d3*w3;
    //let w6_ = _d3d3*(_w3 + w3_) + abs(w6);
    //let w4 = w5 + w6;
    //let _w4 = abs(w4);
    //let w4_ = w5_ + w6_ + _w4;
    //let w7 = 2*c3d3*w1;
    //let _w7 = abs(w7);
    //let w7_ = 2*(_c3d3*_w1 + _c3d3*w1_ + _w7);
    //let v8 = w7 + w4;
    //let v8_ = w7_ + w4_ + abs(v8);


    //let v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    let o1 = c1*c3d3;
    let o1_ = _c1*_c3d3 + abs(o1);
    let o2 = d1*c3c3;
    let o2_ = _d1*_c3c3 + abs(o2);
    let o3 = c2*d2d3;
    let o3_ = _c2*_d2d3 + abs(o3);
    let o4 = c1*d3d3;
    let o4_ = _c1*_d3d3 + abs(o4);
    let o5 = c2*c3d2;
    let o5_ = _c2*_c3d2 + abs(o5);
    let o6 = d3*c2c2;
    let o6_ = _d3*_c2c2 + abs(o6);
    let o7 = c3*d1d3;
    let o7_ = _c3*_d1d3 + abs(o7);
    let o8 = d2*c3d2;
    let o8_ = _d2*_c3d2 + abs(o8);
    let w8 = o1 + o5;
    let w8_ = o1_ + o5_ + abs(w8);
    let w9 = o2 + o6;
    let w9_ = o2_ + o6_ + abs(w9);
    let wa = o3 + o7;
    let wa_ = o3_ + o7_ + abs(wa);
    let wb = o4 + o8;
    let wb_ = o4_ + o8_ + abs(wb);
    let wc = c1c3 + c2c2;
    let wc_ = _c1c3 + _c2c2 + abs(wc);
    let wd = d1d3 + d2d2;
    let wd_ = _d1d3 + _d2d2 + abs(wd);
    let we = 2*w8 + w9;
    let _we = abs(we);
    let we_ = 2*w8_ + w9_ + _we;
    let wf = 2*wa + wb;
    let _wf = abs(wf);
    let wf_ = 2*wa_ + wb_ + _wf;
    let wg = vₓₓᵧ*we;
    let wg_ = vₓₓᵧ_*_we + _vₓₓᵧ*we_ + abs(wg);
    let wh = vₓᵧᵧ*wf;
    let wh_ = vₓᵧᵧ_*_wf + _vₓᵧᵧ*wf_ + abs(wh);
    let wi = c3*wc;
    let _wi = abs(wi);
    let wi_ = _c3*wc_ + _wi;
    let wj = d3*wd;
    let _wj = abs(wj);
    let wj_ = _d3*wd_ + _wj;
    let wk = vₓₓₓ*wi;
    let wk_ = vₓₓₓ_*_wi + _vₓₓₓ*wi_ + abs(wk);
    let wl = vᵧᵧᵧ*wj;
    let wl_ = vᵧᵧᵧ_*_wj + _vᵧᵧᵧ*wj_ + abs(wl);
    let wm = wg + wh;
    let wm_ = wg_ + wh_ + abs(wm);
    let wn = 3*(wk + wl);
    let wn_ = 3*(wk_ + wl_) + 2*abs(wn);
    let v7 = wm + wn;
    let v7_ = wm_ + wn_ + abs(v7);

    //let v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    let wo = c2d3 + c3d2;
    let _wo = abs(wo);
    let wo_ = _c2d3 + _c3d2 + _wo;
    let zc = d2*c2c2;
    let zc_ = _d2*_c2c2 + abs(zc);
    let zd = 2*c1*wo;
    let zd_ = 2*(_c1*wo_) + abs(zd);
    let wp = zc + zd;
    let wp_ = zc_ + zd_ + abs(wp);
    let wq = 2*(c0d3 + c2d1);
    let wq_ = 2*(_c0d3 + _c2d1) + abs(wq);
    let wr = wq + c3d0;
    let wr_ = wq_ + _c3d0 + abs(wr);
    let ze = c3*wr;
    let ze_ = _c3*wr_ + abs(ze)
    let ws = wp + ze;
    let _ws = abs(ws);
    let ws_ = wp_ + ze_ + _ws;
    let zf = c2*d2d2;
    let zf_ = _c2*_d2d2 + abs(zf);
    let zg = 2*d1*wo;
    let zg_ = 2*(_d1*wo_) + abs(zg);
    let wt = zf + zg;
    let wt_ = zf_ + zg_ + abs(wt); 
    let wu = 2*(c1d2 + c3d0);
    let wu_ = 2*(_c1d2 + _c3d0) + abs(wu);
    let wv = wu + c0d3;
    let wv_ = wu_ + _c0d3 + abs(wv);
    let zh = d3*wv;
    let zh_ = _d3*wv_ + abs(zh)
    let ww = wt + zh;
    let _ww = abs(ww);
    let ww_ = wt_ + zh_ + _ww;
    let wx = c2*c2c2;
    let wx_ = _c2*_c2c2 + abs(wx);
    let wy = 2*c1c2 + c0c3;
    let wy_ = 2*_c1c2 + _c0c3 + abs(wy);
    let wz = 3*(c3*wy);
    let wz_ = 3*_c3*wy_ + 2*abs(wz);
    let z1 = wx + wz;
    let _z1 = abs(z1);
    let z1_ = wx_ + wz_ + _z1;
    let z2 = d2*d2d2;
    let z2_ = _d2*_d2d2 + abs(z2);
    let z3 = 2*d1d2 + d0d3;
    let z3_ = 2*_d1d2 + _d0d3 + abs(z3);
    let z4 = 3*(d3*z3);
    let z4_ = 3*(_d3*z3_) + 2*abs(z4);
    let z5 = z2 + z4;
    let _z5 = abs(z5);
    let z5_ = z2_ + z4_ + _z5;
    let zi = vₓₓᵧ*ws;
    let zi_ = vₓₓᵧ_*_ws + _vₓₓᵧ*ws_ + abs(zi);
    let zj = vₓᵧᵧ*ww;
    let zj_ = vₓᵧᵧ_*_ww + _vₓᵧᵧ*ww_ + abs(zj);
    let z6 = zi + zj;
    let z6_ = zi_ + zj_ + abs(z6);
    let zk = vₓₓₓ*z1;
    let zk_ = vₓₓₓ_*_z1 + _vₓₓₓ*z1_ + abs(zk);
    let zl = vᵧᵧᵧ*z5;
    let zl_ = vᵧᵧᵧ_*_z5 + _vᵧᵧᵧ*z5_ + abs(zl);
    let z7 = zk + zl;
    let z7_ = zk_ + zl_ + abs(z7);
    let zm = vₓₓ*c3c3;
    let zm_ = _c3c3*(vₓₓ_ + _vₓₓ) + abs(zm);
    let zn = vᵧᵧ*d3d3;
    let zn_ = _d3d3*(vᵧᵧ_ + _vᵧᵧ) + abs(zn);
    let z8 = zm + zn;
    let z8_ = zm_ + zn_ + abs(z8);
    let z9 = vₓᵧ*c3d3;
    let z9_ = _c3d3*(vₓᵧ_ + _vₓᵧ) + abs(z9);
    let za = z6 + z7;
    let za_ = z6_ + z7_ + abs(za);
    let zb = z8 + z9;
    let zb_ = z8_ + z9_ + abs(zb);
    let v6 = za + zb;
    let v6_ = za_ + zb_ + abs(z6);


    //let r4 = c2d2 + c3d1;
    //let r5 = c1d3 + c2d2;
    //let v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    let r4 = c2d2 + c3d1;
    let r4_ = _c2d2 + _c3d1 + abs(r4);
    let r5 = c1d3 + c2d2;
    let r5_ = _c1d3 + _c2d2 + abs(r5);
    let k1 = c0*wo;
    let k1_ = _c0*wo_ + abs(k1);
    let k2 = d0*wo;
    let k2_ = _d0*wo_ + abs(k2);
    let k3 = c1*r4;
    let k3_ = _c1*r4_ + abs(k3);
    let k4 = d1*r5;
    let k4_ = _d1*r5_ + abs(k4);
    let k5 = 2*c3d0 + c2d1;
    let k5_ = 2*_c3d0 + _c2d1 + abs(k5);
    let k6 = 2*c0d3 + c1d2;
    let k6_ = 2*_c0d3 + _c1d2 + abs(k6);
    let k7 = d3*c1c1;
    let k7_ = _d3*_c1c1 + abs(k7);
    let k8 = c3*d1d1;
    let k8_ = _c3*_d1d1 + abs(k8);
    let k9 = c2*k5;
    let k9_ = _c2*k5_ + abs(k9);
    let ka = d2*k6;
    let ka_ = _d2*k6_ + abs(ka);
    let kb = 2*(k1 + k3);
    let kb_ = 2*(k1_ + k3_) + abs(kb);
    let kc = 2*(k2 + k4);
    let kc_ = 2*(k2_ + k4_) + abs(kc);
    let kd = 2*c0*c2c3;
    let kd_ = 2*(_c0*_c2c3) + abs(kd);
    let ke = 2*d0*d2d3;
    let ke_ = 2*(_d0*_d2d3) + abs(ke);
    let kf = c1*wc;
    let kf_ = _c1*wc_ + abs(kf);
    let kg = d1*wd;
    let kg_ = _d1*wd_ + abs(kg);
    let kh = vₓₓ*c2c3;
    let kh_ = _c2c3*(vₓₓ_ + _vₓₓ) + abs(kh);
    let ki = vᵧᵧ*d2d3;
    let ki_ = _d2d3*(vᵧᵧ_ + _vᵧᵧ) + abs(ki);
    let kj = kb + k7;
    let kj_ = kb_ + k7_ + abs(kj);
    let kk = kc + k8;
    let kk_ = kc_ + k8_ + abs(kk);
    let kl = kj + k9;
    let _kl = abs(kl)
    let kl_ = kj_ + k9_ + _kl;
    let km = kk + ka;
    let _km = abs(km)
    let km_ = kk_ + ka_ + _km;
    let kn = kd + kf;
    let _kn = abs(kn)
    let kn_ = kd_ + kf_ + _kn;
    let ko = ke + kg;
    let _ko = abs(ko)
    let ko_ = ke_ + kg_ + _ko;
    let kp = 2*(kh + ki);
    let kp_ = 2*(kh_ + ki_) + abs(kp); 
    let kq = vₓₓᵧ*kl;
    let kq_ = vₓₓᵧ_*_kl + _vₓₓᵧ*kl_ + abs(kq);
    let kr = vₓᵧᵧ*km;
    let kr_ = vₓᵧᵧ_*_km + _vₓᵧᵧ*km_ + abs(kr);
    let ks = vₓₓₓ*kn;
    let ks_ = vₓₓₓ_*_kn + _vₓₓₓ*kn_ + abs(ks);
    let kt = vᵧᵧᵧ*ko;
    let kt_ = vᵧᵧᵧ_*_ko + _vᵧᵧᵧ*ko_ + abs(kt);
    let ku = kq + kr;
    let ku_ = kq_ + kr_ + abs(ku);
    let kv = 3*(ks + kt);
    let kv_ = 3*(ks_ + kt_) + 2*abs(kv);
    let kw = vₓᵧ*wo;
    let kw_ = vₓᵧ_*_wo + _vₓᵧ*wo_ + abs(kw);
    let kx = ku + kv;
    let kx_ = ku_ + kv_ + abs(kx);
    let ky = kw + kp;
    let ky_ = kw_ + kp_ + abs(ky);
    let v5 = kx + ky;
    let v5_ = kx_ + ky_ + abs(v5);
    

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
    let r1 = c1d3 + r4;
    let _r1 = abs(r1);
    let r1_ = _c1d3 + r4_ + _r1;
    let r2 = 2*c1c3 + c2c2;
    let _r2 = abs(r2);
    let r2_ = 2*_c1c3 + _c2c2 + _r2;
    let r3 = 2*d1d3 + d2d2;
    let _r3 = abs(r3);
    let r3_ = 2*_d1d3 + _d2d2 + _r3;
    let s1 = 2*c0*r1;
    let s1_ = 2*_c0*r1_ + abs(s1);
    let s2 = 2*d0*r1;
    let s2_ = 2*_d0*r1_ + abs(s2);
    let s5 = c1d2 + 2*c2d1;
    let s5_ = _c1d2 + 2*_c2d1 + abs(s5);
    let s6 = c2d1 + 2*c1d2;
    let s6_ = _c2d1 + 2*_c1d2 + abs(s6);
    let s3 = d0*r2;
    let s3_ = _d0*r2_ + abs(s3);
    let s4 = c0*r3;
    let s4_ = _c0*r3_ + abs(s4);
    let s7 = c1*s5;
    let s7_ = _c1*s5_ + abs(s7);
    let s8 = d1*s6;
    let s8_ = _d1*s6_ + abs(s8);
    let s9 = c0*r2;
    let s9_ = _c0*r2_ + abs(s9);
    let sa = d0*r3;
    let sa_ = _d0*r3_ + abs(sa);
    let sb = c2*c1c1;
    let sb_ = _c2*_c1c1 + abs(sb);
    let sc = d2*d1d1;
    let sc_ = _d2*_d1d1 + abs(sc);
    let sd = s1 + s3;
    let sd_ = s1_ + s3_ + abs(sd);
    let se = s2 + s4;
    let se_ = s2_ + s4_ + abs(se);
    let sf = sd + s7;
    let _sf = abs(sf);
    let sf_ = sd_ + s7_ + _sf;
    let sg = se + s8;
    let _sg = abs(sg);
    let sg_ = se_ + s8_ + _sg;
    let sh = s9 + sb;
    let _sh = abs(sh);
    let sh_ = s9_ + sb_ + _sh;
    let si = sa + sc;
    let _si = abs(si);
    let si_ = sa_ + sc_ + _si;
    let sj = vₓₓᵧ*sf;
    let sj_ = vₓₓᵧ_*_sf + _vₓₓᵧ*sf_ + abs(sj);
    let sk = vₓᵧᵧ*sg;
    let sk_ = vₓᵧᵧ_*_sg + _vₓᵧᵧ*sg_ + abs(sk);
    let sl = vₓₓₓ*sh;
    let sl_ = vₓₓₓ_*_sh + _vₓₓₓ*sh_ + abs(sl);
    let sm = vᵧᵧᵧ*si;
    let sm_ = vᵧᵧᵧ_*_si + _vᵧᵧᵧ*si_ + abs(sm);
    let sn = sl + sm;
    let _sn = abs(sn);
    let sn_ = sl_ + sm_ + _sn;
    let so = sj + sk;
    let so_ = sj_ + sk_ + abs(so);
    let sp = so + 3*sn;
    let sp_ = so_ + 3*(sn_ + _sn) + abs(sp);
    let ss = vₓᵧ*r1;
    let ss_ = vₓᵧ_*_r1 + _vₓᵧ*r1_ + abs(ss);
    let st = vₓₓ*r2;
    let st_ = vₓₓ_*_r2 + _vₓₓ*r2_ + abs(st);
    let sq = ss + st;
    let sq_ = ss_ + st_ + abs(sq);
    let su = vᵧᵧ*r3;
    let su_ = vᵧᵧ_*_r3 + _vᵧᵧ*r3_ + abs(su);
    let sr = sq + su;
    let sr_ = sq_ + su_ + abs(sr);
    let v4 = sp + sr;
    let v4_ = sp_ + sr_ + abs(v4);


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
    let r6 = c1d2 + c2d1;
    let r6_ = _c1d2 + _c2d1 + abs(r6);
    let r7 = c3d0 + c0d3;
    let r7_ = _c3d0 + _c0d3 + abs(r7);
    let r8 = c1c2 + c0c3;
    let _r8 = abs(r8);
    let r8_ = _c1c2 + _c0c3 + _r8;
    let r9 = d1d2 + d0d3;
    let _r9 = abs(r9);
    let r9_ = _d1d2 + _d0d3 + _r9;
    let m1 = 2*r6 + c3d0;
    let m1_ = 2*r6_ + _c3d0 + abs(m1)
    let m2 = 2*r6 + c0d3;
    let m2_ = 2*r6_ + _c0d3 + abs(m2)
    let m3 = 2*c2d0 + c1d1;
    let m3_ = 2*_c2d0 + _c1d1 + abs(m3)
    let m4 = 2*c0d2 + c1d1;
    let m4_ = 2*_c0d2 + _c1d1 + abs(m4)
    let m5 = r8 + c1c2;
    let m5_ = r8_ + _c1c2 + abs(m5);
    let m6 = r9 + d1d2;
    let m6_ = r9_ + _d1d2 + abs(m6);
    let m7 = 3*c0*m5;
    let m7_ = 3*(_c0*m5_) + 2*abs(m7);
    let m8 = 3*d0*m6;
    let m8_ = 3*(_d0*m6_) + 2*abs(m8);
    let m9 = c1*c1c1;
    let m9_ = _c1*_c1c1 + abs(m9);
    let ma = d1*d1d1;
    let ma_ = _d1*_d1d1 + abs(ma);
    let mb = vₓₓ*r8;
    let mb_ = vₓₓ_*_r8 + _vₓₓ*r8_ + abs(mb);
    let mc = vᵧᵧ*r9;
    let mc_ = vᵧᵧ_*_r9 + _vᵧᵧ*r9_ + abs(mc);
    let md = m1 + r7;
    let md_ = m1_ + r7_ + abs(md);
    let me = m2 + r7;
    let me_ = m2_ + r7_ + abs(me);
    let mf = c0*md;
    let mf_ = _c0*md_ + abs(mf);
    let mg = d0*me;
    let mg_ = _d0*me_ + abs(mg);
    let mh = c1*m3;
    let mh_ = _c1*m3_ + abs(mh);
    let mi = d1*m4;
    let mi_ = _d1*m4_ + abs(mi);
    let mj = c3*vₓ;
    let mj_ = _c3*vₓ_ + abs(mj);
    let mk = d3*vᵧ;
    let mk_ = _d3*vᵧ_ + abs(mk);
    let ml = mf + mh;
    let _ml = abs(ml);
    let ml_ = mf_ + mh_ + _ml;
    let mm = mg + mi;
    let _mm = abs(mm);
    let mm_ = mg_ + mi_ + _mm;
    let mn = m7 + m9;
    let _mn = abs(mn);
    let mn_ = m7_ + m9_ + _mn;
    let mo = m8 + ma;
    let _mo = abs(mo);
    let mo_ = m8_ + ma_ + _mo;
    let mp = r7 + r6;
    let _mp = abs(mp);
    let mp_ = r7_ + r6_ + _mp;
    let mq = 2*(mb + mc);
    let mq_ = 2*(mb_ + mc_) + abs(mq);
    let mr = vₓₓᵧ*ml;
    let mr_ = vₓₓᵧ_*_ml + _vₓₓᵧ*ml_ + abs(mr);
    let ms = vₓᵧᵧ*mm;
    let ms_ = vₓᵧᵧ_*_mm + _vₓᵧᵧ*mm_ + abs(ms);
    let mt = vₓₓₓ*mn;
    let mt_ = vₓₓₓ_*_mn + _vₓₓₓ*mn_ + abs(mt);
    let mu = vᵧᵧᵧ*mo;
    let mu_ = vᵧᵧᵧ_*_mo + _vᵧᵧᵧ*mo_ + abs(mu);
    let mv = vₓᵧ *mp;
    let mv_ = vₓᵧ_*_mp + _vₓᵧ*mp_ + abs(mv);
    let mw = mr + ms;
    let mw_ = mr_ + ms_ + abs(mw);
    let mx = mt + mu;
    let mx_ = mt_ + mu_ + abs(mx);
    let my = mv + mq;
    let my_ = mv_ + mq_ + abs(my);
    let mz = mj + mk;
    let mz_ = mj_ + mk_ + abs(mz);
    let n1 = mw + mx;
    let n1_ = mw_ + mx_ + abs(n1);
    let n2 = my + mz;
    let n2_ = my_ + mz_ + abs(n2);
    let v3 = n1 + n2;
    let v3_ = n1_ + n2_ + abs(v3);


//    let ra = c1d1 + c2d0;
//    let rb = c1d1 + c0d2;
//    let v2 =
//        vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
//        vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
//        3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
//        3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
//        vₓᵧ*(ra + c0d2) +
//        vₓₓ*(2*c0c2 + c1c1) + 
//        vᵧᵧ*(2*d0d2 + d1d1) +
//        c2*vₓ + d2*vᵧ;
    let ra = c1d1 + c2d0;
    let ra_ = _c1d1 + _c2d0 + abs(ra);
    let rb = c1d1 + c0d2;
    let rb_ = _c1d1 + _c0d2 + abs(rb);
    let l1 = 2*ra + c0d2;
    let l1_ = 2*ra_ + _c0d2 + abs(l1);
    let l2 = 2*rb + c2d0;
    let l2_ = 2*rb_ + _c2d0 + abs(l2);
    let l3 = c0*l1;
    let l3_ = _c0*l1_ + abs(l3);
    let l4 = d0*c1c1;
    let l4_ = _d0*_c1c1 + abs(l4);
    let l5 = d0*l2;
    let l5_ = _d0*l2_ + abs(l5);
    let l6 = c0*d1d1;
    let l6_ = _c0*_d1d1 + abs(l6);
    let l7 = c0*c1c1;
    let l7_ = _c0*_c1c1 + abs(l7);
    let l8 = c2*c0c0;
    let l8_ = _c2*_c0c0 + abs(l8);
    let l9 = d0*d1d1;
    let l9_ = _d0*_d1d1 + abs(l9);
    let la = d2*d0d0;
    let la_ = _d2*_d0d0 + abs(la);
    let lb = l3 + l4;
    let _lb = abs(lb);
    let lb_ = l3_ + l4_ + _lb;
    let lc = l5 + l6;
    let _lc = abs(lc);
    let lc_ = l5_ + l6_ + _lc;
    let ld = l7 + l8;
    let _ld = abs(ld);
    let ld_ = l7_ + l8_ + _ld;
    let le = l9 + la;
    let _le = abs(le);
    let le_ = l9_ + la_ + _le;
    let lf = vₓₓₓ*ld;
    let lf_ = vₓₓₓ_*_ld + _vₓₓₓ*ld_ + abs(lf);
    let lg = vᵧᵧᵧ*le;
    let lg_ = vᵧᵧᵧ_*_le + _vᵧᵧᵧ*le_ + abs(lg);
    let lh = 3*(lf + lg);
    let lh_ = 3*(lf_ + lg_) + 2*abs(lh);
    let li = ra + c0d2;
    let _li = abs(li);
    let li_ = ra_ + _c0d2 + _li;
    let lj = 2*c0c2 + c1c1;
    let _lj = abs(lj);
    let lj_ = 2*_c0c2 + _c1c1 + _lj;
    let lk = 2*d0d2 + d1d1;
    let _lk = abs(lk);
    let lk_ = 2*_d0d2 + _d1d1 + _lk;
    let ll = vₓₓᵧ*lb;
    let ll_ = vₓₓᵧ_*_lb + _vₓₓᵧ*lb_ + abs(ll);
    let lm = vₓᵧᵧ*lc;
    let lm_ = vₓᵧᵧ_*_lc + _vₓᵧᵧ*lc_ + abs(lm);
    let ln = vₓᵧ*li;
    let ln_ = vₓᵧ_*_li + _vₓᵧ*li_ + abs(ln);
    let lo = vₓₓ*lj;
    let lo_ = vₓₓ_*_lj + _vₓₓ*lj_ + abs(lo);
    let lp = vᵧᵧ*lk;
    let lp_ = vᵧᵧ_*_lk + _vᵧᵧ*lk_ + abs(lp);
    let lq = c2*vₓ; 
    let lq_ = _c2*vₓ_ + abs(lq);
    let lr = d2*vᵧ;
    let lr_ = _d2*vᵧ_ + abs(lr);
    let ls = lq + lr;
    let ls_ = lq_ + lr_ + abs(ls);
    let lt = ll + lm;
    let lt_ = ll_ + lm_ + abs(lt);
    let lu = lh + ln;
    let lu_ = lh_ + ln_ + abs(lu);
    let lv = lo + lp;
    let lv_ = lo_ + lp_ + abs(lv);
    let lw = lt + lu;
    let lw_ = lt_ + lu_ + abs(lw);
    let lx = lv + ls;
    let lx_ = lv_ + ls_ + abs(lx);
    let v2 = lw + lx;
    let v2_ = lw_ + lx_ + abs(v2);


    //let rc = c1d0 + c0d1;
    //let v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    let rc = c1d0 + c0d1;
    let _rc = abs(rc);
    let rc_ = _c1d0 + _c0d1 + _rc;
    let rd = c0*vₓₓᵧ;
    let _rd = abs(rd);
    let rd_ = _c0*vₓₓᵧ_ + _rd;
    let re = d0*vₓᵧᵧ;
    let _re = abs(re);
    let re_ = _d0*vₓᵧᵧ_ + _re;
    let rf = rc + c1d0;
    let _rf = abs(rf);
    let rf_ = rc_ + _c1d0 + _rf;
    let rg = rc + c0d1;
    let _rg = abs(rg);
    let rg_ = rc_ + _c0d1 + _rg;
    let rx = c1*c0c0;
    let _rx = abs(rx);
    let rx_ = _c1*_c0c0 + _rx;
    let rh = rx*vₓₓₓ;
    let rh_ = rx_*_vₓₓₓ + _rx*vₓₓₓ_ + abs(rh);
    let ry = d1*d0d0;
    let _ry = abs(ry);
    let ry_ = _d1*_d0d0 + _ry;
    let ri = ry*vᵧᵧᵧ;
    let ri_ = ry_*_vᵧᵧᵧ + _ry*vᵧᵧᵧ_ + abs(ri);
    let rj = vₓᵧ*rc;
    let rj_ = vₓᵧ_*_rc + _vₓᵧ*rc_ + abs(rj);
    let rk = c0c1*vₓₓ;
    let rk_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(rk);
    let rl = d0d1*vᵧᵧ;
    let rl_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(rl);
    let rm = rk + rl;
    let rm_ = rk_ + rl_ + abs(rm);
    let rn = c1*vₓ;
    let rn_ = _c1*vₓ_ + abs(rn);
    let ro = d1*vᵧ;
    let ro_ = _d1*vᵧ_ + abs(ro);
    let rp = rn + ro;
    let rp_ = rn_ + ro_ + abs(rp);
    let rq = rd*rf;
    let rq_ = rd_*_rf + _rd*rf_ + abs(rq);
    let rr = re*rg;
    let rr_ = re_*_rg + _re*rg_ + abs(rr);
    let rs = rq + rr;
    let rs_ = rq_ + rr_ + abs(rs);
    let rt = 3*(rh + ri);
    let rt_ = 3*(rh_ + ri_) + 2*abs(rt);
    let ru = rj + 2*rm;
    let ru_ = rj_ + 2*rm_ + abs(ru);
    let rv = rs + rt;
    let rv_ = rs_ + rt_ + abs(rv);
    let rw = ru + rp; 
    let rw_ = ru_ + rp_ + abs(rw);
    let v1 = rv + rw;
    let v1_ = rv_ + rw_ + abs(v1);


    // v0
    let t1 = c0*vₓₓₓ;
    let t1_ = _c0*vₓₓₓ_ + abs(t1);
    let t2 = d0*vₓₓᵧ;
    let t2_ = _d0*vₓₓᵧ_ + abs(t2);
    let p4 = t1 + t2;
    let p4_ = t1_ + t2_ + abs(p4);
    let t3 = c0*vₓᵧᵧ;
    let t3_ = _c0*vₓᵧᵧ_ + abs(t3);
    let t4 = d0*vᵧᵧᵧ;
    let t4_ = _d0*vᵧᵧᵧ_ + abs(t4);
    let p5 = t3 + t4;
    let p5_ = t3_ + t4_ + abs(p5);
    let p7 = p4 + vₓₓ;
    let _p7 = abs(p7);
    let p7_ = p4_ + vₓₓ_ + _p7;
    let p8 = p5 + vᵧᵧ;
    let _p8 = abs(p8);
    let p8_ = p5_ + vᵧᵧ_ + _p8;
    let pc = c0c0*p7;
    let pc_ = _c0c0*(_p7 + p7_) + abs(pc);
    let pd = d0d0*p8;
    let pd_ = _d0d0*(_p8 + p8_) + abs(pd);
    let p6 = pc + pd;
    let p6_ = pc_ + pd_ + abs(p6);
    let pe = c0d0*vₓᵧ;
    let pe_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(pe);
    let p9 = p6 + pe;
    let p9_ = p6_ + pe_ + abs(p9);
    let pf = c0*vₓ;
    let pf_ = _c0*vₓ_ + abs(pf);
    let pg = d0*vᵧ;
    let pg_ = _d0*vᵧ_ + abs(pg);
    let pa = pf + pg;
    let pa_ = pf_ + pg_ + abs(pa);
    let pb = p9 + pa;
    let pb_ = p9_ + pa_ + abs(pb);
    let v0 = pb + v;
    let v0_ = pb_ + v_ + abs(v0);

    return {
        coeffs:   [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0],
        errBound: [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez3Bez3 }
