import { expansionProduct, twoProduct, scaleExpansion2, eMultBy2, eDiff } from 'big-float-ts';
import { ddNegativeOf, ddMultBy2, ddDiffDd } from 'double-double';
import { getXY } from '../../to-power-basis/get-xy';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;     // error -> 0
const qno = ddNegativeOf;    // error -> 0
const qm2 = ddMultBy2;       // error -> 0 
const sce = scaleExpansion2;
const qdq = ddDiffDd;      // error -> 3*γ²
const em2 = eMultBy2;
const edif = eDiff;
const epr = expansionProduct;



/**
 * Returns the exact implicit form of the given quadratic bezier curve.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm2Exact(ps: number[][]) {
    
    
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


export { getImplicitForm2Exact }
