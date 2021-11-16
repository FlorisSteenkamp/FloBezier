"use strict";
exports.__esModule = true;
exports.evaluate = void 0;
var get_xy_js_1 = require("../../../to-power-basis/get-xy/double/get-xy.js");
var flo_poly_1 = require("flo-poly");
/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using power bases conversion and subsequently [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * to evaluate the polynomial in double precision floating point arithmetic.
 *
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are
 * double precision floating point numbers.
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 */
function evaluate(ps, t) {
    var len = ps.length;
    if (t === 0) {
        return ps[0];
    }
    if (t === 1) {
        return ps[len - 1];
    }
    var _a = (0, get_xy_js_1.getXY)(ps), X = _a[0], Y = _a[1];
    return [
        (0, flo_poly_1.Horner)(X, t),
        (0, flo_poly_1.Horner)(Y, t)
    ];
}
exports.evaluate = evaluate;
