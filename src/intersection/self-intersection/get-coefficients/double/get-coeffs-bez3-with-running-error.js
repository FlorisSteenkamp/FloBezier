"use strict";
exports.__esModule = true;
exports.getCoeffsBez3WithRunningError = void 0;
var error_analysis_js_1 = require("../../../../error-analysis/error-analysis.js");
var get_xy_with_running_error_js_1 = require("../../../../to-power-basis/get-xy/double/get-xy-with-running-error.js");
var abs = Math.abs;
var γ1 = (0, error_analysis_js_1.γ)(1);
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the self-intersection points of the
 * given cubic bezier curve.
 *
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** TODO - overflow/underflow
 * * intermediate calculations are done in double precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps an order 3 bezier curve.
 *
 * @doc
 */
function getCoeffsBez3WithRunningError(ps) {
    var _a = (0, get_xy_with_running_error_js_1.getXY3WithRunningError)(ps), _b = _a.coeffs, _c = _b[0], a3 = _c[0], a2 = _c[1], a1 = _c[2], _d = _b[1], b3 = _d[0], b2 = _d[1], b1 = _d[2], _e = _a.errorBound, _f = _e[0], a3_ = _f[0], a2_ = _f[1], _g = _e[1], b3_ = _g[0], b2_ = _g[1];
    var _a3 = abs(a3);
    var _a2 = abs(a2);
    var _a1 = abs(a1);
    var _b3 = abs(b3);
    var _b2 = abs(b2);
    var _b1 = abs(b1);
    var a2b3 = a2 * b3;
    var a3b2 = a3 * b2;
    var a3b1 = a3 * b1;
    var a1b3 = a1 * b3;
    var a2b1 = a2 * b1;
    var a1b2 = a1 * b2;
    // Note: a variable prepended with and underscore is an absolute value,
    // postpended with an underscore denotes an absolute error (before 
    // multiplication by the round-off unit `u`) - both underscores present 
    // means it is both an absolute value and a round-off error.
    var _a2b3 = abs(a2b3);
    var _a3b2 = abs(a3b2);
    var _a3b1 = abs(a3b1);
    var _a1b3 = abs(a1b3);
    var _a2b1 = abs(a2b1);
    var _a1b2 = abs(a1b2);
    var a2b3_ = a2_ * _b3 + _a2 * b3_ + _a2b3;
    var a3b2_ = a3_ * _b2 + _a3 * b2_ + _a3b2;
    var a3b1_ = a3_ * _b1 + _a3b1;
    var a1b3_ = _a1 * b3_ + _a1b3;
    var a2b1_ = a2_ * _b1 + _a2b1;
    var a1b2_ = _a1 * b2_ + _a1b2;
    var f4 = a2b3 - a3b2;
    var _f4 = abs(f4);
    var f4_ = a2b3_ + a3b2_ + _f4;
    var f5 = a1b3 - a3b1;
    var _f5 = abs(f5);
    var f5_ = a1b3_ + a3b1_ + _f5;
    var f6 = a2b1 - a1b2;
    var _f6 = abs(f6);
    var f6_ = a2b1_ + a1b2_ + _f6;
    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    //const u2 = a2b3*(-2*a3b2 + a2b3) + a3b2*a3b2
    //const u2 = (a2b3 - a3b2)*(a2b3 - a3b2)
    var u2 = f4 * f4;
    var u2_ = 2 * f4_ * _f4 + abs(u2);
    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    //const u1 = a1*b3*-a3*b2 + a1*b3*a2*b3 + a3*b1*-a2*b3 + a3*b1*a3*b2
    //const u1 = a1b3*(a2b3 - a3b2) - a3b1*(a2b3 - a3b2)
    //const u1 = a1b3*f4 - a3b1*f4 = f4*(a1b3 - a3b1);
    var u1 = f4 * f5;
    var u1_ = f4_ * _f5 + _f4 * f5_ + abs(u1);
    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    //const u0 = 
    //       a2b3*(a2b1 - a1b2) - a3b2*(a2b1 - a1b2) +
    //       a1b3*(-2*a3b1 + a1b3) + a3b1*a3b1;
    //const u0 = 
    //       f6*f4 + 
    //       (a1b3 - a3b1)*(a1b3 - a3b1);
    //const u0 = f6*f4 + f5*f5;
    var g7 = f6 * f4;
    var g7_ = f6_ * _f4 + _f6 * f4_ + abs(g7);
    var g9 = f5 * f5;
    var g9_ = 2 * _f5 * f5_ + abs(g9);
    var u0 = g7 + g9;
    var u0_ = g7_ + g9_ + abs(u0);
    // Solve: u2*t**2 + u1*t + u0 = 0
    return {
        coeffs: [u2, u1, u0],
        errBound: [u2_, u1_, u0_].map(function (c) { return γ1 * c; })
    };
}
exports.getCoeffsBez3WithRunningError = getCoeffsBez3WithRunningError;
