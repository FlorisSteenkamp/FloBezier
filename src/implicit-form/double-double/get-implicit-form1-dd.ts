import { twoProduct, ddDiffDd } from 'double-double';
import { getXY } from '../../to-power-basis/get-xy';


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
function getImplicitForm1Dd(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    let [[a1, a0],[b1, b0]] = getXY(ps);

    let vₓ = -b1;
    let vᵧ = a1;
    let v = qdq(
        tp(a0,b1),
        tp(a1,b0)
    );  // 48-bit aligned => error free

    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { }  // vₓ_, vᵧ_, v_ === 0
    }
}


export { getImplicitForm1Dd }
