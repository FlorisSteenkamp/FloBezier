import { γ } from "../../../../error-analysis/error-analysis.js";
import { toPowerBasis3WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";
const abs = Math.abs;
const γ1 = γ(1);
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the self-intersection points of the
 * given cubic bezier curve.
 *
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision and this is
 * reflected in the error bound
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a cubic bezier curve.
 *
 * @internal
 */
function getCoeffsBez3WithRunningError(ps) {
    const { coeffs: [[a3, a2, a1], [b3, b2, b1]], errorBound: [[a3_, a2_], [b3_, b2_]] } = toPowerBasis3WithRunningError(ps);
    const _a3 = abs(a3);
    const _a2 = abs(a2);
    const _a1 = abs(a1);
    const _b3 = abs(b3);
    const _b2 = abs(b2);
    const _b1 = abs(b1);
    const a2b3 = a2 * b3;
    const a3b2 = a3 * b2;
    const a3b1 = a3 * b1;
    const a1b3 = a1 * b3;
    const a2b1 = a2 * b1;
    const a1b2 = a1 * b2;
    // Note: a variable prepended with and underscore is an absolute value,
    // postpended with an underscore denotes an absolute error (before 
    // multiplication by the round-off unit `u`) - both underscores present 
    // means it is both an absolute value and a round-off error.
    const _a2b3 = abs(a2b3);
    const _a3b2 = abs(a3b2);
    const _a3b1 = abs(a3b1);
    const _a1b3 = abs(a1b3);
    const _a2b1 = abs(a2b1);
    const _a1b2 = abs(a1b2);
    const a2b3_ = a2_ * _b3 + _a2 * b3_ + _a2b3;
    const a3b2_ = a3_ * _b2 + _a3 * b2_ + _a3b2;
    const a3b1_ = a3_ * _b1 + _a3b1;
    const a1b3_ = _a1 * b3_ + _a1b3;
    const a2b1_ = a2_ * _b1 + _a2b1;
    const a1b2_ = _a1 * b2_ + _a1b2;
    const f4 = a2b3 - a3b2;
    const _f4 = abs(f4);
    const f4_ = a2b3_ + a3b2_ + _f4;
    const f5 = a1b3 - a3b1;
    const _f5 = abs(f5);
    const f5_ = a1b3_ + a3b1_ + _f5;
    const f6 = a2b1 - a1b2;
    const _f6 = abs(f6);
    const f6_ = a2b1_ + a1b2_ + _f6;
    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    //const u2 = a2b3*(-2*a3b2 + a2b3) + a3b2*a3b2
    //const u2 = (a2b3 - a3b2)*(a2b3 - a3b2)
    const u2 = f4 * f4;
    const u2_ = 2 * f4_ * _f4 + abs(u2);
    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    //const u1 = a1*b3*-a3*b2 + a1*b3*a2*b3 + a3*b1*-a2*b3 + a3*b1*a3*b2
    //const u1 = a1b3*(a2b3 - a3b2) - a3b1*(a2b3 - a3b2)
    //const u1 = a1b3*f4 - a3b1*f4 = f4*(a1b3 - a3b1);
    const u1 = f4 * f5;
    const u1_ = f4_ * _f5 + _f4 * f5_ + abs(u1);
    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    //const u0 = 
    //       a2b3*(a2b1 - a1b2) - a3b2*(a2b1 - a1b2) +
    //       a1b3*(-2*a3b1 + a1b3) + a3b1*a3b1;
    //const u0 = 
    //       f6*f4 + 
    //       (a1b3 - a3b1)*(a1b3 - a3b1);
    //const u0 = f6*f4 + f5*f5;
    const g7 = f6 * f4;
    const g7_ = f6_ * _f4 + _f6 * f4_ + abs(g7);
    const g9 = f5 * f5;
    const g9_ = 2 * _f5 * f5_ + abs(g9);
    const u0 = g7 + g9;
    const u0_ = g7_ + g9_ + abs(u0);
    // Solve: u2*t**2 + u1*t + u0 = 0
    return {
        coeffs: [u2, u1, u0],
        errBound: [u2_, u1_, u0_].map(c => γ1 * c)
    };
}
export { getCoeffsBez3WithRunningError };
//# sourceMappingURL=get-coeffs-bez3-with-running-error.js.map