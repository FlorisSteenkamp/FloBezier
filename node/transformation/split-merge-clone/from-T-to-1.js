"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTTo1 = void 0;
const split_at_1 = require("./split-at");
/**
 * Returns an order 1, 2 or 3 bezier curve that starts at the given t parameter
 * and ends at t=1.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 *
 * @param ps a cubic bezier curve
 * @param t the t parameter where the resultant bezier should start
 *
 * @doc
 */
function fromTTo1(ps, t) {
    return split_at_1.splitAt(ps, t)[1];
}
exports.fromTTo1 = fromTTo1;
//# sourceMappingURL=from-T-to-1.js.map