"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleBezierIntersectionPrecise = void 0;
const get_coeffs_quad_1 = require("./quad/get-coeffs-quad");
const flo_poly_1 = require("flo-poly");
const eval_de_casteljau_1 = require("../../local-properties-at-t/t-to-xy/eval-de-casteljau");
/**
 * * **precondition** max bit-aligned bitlength === 47
 * * returned parameter values are guaranteed accurate to within 4 ulps
 *
 * @param circle
 * @param ps
 *
 * @doc
 */
function circleBezierIntersectionPrecise(circle, ps) {
    let poly;
    if (ps.length === 4) {
        poly = get_coeffs_quad_1.getCoeffsCubicQuad(circle, ps);
    }
    else if (ps.length === 3) {
        poly = get_coeffs_quad_1.getCoeffsQuadraticQuad(circle, ps);
    }
    else if (ps.length === 2) {
        poly = get_coeffs_quad_1.getCoeffsLinearQuad(circle, ps);
    }
    let ts = flo_poly_1.allRootsCertified(poly, 0, 1);
    return ts.map(t => {
        return {
            //t: t.tM,
            t: flo_poly_1.mid(t),
            //p: evalDeCasteljau(ps, t.tM)
            p: eval_de_casteljau_1.evalDeCasteljau(ps, flo_poly_1.mid(t))
        };
    });
}
exports.circleBezierIntersectionPrecise = circleBezierIntersectionPrecise;
//# sourceMappingURL=circle-bezier-intersection-precise.js.map