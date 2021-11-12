import { getXY1 } from '../../to-power-basis/get-xy/double/get-xy.js';import { getXY1 } from '../../to-power-basis/get-xy/double/get-xy.js
import { ImplicitForm1Coeffs } from '../implicit-form-types';


/**
 * Returns the implicit form of the given linear bezier.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in **double** precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps
 * 
 * @doc mdx
 */
function getImplicitForm1(ps: number[][]): ImplicitForm1Coeffs<number> {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1,a0], [b1,b0]] = getXY1(ps);

    const vₓ = -b1;
    const vᵧ = a1;
    const v = a0*b1 - a1*b0;

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1 }
