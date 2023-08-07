import { allRootsCertified, eHorner, eDifferentiate } from "flo-poly";
import { eDiff, eMult, eSign } from 'big-float-ts';
import { getAbsCurvatureExtremaPolysE } from "./get-abs-curvature-extrema-polys-e.js";
import { isCollinear } from "../global-properties/classification/is-collinear.js";
import { isCubicReallyQuad } from "../global-properties/classification/is-cubic-really-quad.js";
import { cubicToQuadratic } from "../transformation/degree-or-type/cubic-to-quadratic.js";
import { getCurvatureExtremaQuadraticPolyE } from './get-curvature-extrema-quadratic-poly-e.js';
import { getCurvatureExtremaQuadraticPolyDd } from "../get-curvature-extrema-dd/get-curvature-extrema-quadratic-poly-dd.js";
import { getAbsCurvatureExtremaPolysDd } from "../get-curvature-extrema-dd/get-abs-curvature-extrema-polys-dd.js";
const { abs } = Math;
/**
 * Returns the parameter `t` values (in `[0,1]`) of local minimum / maximum
 * absolute curvature for the given bezier curve.
 *
 * If there are an infinite number of such `t` values (such as is the case for a
 * line), an empty array is returned.
 *
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)'s excellent
 * answer on math.stackexchange
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
// TODO - slow - currently just for testing!
function getCurvatureExtremaE(ps) {
    if (isCollinear(ps)) {
        return { minima: [], maxima: [], inflections: [] };
    }
    if (ps.length === 4 && isCubicReallyQuad(ps)) {
        ps = cubicToQuadratic(ps);
    }
    if (ps.length === 3) {
        const polyDd = getCurvatureExtremaQuadraticPolyDd(ps);
        const polyE = getCurvatureExtremaQuadraticPolyE(ps);
        const polyErr = polyE.map((c, i) => {
            const cDd = polyDd[i];
            const d = eDiff(c, cDd);
            return abs(d[d.length - 1]);
        });
        // const maxima = allRoots(poly, 0, 1);
        const maxima = allRootsCertified(polyDd, 0, 1, polyErr, () => polyE);
        return {
            minima: [],
            maxima: maxima.map(r => (r.tS + r.tE) / 2),
            inflections: []
        };
    }
    const polys = getAbsCurvatureExtremaPolysE(ps);
    const p1 = polys.inflectionPoly;
    const p2 = polys.otherExtremaPoly;
    const polysDd = getAbsCurvatureExtremaPolysDd(ps);
    const p1Dd = polysDd.inflectionPoly;
    const p2Dd = polysDd.otherExtremaPoly;
    const polyErr1 = p1.map((c, i) => {
        const cDd = p1Dd[i];
        const d = eDiff(c, cDd);
        return abs(d[d.length - 1]);
    });
    const polyErr2 = p2.map((c, i) => {
        const cDd = p2Dd[i];
        const d = eDiff(c, cDd);
        return abs(d[d.length - 1]);
    });
    // if (p2Dd.length || polyErr1)
    const ts = allRootsCertified(p2Dd, 0, 1, polyErr2, () => p2);
    // get second derivative (using product rule) to see if it is a local 
    // minimum or maximum, i.e. diff(p1*p2) = p1'*p2 + p1*p2' = dp1*p2 + p1*dp2
    // = p1*dp2 (since dp1*p2 === 0)
    const dp2 = eDifferentiate(p2);
    const minima = [];
    const maxima = [];
    for (let i = 0; i < ts.length; i++) {
        const t = (ts[i].tS + ts[i].tE) / 2;
        const dp2_ = eHorner(dp2, t);
        const p1_ = eHorner(p1, t);
        const secondDerivative = eMult(p1_, dp2_);
        if (eSign(secondDerivative) >= 0) {
            minima.push(t);
        }
        else {
            maxima.push(t);
        }
    }
    const inflections = allRootsCertified(p1Dd, 0, 1, polyErr1, () => p1)
        .map(r => (r.tS + r.tE) / 2);
    return { minima, maxima, inflections };
}
export { getCurvatureExtremaE };
//# sourceMappingURL=get-curvature-extrema-e.js.map