"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_1 = require("./evaluate");
const from_0_to_T_1 = require("./from-0-to-T");
const from_T_to_1_1 = require("./from-T-to-1");
/**
 * Returns a cubic bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 */
function fromTo(ps) {
    return function (t1, t2) {
        if (t1 === t2) {
            // Degenerate case
            let p = evaluate_1.evaluate(ps, t1);
            return [p, p, p, p];
        }
        else if (t1 === 0 && t2 === 1) {
            return ps;
        }
        else if (t1 === 0) {
            return from_0_to_T_1.from0ToT(ps, t2);
        }
        else if (t2 === 1) {
            return from_T_to_1_1.fromTTo1(ps, t1);
        }
        let t = from_T_to_1_1.fromTTo1(ps, t1);
        return from_0_to_T_1.from0ToT(t, (t2 - t1) / (1 - t1));
    };
}
exports.fromTo = fromTo;

//# sourceMappingURL=from-to.js.map
