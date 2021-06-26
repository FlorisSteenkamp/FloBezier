import { 
    twoProduct, ddNegativeOf, ddMultBy2, ddMultDouble2, ddMultDd, ddDiffDd
} from 'double-double';
import { getXY } from '../../../src/to-power-basis/get-xy/double/get-xy';

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
function getImplicitForm2DdWithRunningError47(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    const [[a2,a1,a0],[b2,b1,b0]] = getXY(ps);

    const a2b1 = tp(a2,b1);  // error free
    const a1b2 = tp(a1,b2);  // error free
    const a2b0 = tp(a2,b0);  // error free
    const a0b2 = tp(a0,b2);  // error free
    const a1b0 = tp(a1,b0);  // error free
    const a0b1 = tp(a0,b1);  // error free
    const a2a2 = tp(a2,a2);  // error free
    const a2b2 = tp(a2,b2);  // error free
    const b2b2 = tp(b2,b2);  // error free

    const $a2b1 = a2*b1;
    const $a1b2 = a1*b2;
    const $a2b0 = a2*b0;
    const $a0b2 = a0*b2;
    const $a1b0 = a1*b0;
    const $a0b1 = a0*b1;

    const q1 = qdq(a2b1,a1b2);  // 48-bit aligned => error free
    const q2 = qdq(a2b0,a0b2);  // 48-bit aligned => error free
    const q3 = qdq(a1b0,a0b1);  // 48-bit aligned => error free

    const $q1 = $a2b1 - $a1b2;
    const $q2 = $a2b0 - $a0b2;
    const $q3 = $a1b0 - $a0b1;


    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2

    // b2**2*x**2
    // -b2**2 *x**2
    const vₓₓ = qno(b2b2);

    // -2*a2*b2*x*y
    // 2*a2*b2 *x*y
    const vₓᵧ = qm2(a2b2);

    // a2**2*y**2
    // -a2**2 *y**2 
    const vᵧᵧ = qno(a2a2);

    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //const vₓ = b1*q1 - 2*b2*q2;
    const $w1 = b1*$q1;
    const w1 = qmd(b1,q1);
    const w1_ = abs($w1);
    const $w2 = 2*b2*$q2;
    const w2 = qm2(qmd(b2,q2));
    const w2_ = abs($w2);
    const $vₓ = $w1 - $w2;
    const vₓ = qdq(w1,w2);
    const vₓ_ = w1_ + w2_ + abs($vₓ);

    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    const $w3 = 2*a2*$q2;
    const w3 = qm2(qmd(a2,q2));
    const w3_ = abs($w3);
    const $w4 = a1*$q1;
    const w4 = qmd(a1,q1);
    const w4_ = abs($w4);
    const $vᵧ = $w3 - $w4;
    const vᵧ = qdq(w3,w4);
    const vᵧ_ = w3_ + w4_ + abs($vᵧ);

    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    const $w5 = $q1*$q3;
    const w5 = qmq(q1,q3);
    const w5_ = 2*abs($w5);
    const $w6 = $q2*$q2;
    const w6 = qmq(q2,q2);
    const w6_ = 2*abs($w6);
    const $v = $w5 - $w6;
    const v = qdq(w5,w6);
    const v_ = w5_ + w6_ + abs($v);


    return { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    }
}


export { getImplicitForm2DdWithRunningError47 }
