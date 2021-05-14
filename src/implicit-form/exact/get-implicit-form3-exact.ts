import { ddMultBy2, ddDiffDd, ddAddDd } from 'double-double';
import { getXY } from '../../to-power-basis/get-xy';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { 
    twoProduct, expansionProduct, fastExpansionSum, scaleExpansion2, 
    eDiff, eNegativeOf, eMultBy2, eDivBy2 
} from "big-float-ts";


const tp  = twoProduct;    // error -> 0
const qm2 = ddMultBy2;     // error -> 0 
const qdq = ddDiffDd;      // error -> 3*γ²
const qaq = ddAddDd;       // error -> 3*γ²
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const edif = eDiff;
const eno = eNegativeOf;
const em2 = eMultBy2;
const ed2 = eDivBy2;


/**
 * Returns the exact implicit form of the given cubic bezier curve.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * 
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 155 micro-seconds on a 3rd gen i7 and Chrome 79
 * 
 * @param ps
 * 
 * @doc mdx - TODO - remove mdx from these functions - they will become too many
 */
function getImplicitForm3Exact(ps: number[][]) {
    const [[a3,a2,a1,a0], [b3,b2,b1,b0]] = getXY(ps);

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

    const q1q1  = epr(q1,q1);
    const q1q2  = epr(q1,q2);
    const q1q3  = epr(q1,q3);
    const q1q5  = epr(q1,q5);
    const q2q2  = epr(q2,q2);
    const tq2q4 = epr(tq2,q4);
    const q3q4  = epr(q3,q4);
    const q3q5  = epr(q3,q5);
    const q3q6  = epr(q3,q6);


    const vₓₓₓ = sce(-b3,b3b3);
    const vₓₓᵧ = sce( 3*a3,b3b3);  // 47-bit aligned => 3*a0,... -> error free
    const vₓᵧᵧ = sce(-3*b3,a3a3);  // 47-bit aligned => 3*b0,... -> error free 
    const vᵧᵧᵧ = sce(a3,a3a3);

    // 46-bit aligned => qmd(3*q1 - q5,...) -> error free
    const u1 = edif(sce(-3,q1), q5); // 47-bit aligned => qmd(3*q1 - q5) -> error free

    //const vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    const w1 = epr(u1,b3b3);
    const w2 = epr(q3,t1);
    const w3 = fes(w1,w2);
    const w4 = epr(tq2,b2b3);
    const vₓₓ = fes(w3,w4);


    //const vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    const w5 = epr(u1,a3a3);
    const w6 = epr(q3,t2);
    const w7 = fes(w5,w6);
    const w8 = epr(tq2,a2a3);
    const vᵧᵧ = fes(w7,w8);
    

    //const vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    const wa = edif(a2b2,ed2(p2));  // 47-bit aligned => wa = a2b2 - p2/2 -> error free
    const wb = epr(u1,a3b3);
    const wc = epr(q2,p1);
    const wd = fes(wb,wc);
    const wq = epr(q3,wa);
    const vₓᵧ = em2(edif(wq,wd));


    //const s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    const wr = sce(-3,q1q1);
    const we = edif(wr,em2(q1q5));
    const wf = fes(tq2q4,q3q6);
    const s1 = fes(we,wf);


    //const s2 = 2*(q1q2 - q3q4);
    const s2 = em2(edif(q1q2,q3q4));


    //const s3 = q1q3 - q2q2 + q3q5;
    const wl = edif(q1q3,q2q2);
    const s3 = fes(wl,q3q5);


    //const vₓ = b3*s1 + (b2*s2 + b1*s3);
    const wm = sce(b3,s1); 
    const ws = sce(b2,s2);
    const wt = sce(b1,s3);
    const wn = fes(ws,wt);
    const vₓ = fes(wm,wn);


    //const vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    const wo = sce(a3,s1);
    const wu = sce(a2,s2);
    const wv = sce(a1,s3);
    const wp = fes(wu,wv);
    const vᵧ = eno(fes(wo,wp));


    const v3 = edif(tq2q4,q1q1);
    const v1 = edif(v3,q1q5);
    const v4 = epr(s3,q6);
    const v5 = epr(q3q4,q4);
    const v2 = edif(v4,v5);
    const v6 = epr(q1,v1);
    
    //const v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    const v = fes(v6,v2);

        
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3Exact }
