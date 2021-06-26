import { γγ } from "../../../../error-analysis/error-analysis";
import { getXY3 } from "../../../../to-power-basis/get-xy/double/get-xy";

import { twoProduct, ddMultDd, ddAddDd, ddDiffDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qmq = ddMultDd;
const qaq = ddAddDd;
const qdq = ddDiffDd;

const abs = Math.abs;
const γγ3 = γγ(3);


/** 
 * Returns a polynomial in 1 variable (including coefficientwise error bound) 
 * whose roots are the parameter values of the self-intersection points of the 
 * given cubic bezier curve.
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curve must be 
 * 47-bit aligned
 * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps an order 3 bezier curve.
 * 
 * @doc
 */
function getCoeffsBez3Dd(ps: number[][]) {
    const [[a3,a2,a1],[b3,b2,b1]] = getXY3(ps);  // exact if max bit-aligned bitlength <= 49

    const a2b3 = tp(a2,b3);  // => error free
    const a3b2 = tp(a3,b2);  // => error free
    const a3b1 = tp(a3,b1);  // => error free
    const a1b3 = tp(a1,b3);  // => error free
    const a2b1 = tp(a2,b1);  // => error free
    const a1b2 = tp(a1,b2);  // => error free

    const f4 = qdq(a2b3,a3b2);  // 48-bit aligned => error free
    const f5 = qdq(a1b3,a3b1);  // 48-bit aligned => error free
    const f6 = qdq(a2b1,a1b2);  // 48-bit aligned => error free

    // Note: a variable prepended with and underscore is an absolute value,
    // postpended with an underscore denotes an absolute error (before 
    // multiplication by the round-off unit u**2).

    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    //const u2 = a2b3*(-2*a3b2 + a2b3) + a3b2*a3b2
    //const u2 = (a2b3 - a3b2)*(a2b3 - a3b2)
    const u2 = qmq(f4,f4);
    const u2_ = 2*abs(u2[1]);


    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    //const u1 = a1*b3*-a3*b2 + a1*b3*a2*b3 + a3*b1*-a2*b3 + a3*b1*a3*b2
    //const u1 = a1b3*(a2b3 - a3b2) - a3b1*(a2b3 - a3b2)
    //const u1 = a1b3*f4 - a3b1*f4 = f4*(a1b3 - a3b1);
    const u1 = qmq(f4,f5);
    // 2* in line below since we're using an error of 6γγ for quad multiplication 
    // - other operations (plus, minus, etc.) have 3γγ.    
    const u1_ = 2*abs(u1[1]);


    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    //const u0 = 
    //       a2b3*(a2b1 - a1b2) - a3b2*(a2b1 - a1b2) +
    //       a1b3*(-2*a3b1 + a1b3) + a3b1*a3b1;
    //const u0 = 
    //       f6*f4 + 
    //       (a1b3 - a3b1)*(a1b3 - a3b1);
    //const u0 = f6*f4 + f5*f5;
    const g7 = qmq(f6,f4);
    const g7_ = 2*abs(g7[1]);
    const g9 = qmq(f5,f5);
    const g9_ = 2*abs(g9[1]);
    const u0 = qaq(g7,g9);
    const u0_ = g7_ + g9_ + abs(u0[1]);


    // Solve: u2*t**2 + u1*t + u0 = 0
    return {
        coeffs:   [u2, u1, u0],
        errBound: [γγ3*u2_, γγ3*u1_, γγ3*u0_]
    };
}


export { getCoeffsBez3Dd }


