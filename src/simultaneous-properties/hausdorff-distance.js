"use strict";
exports.__esModule = true;
exports.hausdorffDistanceCandidates = exports.hausdorffDistance = void 0;
var closest_point_on_bezier_js_1 = require("./closest-point-on-bezier/closest-point-on-bezier.js");
var split_by_max_curve_length_js_1 = require("../transformation/split-merge-clone/split-by-max-curve-length.js");
var flo_vector2d_1 = require("flo-vector2d");
var eval_de_casteljau_js_1 = require("../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
function hausdorffDistanceCandidates(ps1, ps2, maxLength) {
    var ts = (0, split_by_max_curve_length_js_1.splitByMaxCurveLength)(ps1, maxLength);
    var candidates = [];
    for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        var p = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps1, t);
        var v = (0, closest_point_on_bezier_js_1.closestPointOnBezier)(ps2, p);
        candidates.push({
            p1: p,
            p2: v.p,
            d: (0, flo_vector2d_1.distanceBetween)(p, v.p)
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
    var candidates = hausdorffDistanceCandidates(ps1, ps2, maxLength);
    var maxD = Number.NEGATIVE_INFINITY;
    for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
        var candidate = candidates_1[_i];
        if (candidate.d > maxD) {
            maxD = candidate.d;
        }
    }
    return maxD;
}
exports.hausdorffDistance = hausdorffDistance;
