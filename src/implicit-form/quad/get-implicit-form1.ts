
import { twoProduct, qDiffQuad } from 'flo-numerical';
import { getXY } from '../../to-power-basis/get-xy';


const tp  = twoProduct;     // error -> 0
const qdq = qDiffQuad;      // error -> 3*γ²


/**
 * Returns the quad precision implicit form of the given linear bezier.
 * * precondition: the input coefficients must be 48-bit-aligned
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm1Quad(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    let [[a1, a0],[b1, b0]] = getXY(ps);

    let vₓ = -b1;
    let vᵧ = a1;
    let v = qdq(
        tp(a0,b1),
        tp(a1,b0)
    ); // 48-bit aligned => error free

    return {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { }  // vₓ_, vᵧ_, v_ === 0
    }
}


export { getImplicitForm1Quad }
