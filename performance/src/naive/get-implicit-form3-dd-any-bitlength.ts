import { 
    twoProduct, ddNegativeOf, ddMultBy2, 
    ddMultDouble2, ddMultDd, ddDiffDd, ddAddDd, ddDivBy2
} from 'double-double';
import { getXYDdAnyBitlength3 } from './get-xy-dd-any-bitlength';


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
function getImplicitForm3DdAnyBitlength(ps: number[][]) {
    const [[a3,a2,a1,a0],[b3,b2,b1,b0]] = getXYDdAnyBitlength3(ps);

    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    const a3b1 = qmq(a3,b1);
    const a1b3 = qmq(a1,b3);
    const a3b2 = qmq(a3,b2);
    const a2b2 = qmq(a2,b2);
    const a2b3 = qmq(a2,b3);
    const a3a3 = qmq(a3,a3);
    const b2b2 = qmq(b2,b2);
    const b3b3 = qmq(b3,b3);
    const a1a3 = qmq(a1,a3);
    const a2a2 = qmq(a2,a2);
    const b1b3 = qmq(b1,b3);
    const b2b3 = qmq(b2,b3);
    const a2a3 = qmq(a2,a3);
    const a3b3 = qmq(a3,b3);
    const a3b0 = qmd(b0,a3);
    const a0b3 = qmd(a0,b3);
    const a2b0 = qmd(b0,a2);
    const a0b2 = qmd(a0,b2);
    const a2b1 = qmq(a2,b1);
    const a1b2 = qmq(a1,b2);
    const a1b0 = qmd(b0,a1);
    const a0b1 = qmd(a0,b1);

    const q1 = qdq(a3b0,a0b3);
    const q2 = qdq(a3b1,a1b3);
    const q3 = qdq(a3b2,a2b3);
    const q4 = qdq(a2b0,a0b2);
    const q5 = qdq(a2b1,a1b2);
    const q6 = qdq(a1b0,a0b1);
    const t1 = qdq(b1b3,b2b2);
    const t2 = qdq(a1a3,a2a2);
    const p1 = qaq(a2b3,a3b2);
    const p2 = qaq(a1b3,a3b1);
    const tq2 = qm2(q2);

    const q1q1  = qmq(q1,q1);
    const q1q2  = qmq(q1,q2);
    const q1q3  = qmq(q1,q3);
    const q1q5  = qmq(q1,q5);
    const q2q2  = qmq(q2,q2);
    const tq2q4 = qmq(tq2,q4);
    const q3q4  = qmq(q3,q4);
    const q3q5  = qmq(q3,q5);
    const q3q6  = qmq(q3,q6);

    const vₓₓₓ = qmq(qno(b3),b3b3);
    const vₓₓᵧ = qmq(qmd(3,a3),b3b3);
    const vₓᵧᵧ = qmq(qmd(-3,b3),a3a3);
    const vᵧᵧᵧ =  qmq(a3,a3a3);


    const z3 = qmd(-3,q1);
    const u1 = qdq(z3, q5);
    
    const w1 = qmq(u1,b3b3);
    const w2 = qmq(q3,t1);

    const w3 = qaq(w1,w2);
    const w4 = qmq(tq2,b2b3);

    //-----------------------------------------------------
    // const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    //-----------------------------------------------------
    const vₓₓ = qaq(w3, w4);


    const w5 = qmq(u1,a3a3);
    const w6 = qmq(q3,t2);
    const w7 = qaq(w5,w6);
    const w8 = qmq(tq2,a2a3);

    //-----------------------------------------------------
    // const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    //-----------------------------------------------------
    const vᵧᵧ = qaq(w7,w8);
    

    const wa = qdq(a2b2,qd2(p2));
    const wb = qmq(u1,a3b3);
    const wc = qmq(q2,p1);
    const wd = qaq(wb,wc);
    const wq = qmq(q3,wa);

    //-------------------------------------------------------
    // const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    //-------------------------------------------------------
    const vₓᵧ = qm2(qdq(wq,wd));


    const wr = qmd(-3,q1q1);
    const we = qdq(wr,qm2(q1q5));
    const wf = qaq(tq2q4,q3q6);

    //------------------------------------------------
    // const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    //------------------------------------------------
    const s1 = qaq(we,wf);


    //-----------------------------
    // const s2 = 2*(q1q2 - q3q4);
    //-----------------------------
    const s2 = qm2(qdq(q1q2,q3q4));
    const wl = qdq(q1q3,q2q2);

    //-------------------------------
    // const s3 = q1q3 - q2q2 + q3q5;
    //-------------------------------
    
    const s3 = qaq(wl,q3q5);
    const wm = qmq(b3,s1);
    const ws = qmq(b2,s2);
    const wt = qmq(b1,s3);
    const wn = qaq(ws,wt);

    //-------------------------------
    // const vₓ = b3*s1 + (b2*s2 + b1*s3);
    //-------------------------------
    const vₓ = qaq(wm,wn);


    const wo = qmq(a3,s1);
    const wu = qmq(a2,s2);
    const wv = qmq(a1,s3);
    const wp = qaq(wu,wv);

    //-------------------------------------
    // const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    //-------------------------------------
    const vᵧ = qno(qaq(wo,wp));

    // the commented part above is re
    const v3 = qdq(tq2q4,q1q1);
    const v1 = qdq(v3,q1q5);
    const v4 = qmq(s3,q6);
    const v5 = qmq(q3q4,q4);
    const v2 = qdq(v4,v5);
    const v6 = qmq(q1,v1);
    // -------------------------------------------------------------------------
    


    //-------------------------------------------------------
    // const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    //-------------------------------------------------------
    const v = qaq(v6,v2);

        
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3DdAnyBitlength }
