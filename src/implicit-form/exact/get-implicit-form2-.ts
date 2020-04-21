
import { 
    expansionProduct, twoProduct, qNegativeOf, qMultBy2, qDiffQuad, 
    scaleExpansion2, eMultBy2, expansionDiff } from 'flo-numerical';
import { getXY } from '../../to-power-basis/get-xy';


const tp  = twoProduct;     // error -> 0
const qno = qNegativeOf;    // error -> 0
const qm2 = qMultBy2;       // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const sce = scaleExpansion2;
const qdq = qDiffQuad;      // error -> 3*γ²
const em2 = eMultBy2;
const edif = expansionDiff;
const epr = expansionProduct;


// TODO - document better
/**
 * * required: max 47 coefficient bitlength
 * Returns the exact implicit form of the given quadratic bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm2Exact_(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    let [[a2, a1, a0], [b2, b1, b0]] = getXY(ps);

    let a2b1 = tp(a2,b1);  // error free
    let a1b2 = tp(a1,b2);  // error free
    let a2b0 = tp(a2,b0);  // error free
    let a0b2 = tp(a0,b2);  // error free
    let a1b0 = tp(a1,b0);  // error free
    let a0b1 = tp(a0,b1);  // error free
    let a2a2 = tp(a2,a2);  // error free
    let a2b2 = tp(a2,b2);  // error free
    let b2b2 = tp(b2,b2);  // error free

    let q1 = qdq(a2b1,a1b2);  // 48-bit aligned => error free
    let q2 = qdq(a2b0,a0b2);  // 48-bit aligned => error free
    let q3 = qdq(a1b0,a0b1);  // 48-bit aligned => error free

    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2

    // b2**2*x**2
    // -b2**2 *x**2
    let vₓₓ = qno(b2b2);

    // -2*a2*b2*x*y
    // 2*a2*b2 *x*y
    let vₓᵧ = qm2(a2b2);

    // a2**2*y**2
    // -a2**2 *y**2 
    let vᵧᵧ = qno(a2a2);

    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //let vₓ = b1*q1 - 2*b2*q2;
    let w1 = sce(b1,q1);
    let w2 = em2(sce(b2,q2));
    let vₓ = edif(w1,w2);

    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    let w3 = em2(sce(a2,q2));
    let w4 = sce(a1,q1);
    let vᵧ = edif(w3,w4);

    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    let w5 = epr(q1,q3);
    let w6 = epr(q2,q2);
    let v = edif(w5,w6);


    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm2Exact_ }
