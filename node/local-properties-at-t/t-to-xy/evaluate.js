"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const get_xy_1 = require("../../to-power-basis/get-xy");
const flo_poly_1 = require("flo-poly");
/**
 *
 * @param ps
 * @param t
 *
 * @doc
 */
function evaluate(ps, t) {
    const len = ps.length;
    if (t === 0) {
        return ps[0];
    }
    if (t === 1) {
        return ps[len - 1];
    }
    const [X, Y] = get_xy_1.getXY(ps);
    return [
        flo_poly_1.Horner(X, t),
        flo_poly_1.Horner(Y, t)
    ];
}
exports.evaluate = evaluate;
//# sourceMappingURL=evaluate.js.map