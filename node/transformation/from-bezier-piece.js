"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_0_to_T_1 = require("./split-merge-clone/from-0-to-T");
const from_T_to_1_1 = require("./split-merge-clone/from-T-to-1");
const eval_de_casteljau_1 = require("../local-properties-at-t/t-to-xy/eval-de-casteljau");
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param ps A bezier
 * @param tRange A t range
 */
function bezierFromBezierPiece(ps, tRange) {
    // If tRange = [0,1] then return original bezier.
    if (tRange[0] === 0 && tRange[1] === 1) {
        return ps;
    }
    // If tRange[0] === tRange[1] then return a single point degenerated bezier.
    if (tRange[0] === tRange[1]) {
        let p = eval_de_casteljau_1.evalDeCasteljau(ps, tRange[0]);
        return [p, p, p, p];
    }
    if (tRange[0] === 0) {
        return from_0_to_T_1.from0ToT(ps, tRange[1]);
    }
    if (tRange[1] === 1) {
        return from_T_to_1_1.fromTTo1(ps, tRange[0]);
    }
    // At this stage we know the t range is not degenerate and tRange[0] !== 0 
    // and tRange[1] !== 1
    return from_0_to_T_1.from0ToT(from_T_to_1_1.fromTTo1(ps, tRange[0]), (tRange[1] - tRange[0]) / (1 - tRange[0]));
}
exports.bezierFromBezierPiece = bezierFromBezierPiece;
//# sourceMappingURL=from-bezier-piece.js.map