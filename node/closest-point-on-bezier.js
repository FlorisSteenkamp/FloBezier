"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_tangent_poly_from_point_1 = require("./get-tangent-poly-from-point");
const evaluate_1 = require("./evaluate/evaluate");
const flo_vector2d_1 = require("flo-vector2d");
const flo_poly_1 = require("flo-poly");
function closestPointOnBezier(ps, p) {
    let poly = get_tangent_poly_from_point_1.getTangentPolyFromPoint(ps, p);
    let ts = flo_poly_1.allRoots(poly, 0, 1);
    ts.push(0);
    ts.push(1);
    let ev = evaluate_1.evaluate(ps);
    let ps_ = ts.map(t => ({ p: ev(t), t }));
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