import { getXYExact } from "../../../../to-power-basis/any-bitlength/exact/get-xy-any-bitlength-exact";
import { eCalculate } from "big-float-ts";


/**
 * Returns an error-free polynomial in 1 variable whose roots are the parameter 
 * values of the self-intersection points of the given cubic bezier curve.
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * Shewchuk floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** none
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps An order 3 bezier curve.
 * 
 * @doc
 */
function getCoeffsBez3Exact_NoPrecondition(ps: number[][]) {
    const [[a3, a2, a1], [b3, b2, b1]] = getXYExact(ps);

    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    const u2 = eCalculate([ 
        [[-2],a2,a3,b2,b3], [a2,a2,b3,b3], [a3,a3,b2,b2] 
    ]);

    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    const u1 = eCalculate([ 
        [[-1],a1,a3,b2,b3], [[-1],a2,a3,b1,b3], [a1,a2,b3,b3], [b1,b2,a3,a3] 
    ]);

    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    const u0 = eCalculate([ 
        [[-1],a1,a2,b2,b3], [[-1],a2,a3,b1,b2], [[-2],a1,a3,b1,b3], 
        [     a1,a1,b3,b3], [     a3,a3,b1,b1], [     a1,a3,b2,b2], 
        [     b1,b3,a2,a2] 
    ]);
    
    // Solve: u2*t**2 + u1*t + u0 = 0

    return [u2, u1, u0];
}


export { getCoeffsBez3Exact_NoPrecondition }

