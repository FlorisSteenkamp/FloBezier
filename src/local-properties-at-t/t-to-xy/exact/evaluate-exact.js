"use strict";
exports.__esModule = true;
exports.evaluateExact = void 0;
var get_xy_exact_js_1 = require("../../../to-power-basis/get-xy/exact/get-xy-exact.js");
var flo_poly_1 = require("flo-poly");
/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * exactly (up to underflow / overflow).
 *
 * * **precondition:** TODO underflow/overflow
 * * the result is returned as `[x,y]`, where `x` and `y` are Shewchuk floating
 * point expansions
 *
 * @param ps
 * @param t
 *
 * @doc
 */
function evaluateExact(ps, t) {
    var len = ps.length;
    if (t === 0) {
        return [[ps[0][0]], [ps[0][1]]];
    }
    if (t === 1) {
        return [[ps[len - 1][0]], [ps[len - 1][1]]];
    }
    var _a = (0, get_xy_exact_js_1.getXYExact)(ps), X = _a[0], Y = _a[1];
    // wrap the last number as a Shewchuck expansion of length 1
    // @ts-ignore
    X[len - 1] = [X[len - 1]];
    // @ts-ignore
    Y[len - 1] = [Y[len - 1]];
    return [
        (0, flo_poly_1.eHorner)(X, t),
        (0, flo_poly_1.eHorner)(Y, t)
    ];
}
exports.evaluateExact = evaluateExact;
