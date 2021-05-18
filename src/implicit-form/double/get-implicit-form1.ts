import { getXY } from '../../to-power-basis/get-xy';


/**
 * Returns the implicit form of the given linear bezier.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 49-bit aligned
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled `γ === u/(1 - u)`, 
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm1(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1, a0], [b1, b0]] = getXY(ps);

    const vₓ = -b1;
    const vᵧ = a1;

    //const v = a1*b0 - a0*b1;
    const w1 = a1*b0;
    const w2 = a0*b1;
    const v = w2 - w1;

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1 }
