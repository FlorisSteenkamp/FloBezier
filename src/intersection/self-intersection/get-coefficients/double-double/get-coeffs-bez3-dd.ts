/* ignore file coverage - this file is not used currently */
import { γγ } from "../../../../error-analysis/error-analysis.js";
import { ddMultDd, ddAddDd, ddDiffDd } from "double-double";
import { toPowerBasis3DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
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
    const {
        coeffs: [[a3,a2,a1],[b3,b2,b1]],
        errorBound: [[a3_,a2_,a1_],[b3_,b2_,b1_]]
    } = toPowerBasis3DdWithRunningError(ps);

    const $a3 = a3[1];
    const $a2 = a2[1];
    const $a1 = a1[1];
    const $b3 = b3[1];
    const $b2 = b2[1];
    const $b1 = b1[1];

    const _a3 = abs($a3);
    const _a2 = abs($a2);
    const _a1 = abs($a1);
    const _b3 = abs($b3);
    const _b2 = abs($b2);
    const _b1 = abs($b1);

    const a2b3 = qmq(a2,b3);
    const _a2b3 = abs(a2b3[1]);
    const a2b3_ = a2_*_b3 + _a2*b3_ + 2*_a2b3;
    const a3b2 = qmq(a3,b2);
    const _a3b2 = abs(a3b2[1]);
    const a3b2_ = a3_*_b2 + _a3*b2_ + 2*_a3b2;
    const a3b1 = qmq(a3,b1);
    const _a3b1 = abs(a3b1[1]);
    const a3b1_ = a3_*_b1 + _a3*b1_ + 2*_a3b1;
    const a1b3 = qmq(a1,b3);
    const _a1b3 = abs(a1b3[1]);
    const a1b3_ = a1_*_b3 + _a1*b3_ + 2*_a1b3;
    const a2b1 = qmq(a2,b1);
    const _a2b1 = abs(a2b1[1]);
    const a2b1_ = a2_*_b1 + _a2*b1_ + 2*_a2b1;
    const a1b2 = qmq(a1,b2);
    const _a1b2 = abs(a1b2[1]);
    const a1b2_ = a1_*_b2 + _a1*b2_ + 2*_a1b2;

    const f4 = qdq(a2b3,a3b2);
    const _f4 = abs(f4[1]);
    const f4_ = a2b3_ + a3b2_ + _f4;
    const f5 = qdq(a1b3,a3b1);
    const _f5 = abs(f5[1]);
    const f5_ = a1b3_ + a3b1_ + _f5;
    const f6 = qdq(a2b1,a1b2);
    const _f6 = abs(f6[1]);
    const f6_ = a2b1_ + a1b2_ + _f6;

    // Note: a variable prepended with and underscore is an absolute value,
    // postpended with an underscore denotes an absolute error (before 
    // multiplication by the round-off unit u**2).

    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    //const u2 = a2b3*(-2*a3b2 + a2b3) + a3b2*a3b2
    //const u2 = (a2b3 - a3b2)*(a2b3 - a3b2)
    const u2 = qmq(f4,f4);
    const u2_ = 2*(f4_*_f4 + abs(u2[1]));


    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    //const u1 = a1*b3*-a3*b2 + a1*b3*a2*b3 + a3*b1*-a2*b3 + a3*b1*a3*b2
    //const u1 = a1b3*(a2b3 - a3b2) - a3b1*(a2b3 - a3b2)
    //const u1 = a1b3*f4 - a3b1*f4 = f4*(a1b3 - a3b1);
    const u1 = qmq(f4,f5);
    // 2* in line below since we're using an error of 6γγ for quad multiplication 
    // - other operations (plus, minus, etc.) have 3γγ.    
    const u1_ = f4_*_f5 + _f4*f5_ + 2*abs(u1[1]);


    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    //const u0 = 
    //       a2b3*(a2b1 - a1b2) - a3b2*(a2b1 - a1b2) +
    //       a1b3*(-2*a3b1 + a1b3) + a3b1*a3b1;
    //const u0 = 
    //       f6*f4 + 
    //       (a1b3 - a3b1)*(a1b3 - a3b1);
    //const u0 = f6*f4 + f5*f5;
    const g7 = qmq(f6,f4);
    const g7_ = f6_*_f4 + _f6*f4_ + 2*abs(g7[1]);
    const g9 = qmq(f5,f5);
    const g9_ = f5_*_f5 + _f5*f5_ + 2*abs(g9[1]);
    const u0 = qaq(g7,g9);
    const u0_ = g7_ + g9_ + abs(u0[1]);


    // Solve: u2*t**2 + u1*t + u0 = 0
    return {
        coeffs:   [u2, u1, u0],
        errBound: [γγ3*u2_, γγ3*u1_, γγ3*u0_]
    };
}


export { getCoeffsBez3Dd }


