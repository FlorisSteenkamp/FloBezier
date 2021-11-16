"use strict";
exports.__esModule = true;
exports.circleBezierIntersection = void 0;
var get_coeffs_dd_js_1 = require("./double-double/get-coeffs-dd.js");
var get_coeffs_exact_js_1 = require("./exact/get-coeffs-exact.js");
var flo_poly_1 = require("flo-poly");
var get_circle_bezier_intersection_error_counters_js_1 = require("./get-circle-bezier-intersection-error-counters.js");
var error_analysis_js_1 = require("../../error-analysis/error-analysis.js");
var γγ6 = (0, error_analysis_js_1.γγ)(6);
/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve.
 *
 * The algorithm employed uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * the bezier curve's parameter `t` values are retuned
 * * * **precondition:** TODO - underflow/overflow conditions
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the t values of the bezier curve
 *
 * @param circle
 * @param ps
 *
 * @doc mdx
 */
function circleBezierIntersection(circle, ps) {
    var poly;
    var _polyE;
    var getCoeffsExact;
    if (ps.length === 4) {
        poly = (0, get_coeffs_dd_js_1.getCoeffsCubicDd)(circle, ps);
        _polyE = (0, get_circle_bezier_intersection_error_counters_js_1.getCoeffsCubicErrorCounters)(circle, ps);
        getCoeffsExact = get_coeffs_exact_js_1.getCoeffsCubicExact;
    }
    else if (ps.length === 3) {
        poly = (0, get_coeffs_dd_js_1.getCoeffsQuadraticDd)(circle, ps);
        _polyE = (0, get_circle_bezier_intersection_error_counters_js_1.getCoeffsQuadraticErrorCounters)(circle, ps);
        getCoeffsExact = get_coeffs_exact_js_1.getCoeffsQuadraticExact;
    }
    else if (ps.length === 2) {
        poly = (0, get_coeffs_dd_js_1.getCoeffsLinearDd)(circle, ps);
        _polyE = (0, get_circle_bezier_intersection_error_counters_js_1.getCoeffsLinearErrorCounters)(circle, ps);
        getCoeffsExact = get_coeffs_exact_js_1.getCoeffsLinearExact;
    }
    else {
        // TODO - handle case of bezier curve being degenerate to a point
        throw new Error('The given bezier curve is invalid');
    }
    var polyE = _polyE.map(function (e) { return γγ6 * e; });
    var ts = (0, flo_poly_1.allRootsCertified)(poly, 0, 1, polyE, function () { return getCoeffsExact(circle, ps); });
    return ts;
    //return ts.map(t => {
    //    return {
    //        t: mid(t),
    //        p: evalDeCasteljau(ps, mid(t))
    //    }
    //});
}
exports.circleBezierIntersection = circleBezierIntersection;
