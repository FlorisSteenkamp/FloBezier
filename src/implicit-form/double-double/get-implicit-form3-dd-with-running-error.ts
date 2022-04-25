import { 
    ddNegativeOf, ddMultBy2, 
    ddMultDouble2, ddMultDd, ddDiffDd, ddAddDd, ddDivBy2
} from 'double-double';
import { toPowerBasis3DdWithRunningError } from '../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js';


const abs = Math.abs;

const qno = ddNegativeOf;    // error -> 0
const qm2 = ddMultBy2;       // error -> 0 
const qd2 = ddDivBy2;        // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = ddMultDouble2;   // error -> 3*γ²
const qmq = ddMultDd;      // error -> 5*γ² (worst found), 7*γ² (theoretical), we use 6*γ²
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
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm3DdWithRunningError(ps: number[][]) {
    // Takes about 15 micro-seconds on a 3rd gen i7 and Chrome 79.

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
    // examples:
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

    const {
        coeffs: [[a3,a2,a1,[,a0]],[b3,b2,b1,[,b0]]],
        errorBound: [[a3_,a2_,a1_],[b3_,b2_,b1_]]  // a0, b0 - error free
    } = toPowerBasis3DdWithRunningError(ps);

    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    const $a1 = a1[1];
    const $a2 = a2[1];
    const $a3 = a3[1];
    const $b1 = b1[1];
    const $b2 = b2[1];
    const $b3 = b3[1];

    const _a0 = abs(a0);
    const _a1 = abs($a1);
    const _a2 = abs($a2);
    const _a3 = abs($a3);
    const _b0 = abs(b0);
    const _b1 = abs($b1);
    const _b2 = abs($b2);
    const _b3 = abs($b3);

    const a3b1 = qmq(a3,b1);
    const $a3b1 = $a3*$b1;
    const a3b1_ = a3_*_b1 + _a3*b1_ + 2*abs($a3b1);
    const a1b3 = qmq(a1,b3);
    const $a1b3 = $a1*$b3;
    const a1b3_ = a1_*_b3 + _a1*b3_ + 2*abs($a1b3);
    const a3b2 = qmq(a3,b2);
    const $a3b2 = $a3*$b2;
    const a3b2_ = a3_*_b2 + _a3*b2_ + 2*abs($a3b2);
    const a2b2 = qmq(a2,b2);
    const $a2b2 = $a2*$b2;
    const a2b2_ = a2_*_b2 + _a2*b2_ + 2*abs($a2b2);
    const a2b3 = qmq(a2,b3);
    const $a2b3 = $a2*$b3;
    const a2b3_ = a2_*_b3 + _a2*b3_ + 2*abs($a2b3);
    const a3a3 = qmq(a3,a3);
    const $a3a3 = $a3*$a3;
    const _a3a3 = abs($a3a3);
    const a3a3_ = a3_*_a3 + _a3*a3_ + 2*abs($a3a3);
    const b2b2 = qmq(b2,b2);
    const $b2b2 = $b2*$b2;
    const b2b2_ = b2_*_b2 + _b2*b2_ + 2*abs($b2b2);
    const b3b3 = qmq(b3,b3);
    const $b3b3 = $b3*$b3;
    const _b3b3 = abs($b3b3);
    const b3b3_ = b3_*_b3 + _b3*b3_ + 2*abs($b3b3);
    const a1a3 = qmq(a1,a3);
    const $a1a3 = $a1*$a3;
    const a1a3_ = a1_*_a3 + _a1*a3_ + 2*abs($a1a3);
    const a2a2 = qmq(a2,a2);
    const $a2a2 = $a2*$a2;
    const a2a2_ = a2_*_a2 + _a2*a2_ + 2*abs($a2a2);
    const b1b3 = qmq(b1,b3);
    const $b1b3 = $b1*$b3;
    const b1b3_ = b1_*_b3 + _b1*b3_ + 2*abs($b1b3);
    const b2b3 = qmq(b2,b3);
    const _b2b3 = abs($b2*$b3);  // or equivalently `_b2b3 = _b2*_b3`;
    const b2b3_ = b2_*_b3 + _b2*b3_ + 2*_b2b3;
    const a2a3 = qmq(a2,a3);
    const _a2a3 = abs($a2*$a3);
    const a2a3_ = a2_*_a3 + _a2*a3_ + 2*_a2a3;
    const a3b3 = qmq(a3,b3);
    const _a3b3 = abs($a3*$b3);
    const a3b3_ = a3_*_b3 + _a3*b3_ + 2*_a3b3;
    const a3b0 = qmd(b0,a3);
    const $a3b0 = $a3*b0;
    const a3b0_ = a3_*_b0 + abs($a3b0);
    const a0b3 = qmd(a0,b3);
    const $a0b3 = a0*$b3;
    const a0b3_ = _a0*b3_ + abs($a0b3);
    const a2b0 = qmd(b0,a2);
    const $a2b0 = $a2*b0;
    const a2b0_ = a2_*_b0 + abs($a2b0);
    const a0b2 = qmd(a0,b2);
    const $a0b2 = a0*$b2;
    const a0b2_ = _a0*b2_ + abs($a0b2);
    const a2b1 = qmq(a2,b1);
    const $a2b1 = $a2*$b1;
    const a2b1_ = a2_*_b1 + _a2*b1_ + 2*abs($a2b1);
    const a1b2 = qmq(a1,b2);
    const $a1b2 = $a1*$b2;
    const a1b2_ = a1_*_b2 + _a1*b2_ + 2*abs($a1b2);
    const a1b0 = qmd(b0,a1);
    const $a1b0 = $a1*b0;
    const a1b0_ = a1_*_b0 + abs($a1b0);
    const a0b1 = qmd(a0,b1);
    const $a0b1 = a0*$b1;
    const a0b1_ = _a0*b1_ + abs($a0b1);

    const q1 = qdq(a3b0,a0b3);
    const q1_ = a3b0_ + a0b3_ + abs($a3b0 - $a0b3)
    const q2 = qdq(a3b1,a1b3);
    const q2_ = a3b1_ + a1b3_ + abs($a3b1 - $a1b3)
    const q3 = qdq(a3b2,a2b3);
    const q3_ = a3b2_ + a2b3_ + abs($a3b2 - $a2b3)
    const q4 = qdq(a2b0,a0b2);
    const q4_ = a2b0_ + a0b2_ + abs($a2b0 - $a0b2)
    const q5 = qdq(a2b1,a1b2);
    const q5_ = a2b1_ + a1b2_ + abs($a2b1 - $a1b2)
    const q6 = qdq(a1b0,a0b1);
    const q6_ = a1b0_ + a0b1_ + abs($a1b0 - $a0b1)
    const _t1 = abs($b1b3 - $b2b2);
    const t1 = qdq(b1b3,b2b2);
    const t1_ = b1b3_ + b2b2_ + _t1;
    const _t2 = abs($a1a3 - $a2a2);
    const t2 = qdq(a1a3,a2a2);
    const t2_ = a1a3_ + a2a2_ + abs($a1a3 - $a2a2)
    const _p1 = abs($a2b3 + $a3b2);
    const p1 = qaq(a2b3,a3b2);
    const p1_ = a2b3_ + a3b2_ + abs($a2b3 + $a3b2)
    const $p2 = $a1b3 + $a3b1;
    const _p2 = abs($p2);
    const p2 = qaq(a1b3,a3b1);
    const p2_ = a1b3_ + a3b1_ + _p2;
    const tq2 = qm2(q2);
    const tq2_ = 2*q2_;

    const $q1 = $a3b0 - $a0b3;
    const $q2 = $a3b1 - $a1b3;
    const $q3 = $a3b2 - $a2b3;
    const $q4 = $a2b0 - $a0b2;
    const $q5 = $a2b1 - $a1b2;
    const $q6 = $a1b0 - $a0b1;

    const _q1 = abs($q1);
    const _q2 = abs($q2);
    const _q3 = abs($q3);
    const _q4 = abs($q4);
    const _q5 = abs($q5);
    const _q6 = abs($q6);
    const _tq2 = 2*_q2;

    const q1q1  = qmq(q1,q1);
    const q1q2  = qmq(q1,q2);
    const q1q3  = qmq(q1,q3);
    const q1q5  = qmq(q1,q5);
    const q2q2  = qmq(q2,q2);
    const tq2q4 = qmq(tq2,q4);
    const q3q4  = qmq(q3,q4);
    const q3q5  = qmq(q3,q5);
    const q3q6  = qmq(q3,q6);

    const q1q1_  = q1_*_q1 + _q1*q1_ + 2*abs(q1q1[1]);
    const q1q2_  = q1_*_q2 + _q1*q2_ + 2*abs(q1q2[1]);
    const q1q3_  = q1_*_q3 + _q1*q3_ + 2*abs(q1q3[1]);
    const q1q5_  = q1_*_q5 + _q1*q5_ + 2*abs(q1q5[1]);
    const q2q2_  = q2_*_q2 + _q2*q2_ + 2*abs(q2q2[1]);
    const tq2q4_ = tq2_*_q4 + _tq2*q4_+  2*abs(tq2q4[1]);
    const q3q4_  = q3_*_q4 + _q3*q4_ + 2*abs(q3q4[1]);
    const q3q5_  = q3_*_q5 + _q3*q5_ + 2*abs(q3q5[1]);
    const q3q6_  = q3_*_q6 + _q3*q6_ + 2*abs(q3q4[1]);


    const vₓₓₓ = qmq(qno(b3),b3b3);
    const vₓₓₓ_ = b3_*_b3b3 + _b3*b3b3_ + 2*abs(vₓₓₓ[1]);

    const _z1 = 3*_a3;
    const z1 = qmd(3,a3);
    const z1_ = 3*a3_ + _z1;
    const vₓₓᵧ  = qmq(z1,b3b3);
    const vₓₓᵧ_ = z1_*_b3b3 + _z1*b3b3_ + 2*abs(vₓₓᵧ[1]);

    const _z2 = 3*_b3;
    const z2 = qmd(-3,b3);
    const z2_ = 3*b3_ + _z2;
    const vₓᵧᵧ  = qmq(z2,a3a3);
    const vₓᵧᵧ_ = z2_*_a3a3 + _z2*a3a3_ + 2*abs(vₓᵧᵧ[1]);

    const vᵧᵧᵧ =  qmq(a3,a3a3);
    const vᵧᵧᵧ_ = a3_*_a3a3 + _a3*a3a3_ + 2*abs(vᵧᵧᵧ[1]);


    const $z3 = -3*$q1;
    const _z3 = 3*_q1;
    const z3 = qmd(-3,q1);
    const z3_ = 3*q1_ + _z3;
    const u1 = qdq(z3, q5);
    const _u1 = abs($z3 - $q5);
    const u1_ = z3_ + q5_ + _u1;

    
    //const t1_ = _b1b3 + _b2b2 + _t1;
    //const _t2 = abs(t2);
    //const t2_ = _a1a3 + _a2a2 + abs(t2);
    
    const w1 = qmq(u1,b3b3);
    const w1_ = u1_*_b3b3 + _u1*b3b3_ + 2*abs(w1[1]);
    const w2 = qmq(q3,t1);
    const w2_ = q3_*_t1 + _q3*t1_ + 2*abs(w2[1]);

    const w3 = qaq(w1,w2);
    const w3_ = w1_ + w2_ + abs(w3[1]);
    const w4 = qmq(tq2,b2b3);
    const w4_ = tq2_*_b2b3 + _tq2*b2b3_ + 2*abs(w4[1])
    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const vₓₓ = qaq(w3, w4);
    const vₓₓ_ = w3_ + w4_ + abs(vₓₓ[1]);


    const w5 = qmq(u1,a3a3);
    const w5_ = u1_*_a3a3 + _u1*a3a3_ + 2*abs(w5[1]);
    const w6 = qmq(q3,t2);
    const w6_ = q3_*_t2 + _q3*t2_ + 2*abs(w6[1]);
    const w7 = qaq(w5,w6);
    const w7_ = w5_ + w6_ + abs(w7[1]);
    const w8 = qmq(tq2,a2a3);
    const w8_ = tq2_*_a2a3 + _tq2*a2a3_ + 2*abs(w8[1]);
    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const vᵧᵧ = qaq(w7,w8);
    const vᵧᵧ_ = w7_ + w8_ + abs(vᵧᵧ[1]);
    

    const _wa = abs($a2b2 - $p2/2);
    const wa = qdq(a2b2,qd2(p2));
    const wa_ = a2b2_ + p2_/2 + abs(wa[1]);
    const wb = qmq(u1,a3b3);
    const wb_ = u1_*_a3b3 + _u1*a3b3_ + 2*abs(wb[1]);
    const wc = qmq(q2,p1);
    const wc_ = q2_*_p1 + _q2*p1_ + 2*abs(wc[1]);
    const wd = qaq(wb,wc);
    const wd_ = wb_ + wc_ + abs(wd[1]);
    const wq = qmq(q3,wa);
    const wq_ = q3_*_wa + _q3*wa_ + 2*abs(wq[1]);

    //-------------------------------------------------------
    // const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    //-------------------------------------------------------
    const vₓᵧ = qm2(qdq(wq,wd));
    const vₓᵧ_ = 2*(wq_ + wd_) + abs(vₓᵧ[1]);


    const wr = qmd(-3,q1q1);
    const wr_ = 3*q1q1_ + abs(wr[1]);
    const we = qdq(wr,qm2(q1q5));
    const we_ = wr_ + 2*q1q5_ + abs(we[1]);
    const wf = qaq(tq2q4,q3q6);
    const wf_ = tq2q4_ + q3q6_ + abs(wf[1]);

    //------------------------------------------------
    // const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    //------------------------------------------------
    const s1 = qaq(we,wf);
    const _s1 = abs(s1[1]);
    const s1_ = we_ + wf_ + _s1;


    //-----------------------------
    // const s2 = 2*(q1q2 - q3q4);
    //-----------------------------
    const s2 = qm2(qdq(q1q2,q3q4));
    const _s2 = abs(s2[1]);
    const s2_ = 2*(q1q2_ + q3q4_) + _s2;
    const wl = qdq(q1q3,q2q2);
    const wl_ = q1q3_ + q2q2_ + abs(wl[1]);

    //-------------------------------
    // const s3 = q1q3 - q2q2 + q3q5;
    //-------------------------------
    
    const s3 = qaq(wl,q3q5);
    const _s3 = abs(s3[1]);
    const s3_ = wl_ + q3q5_ + _s3;
    const wm = qmq(b3,s1);
    const wm_ = b3_*_s1 + _b3*s1_ + 2*abs(wm[1]);
    const ws = qmq(b2,s2);
    const ws_ = b2_*_s2 + _b2*s2_ + 2*abs(ws[1]);
    const wt = qmq(b1,s3);
    const wt_ = b1_*_s3 + _b1*s3_ + 2*abs(wt[1]);
    const wn = qaq(ws,wt);
    const wn_ = ws_ + wt_ + abs(wn[1]);

    //-------------------------------
    // const vₓ = b3*s1 + (b2*s2 + b1*s3);
    //-------------------------------
    const vₓ = qaq(wm,wn);
    const vₓ_ = wm_ + wn_ + abs(vₓ[1]);


    const wo = qmq(a3,s1);
    const wo_ = a3_*_s1 + _a3*s1_ + 2*abs(wo[1]);
    const wu = qmq(a2,s2);
    const wu_ = a2_*_s2 + _a2*s2_ + 2*abs(wu[1]);
    const wv = qmq(a1,s3);
    const wv_ = a1_*_s3 + _a1*s3_ + 2*abs(wv[1]);
    const wp = qaq(wu,wv);
    const wp_ = wu_ + wv_ + abs(wp[1]);

    //-------------------------------------
    // const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    //-------------------------------------
    const vᵧ = qno(qaq(wo,wp));
    const vᵧ_ = wo_ + wp_ + abs(vᵧ[1]);


    // the commented part above is re
    const v3 = qdq(tq2q4,q1q1);
    const v1 = qdq(v3,q1q5);
    const _v1 = abs(v1[1]);
    const v4 = qmq(s3,q6);
    const v5 = qmq(q3q4,q4);
    const v2 = qdq(v4,v5);
    const v2_ = s3_*abs(q6[1]) + 2*abs(v4[1]) + q3q4_*abs(q4[1]) + 2*abs(v5[1]) + abs(v2[1]);
    const v6 = qmq(q1,v1);
    const v6_ =  q1_*_v1 + _q1*tq2q4_ + q1q1_ + abs(v3[1]) + q1q5_ + _v1 + 2*abs(v6[1]);
    // -------------------------------------------------------------------------
    


    //-------------------------------------------------------
    // const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    //-------------------------------------------------------
    const v = qaq(v6,v2);
    const v_ = v6_ + v2_ + abs(v[1]);

        
    return { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm3DdWithRunningError }
