"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitForm1Exact = void 0;
const get_x_1 = require("../../to-power-basis/get-x");
const get_y_1 = require("../../to-power-basis/get-y");
const flo_numerical_1 = require("flo-numerical");
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
    let vᵧ = flo_numerical_1.negativeOf(a1);
    let v = flo_numerical_1.expansionDiff(flo_numerical_1.expansionProduct(a1, b0), flo_numerical_1.expansionProduct(a0, b1));
    return { vₓ, vᵧ, v };
}
exports.getImplicitForm1Exact = getImplicitForm1Exact;
//# sourceMappingURL=get-implicit-form1.js.map