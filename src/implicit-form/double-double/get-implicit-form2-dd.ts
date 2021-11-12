import { ddNegativeOf, ddMultBy2, ddMultDouble2, ddMultDd, ddDiffDd } from 'double-double';
import { getXY2Dd } from '../../to-power-basis/get-xy/double-double/get-xy-dd.js';

const qno = ddNegativeOf;    // error -> 0
const qm2 = ddMultBy2;       // error -> 0 
//const qmd2 = qMultDouble1;  // error -> 1.5*γ²
const qmd = ddMultDouble2;   // error -> 3*γ²
const qmq = ddMultDd;      // error -> 7*γ² (theoretical), 5*γ² (worst found), we use 6*γ²
const qdq = ddDiffDd;      // error -> 3*γ²


/**
 * Returns a double-double precision implicit form of the given quadratic 
 * bezier and a coefficientwise error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
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
    
    const [[a2,a1,a0],[b2,b1,b0]] = getXY2Dd(ps);

    const q1 = qdq(qmq(a2,b1),qmq(a1,b2));
    const q2 = qdq(qmd(b0,a2),qmd(a0,b2));
    const q3 = qdq(qmd(b0,a1),qmd(a0,b1));


    //----------------------------------------------------------------------------------------------------
    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2
    //----------------------------------------------------------------------------------------------------

    // -------------
    // -b2**2
    // -------------
    const vₓₓ = qno(qmq(b2,b2));

    // -------------
    // 2*a2*b2
    // -------------
    const vₓᵧ = qm2(qmq(a2,b2));

    // -------------
    // -a2**2
    // -------------
    const vᵧᵧ = qno(qmq(a2,a2));

    // -----------------------------------------------
    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // b1*q1 - 2*b2*q2
    // -----------------------------------------------
    const vₓ = qdq(qmq(b1,q1),qm2(qmq(b2,q2)));

    // -----------------------------------------------
    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // 2*a2*q2 - a1*q1
    // -----------------------------------------------
    const vᵧ = qdq(qm2(qmq(a2,q2)),qmq(a1,q1));

    // --------------------------------------------------------------------------------------------------
    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 - q2**2
    // --------------------------------------------------------------------------------------------------
    const v = qdq(qmq(q1,q3),qmq(q2,q2));

    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm2Dd }
