
import { getXY } from '../../to-power-basis/get-xy';


/**
 * Returns an approximate implicit form of the given quadratic bezier and a 
 * coefficientwise error bound.
 * * the error bound needs to be multiplied by γ === nu/(1-nu), where 
 * u === Number.EPSILON / 2
 * * the coordinates of the given bezier must be 47-bit aligned
 * * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function getImplicitForm2(ps: number[][]) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    
    let [[a2,a1,a0],[b2,b1,b0]] = getXY(ps);

    let a2b1 = a2*b1;
    let a1b2 = a1*b2;
    let a2b0 = a2*b0;
    let a0b2 = a0*b2;
    let a1b0 = a1*b0;
    let a0b1 = a0*b1;
    let a2a2 = a2*a2;
    let a2b2 = a2*b2;
    let b2b2 = b2*b2;

    let q1 = a2b1 - a1b2;
    let q2 = a2b0 - a0b2;
    let q3 = a1b0 - a0b1;

    let _q1 = Math.abs(q1);
    let _q2 = Math.abs(q2);
    let _q3 = Math.abs(q3);

    let q1_ = Math.abs(a2b1) + Math.abs(a1b2) + _q1;
    let q2_ = Math.abs(a2b0) + Math.abs(a0b2) + _q2;
    let q3_ = Math.abs(a1b0) + Math.abs(a0b1) + _q3;

    // -a1*q1*y - a2**2*y**2 + 2*a2*b2*x*y + 2*a2*q2*y + b1*q1*x - b2**2*x**2 - 2*b2*q2*x + q1*q3 - q2**2

    // b2**2*x**2
    // -b2**2 *x**2
    let vₓₓ = -b2b2;
    let vₓₓ_ = Math.abs(b2b2)

    // -2*a2*b2*x*y
    // 2*a2*b2 *x*y
    let vₓᵧ = 2*a2b2;
    let vₓᵧ_ = 2*Math.abs(a2b2);

    // a2**2*y**2
    // -a2**2 *y**2 
    let vᵧᵧ = -a2a2;
    let vᵧᵧ_ = Math.abs(a2a2);

    // -2*a0*b2**2 + a1*b1*b2 + 2*a2*b0*b2 - a2*b1**2
    // (b1*q1 + -2*b2*q2) *x
    //let vₓ = b1*q1 - 2*b2*q2;
    let w1 = b1*q1;
    let w1_ = Math.abs(b1)*q1_ + Math.abs(w1);
    let w2 = 2*b2*q2;
    let w2_ = 2*(Math.abs(b2)*q2_) + Math.abs(w2);
    let vₓ = w1 - w2;
    let vₓ_ = w1_ + w2_ + Math.abs(vₓ);

    // 2*a0*a2*b2 - a1**2*b2 + a1*a2*b1 - 2*a2**2*b0
    // (-a1*q1 + 2*a2*q2) *y
    let w3 = 2*a2*q2;
    let w3_ = 2*(Math.abs(a2)*q2_) + Math.abs(w3);
    let w4 = a1*q1;
    let w4_ = Math.abs(a1)*q1_ + Math.abs(w4);
    let vᵧ = w3 - w4;
    let vᵧ_ = w3_ + w4_ + Math.abs(vᵧ);

    // a0**2*b2**2 - a0*a1*b1*b2 - 2*a0*a2*b0*b2 + a0*a2*b1**2 + a1**2*b0*b2 - a1*a2*b0*b1 + a2**2*b0**2
    // q1*q3 + -q2**2
    let w5 = q1*q3;
    let w5_ = q1_*_q3 + _q1*q3_ + Math.abs(w5);
    let w6 = q2*q2;
    let w6_ = 2*(_q2*q2_) + Math.abs(w6);
    let v = w5 - w6;
    let v_ = w5_ + w6_ + Math.abs(v);


    return { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    }
}


export { getImplicitForm2 }
