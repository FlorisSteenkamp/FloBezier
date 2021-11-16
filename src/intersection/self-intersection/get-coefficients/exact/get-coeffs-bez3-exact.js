"use strict";
exports.__esModule = true;
exports.getCoeffsBez3Exact = void 0;
var big_float_ts_1 = require("big-float-ts");
var get_xy_exact_js_1 = require("../../../../to-power-basis/get-xy/exact/get-xy-exact.js");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var epr = big_float_ts_1.expansionProduct;
var fes = big_float_ts_1.fastExpansionSum;
var ede = big_float_ts_1.eDiff;
/**
 * Returns an error-free polynomial in 1 variable whose roots are the parameter
 * values of the self-intersection points of the given cubic bezier curve.
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** TODO underflow/overflow
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps An order 3 bezier curve.
 *
 * @doc
 */
function getCoeffsBez3Exact(ps) {
    var _a = (0, get_xy_exact_js_1.getXY3Exact)(ps), _b = _a[0], a3 = _b[0], a2 = _b[1], a1 = _b[2], _c = _a[1], b3 = _c[0], b2 = _c[1], b1 = _c[2];
    var a2b3 = epr(a2, b3);
    var a3b2 = epr(a3, b2);
    var a3b1 = epr(a3, b1);
    var a1b3 = epr(a1, b3);
    var a2b1 = epr(a2, b1);
    var a1b2 = epr(a1, b2);
    var f4 = ede(a2b3, a3b2);
    var f5 = ede(a1b3, a3b1);
    var f6 = ede(a2b1, a1b2);
    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    var u2 = epr(f4, f4);
    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    var u1 = epr(f4, f5);
    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    var g7 = epr(f4, f6);
    var g9 = epr(f5, f5);
    var u0 = fes(g7, g9);
    // Solve: u2*t**2 + u1*t + u0 = 0
    return [u2, u1, u0];
}
exports.getCoeffsBez3Exact = getCoeffsBez3Exact;
