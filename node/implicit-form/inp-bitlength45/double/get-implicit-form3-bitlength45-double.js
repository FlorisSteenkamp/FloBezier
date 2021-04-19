"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm3_bitlength45_double = void 0;
const get_xy_1 = require("../../../to-power-basis/get-xy");
const abs = Math.abs;
/**
 * Returns the implicit form of the given cubic bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * * intermediate calculations are done in double precision and will thus be
 * reflected in the output error bound (which is approximately
 * n * Number.EPSILON * the condition number, where roughly 1 < n < 100 and
 * depends on the specific calculation)
 * * the error bound returned first needs to be multiplied by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 1.2 micro-seconds on a 1st gen i7 and Chrome 79
 * @param ps
 */
function getImplicitForm3_bitlength45_double(ps) {
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    let [[a3, a2, a1, a0], [b3, b2, b1, b0]] = get_xy_1.getXY(ps);
    let a3b1 = a3 * b1;
    let a1b3 = a1 * b3;
    let a3b2 = a3 * b2;
    let a2b2 = a2 * b2;
    let a2b3 = a2 * b3;
    let a3a3 = a3 * a3;
    let b2b2 = b2 * b2;
    let b3b3 = b3 * b3;
    let a1a3 = a1 * a3;
    let a2a2 = a2 * a2;
    let b1b3 = b1 * b3;
    let b2b3 = b2 * b3;
    let a2a3 = a2 * a3;
    let a3b3 = a3 * b3;
    let a3b0 = a3 * b0;
    let a0b3 = a0 * b3;
    let a2b0 = a2 * b0;
    let a0b2 = a0 * b2;
    let a2b1 = a2 * b1;
    let a1b2 = a1 * b2;
    let a1b0 = a1 * b0;
    let a0b1 = a0 * b1;
    let _a3b1 = abs(a3b1);
    let _a1b3 = abs(a1b3);
    let _a3b2 = abs(a3b2);
    let _a2b2 = abs(a2b2);
    let _a2b3 = abs(a2b3);
    let _a3a3 = abs(a3a3);
    let _b2b2 = abs(b2b2);
    let _b3b3 = abs(b3b3);
    let _a1a3 = abs(a1a3);
    let _a2a2 = abs(a2a2);
    let _b1b3 = abs(b1b3);
    let _b2b3 = abs(b2b3);
    let _a2a3 = abs(a2a3);
    let _a3b3 = abs(a3b3);
    let _a3b0 = abs(a3b0);
    let _a0b3 = abs(a0b3);
    let _a2b0 = abs(a2b0);
    let _a0b2 = abs(a0b2);
    let _a2b1 = abs(a2b1);
    let _a1b2 = abs(a1b2);
    let _a1b0 = abs(a1b0);
    let _a0b1 = abs(a0b1);
    let q1 = a3b0 - a0b3;
    let q2 = a3b1 - a1b3;
    let q3 = a3b2 - a2b3;
    let q4 = a2b0 - a0b2;
    let q5 = a2b1 - a1b2;
    let q6 = a1b0 - a0b1;
    let t1 = b1b3 - b2b2;
    let t2 = a1a3 - a2a2;
    let p1 = a2b3 + a3b2;
    let p2 = a1b3 + a3b1;
    let tq2 = 2 * q2;
    let _q1 = abs(q1);
    let _q2 = abs(q2);
    let _q3 = abs(q3);
    let _q4 = abs(q4);
    let _q5 = abs(q5);
    let _q6 = abs(q6);
    let _p1 = abs(p1);
    let _p2 = abs(p2);
    let _tq2 = 2 * _q2;
    let q1_ = _a3b0 + _a0b3 + _q1;
    let q2_ = _a3b1 + _a1b3 + _q2;
    let q3_ = _a3b2 + _a2b3 + _q3;
    let q4_ = _a2b0 + _a0b2 + _q4;
    let q5_ = _a2b1 + _a1b2 + _q5;
    let q6_ = _a1b0 + _a0b1 + _q6;
    let p1_ = _a2b3 + _a3b2 + _p1;
    let p2_ = _a1b3 + _a3b1 + _p2;
    let tq2_ = 2 * q2_;
    let q1q1 = q1 * q1;
    let q1q2 = q1 * q2;
    let q1q3 = q1 * q3;
    let q1q5 = q1 * q5;
    let q2q2 = q2 * q2;
    let tq2q4 = tq2 * q4;
    let q3q4 = q3 * q4;
    let q3q5 = q3 * q5;
    let q3q6 = q3 * q6;
    let q1q1_ = 2 * (q1_ * _q1) + abs(q1q1);
    let q1q2_ = q1_ * _q2 + _q1 * q2_ + abs(q1q2);
    let q1q3_ = q1_ * _q3 + _q1 * q3_ + abs(q1q3);
    let q1q5_ = q1_ * _q5 + _q1 * q5_ + abs(q1q5);
    let q2q2_ = 2 * (q2_ * _q2) + abs(q2q2);
    let tq2q4_ = tq2_ * _q4 + _tq2 * q4_ + abs(tq2q4);
    let q3q4_ = q3_ * _q4 + _q3 * q4_ + abs(q3q4);
    let q3q5_ = q3_ * _q5 + _q3 * q5_ + abs(q3q5);
    let q3q6_ = q3_ * _q6 + _q3 * q6_ + abs(q3q4);
    let u1 = -3 * q1 - q5;
    let _u1 = abs(u1);
    let u1_ = 3 * (q1_ + _q1) + q5_ + _u1;
    let vₓₓₓ = -b3 * b3b3;
    let vₓₓᵧ = (3 * a3) * b3b3; // 3*a3: 47-bit aligned => error free
    let vₓᵧᵧ = (-3 * b3) * a3a3; // 3*b3: 47-bit aligned => error free
    let vᵧᵧᵧ = a3 * a3a3;
    let vₓₓₓ_ = 2 * abs(vₓₓₓ);
    //let vₓₓᵧ_ = 3*abs(3*a3*_b3b3);  
    let vₓₓᵧ_ = 6 * _b3b3 * (abs(a3)); // 3*a3: 47-bit aligned => error free
    //let vₓᵧᵧ_ = 3*abs(3*b3*_a3a3);
    let vₓᵧᵧ_ = 6 * _a3a3 * (abs(b3)); // 3*b3: 47-bit aligned => error free
    let vᵧᵧᵧ_ = 2 * abs(vᵧᵧᵧ);
    let _t1 = abs(t1);
    let t1_ = _b1b3 + _b2b2 + _t1;
    let _t2 = abs(t2);
    let t2_ = _a1a3 + _a2a2 + abs(t2);
    let w1 = u1 * b3b3;
    let w1_ = _b3b3 * (u1_ + _u1) + abs(w1);
    let w2 = q3 * t1;
    let w2_ = q3_ * _t1 + t1_ * _q3 + abs(w2);
    let w3 = w1 + w2;
    let w3_ = w1_ + w2_ + abs(w3);
    let w4 = tq2 * b2b3;
    let w4_ = _b2b3 * (tq2_ + _tq2) + abs(w4);
    //let vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    let vₓₓ = w3 + w4;
    let vₓₓ_ = w3_ + w4_ + abs(w3 + w4);
    let w5 = u1 * a3a3;
    let w5_ = _a3a3 * (u1_ + _u1) + abs(w5);
    let w6 = q3 * t2;
    let w6_ = t2_ * _q3 + q3_ * _t2 + abs(w6);
    let w7 = w5 + w6;
    let w7_ = w5_ + w6_ + abs(w7);
    let w8 = tq2 * a2a3;
    let w8_ = _a2a3 * (tq2_ + _tq2) + abs(w8);
    //let vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    let vᵧᵧ = w7 + w8;
    let vᵧᵧ_ = w7_ + w8_ + abs(vᵧᵧ);
    let wa = a2b2 - p2 / 2;
    let _wa = abs(wa);
    let wa_ = _a2b2 + p2_ / 2 + _wa;
    let wb = u1 * a3b3;
    let wb_ = _a3b3 * (u1_ + _u1) + abs(wb);
    let wc = q2 * p1;
    let wc_ = q2_ * _p1 + _q2 * p1_ + abs(wc);
    let wd = wb + wc;
    let wd_ = wb_ + wc_ + abs(wd);
    let wq = q3 * wa;
    let wq_ = q3_ * _wa + _q3 * wa_ + abs(wq);
    //let vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    let vₓᵧ = 2 * (wq - wd);
    let vₓᵧ_ = 2 * (wq_ + wd_) + abs(vₓᵧ);
    let wr = -3 * q1q1;
    let wr_ = 3 * q1q1_ + abs(wr);
    let we = wr - 2 * q1q5;
    let we_ = wr_ + 2 * q1q5_ + abs(we);
    let wf = tq2q4 + q3q6;
    let wf_ = tq2q4_ + q3q6_ + abs(wf);
    //let s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    let s1 = we + wf;
    let s1_ = we_ + wf_ + abs(s1);
    //let s2 = 2*(q1q2 - q3q4);
    let s2 = 2 * (q1q2 - q3q4);
    let s2_ = 2 * (q1q2_ + q3q4_) + abs(s2);
    let wl = q1q3 - q2q2;
    let wl_ = q1q3_ + q2q2_ + abs(wl);
    //let s3 = q1q3 - q2q2 + q3q5;
    let s3 = wl + q3q5;
    let s3_ = wl_ + q3q5_ + abs(s3);
    let wm = b3 * s1;
    let wm_ = abs(b3) * s1_ + abs(wm);
    let ws = b2 * s2;
    let ws_ = abs(b2) * s2_ + abs(ws);
    let wt = b1 * s3;
    let wt_ = abs(b1) * s3_ + abs(wt);
    let wn = ws + wt;
    let wn_ = ws_ + wt_ + abs(wn);
    //let vₓ = b3*s1 + (b2*s2 + b1*s3);
    let vₓ = wm + wn;
    let vₓ_ = wm_ + wn_ + abs(vₓ);
    let wo = a3 * s1;
    let wo_ = abs(a3) * s1_ + abs(wo);
    let wu = a2 * s2;
    let wu_ = abs(a2) * s2_ + abs(wu);
    let wv = a1 * s3;
    let wv_ = abs(a1) * s3_ + abs(wv);
    let wp = wu + wv;
    let wp_ = wu_ + wv_ + abs(wp);
    //let vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    let vᵧ = -(wo + wp);
    let vᵧ_ = wo_ + wp_ + abs(vᵧ);
    let v3 = tq2q4 - q1q1;
    let v3_ = tq2q4_ + q1q1_ + abs(v3);
    let v1 = v3 - q1q5;
    let _v1 = abs(v1);
    let v1_ = v3_ + q1q5_ + _v1;
    let v4 = s3 * q6;
    let v4_ = s3_ * abs(q6) + abs(s3) * q6_ + abs(v4);
    let v5 = q3q4 * q4;
    let v5_ = q3q4_ * _q4 + abs(q3q4) * q4_ + abs(v5);
    let v2 = v4 - v5;
    let v2_ = v4_ + v5_ + abs(v2);
    let v6 = q1 * v1;
    let v6_ = q1_ * _v1 + _q1 * v1_ + abs(v6);
    //let v = q1*(tq2q4 - q1q1 - q1q5) + s3q6 - q3q4*q4;
    let v = v6 + v2;
    let v_ = v6_ + v2_ + abs(v);
    return {
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    };
}
exports.getImplicitForm3_bitlength45_double = getImplicitForm3_bitlength45_double;
//# sourceMappingURL=get-implicit-form3-bitlength45-double.js.map