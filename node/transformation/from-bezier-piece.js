"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bezierFromPart = void 0;
const from_0_to_T_1 = require("./split-merge-clone/from-0-to-T");
const from_T_to_1_1 = require("./split-merge-clone/from-T-to-1");
const eval_de_casteljau_1 = require("../local-properties-at-t/t-to-xy/eval-de-casteljau");
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param bezierPart A partial bezier
 */
function bezierFromPart(bezierPart) {
    let { ps, ts } = bezierPart;
    // If ts = [0,1] then return original bezier.
    if (ts[0] === 0 && ts[1] === 1) {
        return ps;
    }
    // If ts[0] === ts[1] then return a single point degenerated bezier.
    if (ts[0] === ts[1]) {
        let p = eval_de_casteljau_1.evalDeCasteljau(ps, ts[0]);
        return [p, p, p, p];
    }
    if (ts[0] === 0) {
        return from_0_to_T_1.from0ToT(ps, ts[1]);
    }
    if (ts[1] === 1) {
        return from_T_to_1_1.fromTTo1(ps, ts[0]);
    }
    // At this stage we know the t range is not degenerate and ts[0] !== 0 
    // and ts[1] !== 1
    return from_0_to_T_1.from0ToT(from_T_to_1_1.fromTTo1(ps, ts[0]), (ts[1] - ts[0]) / (1 - ts[0]));
}
exports.bezierFromPart = bezierFromPart;
//# sourceMappingURL=from-bezier-piece.js.map