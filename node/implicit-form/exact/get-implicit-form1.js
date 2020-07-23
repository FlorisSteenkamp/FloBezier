"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm1Exact = void 0;
const get_x_1 = require("../../to-power-basis/get-x");
const get_y_1 = require("../../to-power-basis/get-y");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eNegativeOf, eDiff, expansionProduct } = big_float_ts_1.operators;
/**
 * Returns the exact implicit form of the given linear bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function getImplicitForm1Exact(ps) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    let [a1, a0] = get_x_1.getXExact(ps);
    let [b1, b0] = get_y_1.getYExact(ps);
    let vₓ = b1;
    let vᵧ = eNegativeOf(a1);
    let v = eDiff(expansionProduct(a1, b0), expansionProduct(a0, b1));
    return { vₓ, vᵧ, v };
}
exports.getImplicitForm1Exact = getImplicitForm1Exact;
//# sourceMappingURL=get-implicit-form1.js.map