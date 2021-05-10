"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hausdorffDistanceCandidates = exports.hausdorffDistance = void 0;
const closest_point_on_bezier_1 = require("./closest-point-on-bezier/closest-point-on-bezier");
const split_by_max_curve_length_1 = require("../transformation/split-merge-clone/split-by-max-curve-length");
const flo_vector2d_1 = require("flo-vector2d");
const eval_de_casteljau_1 = require("../local-properties-at-t/t-to-xy/eval-de-casteljau");
function hausdorffDistanceCandidates(ps1, ps2, maxLength) {
    let ts = split_by_max_curve_length_1.splitByMaxCurveLength(ps1, maxLength);
    let candidates = [];
    for (let i = 0; i < ts.length; i++) {
        let t = ts[i];
        let p = eval_de_casteljau_1.evalDeCasteljau(ps1, t);
        let v = closest_point_on_bezier_1.closestPointOnBezier(ps2, p);
        candidates.push({
            p1: p,
            p2: v.p,
            d: flo_vector2d_1.distanceBetween(p, v.p)
        });
    }
    return candidates;
}
exports.hausdorffDistanceCandidates = hausdorffDistanceCandidates;
/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance
 * from ps1 to ps2 between two bezier curves.
 *
 * @param ps1
 * @param ps2
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
 *
 * @doc
 */
function hausdorffDistance(ps1, ps2, maxLength) {
    let candidates = hausdorffDistanceCandidates(ps1, ps2, maxLength);
    let maxD = Number.NEGATIVE_INFINITY;
    for (let candidate of candidates) {
        if (candidate.d > maxD) {
            maxD = candidate.d;
        }
    }
    return maxD;
}
exports.hausdorffDistance = hausdorffDistance;
//# sourceMappingURL=hausdorff-distance.js.map