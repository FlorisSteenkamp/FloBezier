"use strict";
exports.__esModule = true;
exports.getCoeffsLinearExact = exports.getCoeffsQuadraticExact = exports.getCoeffsCubicExact = void 0;
var get_xy_exact_js_1 = require("../../../to-power-basis/get-xy/exact/get-xy-exact.js");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
var big_float_ts_1 = require("big-float-ts");
var tp = big_float_ts_1.twoProduct;
var calc = big_float_ts_1.eCalculate;
var sce = big_float_ts_1.scaleExpansion;
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of a circle
 * and a cubic bezier curve.
 *
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** TODO - overflow/underflow
 * * the returned polynomial coefficients are exact (i.e. error-free)
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * @internal
 */
function getCoeffsCubicExact(circle, ps) {
    var r = circle.radius, c = circle.center;
    var cx = c[0], cy = c[1];
    var _a = (0, get_xy_exact_js_1.getXY3Exact)(ps), _b = _a[0], a3 = _b[0], a2 = _b[1], a1 = _b[2], x0 = _b[3], _c = _a[1], b3 = _c[0], b2 = _c[1], b1 = _c[2], y0 = _c[3];
    var a0 = [x0];
    var b0 = [y0];
    // (a3**2 + b3**2)*t**6 + 
    var t6 = calc([
        [a3, a3],
        [b3, b3]
    ]);
    // (2*a2*a3 + 2*b2*b3)*t**5 + 
    var t5 = sce(calc([
        [a2, a3],
        [b2, b3]
    ]), 2);
    // (2*a1*a3 + a2**2 + 2*b1*b3 + b2**2)*t**4 + 
    var t4 = calc([
        [[2], a1, a3], [a2, a2], [[2], b1, b3], [b2, b2]
    ]);
    // (2*a0*a3 + 2*a1*a2 - 2*a3*cx + 2*b0*b3 + 2*b1*b2 - 2*b3*cy)*t**3 + 
    var t3 = sce(calc([
        [a0, a3], [a1, a2], [[-1], a3, [cx]], [b0, b3], [b1, b2], [[-1], b3, [cy]]
    ]), 2);
    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    var t2 = calc([
        [[2], a0, a2], [a1, a1], [[-2], a2, [cx]], [[2], b0, b2], [b1, b1], [[-2], b2, [cy]]
    ]);
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    var t1 = sce(calc([
        [a0, a1], [[-1], a1, [cx]], [b0, b1], [[-1], b1, [cy]]
    ]), 2);
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    var t0 = calc([
        [a0, a0], [[-2], a0, [cx]], [b0, b0], [[-2], b0, [cy]],
        [tp(cx, cx)], [tp(cy, cy)], [tp(-r, r)]
    ]);
    return [t6, t5, t4, t3, t2, t1, t0];
}
exports.getCoeffsCubicExact = getCoeffsCubicExact;
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of a circle
 * and a quadratic bezier curve.
 *
 * The returned polynomial degree will be 4
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** none
 * * the returned polynomial coefficients are exact (i.e. error-free)
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 */
function getCoeffsQuadraticExact(circle, ps) {
    var r = circle.radius, c = circle.center;
    var cx = c[0], cy = c[1];
    var _a = (0, get_xy_exact_js_1.getXY2Exact)(ps), _b = _a[0], a2 = _b[0], a1 = _b[1], x0 = _b[2], _c = _a[1], b2 = _c[0], b1 = _c[1], y0 = _c[2];
    var a0 = [x0];
    var b0 = [y0];
    // (a2**2 + b2**2)*t**4 + 
    var t4 = calc([
        [a2, a2],
        [b2, b2]
    ]);
    // (2*a1*a2 + 2*b1*b2)*t**3 + 
    var t3 = sce(calc([
        [a1, a2],
        [b1, b2]
    ]), 2);
    // (2*a0*a2 + a1**2 - 2*a2*cx + 2*b0*b2 + b1**2 - 2*b2*cy)*t**2 + 
    var t2 = calc([
        [[2], a0, a2], [a1, a1], [[-2], a2, [cx]], [[2], b0, b2], [b1, b1], [[-2], b2, [cy]]
    ]);
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    var t1 = sce(calc([
        [a0, a1], [[-1], a1, [cx]], [b0, b1], [[-1], b1, [cy]]
    ]), 2);
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    var t0 = calc([
        [a0, a0], [[-2], a0, [cx]], [b0, b0], [[-2], b0, [cy]],
        [tp(cx, cx)], [tp(cy, cy)], [tp(-r, r)]
    ]);
    return [t4, t3, t2, t1, t0];
}
exports.getCoeffsQuadraticExact = getCoeffsQuadraticExact;
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of a circle
 * and a linear bezier curve (i.e. a line).
 *
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** none
 * * the returned polynomial coefficients are exact (i.e. error-free)
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 */
function getCoeffsLinearExact(circle, ps) {
    var r = circle.radius, c = circle.center;
    var cx = c[0], cy = c[1];
    var _a = (0, get_xy_exact_js_1.getXY1Exact)(ps), _b = _a[0], a1 = _b[0], x0 = _b[1], _c = _a[1], b1 = _c[0], y0 = _c[1];
    var a0 = [x0];
    var b0 = [y0];
    // (a1**2 + b1**2)*t**2 +
    var t2 = calc([
        [a1, a1],
        [b1, b1]
    ]);
    // (2*a0*a1 - 2*a1*cx + 2*b0*b1 - 2*b1*cy)*t + 
    var t1 = sce(calc([
        [a0, a1], [[-1], a1, [cx]], [b0, b1], [[-1], b1, [cy]]
    ]), 2);
    // a0**2 - 2*a0*cx + b0**2 - 2*b0*cy + cx**2 + cy**2 - r**2
    var t0 = calc([
        [a0, a0], [[-2], a0, [cx]], [b0, b0], [[-2], b0, [cy]],
        [tp(cx, cx)], [tp(cy, cy)], [tp(-r, r)]
    ]);
    return [t2, t1, t0];
}
exports.getCoeffsLinearExact = getCoeffsLinearExact;
