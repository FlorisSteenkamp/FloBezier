"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateHybridQuadratic = void 0;
const eval_de_casteljau_1 = require("./eval-de-casteljau");
/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see
 * toHybridQuadratic for details).
 * @param hq A hybrid quadratic
 * @param t The bezier parameter value
 * @param th The parameter value for the hybrid quadratic point.
 */
function evaluateHybridQuadratic(hq, t, th) {
    let P0 = hq[0];
    let P1 = eval_de_casteljau_1.evalDeCasteljau(hq[1], th);
    let P2 = hq[2];
    return eval_de_casteljau_1.evalDeCasteljau([P0, P1, P2], t);
}
exports.evaluateHybridQuadratic = evaluateHybridQuadratic;
//# sourceMappingURL=evaluate-hybrid-quadratic.js.map