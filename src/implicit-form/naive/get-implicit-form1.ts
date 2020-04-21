
import { getXY } from '../../to-power-basis/get-xy';


/**
 * Returns an approximate implicit form of the given linear bezier and a 
 * coefficientwise error bound.
 * * the error bound needs to be multiplied by γ === nu/(1-nu), where 
 * u === Number.EPSILON / 2
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function getImplicitForm1(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    let [[a1, a0], [b1, b0]] = getXY(ps);

    let vₓ = -b1;
    let vᵧ = a1;
    //let v = a1*b0 - a0*b1;
    let w1 = a1*b0;
    let w1_ = Math.abs(a1*b0);
    let w2 = a0*b1;
    let w2_ = Math.abs(a0*b1);
    let v = w2 - w1;
    let v_ = w1_ + w2_ + Math.abs(v);

    return { 
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ }  // vₓ_, vᵧ_, => zero
    }
}


export { getImplicitForm1 }
