"use strict";
exports.__esModule = true;
exports.getCurvatureExtrema = void 0;
var flo_poly_1 = require("flo-poly");
var get_abs_curvature_extrema_polys_js_1 = require("./get-abs-curvature-extrema-polys.js");
var is_line_js_1 = require("../global-properties/type/is-line.js");
var is_cubic_really_quad_js_1 = require("../global-properties/type/is-cubic-really-quad.js");
var to_quad_from_cubic_js_1 = require("../transformation/degree-or-type/to-quad-from-cubic.js");
/**
 * Returns the parameter `t` values (in `[0,1]`) of local minimum / maximum
 * absolute curvature for the given bezier curve.
 *
 * If there are an infinite number of such t values (such as is the case for a
 * line), an empty array is returned.
 *
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)'s excellent
 * answer on math.stackexchange
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
function getCurvatureExtrema(ps) {
    if ((0, is_line_js_1.isLine)(ps)) {
        return { minima: [], maxima: [], inflections: [] };
    }
    if (ps.length === 4 && (0, is_cubic_really_quad_js_1.isCubicReallyQuad)(ps)) {
        ps = (0, to_quad_from_cubic_js_1.toQuadraticFromCubic)(ps);
    }
    if (ps.length === 3) {
        var poly = getCurvatureExtremaQuadraticPoly(ps);
        var maxima_1 = (0, flo_poly_1.allRoots)(poly, 0, 1);
        return {
            minima: [],
            maxima: maxima_1,
            inflections: []
        };
    }
    var polys = (0, get_abs_curvature_extrema_polys_js_1.getAbsCurvatureExtremaPolys)(ps);
    var p1 = polys.inflectionPoly;
    var p2 = polys.otherExtremaPoly;
    var ts = (0, flo_poly_1.allRoots)(p2, 0, 1);
    // get second derivative (using product rule) to see if it is a local 
    // minimum or maximum, i.e. diff(p1*p2) = p1'*p2 + p1*p2' = dp1*p2 + p1*dp2
    // = p1*dp2 (since dp1*p2 === 0)
    var dp2 = (0, flo_poly_1.differentiate)(p2);
    var minima = [];
    var maxima = [];
    for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        var dp2_ = (0, flo_poly_1.Horner)(dp2, t);
        var p1_ = (0, flo_poly_1.Horner)(p1, t);
        var secondDerivative = p1_ * dp2_;
        if (secondDerivative >= 0) {
            minima.push(t);
        }
        else {
            maxima.push(t);
        }
    }
    var inflections = (0, flo_poly_1.allRoots)(p1, 0, 1);
    return { minima: minima, maxima: maxima, inflections: inflections };
}
exports.getCurvatureExtrema = getCurvatureExtrema;
/**
 * Returns the polynomial whose zero is the t value of maximum absolute
 * curvature for the given *quadratic* bezier curve.
 *
 * * **precondition:** the given parabola is not degenerate to a line
 * * **non-exact:** there is floating point roundof during calculation
 * * see e.g. [math.stackexchange](https://math.stackexchange.com/a/2971112)'s
 * answer by [KeithWM](https://math.stackexchange.com/a/2971112/130809)
 *
 * @param ps an order 2 bezier curve given as an array of control points,
 * e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
function getCurvatureExtremaQuadraticPoly(ps) {
    // Find the point of max curvature (of the parabola)
    // calculate t*
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1];
    var x10 = x1 - x0;
    var x21 = x2 - x1;
    var wx = x21 - x10;
    var y10 = y1 - y0;
    var y21 = y2 - y1;
    var wy = y21 - y10;
    var n = x0 * (wx - x1) - x1 * (x21 - x1) +
        y0 * (wy - y1) - y1 * (y21 - y1);
    var d = wx * wx + wy * wy;
    return [d, -n];
}
