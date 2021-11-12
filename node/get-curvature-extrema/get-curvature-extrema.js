import { allRoots, differentiate, Horner as evaluatePoly } from "flo-poly";
import { getAbsCurvatureExtremaPolys } from "./get-abs-curvature-extrema-polys.js";
import { isLine } from "../global-properties/type/is-line.js";
import { isCubicReallyQuad } from "../global-properties/type/is-cubic-really-quad.js";
import { toQuadraticFromCubic } from "../transformation/degree-or-type/to-quad-from-cubic.js";
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
    if (isLine(ps)) {
        return { minima: [], maxima: [], inflections: [] };
    }
    if (ps.length === 4 && isCubicReallyQuad(ps)) {
        ps = toQuadraticFromCubic(ps);
    }
    if (ps.length === 3) {
        const poly = getCurvatureExtremaQuadraticPoly(ps);
        const maxima = allRoots(poly, 0, 1);
        return {
            minima: [],
            maxima,
            inflections: []
        };
    }
    const polys = getAbsCurvatureExtremaPolys(ps);
    const p1 = polys.inflectionPoly;
    const p2 = polys.otherExtremaPoly;
    const ts = allRoots(p2, 0, 1);
    // get second derivative (using product rule) to see if it is a local 
    // minimum or maximum, i.e. diff(p1*p2) = p1'*p2 + p1*p2' = dp1*p2 + p1*dp2
    // = p1*dp2 (since dp1*p2 === 0)
    const dp2 = differentiate(p2);
    const minima = [];
    const maxima = [];
    for (let i = 0; i < ts.length; i++) {
        const t = ts[i];
        const dp2_ = evaluatePoly(dp2, t);
        const p1_ = evaluatePoly(p1, t);
        const secondDerivative = p1_ * dp2_;
        if (secondDerivative >= 0) {
            minima.push(t);
        }
        else {
            maxima.push(t);
        }
    }
    const inflections = allRoots(p1, 0, 1);
    return { minima, maxima, inflections };
}
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
    const [[x0, y0], [x1, y1], [x2, y2]] = ps;
    const x10 = x1 - x0;
    const x21 = x2 - x1;
    const wx = x21 - x10;
    const y10 = y1 - y0;
    const y21 = y2 - y1;
    const wy = y21 - y10;
    const n = x0 * (wx - x1) - x1 * (x21 - x1) +
        y0 * (wy - y1) - y1 * (y21 - y1);
    const d = wx * wx + wy * wy;
    return [d, -n];
}
export { getCurvatureExtrema };
//# sourceMappingURL=get-curvature-extrema.js.map