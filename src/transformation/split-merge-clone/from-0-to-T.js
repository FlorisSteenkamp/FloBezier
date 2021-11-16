"use strict";
exports.__esModule = true;
exports.from0ToT = void 0;
var split_at_js_1 = require("./split-at.js");
/**
 * Returns an order 1, 2 or 3 bezier curve that starts at the given curve's t=0
 * and ends at the given t parameter.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * and η is Number.EPSILON.
 *
 * @param ps a cubic bezier curve
 * @param t the t parameter where the resultant bezier should end
 *
 * @doc
 */
function from0ToT(ps, t) {
    return (0, split_at_js_1.splitAt)(ps, t)[0];
}
exports.from0ToT = from0ToT;
