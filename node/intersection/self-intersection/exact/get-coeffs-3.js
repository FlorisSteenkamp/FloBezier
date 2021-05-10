"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs3Exact = void 0;
const get_xy_any_bitlength_exact_1 = require("../../../to-power-basis/any-bitlength/exact/get-xy-any-bitlength-exact");
const big_float_ts_1 = require("big-float-ts");
/**
 * Returns the self-intersection poly to solve of the given cubic bezier curve.
 * see http://www.mare.ee/indrek/misc/2d.pdf
 *
 * @param ps An order 3 bezier curve.
 *
 * @doc
 */
function getCoeffs3Exact(ps) {
    const [[a3, a2, a1], [b3, b2, b1]] = get_xy_any_bitlength_exact_1.getXYExact(ps);
    //const u2 = -2*a2*a3*b2*b3 + a2*a2*b3*b3 + a3*a3*b2*b2
    const u2 = big_float_ts_1.eCalculate([
        [[-2], a2, a3, b2, b3], [a2, a2, b3, b3], [a3, a3, b2, b2]
    ]);
    //const u1 = -a1*a3*b2*b3 - a2*a3*b1*b3 + a1*a2*b3*b3 + b1*b2*a3*a3
    const u1 = big_float_ts_1.eCalculate([
        [[-1], a1, a3, b2, b3], [[-1], a2, a3, b1, b3], [a1, a2, b3, b3], [b1, b2, a3, a3]
    ]);
    //const u0 = -a1*a2*b2*b3 - a2*a3*b1*b2 - 2*a1*a3*b1*b3 + a1*a1*b3*b3 + a3*a3*b1*b1 + a1*a3*b2*b2 + b1*b3*a2*a2
    const u0 = big_float_ts_1.eCalculate([
        [[-1], a1, a2, b2, b3], [[-1], a2, a3, b1, b2], [[-2], a1, a3, b1, b3],
        [a1, a1, b3, b3], [a3, a3, b1, b1], [a1, a3, b2, b2],
        [b1, b3, a2, a2]
    ]);
    // Solve: u2*t**2 + u1*t + u0 = 0
    return [u2, u1, u0];
}
exports.getCoeffs3Exact = getCoeffs3Exact;
//# sourceMappingURL=get-coeffs-3.js.map