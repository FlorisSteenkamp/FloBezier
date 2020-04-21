"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
const get_xy_1 = require("../../to-power-basis/get-xy");
const tp = flo_numerical_1.twoProduct;
const qdq = flo_numerical_1.qDiffQuad;
/**
 * Returns the exact implicit form of the given linear bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function getImplicitForm1Exact_(ps) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    let [[a1, a0], [b1, b0]] = get_xy_1.getXY(ps);
    let vₓ = -b1;
    let vᵧ = a1;
    let v = qdq(tp(a0, b1), tp(a1, b0));
    return { vₓ, vᵧ, v };
}
exports.getImplicitForm1Exact_ = getImplicitForm1Exact_;
//# sourceMappingURL=get-implicit-form1-.js.map