import { getXY } from '../../to-power-basis/get-xy';


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
function getImplicitForm3(ps: number[][]) {
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

    const q1q1 = q1*q1;
    const q1q2 = q1*q2;
    const q1q3 = q1*q3;
    const q1q5 = q1*q5;
    const q2q2 = q2*q2;
    const tq2q4 = tq2*q4;
    const q3q4 = q3*q4;
    const q3q5 = q3*q5;
    const q3q6 = q3*q6;

    const u1 = -3*q1 - q5;

    const vₓₓₓ = -b3*b3b3;
    const vₓₓᵧ =  (3*a3)*b3b3; // 3*a3: 47-bit aligned => error free
    const vₓᵧᵧ = (-3*b3)*a3a3; // 3*b3: 47-bit aligned => error free
    const vᵧᵧᵧ =  a3*a3a3;
    
    const w1 = u1*b3b3;
    const w2 = q3*t1;
    const w3 = w1 + w2;
    const w4 = tq2*b2b3;
    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const vₓₓ = w3 + w4;

    const w5 = u1*a3a3;
    const w6 = q3*t2;
    const w7 = w5 + w6;
    const w8 = tq2*a2a3;
    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const vᵧᵧ = w7 + w8;


    const wa = a2b2 - p2/2;
    const wb = u1*a3b3;
    const wc = q2*p1;
    const wd = wb + wc;
    const wq = q3*wa; 
    //const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    const vₓᵧ = 2*(wq - wd);
    

    const wr = -3*q1q1;
    const we = wr - 2*q1q5;
    const wf = tq2q4 + q3q6;
    //const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    const s1 = we + wf;


    //const s2 = 2*(q1q2 - q3q4);
    const s2 = 2*(q1q2 - q3q4);


    const wl = q1q3 - q2q2;
    //const s3 = q1q3 - q2q2 + q3q5;
    const s3 = wl + q3q5;

    
    const wm = b3*s1;
    const ws = b2*s2;
    const wt = b1*s3;
    const wn = ws + wt;
    //const vₓ = b3*s1 + (b2*s2 + b1*s3);
    const vₓ = wm + wn;


    const wo = a3*s1;
    const wu = a2*s2;
    const wv = a1*s3;
    const wp = wu + wv;
    //const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    const vᵧ = -(wo + wp);

    
    const v3 = tq2q4 - q1q1;
    const v1 = v3 - q1q5;
    const v4 = s3*q6;
    const v5 = q3q4*q4;
    const v2 = v4 - v5;
    const v6 = q1*v1;
    
    //const v = q1*(tq2q4 - q1q1 - q1q5) + s3q6 - q3q4*q4;
    const v = v6 + v2;

        
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3 }
