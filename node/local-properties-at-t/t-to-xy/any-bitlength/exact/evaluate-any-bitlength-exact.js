"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate_anyBitlength_exact = void 0;
const get_xy_any_bitlength_exact_1 = require("../../../../to-power-basis/any-bitlength/exact/get-xy-any-bitlength-exact");
const flo_poly_1 = require("flo-poly");
/**
 *
 * @param ps
 * @param t
 *
 * @doc
 */
function evaluate_anyBitlength_exact(ps, t) {
    const len = ps.length;
    if (t === 0) {
        return [[ps[0][0]], [ps[0][1]]];
    }
    if (t === 1) {
        return [[ps[len - 1][0]], [ps[len - 1][1]]];
    }
    const [X, Y] = get_xy_any_bitlength_exact_1.getXYExact(ps);
    return [
        flo_poly_1.eHorner(X, t),
        flo_poly_1.eHorner(Y, t)
    ];
}
exports.evaluate_anyBitlength_exact = evaluate_anyBitlength_exact;
//# sourceMappingURL=evaluate-any-bitlength-exact.js.map