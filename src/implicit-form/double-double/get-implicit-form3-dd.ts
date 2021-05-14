import { 
    twoProduct, ddNegativeOf, ddMultBy2, 
    ddMultDouble2, ddMultDd, ddDiffDd, ddAddDd, ddDivBy2
} from 'double-double';
import { getXY } from '../../to-power-basis/get-xy';


const abs = Math.abs;

const tp  = twoProduct;     // error -> 0
const qno = ddNegativeOf;    // error -> 0
const qm2 = ddMultBy2;       // error -> 0 
const qd2 = ddDivBy2;        // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = ddMultDouble2;   // error -> 3*γ²
const qmq = ddMultDd;      // error -> 5*γ² (theoretical), 7*γ² (worst found), we use 6*γ²
const qdq = ddDiffDd;      // error -> 3*γ²
const qaq = ddAddDd;       // error -> 3*γ²


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
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be multiplied by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 15 micro-seconds on a 3rd gen i7 and Chrome 79
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm3Dd(ps: number[][]) {
    const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXY(ps);

    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    //--------------------------------------------------------------------------
    // `var` -> a variable
    // `$var` -> the double precision approximation to `var`
    // `_var` -> the absolute value of $var (a prefix underscore on a variable means absolute value)
    // `var_` -> the error in var (a postfix underscore means error bound but should still be multiplied by 3*γ²)
    // `_var_` -> means both absolute value and absolute error bound
    // recall: `a*b`, where both `a` and `b` have errors |a| and |b| we get for the
    //   * error bound of (a*b) === a_|b| + |a|b_ + |a*b|   (when either of a and b is double)
    //   * error bound of (a*b) === a_|b| + |a|b_ + 2|a*b|  (when both a and b is double-double)
    //   * error bound of (a+b) === a_ + b_ + |a+b|         (when a and/or b is double or double-double)
    // * the returned errors need to be multiplied by 3γ² to get the true error
    // * can use either `$var` or `var[var.length-1]` (the approx value) in error calculations
    //   due to multiplication by 3*γ² and not 3*u²
    //--------------------------------------------------------------------------
    // examples: (all?)
    // ----------------
    // let qmd === ddMultDouble2, etc.
    //
    // ---------------
    // 1. double-double X by double
    // ---------------
    // qmd(a,b);  // both `a` and `b` is error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + |a*b| (by definition)
    //                           === 0|b| + |a|0 + |a*b|
    //                           === |a*b|
    //
    // ---------------
    // 2a. double-double +/- double-double
    // ---------------
    // qdq(a,b);  // error in a === |a|, thus call the error _a_, same with b
    // use: error bound of (a+b) === a_ + b_ + |a+b| (by definition)
    //                           === _a_ + _b_ + |a+b|
    //
    // ---------------
    // 2b. double-double +/- double-double
    // ---------------
    // qaq(a,b);  // error in a === 2|a|, thus the error is 2*_a, same with b
    // use: error bound of (a+b) === a_ + b_ + |a+b| (by definition)
    //                           === 2*_a + 2*_b + |a+b|
    //                           === 2*(_a + _b) + |a+b| OR
    //                           === a_ + b_ + |a+b|
    //
    // ---------------
    // 3a. double-double X double-double
    // ---------------
    // qmq(a,b);  // both `a` and `b` error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + |a*b| (by definition)
    //                           === 0|b| + |a|0 + 2|a*b|
    //                           === 2|a*b| 
    //
    // ---------------
    // 3b. double-double X double-double
    // ---------------
    // qmq(a,b);  // both `a` and `b` not error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + 2|a*b| (by definition)
    //
    // ---------------
    // 3b. double-double X double-double
    // ---------------
    // qmq(a,b);  // both `a` not error-free and `b` error-free
    // use: error bound of (a*b) === a_|b| + |a|b_ + 2|a*b| (by definition)
    //                           === a_|b| + 2|a*b| 
    //
    // ---------------
    // 4a. double-double +/- double
    // ---------------
    // qad(a,b);  // both `a` and `b` error-free
    // use: error bound of (a+b) === a_ + b_ + |a+b| (by definition)
    //                           === 0 + 0 + |a+b|
    //                           === |a+b| 
    //--------------------------------------------------------------------------

    const a3b1 = tp(a3,b1);  // error free
    const a1b3 = tp(a1,b3);  // error free
    const a3b2 = tp(a3,b2);  // error free
    const a2b2 = tp(a2,b2);  // error free
    const a2b3 = tp(a2,b3);  // error free
    const a3a3 = tp(a3,a3);  // error free
    const b2b2 = tp(b2,b2);  // error free
    const b3b3 = tp(b3,b3);  // error free
    const a1a3 = tp(a1,a3);  // error free
    const a2a2 = tp(a2,a2);  // error free
    const b1b3 = tp(b1,b3);  // error free
    const b2b3 = tp(b2,b3);  // error free
    const a2a3 = tp(a2,a3);  // error free
    const a3b3 = tp(a3,b3);  // error free
    const a3b0 = tp(a3,b0);  // error free
    const a0b3 = tp(a0,b3);  // error free
    const a2b0 = tp(a2,b0);  // error free
    const a0b2 = tp(a0,b2);  // error free
    const a2b1 = tp(a2,b1);  // error free
    const a1b2 = tp(a1,b2);  // error free
    const a1b0 = tp(a1,b0);  // error free
    const a0b1 = tp(a0,b1);  // error free

    const q1 = qdq(a3b0,a0b3);  // 48-bit aligned => error free
    const q2 = qdq(a3b1,a1b3);  // 48-bit aligned => error free
    const q3 = qdq(a3b2,a2b3);  // 48-bit aligned => error free
    const q4 = qdq(a2b0,a0b2);  // 48-bit aligned => error free
    const q5 = qdq(a2b1,a1b2);  // 48-bit aligned => error free
    const q6 = qdq(a1b0,a0b1);  // 48-bit aligned => error free
    const t1 = qdq(b1b3,b2b2);  // 48-bit aligned => error free
    const t2 = qdq(a1a3,a2a2);  // 48-bit aligned => error free
    const p1 = qaq(a2b3,a3b2);  // 48-bit aligned => error free
    const p2 = qaq(a1b3,a3b1);  // 48-bit aligned => error free
    const tq2 = qm2(q2);        // error free

    const q1q1  = qmq(q1,q1);
    const q1q2  = qmq(q1,q2);
    const q1q3  = qmq(q1,q3);
    const q1q5  = qmq(q1,q5);
    const q2q2  = qmq(q2,q2);
    const tq2q4 = qmq(tq2,q4);
    const q3q4  = qmq(q3,q4);
    const q3q5  = qmq(q3,q5);
    const q3q6  = qmq(q3,q6);

    const q1q1_  = 2*abs(q1q1[1]);
    const q1q2_  = 2*abs(q1q2[1]);
    const q1q3_  = 2*abs(q1q3[1]);
    const q1q5_  = 2*abs(q1q5[1]);
    const q2q2_  = 2*abs(q2q2[1]);
    const tq2q4_ = 2*abs(tq2q4[1]);
    const q3q4_  = 2*abs(q3q4[1]);
    const q3q5_  = 2*abs(q3q5[1]);
    const q3q6_  = 2*abs(q3q4[1]);


    const vₓₓₓ = qmd(-b3,b3b3);
    const vₓₓₓ_ = abs(vₓₓₓ[1]);

    // recall: 
    // 49-bit aligned => 0 bits left in e.g. a3b2
    // 48-bit aligned => 2 bits left in e.g. a3b2
    // 47-bit aligned => 4 bits left in e.g. a3b2
    // 46-bit aligned => 6 bits left in e.g. a3b2

    // 47-bit aligned => 3*a0,...,b3 -> error free
    const vₓₓᵧ  = qmd(3*a3,b3b3);
    const vₓₓᵧ_ = abs(vₓₓᵧ[1]);

    // 47-bit aligned => 3*a0,...,b3 -> error free
    const vₓᵧᵧ  = qmd(-3*b3,a3a3);
    const vₓᵧᵧ_ = abs(vₓᵧᵧ[1]);

    const vᵧᵧᵧ =  qmd(a3,a3a3);
    const vᵧᵧᵧ_ = abs(vᵧᵧᵧ[1]);

    // 47-bit aligned => qmd(3*q1 - q5,...) -> error free
    const u1 = qdq(qmd(-3,q1), q5); // 47-bit aligned => qmd(3*q1 - q5) -> error free
    //const u1_ = 3*_q1 + _u1;

    // 48-bit aligned => t1, t2 -> error free
    //const t1_ = _b1b3 + _b2b2 + _t1;
    //const _t2 = abs(t2);
    //const t2_ = _a1a3 + _a2a2 + abs(t2);
    
    const w1 = qmq(u1,b3b3);
    // recall: 2* below since error of qmq is double that of others
    const w1_ = 2*abs(w1[1]); 
    const w2 = qmq(q3,t1);
    const w2_ = 2*abs(w2[1]);
    const w3 = qaq(w1,w2);
    const w3_ = w1_ + w2_ + abs(w3[1]);
    const w4 = qmq(tq2,b2b3);
    const w4_ = 2*abs(w4[1])
    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const vₓₓ = qaq(w3, w4);
    const vₓₓ_ = w3_ + w4_ + abs(vₓₓ[1]);


    const w5 = qmq(u1,a3a3);
    const w5_ = 2*abs(w5[1]);
    const w6 = qmq(q3,t2);
    const w6_ = 2*abs(w6[1]);
    const w7 = qaq(w5,w6);
    const w7_ = w5_ + w6_ + abs(w7[1]);
    const w8 = qmq(tq2,a2a3);
    const w8_ = 2*abs(w8[1]);
    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const vᵧᵧ = qaq(w7,w8);
    const vᵧᵧ_ = w7_ + w8_ + abs(vᵧᵧ[1]);
    

    // 47-bit aligned => wa = a2b2 - p2/2 -> error free
    const wa = qdq(a2b2,qd2(p2));
    const wb = qmq(u1,a3b3);
    const wb_ = 2*abs(wb[1]);
    const wc = qmq(q2,p1);
    const wc_ = 2*abs(wc[1]);
    const wd = qaq(wb,wc);
    const wd_ = wb_ + wc_ + abs(wd[1]);
    const wq = qmq(q3,wa);
    const wq_ = 2*abs(wq[1]);
    //const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    const vₓᵧ = qm2(qdq(wq,wd));
    const vₓᵧ_ = 2*(wq_ + wd_) + abs(vₓᵧ[1]);


    const wr = qmd(-3,q1q1);
    const wr_ = 3*q1q1_ + abs(wr[1]);
    const we = qdq(wr,qm2(q1q5));
    const we_ = wr_ + 2*q1q5_ + abs(we[1]);
    const wf = qaq(tq2q4,q3q6);
    const wf_ = tq2q4_ + q3q6_ + abs(wf[1]);
    //const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    const s1 = qaq(we,wf);
    const s1_ = we_ + wf_ + abs(s1[1]);


    //const s2 = 2*(q1q2 - q3q4);
    const s2 = qm2(qdq(q1q2,q3q4));
    const s2_ = 2*(q1q2_ + q3q4_) + abs(s2[1]);


    const wl = qdq(q1q3,q2q2);
    const wl_ = q1q3_ + q2q2_ + abs(wl[1]);
    //const s3 = q1q3 - q2q2 + q3q5;
    const s3 = qaq(wl,q3q5);
    const s3_ = wl_ + q3q5_ + abs(s3[1]);

    
    const wm = qmd(b3,s1); 
    const wm_ = abs(b3)*s1_ + abs(wm[1]);
    const ws = qmd(b2,s2);
    const ws_ = abs(b2)*s2_ + abs(ws[1]);
    const wt = qmd(b1,s3);
    const wt_ = abs(b1)*s3_ + abs(wt[1]);
    const wn = qaq(ws,wt);
    const wn_ = ws_ + wt_ + abs(wn[1]);
    //const vₓ = b3*s1 + (b2*s2 + b1*s3);
    const vₓ = qaq(wm,wn);
    const vₓ_ = wm_ + wn_ + abs(vₓ[1]);


    const wo = qmd(a3,s1);
    const wo_ = abs(a3)*s1_ + abs(wo[1]);
    const wu = qmd(a2,s2);
    const wu_ = abs(a2)*s2_ + abs(wu[1]);
    const wv = qmd(a1,s3);
    const wv_ = abs(a1)*s3_ + abs(wv[1]);
    const wp = qaq(wu,wv);
    const wp_ = wu_ + wv_ + abs(wp[1]);
    //const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    const vᵧ = qno(qaq(wo,wp));
    const vᵧ_ = wo_ + wp_ + abs(vᵧ[1]);


    const v3 = qdq(tq2q4,q1q1);
    const v3_ = tq2q4_ + q1q1_ + abs(v3[1]);
    const v1 = qdq(v3,q1q5);
    const v1_ = v3_ + q1q5_ + abs(v1[1]);
    const v4 = qmq(s3,q6);
    const v4_ = s3_*abs(q6[1]) + 2*abs(v4[1]);
    const v5 = qmq(q3q4,q4);
    const v5_ = q3q4_*abs(q4[1]) + 2*abs(v5[1]);
    const v2 = qdq(v4,v5);
    const v2_ = v4_ + v5_ + abs(v2[1]);
    const v6 = qmq(q1,v1);
    const v6_ = abs(q1[1])*v1_ + 2*abs(v6[1]);
    
    //const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    const v = qaq(v6,v2);
    const v_ = v6_ + v2_ + abs(v[1]);

        
    return { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm3Dd }
