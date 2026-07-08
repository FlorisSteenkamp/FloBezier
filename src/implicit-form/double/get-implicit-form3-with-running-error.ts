import { toPowerBasis3WithRunningError } from '../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js';

const { abs } = Math;


/**
 * Returns a double-double precision implicit form of the given cubic 
 * bezier curve curve and a coefficientwise error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u) === 3.697785493223493e-32`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps a cubic bezier curve given as an array of its control points, 
 * e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 * 
 * @doc mdx
 */
function getImplicitForm3WithRunningError(
        ps: number[][]): {
            coeffs: {
                vₓₓₓ: number; vₓₓᵧ: number; vₓᵧᵧ: number; vᵧᵧᵧ: number;
                vₓₓ: number; vₓᵧ: number; vᵧᵧ: number;
                vₓ: number; vᵧ: number;
                v: number;
            };
            errorBound: {
                vₓₓₓ_: number; vₓₓᵧ_: number; vₓᵧᵧ_: number; vᵧᵧᵧ_: number;
                vₓₓ_: number; vₓᵧ_: number; vᵧᵧ_: number;
                vₓ_: number; vᵧ_: number;
                v_: number;
            };
        } {

    //--------------------------------------------------------------------------
    // See: error-analysis-double.txt
    //--------------------------------------------------------------------------

    const {
        coeffs: [[a3,a2,a1,a0],[b3,b2,b1,b0]],
        errorBound: [[a3_,a2_,a1_],[b3_,b2_,b1_]]  // a0, b0 - error free
    } = toPowerBasis3WithRunningError(ps);

    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    const _a0 = abs(a0);
    const _a1 = abs(a1);
    const _a2 = abs(a2);
    const _a3 = abs(a3);
    const _b0 = abs(b0);
    const _b1 = abs(b1);
    const _b2 = abs(b2);
    const _b3 = abs(b3);

    const a3b1 = a3*b1;
    const a3b1_ = a3_*_b1 + _a3*b1_ + abs(a3b1);
    const a1b3 = a1*b3;
    const a1b3_ = a1_*_b3 + _a1*b3_ + abs(a1b3);
    const a3b2 = a3*b2;
    const a3b2_ = a3_*_b2 + _a3*b2_ + abs(a3b2);
    const a2b2 = a2*b2;
    const a2b2_ = a2_*_b2 + _a2*b2_ + abs(a2b2);
    const a2b3 = a2*b3;
    const a2b3_ = a2_*_b3 + _a2*b3_ + abs(a2b3);
    const a3a3 = a3*a3;
    const _a3a3 = abs(a3a3);
    const a3a3_ = a3_*_a3 + _a3*a3_ + abs(a3a3);
    const b2b2 = b2*b2;
    const b2b2_ = b2_*_b2 + _b2*b2_ + abs(b2b2);
    const b3b3 = b3*b3;
    const _b3b3 = abs(b3b3);
    const b3b3_ = b3_*_b3 + _b3*b3_ + abs(b3b3);
    const a1a3 = a1*a3;
    const a1a3_ = a1_*_a3 + _a1*a3_ + abs(a1a3);
    const a2a2 = a2*a2;
    const a2a2_ = a2_*_a2 + _a2*a2_ + abs(a2a2);
    const b1b3 = b1*b3;
    const b1b3_ = b1_*_b3 + _b1*b3_ + abs(b1b3);
    const b2b3 = b2*b3;
    const _b2b3 = _b2*_b3;
    const b2b3_ = b2_*_b3 + _b2*b3_ + 2*_b2b3;
    const a2a3 = a2*a3;
    const _a2a3 = abs(a2*a3);
    const a2a3_ = a2_*_a3 + _a2*a3_ + 2*_a2a3;
    const a3b3 = a3*b3;
    const _a3b3 = abs(a3*b3);
    const a3b3_ = a3_*_b3 + _a3*b3_ + 2*_a3b3;
    const a3b0 = a3*b0;
    const a3b0_ = a3_*_b0 + abs(a3b0);
    const a0b3 = a0*b3;
    const a0b3_ = _a0*b3_ + abs(a0b3);
    const a2b0 = a2*b0;
    const a2b0_ = a2_*_b0 + abs(a2b0);
    const a0b2 = a0*b2;
    const a0b2_ = _a0*b2_ + abs(a0b2);
    const a2b1 = a2*b1;
    const a2b1_ = a2_*_b1 + _a2*b1_ + abs(a2b1);
    const a1b2 = a1*b2;
    const a1b2_ = a1_*_b2 + _a1*b2_ + abs(a1b2);
    const a1b0 = a1*b0;
    const a1b0_ = a1_*_b0 + abs(a1b0);
    const a0b1 = a0*b1;
    const a0b1_ = _a0*b1_ + abs(a0b1);


    const q1 = a3b0 - a0b3;
    const q1_ = a3b0_ + a0b3_ + abs(a3b0 - a0b3)
    const q2 = a3b1 - a1b3;
    const q2_ = a3b1_ + a1b3_ + abs(a3b1 - a1b3)
    const q3 = a3b2 - a2b3;
    const q3_ = a3b2_ + a2b3_ + abs(a3b2 - a2b3)
    const q4 = a2b0 - a0b2;
    const q4_ = a2b0_ + a0b2_ + abs(a2b0 - a0b2)
    const q5 = a2b1 - a1b2;
    const q5_ = a2b1_ + a1b2_ + abs(a2b1 - a1b2)
    const q6 = a1b0 - a0b1;
    const q6_ = a1b0_ + a0b1_ + abs(a1b0 - a0b1)
    const _t1 = abs(b1b3 - b2b2);
    const t1 = b1b3 - b2b2;
    const t1_ = b1b3_ + b2b2_ + _t1;
    const _t2 = abs(a1a3 - a2a2);
    const t2 = a1a3 - a2a2;
    const t2_ = a1a3_ + a2a2_ + abs(a1a3 - a2a2)
    const _p1 = abs(a2b3 + a3b2);
    const p1 = a2b3 + a3b2;
    const p1_ = a2b3_ + a3b2_ + abs(a2b3 + a3b2)
    const p2 = a1b3 + a3b1;
    const _p2 = abs(p2);
    const p2_ = a1b3_ + a3b1_ + _p2;
    const tq2 = 2*q2;
    const tq2_ = 2*q2_;

    const _q1 = abs(q1);
    const _q2 = abs(q2);
    const _q3 = abs(q3);
    const _q4 = abs(q4);
    const _q5 = abs(q5);
    const _q6 = abs(q6);
    const _tq2 = 2*_q2;

    const q1q1  = q1*q1;
    const q1q2  = q1*q2;
    const q1q3  = q1*q3;
    const q1q5  = q1*q5;
    const q2q2  = q2*q2;
    const tq2q4 = tq2*q4;
    const q3q4  = q3*q4;
    const _q3q4 = abs(q3q4);
    const q3q5  = q3*q5;
    const q3q6  = q3*q6;

    const q1q1_  = q1_*_q1 + _q1*q1_ + abs(q1q1);
    const q1q2_  = q1_*_q2 + _q1*q2_ + abs(q1q2);
    const q1q3_  = q1_*_q3 + _q1*q3_ + abs(q1q3);
    const q1q5_  = q1_*_q5 + _q1*q5_ + abs(q1q5);
    const q2q2_  = q2_*_q2 + _q2*q2_ + abs(q2q2);
    const tq2q4_ = tq2_*_q4 + _tq2*q4_+  abs(tq2q4);
    const q3q4_  = q3_*_q4 + _q3*q4_ + abs(q3q4);
    const q3q5_  = q3_*_q5 + _q3*q5_ + abs(q3q5);
    const q3q6_  = q3_*_q6 + _q3*q6_ + abs(q3q6);


    const vₓₓₓ = -b3*b3b3;
    const vₓₓₓ_ = b3_*_b3b3 + _b3*b3b3_ + abs(vₓₓₓ);

    const z1 = 3*a3;
    const _z1 = 3*_a3;
    const z1_ = 3*a3_ + _z1;
    const vₓₓᵧ  = z1*b3b3;
    const vₓₓᵧ_ = z1_*_b3b3 + _z1*b3b3_ + abs(vₓₓᵧ);

    const z2 = -3*b3;
    const _z2 = 3*_b3;
    const z2_ = 3*b3_ + _z2;
    const vₓᵧᵧ  = z2*a3a3;
    const vₓᵧᵧ_ = z2_*_a3a3 + _z2*a3a3_ + abs(vₓᵧᵧ);

    const vᵧᵧᵧ =  a3*a3a3;
    const vᵧᵧᵧ_ = a3_*_a3a3 + _a3*a3a3_ + abs(vᵧᵧᵧ);


    const z3 = -3*q1;
    const _z3 = 3*_q1;
    const z3_ = 3*q1_ + _z3;
    const u1 = z3 - q5;
    const _u1 = abs(z3 - q5);
    const u1_ = z3_ + q5_ + _u1;

    const w1 = u1*b3b3;
    const w1_ = u1_*_b3b3 + _u1*b3b3_ + abs(w1);
    const w2 = q3*t1;
    const w2_ = q3_*_t1 + _q3*t1_ + abs(w2);

    const w3 = w1 + w2;
    const w3_ = w1_ + w2_ + abs(w3);
    const w4 = tq2*b2b3;
    const w4_ = tq2_*_b2b3 + _tq2*b2b3_ + abs(w4)
    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const vₓₓ = w3 +  w4;
    const vₓₓ_ = w3_ + w4_ + abs(vₓₓ);


    const w5 = u1*a3a3;
    const w5_ = u1_*_a3a3 + _u1*a3a3_ + abs(w5);
    const w6 = q3*t2;
    const w6_ = q3_*_t2 + _q3*t2_ + abs(w6);
    const w7 = w5 + w6;
    const w7_ = w5_ + w6_ + abs(w7);
    const w8 = tq2*a2a3;
    const w8_ = tq2_*_a2a3 + _tq2*a2a3_ + abs(w8);
    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const vᵧᵧ = w7 + w8;
    const vᵧᵧ_ = w7_ + w8_ + abs(vᵧᵧ);
    

    const _wa = abs(a2b2 - p2/2);
    const wa = a2b2 - p2/2;
    const wa_ = a2b2_ + p2_/2 + abs(wa);
    const wb = u1*a3b3;
    const wb_ = u1_*_a3b3 + _u1*a3b3_ + abs(wb);
    const wc = q2*p1;
    const wc_ = q2_*_p1 + _q2*p1_ + abs(wc);
    const wd = wb + wc;
    const wd_ = wb_ + wc_ + abs(wd);
    const wq = q3*wa;
    const wq_ = q3_*_wa + _q3*wa_ + abs(wq);

    //-------------------------------------------------------
    // const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    //-------------------------------------------------------
    const vₓᵧ = 2*(wq - wd);
    const vₓᵧ_ = 2*(wq_ + wd_) + abs(vₓᵧ);


    const wr = -3*q1q1;
    const wr_ = 3*q1q1_ + abs(wr);
    const we = wr - 2*q1q5;
    const we_ = wr_ + 2*q1q5_ + abs(we);
    const wf = tq2q4 + q3q6;
    const wf_ = tq2q4_ + q3q6_ + abs(wf);

    //------------------------------------------------
    // const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    //------------------------------------------------
    const s1 = we + wf;
    const _s1 = abs(s1);
    const s1_ = we_ + wf_ + _s1;


    //-----------------------------
    // const s2 = 2*(q1q2 - q3q4);
    //-----------------------------
    const s2 = 2*(q1q2 - q3q4);
    const _s2 = abs(s2);
    const s2_ = 2*(q1q2_ + q3q4_) + _s2;
    const wl = q1q3 - q2q2;
    const wl_ = q1q3_ + q2q2_ + abs(wl);

    //-------------------------------
    // const s3 = q1q3 - q2q2 + q3q5;
    //-------------------------------
    
    const s3 = wl + q3q5;
    const _s3 = abs(s3);
    const s3_ = wl_ + q3q5_ + _s3;
    const wm = b3*s1;
    const wm_ = b3_*_s1 + _b3*s1_ + abs(wm);
    const ws = b2*s2;
    const ws_ = b2_*_s2 + _b2*s2_ + abs(ws);
    const wt = b1*s3;
    const wt_ = b1_*_s3 + _b1*s3_ + abs(wt);
    const wn = ws + wt;
    const wn_ = ws_ + wt_ + abs(wn);

    //-------------------------------
    // const vₓ = b3*s1 + (b2*s2 + b1*s3);
    //-------------------------------
    const vₓ = wm + wn;
    const vₓ_ = wm_ + wn_ + abs(vₓ);


    const wo = a3*s1;
    const wo_ = a3_*_s1 + _a3*s1_ + abs(wo);
    const wu = a2*s2;
    const wu_ = a2_*_s2 + _a2*s2_ + abs(wu);
    const wv = a1*s3;
    const wv_ = a1_*_s3 + _a1*s3_ + abs(wv);
    const wp = wu + wv;
    const wp_ = wu_ + wv_ + abs(wp);

    //-------------------------------------
    // const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    //-------------------------------------
    const vᵧ = -wo - wp;
    const vᵧ_ = wo_ + wp_ + abs(vᵧ);


    // the commented part above is re
    const v3 = tq2q4 - q1q1;
    const _v3 = abs(v3);
    const v3_ = tq2q4_ + q1q1_ + _v3;
    const v1 = v3 - q1q5;
    const _v1 = abs(v1);
    const v1_ = v3_ + q1q5_ + _v1;
    const v4 = s3*q6;
    const _v4 = abs(v4);
    const v4_ = _s3*q6_ + s3_*_q6 + _v4;
    const v5 = q3q4*q4;
    const _v5 = abs(v5);
    const v5_ = _q3q4*q4_ + q3q4_*_q4 + _v5;
    const v2 = v4 - v5;
    const v2_ = v4_ + v5_ + abs(v2);
    const v6 = q1*v1;
    const _v6 = abs(v6);
    const v6_ =  _q1*v1_ + q1_*_v1 + _v6;
    // -------------------------------------------------------------------------


    //-------------------------------------------------------
    // const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    //-------------------------------------------------------
    const v = v6 + v2;
    const v_ = v6_ + v2_ + abs(v);

    return { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm3WithRunningError }
