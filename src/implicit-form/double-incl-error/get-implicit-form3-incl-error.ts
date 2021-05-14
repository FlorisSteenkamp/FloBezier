import { getXY } from '../../to-power-basis/get-xy';


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
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 1.2 micro-seconds on a 3rd gen i7 and Chrome 79
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm3InclError(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXY(ps);

    const a3b1 = a3*b1;
    const a1b3 = a1*b3;
    const a3b2 = a3*b2;
    const a2b2 = a2*b2;
    const a2b3 = a2*b3;
    const a3a3 = a3*a3;
    const b2b2 = b2*b2;
    const b3b3 = b3*b3;
    const a1a3 = a1*a3;
    const a2a2 = a2*a2;
    const b1b3 = b1*b3;
    const b2b3 = b2*b3;
    const a2a3 = a2*a3;
    const a3b3 = a3*b3;
    const a3b0 = a3*b0;
    const a0b3 = a0*b3;
    const a2b0 = a2*b0;
    const a0b2 = a0*b2;
    const a2b1 = a2*b1;
    const a1b2 = a1*b2;
    const a1b0 = a1*b0;
    const a0b1 = a0*b1;

    const _a3b1 = abs(a3b1);
    const _a1b3 = abs(a1b3);
    const _a3b2 = abs(a3b2);
    const _a2b2 = abs(a2b2);
    const _a2b3 = abs(a2b3);
    const _a3a3 = abs(a3a3);
    const _b2b2 = abs(b2b2);
    const _b3b3 = abs(b3b3);
    const _a1a3 = abs(a1a3);
    const _a2a2 = abs(a2a2);
    const _b1b3 = abs(b1b3);
    const _b2b3 = abs(b2b3);
    const _a2a3 = abs(a2a3);
    const _a3b3 = abs(a3b3);
    const _a3b0 = abs(a3b0);
    const _a0b3 = abs(a0b3);
    const _a2b0 = abs(a2b0);
    const _a0b2 = abs(a0b2);
    const _a2b1 = abs(a2b1);
    const _a1b2 = abs(a1b2);
    const _a1b0 = abs(a1b0);
    const _a0b1 = abs(a0b1);

    const q1 = a3b0 - a0b3;
    const q2 = a3b1 - a1b3;
    const q3 = a3b2 - a2b3; 
    const q4 = a2b0 - a0b2;
    const q5 = a2b1 - a1b2;
    const q6 = a1b0 - a0b1;
    const t1 = b1b3 - b2b2;
    const t2 = a1a3 - a2a2;
    const p1 = a2b3 + a3b2;
    const p2 = a1b3 + a3b1;
    const tq2 = 2*q2;

    const _q1 = abs(q1);
    const _q2 = abs(q2);
    const _q3 = abs(q3);
    const _q4 = abs(q4);
    const _q5 = abs(q5);
    const _q6 = abs(q6);
    const _p1 = abs(p1);
    const _p2 = abs(p2);
    const _tq2 = 2*_q2;
    
    const q1_ = _a3b0 + _a0b3 + _q1;
    const q2_ = _a3b1 + _a1b3 + _q2;
    const q3_ = _a3b2 + _a2b3 + _q3;
    const q4_ = _a2b0 + _a0b2 + _q4;
    const q5_ = _a2b1 + _a1b2 + _q5;
    const q6_ = _a1b0 + _a0b1 + _q6;
    const p1_ = _a2b3 + _a3b2 + _p1;
    const p2_ = _a1b3 + _a3b1 + _p2;
    const tq2_ = 2*q2_;

    const q1q1 = q1*q1;
    
    
    const q1q2 = q1*q2;
    const q1q3 = q1*q3;
    const q1q5 = q1*q5;
    const q2q2 = q2*q2;
    const tq2q4 = tq2*q4;
    const q3q4 = q3*q4;
    const q3q5 = q3*q5;
    const q3q6 = q3*q6;

    const q1q1_  = 2*(q1_*_q1)         + abs(q1q1);
    const q1q2_  = q1_ *_q2 + _q1 *q2_ + abs(q1q2);
    const q1q3_  = q1_ *_q3 + _q1 *q3_ + abs(q1q3);
    const q1q5_  = q1_ *_q5 + _q1 *q5_ + abs(q1q5);
    const q2q2_  = 2*(q2_*_q2)         + abs(q2q2);
    const tq2q4_ = tq2_*_q4 + _tq2*q4_ + abs(tq2q4);
    const q3q4_  = q3_ *_q4 + _q3 *q4_ + abs(q3q4);
    const q3q5_  = q3_ *_q5 + _q3 *q5_ + abs(q3q5);
    const q3q6_  = q3_ *_q6 + _q3 *q6_ + abs(q3q4);

    const u1 = -3*q1 - q5;
    const _u1 = abs(u1);
    const u1_ = 3*(q1_ + _q1) + q5_ + _u1;

    const vₓₓₓ = -b3*b3b3;
    const vₓₓᵧ =  (3*a3)*b3b3; // 3*a3: 47-bit aligned => error free
    const vₓᵧᵧ = (-3*b3)*a3a3; // 3*b3: 47-bit aligned => error free
    const vᵧᵧᵧ =  a3*a3a3;

    const vₓₓₓ_ = 2*abs(vₓₓₓ);
    //const vₓₓᵧ_ = 3*abs(3*a3*_b3b3);  
    const vₓₓᵧ_ = 6*_b3b3*(abs(a3));  // 3*a3: 47-bit aligned => error free
    //const vₓᵧᵧ_ = 3*abs(3*b3*_a3a3);
    const vₓᵧᵧ_ = 6*_a3a3*(abs(b3));  // 3*b3: 47-bit aligned => error free
    const vᵧᵧᵧ_ = 2*abs(vᵧᵧᵧ);

    
    const _t1 = abs(t1);
    const t1_ = _b1b3 + _b2b2 + _t1;
    const _t2 = abs(t2);
    const t2_ = _a1a3 + _a2a2 + abs(t2);
    
    const w1 = u1*b3b3;
    const w1_ = _b3b3*(u1_ + _u1) + abs(w1);
    const w2 = q3*t1;
    const w2_ = q3_*_t1 + t1_*_q3 + abs(w2);
    const w3 = w1 + w2;
    const w3_ = w1_ + w2_ + abs(w3);
    const w4 = tq2*b2b3;
    const w4_ = _b2b3*(tq2_ + _tq2) + abs(w4)
    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const vₓₓ = w3 + w4;
    const vₓₓ_ = w3_ + w4_ + abs(w3 + w4);

    const w5 = u1*a3a3;
    const w5_ = _a3a3*(u1_ + _u1) + abs(w5);
    const w6 = q3*t2;
    const w6_ = t2_*_q3 + q3_*_t2 + abs(w6);
    const w7 = w5 + w6;
    const w7_ = w5_ + w6_ + abs(w7);
    const w8 = tq2*a2a3;
    const w8_ = _a2a3*(tq2_ + _tq2) + abs(w8);
    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const vᵧᵧ = w7 + w8;
    const vᵧᵧ_ = w7_ + w8_ + abs(vᵧᵧ);


    const wa = a2b2 - p2/2;
    const _wa = abs(wa);
    const wa_ = _a2b2 + p2_/2 + _wa;
    const wb = u1*a3b3;
    const wb_ = _a3b3*(u1_ + _u1) + abs(wb);
    const wc = q2*p1;
    const wc_ = q2_*_p1 + _q2*p1_ + abs(wc);
    const wd = wb + wc;
    const wd_ = wb_ + wc_ + abs(wd);
    const wq = q3*wa; 
    const wq_ = q3_*_wa + _q3*wa_ + abs(wq);
    //const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    const vₓᵧ = 2*(wq - wd);
    const vₓᵧ_ = 2*(wq_ + wd_) + abs(vₓᵧ);
    

    const wr = -3*q1q1;
    const wr_ = 3*q1q1_ + abs(wr);
    const we = wr - 2*q1q5;
    const we_ = wr_ + 2*q1q5_ + abs(we);
    const wf = tq2q4 + q3q6;
    const wf_ = tq2q4_ + q3q6_ + abs(wf);
    //const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    const s1 = we + wf;
    const s1_ = we_ + wf_ + abs(s1);


    //const s2 = 2*(q1q2 - q3q4);
    const s2 = 2*(q1q2 - q3q4);
    const s2_ = 2*(q1q2_ + q3q4_) + abs(s2);


    const wl = q1q3 - q2q2;
    const wl_ = q1q3_ + q2q2_ + abs(wl);
    //const s3 = q1q3 - q2q2 + q3q5;
    const s3 = wl + q3q5;
    const s3_ = wl_ + q3q5_ + abs(s3);

    
    const wm = b3*s1;
    const wm_ = abs(b3)*s1_ + abs(wm);
    const ws = b2*s2;
    const ws_ = abs(b2)*s2_ + abs(ws);
    const wt = b1*s3;
    const wt_ = abs(b1)*s3_ + abs(wt);
    const wn = ws + wt;
    const wn_ = ws_ + wt_ + abs(wn);
    //const vₓ = b3*s1 + (b2*s2 + b1*s3);
    const vₓ = wm + wn;
    const vₓ_ = wm_ + wn_ + abs(vₓ);


    const wo = a3*s1;
    const wo_ = abs(a3)*s1_ + abs(wo);
    const wu = a2*s2;
    const wu_ = abs(a2)*s2_ + abs(wu);
    const wv = a1*s3;
    const wv_ = abs(a1)*s3_ + abs(wv);
    const wp = wu + wv;
    const wp_ = wu_ + wv_ + abs(wp);
    //const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    const vᵧ = -(wo + wp);
    const vᵧ_ = wo_ + wp_ + abs(vᵧ);

    
    const v3 = tq2q4 - q1q1;
    const v3_ = tq2q4_ + q1q1_ + abs(v3);
    const v1 = v3 - q1q5;
    const _v1 = abs(v1);
    const v1_ = v3_ + q1q5_ + _v1;
    const v4 = s3*q6;
    const v4_ = s3_*abs(q6) + abs(s3)*q6_ + abs(v4);
    const v5 = q3q4*q4;
    const v5_ = q3q4_*_q4 + abs(q3q4)*q4_ + abs(v5);
    const v2 = v4 - v5;
    const v2_ = v4_ + v5_ + abs(v2);
    const v6 = q1*v1;
    const v6_ = q1_*_v1 + _q1*v1_ + abs(v6);
    
    //const v = q1*(tq2q4 - q1q1 - q1q5) + s3q6 - q3q4*q4;
    const v = v6 + v2;
    const v_ = v6_ + v2_ + abs(v);

        
    return { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm3InclError }
