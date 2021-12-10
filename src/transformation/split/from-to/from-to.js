"use strict";
exports.__esModule = true;
exports.fromTo = void 0;
var from_to_3_js_1 = require("./from-to-3.js");
var from_to_2_js_1 = require("./from-to-2.js");
var fromTo3 = from_to_3_js_1.fromTo3;
var fromTo2 = from_to_2_js_1.fromTo2;
/**
 * Returns a bezier curve that starts and ends at the given t parameters
 * including an error bound (that needs to be multiplied by `6u` or `11u` (for
 * quadratic and cubic bezier curves respectively), where `u === Number.EPSILON/2`).
 *
 * * precondition 1: exact tS, tE, ps
 * * precondition 2: tS, tE ∈ [0,1]
 * * precondition 3: `Number.EPSILON | tS` and `Number.EPSILON | tE`
 * * precondition 4: tE > tS
 *
 * @param ps a cubic bezier curve
 * @param tS the t parameter where the resultant bezier should start
 * @param tE the t parameter where the resultant bezier should end
 *
 * @internal
 */
function fromTo(ps, tS, tE) {
    if (ps.length === 4) {
        return fromTo3(ps, tS, tE);
    }
    if (ps.length === 3) {
        return fromTo2(ps, tS, tE);
    }
    throw new Error('The given bezier curve is invalid; it must be of order 2 or 3.');
}
exports.fromTo = fromTo;
