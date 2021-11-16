"use strict";
exports.__esModule = true;
exports.getInflections = void 0;
var flo_poly_1 = require("flo-poly");
/**
 * Returns the given order 1, 2 or 3 bezier curve's inflection points.
 *
 * * see [Caffeine Owl](http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html)
 *
 * @param ps an order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
function getInflections(ps) {
    if (ps.length < 4) {
        // Neither lines, nor parabolas have inflection points
        return [];
    }
    var _a = ps[0], x0 = _a[0], y0 = _a[1], _b = ps[1], x1 = _b[0], y1 = _b[1], _c = ps[2], x2 = _c[0], y2 = _c[1], _d = ps[3], x3 = _d[0], y3 = _d[1];
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4
    var ax = x1 - x0;
    var ay = y1 - y0;
    var bx = x2 - x1 - ax;
    var by = y2 - y1 - ay;
    var cx = x3 - x2 - ax - (2 * bx);
    var cy = y3 - y2 - ay - (2 * by);
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
    //   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
    // We find the roots of the quadratic - a,b,c are the quadratic coefficients
    var a = bx * cy - by * cx;
    var b = ax * cy - ay * cx;
    var c = ax * by - ay * bx;
    return (0, flo_poly_1.allRoots)([a, b, c], 0, 1);
}
exports.getInflections = getInflections;
