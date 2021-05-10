"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm3_bitlength45_doubleDouble = void 0;
const double_double_1 = require("double-double");
const get_xy_1 = require("../../to-power-basis/get-xy");
const abs = Math.abs;
const tp = double_double_1.twoProduct; // error -> 0
const qno = double_double_1.ddNegativeOf; // error -> 0
const qm2 = double_double_1.ddMultBy2; // error -> 0 
const qd2 = double_double_1.ddDivBy2; // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = double_double_1.ddMultDouble2; // error -> 3*γ²
const qmq = double_double_1.ddMultDd; // error -> 5*γ² (theoretical), 7*γ² (worst found), we use 6*γ²
const qdq = double_double_1.ddDiffDd; // error -> 3*γ²
const qaq = double_double_1.ddAddDd; // error -> 3*γ²
/**
 * Returns a double-double precision implicit form of the given cubic
 * bezier curve and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately
 * n * (Number.EPSILON**2) * the condition number, where roughly 1 < n < 100 and
 * depends on the specific calculation)
 * * the error bound returned first needs to be multiplied by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 15 micro-seconds on a 1st gen i7 and Chrome 79
 *
 * @param coeffsX
 * @param coeffsY
 *
 * @doc
 */
function getImplicitForm3_bitlength45_doubleDouble(ps) {
    let [[a3, a2, a1, a0], [b3, b2, b1, b0]] = get_xy_1.getXY(ps);
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    // var -> a variable
    // _var -> the absolute value of $var
    // var_ -> the error in var (but should still be multiplied by 3*γ²)
    // recall: a*b, where both a and b have errors |a| and |b| we get for the
    // error of (a*b) -> a_|b| + |a|b_ + abs(a*b)
    // error of (a+b) -> a_ + b_ + abs(a+b)
    // the returned errors need to be multiplied by 3γ² to represent the true
    // error
    let a3b1 = tp(a3, b1); // error free
    let a1b3 = tp(a1, b3); // error free
    let a3b2 = tp(a3, b2); // error free
    let a2b2 = tp(a2, b2); // error free
    let a2b3 = tp(a2, b3); // error free
    let a3a3 = tp(a3, a3); // error free
    let b2b2 = tp(b2, b2); // error free
    let b3b3 = tp(b3, b3); // error free
    let a1a3 = tp(a1, a3); // error free
    let a2a2 = tp(a2, a2); // error free
    let b1b3 = tp(b1, b3); // error free
    let b2b3 = tp(b2, b3); // error free
    let a2a3 = tp(a2, a3); // error free
    let a3b3 = tp(a3, b3); // error free
    let a3b0 = tp(a3, b0); // error free
    let a0b3 = tp(a0, b3); // error free
    let a2b0 = tp(a2, b0); // error free
    let a0b2 = tp(a0, b2); // error free
    let a2b1 = tp(a2, b1); // error free
    let a1b2 = tp(a1, b2); // error free
    let a1b0 = tp(a1, b0); // error free
    let a0b1 = tp(a0, b1); // error free
    let q1 = qdq(a3b0, a0b3); // 48-bit aligned => error free
    let q2 = qdq(a3b1, a1b3); // 48-bit aligned => error free
    let q3 = qdq(a3b2, a2b3); // 48-bit aligned => error free
    let q4 = qdq(a2b0, a0b2); // 48-bit aligned => error free
    let q5 = qdq(a2b1, a1b2); // 48-bit aligned => error free
    let q6 = qdq(a1b0, a0b1); // 48-bit aligned => error free
    let t1 = qdq(b1b3, b2b2); // 48-bit aligned => error free
    let t2 = qdq(a1a3, a2a2); // 48-bit aligned => error free
    let p1 = qaq(a2b3, a3b2); // 48-bit aligned => error free
    let p2 = qaq(a1b3, a3b1); // 48-bit aligned => error free
    let tq2 = qm2(q2); // error free
    let q1q1 = qmq(q1, q1);
    let q1q2 = qmq(q1, q2);
    let q1q3 = qmq(q1, q3);
    let q1q5 = qmq(q1, q5);
    let q2q2 = qmq(q2, q2);
    let tq2q4 = qmq(tq2, q4);
    let q3q4 = qmq(q3, q4);
    let q3q5 = qmq(q3, q5);
    let q3q6 = qmq(q3, q6);
    let q1q1_ = 2 * abs(q1q1[1]);
    let q1q2_ = 2 * abs(q1q2[1]);
    let q1q3_ = 2 * abs(q1q3[1]);
    let q1q5_ = 2 * abs(q1q5[1]);
    let q2q2_ = 2 * abs(q2q2[1]);
    let tq2q4_ = 2 * abs(tq2q4[1]);
    let q3q4_ = 2 * abs(q3q4[1]);
    let q3q5_ = 2 * abs(q3q5[1]);
    let q3q6_ = 2 * abs(q3q4[1]);
    let vₓₓₓ = qmd(-b3, b3b3);
    let vₓₓₓ_ = abs(vₓₓₓ[1]);
    // recall: 
    // 49-bit aligned => 0 bits left in e.g. a3b2
    // 48-bit aligned => 2 bits left in e.g. a3b2
    // 47-bit aligned => 4 bits left in e.g. a3b2
    // 46-bit aligned => 6 bits left in e.g. a3b2
    // 47-bit aligned => 3*a0,...,b3 -> error free
    let vₓₓᵧ = qmd(3 * a3, b3b3);
    let vₓₓᵧ_ = abs(vₓₓᵧ[1]);
    // 47-bit aligned => 3*a0,...,b3 -> error free
    let vₓᵧᵧ = qmd(-3 * b3, a3a3);
    let vₓᵧᵧ_ = abs(vₓᵧᵧ[1]);
    let vᵧᵧᵧ = qmd(a3, a3a3);
    let vᵧᵧᵧ_ = abs(vᵧᵧᵧ[1]);
    // 47-bit aligned => qmd(3*q1 - q5,...) -> error free
    let u1 = qdq(qmd(-3, q1), q5); // 47-bit aligned => qmd(3*q1 - q5) -> error free
    //let u1_ = 3*_q1 + _u1;
    // 48-bit aligned => t1, t2 -> error free
    //let t1_ = _b1b3 + _b2b2 + _t1;
    //let _t2 = abs(t2);
    //let t2_ = _a1a3 + _a2a2 + abs(t2);
    let w1 = qmq(u1, b3b3);
    // recall: 2* below since error of qmq is double that of others
    let w1_ = 2 * abs(w1[1]);
    let w2 = qmq(q3, t1);
    let w2_ = 2 * abs(w2[1]);
    let w3 = qaq(w1, w2);
    let w3_ = w1_ + w2_ + abs(w3[1]);
    let w4 = qmq(tq2, b2b3);
    let w4_ = 2 * abs(w4[1]);
    //let vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    let vₓₓ = qaq(w3, w4);
    let vₓₓ_ = w3_ + w4_ + abs(vₓₓ[1]);
    let w5 = qmq(u1, a3a3);
    let w5_ = 2 * abs(w5[1]);
    let w6 = qmq(q3, t2);
    let w6_ = 2 * abs(w6[1]);
    let w7 = qaq(w5, w6);
    let w7_ = w5_ + w6_ + abs(w7[1]);
    let w8 = qmq(tq2, a2a3);
    let w8_ = 2 * abs(w8[1]);
    //let vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    let vᵧᵧ = qaq(w7, w8);
    let vᵧᵧ_ = w7_ + w8_ + abs(vᵧᵧ[1]);
    // 47-bit aligned => wa = a2b2 - p2/2 -> error free
    let wa = qdq(a2b2, qd2(p2));
    let wb = qmq(u1, a3b3);
    let wb_ = 2 * abs(wb[1]);
    let wc = qmq(q2, p1);
    let wc_ = 2 * abs(wc[1]);
    let wd = qaq(wb, wc);
    let wd_ = wb_ + wc_ + abs(wd[1]);
    let wq = qmq(q3, wa);
    let wq_ = 2 * abs(wq[1]);
    //let vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    let vₓᵧ = qm2(qdq(wq, wd));
    let vₓᵧ_ = 2 * (wq_ + wd_) + abs(vₓᵧ[1]);
    let wr = qmd(-3, q1q1);
    let wr_ = 3 * q1q1_ + abs(wr[1]);
    let we = qdq(wr, qm2(q1q5));
    let we_ = wr_ + 2 * q1q5_ + abs(we[1]);
    let wf = qaq(tq2q4, q3q6);
    let wf_ = tq2q4_ + q3q6_ + abs(wf[1]);
    //let s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    let s1 = qaq(we, wf);
    let s1_ = we_ + wf_ + abs(s1[1]);
    //let s2 = 2*(q1q2 - q3q4);
    let s2 = qm2(qdq(q1q2, q3q4));
    let s2_ = 2 * (q1q2_ + q3q4_) + abs(s2[1]);
    let wl = qdq(q1q3, q2q2);
    let wl_ = q1q3_ + q2q2_ + abs(wl[1]);
    //let s3 = q1q3 - q2q2 + q3q5;
    let s3 = qaq(wl, q3q5);
    let s3_ = wl_ + q3q5_ + abs(s3[1]);
    let wm = qmd(b3, s1);
    let wm_ = abs(b3) * s1_ + abs(wm[1]);
    let ws = qmd(b2, s2);
    let ws_ = abs(b2) * s2_ + abs(ws[1]);
    let wt = qmd(b1, s3);
    let wt_ = abs(b1) * s3_ + abs(wt[1]);
    let wn = qaq(ws, wt);
    let wn_ = ws_ + wt_ + abs(wn[1]);
    //let vₓ = b3*s1 + (b2*s2 + b1*s3);
    let vₓ = qaq(wm, wn);
    let vₓ_ = wm_ + wn_ + abs(vₓ[1]);
    let wo = qmd(a3, s1);
    let wo_ = abs(a3) * s1_ + abs(wo[1]);
    let wu = qmd(a2, s2);
    let wu_ = abs(a2) * s2_ + abs(wu[1]);
    let wv = qmd(a1, s3);
    let wv_ = abs(a1) * s3_ + abs(wv[1]);
    let wp = qaq(wu, wv);
    let wp_ = wu_ + wv_ + abs(wp[1]);
    //let vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    let vᵧ = qno(qaq(wo, wp));
    let vᵧ_ = wo_ + wp_ + abs(vᵧ[1]);
    let v3 = qdq(tq2q4, q1q1);
    let v3_ = tq2q4_ + q1q1_ + abs(v3[1]);
    let v1 = qdq(v3, q1q5);
    let _v1 = abs(v1[1]);
    let v1_ = v3_ + q1q5_ + _v1;
    let v4 = qmq(s3, q6);
    let v4_ = s3_ * abs(q6[1]) + 2 * abs(v4[1]);
    let v5 = qmq(q3q4, q4);
    let v5_ = q3q4_ * abs(q4[1]) + 2 * abs(v5[1]);
    let v2 = qdq(v4, v5);
    let v2_ = v4_ + v5_ + abs(v2[1]);
    let v6 = qmq(q1, v1);
    let v6_ = abs(q1[1]) * v1_ + 2 * abs(v6[1]);
    //let v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    let v = qaq(v6, v2);
    let v_ = v6_ + v2_ + abs(v[1]);
    return {
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    };
}
exports.getImplicitForm3_bitlength45_doubleDouble = getImplicitForm3_bitlength45_doubleDouble;
//# sourceMappingURL=get-implicit-form3-bitlength45-double-double.js.map