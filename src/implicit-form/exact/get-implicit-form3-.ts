
import { 
    twoProduct, qMultBy2, qDiffQuad, qAddQuad,
    expansionProduct, fastExpansionSum, scaleExpansion2, 
    expansionDiff, negativeOf, eMultBy2, eDivBy2
} from 'flo-numerical';
import { getXY } from '../../to-power-basis/get-xy';


const tp  = twoProduct;     // error -> 0
const qm2 = qMultBy2;       // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qdq = qDiffQuad;      // error -> 3*γ²
const qaq = qAddQuad;       // error -> 3*γ²
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const edif = expansionDiff;
const eno = negativeOf;
const em2 = eMultBy2;
const ed2 = eDivBy2;


// TODO - document better
/**
 * * precondition: max 47 coefficient bitlength
 * Returns an approximate implicit form of the given cubic bezier and an 
 * implicit form coefficientwise error bound of the given cubic bezier.
 * * takes about 155 micro-seconds on a 1st gen i7 and Chrome 79
 * @param coeffsX 
 * @param coeffsY 
 */
function getImplicitForm3Exact_(ps: number[][]) {
    let [[a3,a2,a1,a0], [b3,b2,b1,b0]] = getXY(ps);

    // The implicit form is given by:
    // vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0

    let a3b1 = tp(a3,b1);  // error free
    let a1b3 = tp(a1,b3);  // error free
    let a3b2 = tp(a3,b2);  // error free
    let a2b2 = tp(a2,b2);  // error free
    let a2b3 = tp(a2,b3);  // error free
    let a3a3 = tp(a3,a3);  // error free
    let b2b2 = tp(b2,b2);  // error free
    let b3b3 = tp(b3,b3);  // error free
    let a1a3 = tp(a1,a3);  // error free
    let a2a2 = tp(a2,a2);  // error free
    let b1b3 = tp(b1,b3);  // error free
    let b2b3 = tp(b2,b3);  // error free
    let a2a3 = tp(a2,a3);  // error free
    let a3b3 = tp(a3,b3);  // error free
    let a3b0 = tp(a3,b0);  // error free
    let a0b3 = tp(a0,b3);  // error free
    let a2b0 = tp(a2,b0);  // error free
    let a0b2 = tp(a0,b2);  // error free
    let a2b1 = tp(a2,b1);  // error free
    let a1b2 = tp(a1,b2);  // error free
    let a1b0 = tp(a1,b0);  // error free
    let a0b1 = tp(a0,b1);  // error free

    let q1 = qdq(a3b0,a0b3);  // 48-bit aligned => error free
    let q2 = qdq(a3b1,a1b3);  // 48-bit aligned => error free
    let q3 = qdq(a3b2,a2b3);  // 48-bit aligned => error free
    let q4 = qdq(a2b0,a0b2);  // 48-bit aligned => error free
    let q5 = qdq(a2b1,a1b2);  // 48-bit aligned => error free
    let q6 = qdq(a1b0,a0b1);  // 48-bit aligned => error free
    let t1 = qdq(b1b3,b2b2);  // 48-bit aligned => error free
    let t2 = qdq(a1a3,a2a2);  // 48-bit aligned => error free
    let p1 = qaq(a2b3,a3b2);  // 48-bit aligned => error free
    let p2 = qaq(a1b3,a3b1);  // 48-bit aligned => error free
    let tq2 = qm2(q2);        // error free

    let q1q1  = epr(q1,q1);
    let q1q2  = epr(q1,q2);
    let q1q3  = epr(q1,q3);
    let q1q5  = epr(q1,q5);
    let q2q2  = epr(q2,q2);
    let tq2q4 = epr(tq2,q4);
    let q3q4  = epr(q3,q4);
    let q3q5  = epr(q3,q5);
    let q3q6  = epr(q3,q6);


    let vₓₓₓ = sce(-b3,b3b3);
    let vₓₓᵧ = sce( 3*a3,b3b3);  // 47-bit aligned => 3*a0,... -> error free
    let vₓᵧᵧ = sce(-3*b3,a3a3);  // 47-bit aligned => 3*b0,... -> error free 
    let vᵧᵧᵧ = sce(a3,a3a3);

    // 46-bit aligned => qmd(3*q1 - q5,...) -> error free
    let u1 = edif(sce(-3,q1), q5); // 47-bit aligned => qmd(3*q1 - q5) -> error free

    //let vₓₓ = (u1*b3b3 + q3*(b1b3 - b2b2)) + tq2*b2b3;
    let w1 = epr(u1,b3b3);
    let w2 = epr(q3,t1);
    let w3 = fes(w1,w2);
    let w4 = epr(tq2,b2b3);
    let vₓₓ = fes(w3,w4);


    //let vᵧᵧ = (u1*a3a3 + q3*t2) + tq2*a2a3;
    let w5 = epr(u1,a3a3);
    let w6 = epr(q3,t2);
    let w7 = fes(w5,w6);
    let w8 = epr(tq2,a2a3);
    let vᵧᵧ = fes(w7,w8);
    

    //let vₓᵧ = 2*(q3*(a2b2 - p2/2) - (u1*a3b3 + q2*p1));
    let wa = edif(a2b2,ed2(p2));  // 47-bit aligned => wa = a2b2 - p2/2 -> error free
    let wb = epr(u1,a3b3);
    let wc = epr(q2,p1);
    let wd = fes(wb,wc);
    let wq = epr(q3,wa);
    let vₓᵧ = em2(edif(wq,wd));


    //let s1 = (-3*q1q1 - 2*q1q5) + (tq2q4 + q3q6);
    let wr = sce(-3,q1q1);
    let we = edif(wr,em2(q1q5));
    let wf = fes(tq2q4,q3q6);
    let s1 = fes(we,wf);


    //let s2 = 2*(q1q2 - q3q4);
    let s2 = em2(edif(q1q2,q3q4));


    //let s3 = q1q3 - q2q2 + q3q5;
    let wl = edif(q1q3,q2q2);
    let s3 = fes(wl,q3q5);


    //let vₓ = b3*s1 + (b2*s2 + b1*s3);
    let wm = sce(b3,s1); 
    let ws = sce(b2,s2);
    let wt = sce(b1,s3);
    let wn = fes(ws,wt);
    let vₓ = fes(wm,wn);


    //let vᵧ = -a3*s1 - (a2*s2 + a1*s3);
    let wo = sce(a3,s1);
    let wu = sce(a2,s2);
    let wv = sce(a1,s3);
    let wp = fes(wu,wv);
    let vᵧ = eno(fes(wo,wp));


    let v3 = edif(tq2q4,q1q1);
    let v1 = edif(v3,q1q5);
    let v4 = epr(s3,q6);
    let v5 = epr(q3q4,q4);
    let v2 = edif(v4,v5);
    let v6 = epr(q1,v1);
    
    //let v = q1*(tq2q4 - q1q1 - q1q5) + s3*q6 - q3q4*q4;
    let v = fes(v6,v2);

        
    return { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm3Exact_ }
