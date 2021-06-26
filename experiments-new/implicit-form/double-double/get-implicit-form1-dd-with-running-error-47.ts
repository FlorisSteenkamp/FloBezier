import { twoProduct, ddDiffDd } from 'double-double';
import { getXY } from '../../../src/to-power-basis/get-xy/double/get-xy';


const tp  = twoProduct;     // error -> 0
const qdq = ddDiffDd;      // error -> 3*γ²


/**
 * Returns the error-free double-double precision implicit form of the given 
 * linear bezier.
 * 
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * 
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 48-bit aligned
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function getImplicitForm1DdWithRunningError47(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1, a0],[b1, b0]] = getXY(ps);

    const vₓ = -b1;
    const vᵧ = a1;
    const v = qdq(
        tp(a0,b1),
        tp(a1,b0)
    );  // 48-bit aligned => error free

    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { }  // vₓ_, vᵧ_, v_ === 0
    }
}


export { getImplicitForm1DdWithRunningError47 }
