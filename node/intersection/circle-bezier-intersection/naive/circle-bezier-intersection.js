"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleBezierIntersection = void 0;
const flo_poly_1 = require("flo-poly");
const get_coeffs_1 = require("./get-coeffs");
const eval_de_casteljau_1 = require("../../../local-properties-at-t/t-to-xy/eval-de-casteljau");
function circleBezierIntersection(circle, ps) {
    let poly;
    if (ps.length === 4) {
        poly = get_coeffs_1.getCoeffsCubic(circle, ps);
    }
    else if (ps.length === 3) {
        poly = get_coeffs_1.getCeoffsQuadratic(circle, ps);
    }
    else if (ps.length === 2) {
        poly = get_coeffs_1.getCeoffsLine(circle, ps);
    }
    let ts = flo_poly_1.allRoots(poly, 0, 1);
    return ts.map(t => {
        return {
            t,
            p: eval_de_casteljau_1.evalDeCasteljau(ps, t)
        };
    });
}
exports.circleBezierIntersection = circleBezierIntersection;
//# sourceMappingURL=circle-bezier-intersection.js.map