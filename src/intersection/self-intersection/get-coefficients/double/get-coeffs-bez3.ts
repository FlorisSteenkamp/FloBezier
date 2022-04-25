/* ignore file coverage - this file is not used currently */
import { toPowerBasis3 } from "../../../../to-power-basis/to-power-basis/double/to-power-basis.js";


/** 
 * Returns a polynomial in 1 variable whose roots are the parameter values of 
 * the self-intersection points of the given cubic bezier curve.
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * intermediate calculations are done in double precision - it may be 
 * preferrable to use the version that includes an error bound ([[getCoeffsBez3WithRunningError]]).
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps an order 3 bezier curve.
 * 
 * @doc
 */
function getCoeffsBez3(ps: number[][]) {
    const [[a3,a2,a1],[b3,b2,b1]] = toPowerBasis3(ps);

    const f4 = a2*b3 - a3*b2;
    const f5 = a1*b3 - a3*b1;
    const f6 = a2*b1 - a1*b2;
    
    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    const u2 = f4*f4;
    
    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    const u1 = f4*f5;

    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    const u0 = f6*f4 + f5*f5;


    // Solve: u2*t**2 + u1*t + u0 = 0

    // Real solutions exist when `u1**2 - 4*u2*u0 >= 0`
    // i.e. when `f4*f4*f5*f5 - 4*f4*f4*(f6*f4 + f5*f5) >= 0`
    // i.e. when `f5*f5 - 4*f6*f4 - 4*f5*f5 >= 0`
    // i.e. when `3*f5*f5 + 4*f6*f4 <= 0

    return [u2, u1, u0];
}


export { getCoeffsBez3 }
