"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const Vector = require("flo-vector2d");
const get_x_1 = require("./get-x");
const get_y_1 = require("./get-y");
const evaluate_1 = require("./evaluate/evaluate");
const closest_point_on_bezier_1 = require("./closest-point-on-bezier");
const split_by_max_curve_length_1 = require("./split-by-max-curve-length");
function hausdorffDistanceCandidates(ps1, ps2, maxLength) {
    let ts = split_by_max_curve_length_1.splitByMaxCurveLength(ps1, maxLength);
    let candidates = [];
    for (let i = 0; i < ts.length; i++) {
        let t = ts[i];
        let p = evaluate_1.evaluate(ps1, t);
        let v = closest_point_on_bezier_1.closestPointOnBezier(ps2, p);
        candidates.push({
            p1: p,
            p2: v.p,
            d: Vector.distanceBetween(p, v.p)
        });
    }
    return candidates;
}
exports.hausdorffDistanceCandidates = hausdorffDistanceCandidates;
/**
 * Calculates and returns an approximation to the one-sided Hausdorff distance
 * from ps1 to ps2 between two bezier curves.
 * @param ps1
 * @param ps2
 * @param maxLength The first curve (ps1) will be split into pieces such that
 * each piece is shorter than maxLength. All endpoints of the smaller curves
 * are then used to check the distance to the other curve. The max of these
 * are given as an estimate of the Hausdorff distance.
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
/**
 * TODO: incomplete - but exact (bar numerical imprecision) calculation
 * @param ps1
 * @param ps2
 */
function hausdorffDistance_(ps1, ps2) {
    let candidates = hausdorffDistanceCandidates_(ps1, ps2);
    let maxD = Number.NEGATIVE_INFINITY;
    for (let candidate of candidates) {
        if (candidate.d > maxD) {
            maxD = candidate.d;
        }
    }
    return maxD;
}
/**
 * TODO - incomplete
 * See https://pdfs.semanticscholar.org/dca1/1890c5377ec0bc3b4e252c1d2f438ffa92a2.pdf
 * Calculates and returns the one-sided Hausdorff distance from ps1 to ps2
 * between two bezier curves. The result is given as an array of a pair of
 * candidate points.
 */
function hausdorffDistanceCandidates_(ps1, ps2) {
    let len1 = ps1.length;
    let ps1s = ps1[0];
    let ps1e = ps1[len1 - 1];
    let len2 = ps2.length;
    let ps2s = ps2[0];
    let ps2e = ps2[len2 - 1];
    let candidates = [];
    // Endpoints
    {
        let { p, t } = closest_point_on_bezier_1.closestPointOnBezier(ps2, ps1s);
        candidates.push({
            p1: ps1s,
            p2: p,
            d: Vector.distanceBetween(ps1s, p)
        });
    }
    {
        let { p, t } = closest_point_on_bezier_1.closestPointOnBezier(ps2, ps1e);
        candidates.push({
            p1: ps1e,
            p2: p,
            d: Vector.distanceBetween(ps1e, p)
        });
    }
    // 3.3.1 Intersection with a point-point bisector
    {
        let x_t = get_x_1.getX(ps1);
        let y_t = get_y_1.getY(ps1);
        let u = ps2s[0];
        let v = ps2s[1];
        let w = ps2e[0];
        let z = ps2e[1];
        let A = flo_poly_1.subtract(x_t, [u]);
        let B = flo_poly_1.subtract(y_t, [v]);
        let C = flo_poly_1.subtract(x_t, [w]);
        let D = flo_poly_1.subtract(y_t, [z]);
        let E = flo_poly_1.add(flo_poly_1.multiply(A, A), flo_poly_1.multiply(B, B));
        let F = flo_poly_1.add(flo_poly_1.multiply(C, C), flo_poly_1.multiply(D, D));
        let G = flo_poly_1.subtract(E, F);
        candidates.push(...flo_poly_1.allRoots(G, 0, 1).map(t => {
            let p1 = evaluate_1.evaluate(ps1, t);
            let p2 = ps2s;
            return { p1, p2, d: Vector.distanceBetween(p1, p2) };
        }));
    }
    // 3.3.2 Intersection with a point-curve bisector - start endpoint
    {
        let xa_t = get_x_1.getX(ps1);
        let ya_t = get_y_1.getY(ps1);
        let xb_s = get_x_1.getX(ps2);
        let yb_s = get_y_1.getY(ps2);
        // FAIL - we need to solve systems of polynomial equations - too hard
        // But in future use Sylvester matrix, etc. to solve - even for systems
        // with 3 or more equations there exist algorithms
        // Alternatively, in case of quad beziers, use the actual self-bisector 
        // to intersect - it is just a line
    }
    return candidates;
}
//# sourceMappingURL=hausdorff-distance.js.map