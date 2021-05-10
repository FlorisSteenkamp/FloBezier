import { 
    twoProduct, ddNegativeOf, ddMultBy2, ddMultDouble2, ddMultDd, ddDiffDd
} from 'double-double';
import { getXY } from '../../to-power-basis/get-xy';

const tp  = twoProduct;     // error -> 0
const qno = ddNegativeOf;    // error -> 0
const qm2 = ddMultBy2;       // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = ddMultDouble2;   // error -> 3*γ²
const qmq = ddMultDd;      // error -> 7*γ² (theoretical), 5*γ² (worst found), we use 6*γ²
const qdq = ddDiffDd;      // error -> 3*γ²

const abs = Math.abs;


/**
 * Returns a double-double precision implicit form of the given quadratic 
 * bezier and a coefficientwise error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm2Dd(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    let [[a2,a1,a0],[b2,b1,b0]] = getXY(ps);

    let a2b1 = tp(a2,b1);  // error free
    let a1b2 = tp(a1,b2);  // error free
    let a2b0 = tp(a2,b0);  // error free
    let a0b2 = tp(a0,b2);  // error free
    let a1b0 = tp(a1,b0);  // error free
    let a0b1 = tp(a0,b1);  // error free
    let a2a2 = tp(a2,a2);  // error free
    let a2b2 = tp(a2,b2);  // error free
    let b2b2 = tp(b2,b2);  // error free

    let $a2b1 = a2*b1;
    let $a1b2 = a1*b2;
    let $a2b0 = a2*b0;
    let $a0b2 = a0*b2;
    let $a1b0 = a1*b0;
    let $a0b1 = a0*b1;

    let q1 = qdq(a2b1,a1b2);  // 48-bit aligned => error free
    let q2 = qdq(a2b0,a0b2);  // 48-bit aligned => error free
    let q3 = qdq(a1b0,a0b1);  // 48-bit aligned => error free

    let $q1 = $a2b1 - $a1b2;
    let $q2 = $a2b0 - $a0b2;
    let $q3 = $a1b0 - $a0b1;


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
    let $w1 = b1*$q1;
    let w1 = qmd(b1,q1);
    let w1_ = abs($w1);
    let $w2 = 2*b2*$q2;
    let w2 = qm2(qmd(b2,q2));
    let w2_ = abs($w2);
    let $vₓ = $w1 - $w2;
    let vₓ = qdq(w1,w2);
    let vₓ_ = w1_ + w2_ + abs($vₓ);

    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    let $w3 = 2*a2*$q2;
    let w3 = qm2(qmd(a2,q2));
    let w3_ = abs($w3);
    let $w4 = a1*$q1;
    let w4 = qmd(a1,q1);
    let w4_ = abs($w4);
    let $vᵧ = $w3 - $w4;
    let vᵧ = qdq(w3,w4);
    let vᵧ_ = w3_ + w4_ + abs($vᵧ);

    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    let $w5 = $q1*$q3;
    let w5 = qmq(q1,q3);
    let w5_ = 2*abs($w5);
    let $w6 = $q2*$q2;
    let w6 = qmq(q2,q2);
    let w6_ = abs($w6);
    let $v = $w5 - $w6;
    let v = qdq(w5,w6);
    let v_ = w5_ + w6_ + abs($v);


    return { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    }
}


export { getImplicitForm2Dd }
