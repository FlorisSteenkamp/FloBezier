import { getXY } from '../../to-power-basis/get-xy';


/**
 * Returns the implicit form of the given quadratic bezier and a coefficientwise 
 * error bound.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm2(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    const [[a2,a1,a0],[b2,b1,b0]] = getXY(ps);

    const a2b1 = a2*b1;
    const a1b2 = a1*b2;
    const a2b0 = a2*b0;
    const a0b2 = a0*b2;
    const a1b0 = a1*b0;
    const a0b1 = a0*b1;
    const a2a2 = a2*a2;
    const a2b2 = a2*b2;
    const b2b2 = b2*b2;

    const q1 = a2b1 - a1b2;
    const q2 = a2b0 - a0b2;
    const q3 = a1b0 - a0b1;



    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2

    // b2**2*x**2
    // -b2**2 *x**2
    const vₓₓ = -b2b2;

    // -2*a2*b2*x*y
    // 2*a2*b2 *x*y
    const vₓᵧ = 2*a2b2;

    // a2**2*y**2
    // -a2**2 *y**2 
    const vᵧᵧ = -a2a2;

    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //const vₓ = b1*q1 - 2*b2*q2;
    const w1 = b1*q1;
    const w2 = 2*b2*q2;
    const vₓ = w1 - w2;

    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    const w3 = 2*a2*q2;
    const w4 = a1*q1;
    const vᵧ = w3 - w4;

    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    const w5 = q1*q3;
    const w6 = q2*q2;
    const v = w5 - w6;


    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}


export { getImplicitForm2 }
