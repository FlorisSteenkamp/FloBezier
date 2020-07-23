"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closestPointOnBezierPrecise = exports.closestPointOnBezier = void 0;
const get_tangent_poly_from_point_1 = require("../get-tangent-poly-from-point/naive/get-tangent-poly-from-point");
const get_tangent_poly_from_point_2 = require("../get-tangent-poly-from-point/exact/get-tangent-poly-from-point");
const evaluate_1 = require("../../local-properties-at-t/t-to-xy/evaluate");
const flo_vector2d_1 = require("flo-vector2d");
const flo_poly_1 = require("flo-poly");
const eval_de_casteljau_1 = require("../../local-properties-at-t/t-to-xy/eval-de-casteljau");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const estimate = big_float_ts_1.eEstimate;
/**
 * Returns the closest point on the bezier to the given point - returns the point
 * and the t value.
 * * this function also acts as an excellent inversion formula.
 * @param ps
 * @param p
 */
function closestPointOnBezierPrecise(ps, p) {
    //let poly = getTangentPolyFromPointExact(ps, p);
    let poly = get_tangent_poly_from_point_2.getTangentPolyFromPointExact(ps, p);
    // we give ample leeway for roots outside [0,1] since roots can be some 
    // distance outside this range at extemely high curvature where the tangent
    // is very small. These can later be coerced to 0 or 1 if the distance from
    // p to the bezier is calculated to be small enough. nope, we add [0,1] below
    // as endpoints to check so no need.
    let ts = flo_poly_1.allRootsMultiWithErrBounds(poly, poly.map(c => 0), // because all coefficients are exact
    undefined // ...
    ).map(flo_poly_1.mid);
    ts.push(0);
    ts.push(1);
    let ps_ = ts.map(t => ({ p: evaluate_1.evaluateExact(ps, t).map(estimate), t }));
    //let ps_ = ts.map(t => ({ p: evalDeCasteljau(ps, t), t }));
    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minT = undefined;
    ps_.forEach(p_ => {
        let d = flo_vector2d_1.squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            minT = p_;
        }
    });
    return minT;
}
exports.closestPointOnBezierPrecise = closestPointOnBezierPrecise;
function closestPointOnBezier(ps, p) {
    let poly = get_tangent_poly_from_point_1.getTangentPolyFromPoint(ps, p);
    let ts = flo_poly_1.allRoots(poly, 0, 1);
    ts.push(0);
    ts.push(1);
    let ps_ = ts.map(t => ({ p: eval_de_casteljau_1.evalDeCasteljau(ps, t), t }));
    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minP = undefined;
    ps_.forEach(p_ => {
        let d = flo_vector2d_1.squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            minP = p_;
        }
    });
    return minP;
}
exports.closestPointOnBezier = closestPointOnBezier;
//# sourceMappingURL=closest-point-on-bezier.js.map