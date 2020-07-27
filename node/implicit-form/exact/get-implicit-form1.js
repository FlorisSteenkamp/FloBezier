"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm1Exact = void 0;
const double_double_1 = require("double-double");
const get_xy_1 = require("../../to-power-basis/get-xy");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qdq = double_double_1.ddDiffDd;
/**
 * Returns the exact implicit form of the given linear bezier.
 * Adapted from http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function getImplicitForm1Exact(ps) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0
    let [[a1, a0], [b1, b0]] = get_xy_1.getXY(ps);
    let vₓ = -b1;
    let vᵧ = a1;
    let v = qdq(tp(a0, b1), tp(a1, b0));
    return { vₓ, vᵧ, v };
}
exports.getImplicitForm1Exact = getImplicitForm1Exact;
//# sourceMappingURL=get-implicit-form1.js.map