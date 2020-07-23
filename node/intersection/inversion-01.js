"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inversion01Precise = void 0;
const evaluate_1 = require("../local-properties-at-t/t-to-xy/evaluate");
const flo_vector2d_1 = require("flo-vector2d");
const flo_poly_1 = require("flo-poly");
const get_tangent_poly_from_point_1 = require("../simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eEstimate } = big_float_ts_1.operators;
/**
 * Returns the closest point t value on the bezier to the given point - only
 * returns t values in the range [0,1]. Also returns the minimum distance found.
 * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * this function also acts as an inversion formula.
 *
 * @param ps
 * @param p
 */
function inversion01Precise(ps, p) {
    // TODO - a double point could give two t-values which is not currently
    // checked for and handled - this might or might not be important depending
    // on the application
    // the coefficients of the poly below is max double-double
    let poly = get_tangent_poly_from_point_1.getTangentPolyFromPointExact(ps, p);
    //let ts = quadAllRootsPrecise(poly, 0, 1);
    let ts = flo_poly_1.allRootsMultiWithErrBounds(poly, poly.map(c => 0));
    if (!ts.length) {
        return undefined;
    }
    let ps_ = ts.map(t => ({
        //t: t.tM,
        t: flo_poly_1.mid(t),
        p: evaluate_1.evaluateExact(ps, flo_poly_1.mid(t)).map(eEstimate)
    }));
    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let t = undefined;
    ps_.forEach(p_ => {
        let d = flo_vector2d_1.squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            t = p_.t;
        }
    });
    return { t, minD };
}
exports.inversion01Precise = inversion01Precise;
//# sourceMappingURL=inversion-01.js.map