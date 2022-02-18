import { classify } from "../global-properties/classification/classify.js";
import { fromTo3 } from "../transformation/split/from-to/from-to-3.js";
import { toQuadraticFromCubic } from "../transformation/degree-or-type/to-quadratic-from-cubic.js";
import { getAbsAreaBetween } from './get-abs-area-between.js';
import { bezierSelfIntersection } from '../intersection/self-intersection/bezier-self-intersection.js';
/**
 * Approximate the given cubic bezier curve (up to the given tolerance) by
 * fitting an array of ordered (by `t` value) piecewise bezier curves
 * (of quadratic order or less).
 *
 * * the start and end point of each approximating curve lies on the cubic
 * curve and the the tangents of each approximating curve coincide with that of
 * the cubic at each such point
 *
 * @param ps the cubic bezier curve to approximate
 * @param tolerance tolerance given as the maximum total absolute area difference
 * between the two curves
 */
function fitQuadsToCubic(ps, tolerance) {
    const { collinear, realOrder, nodeType } = classify(ps);
    // if all points collinear or a line (or point)
    if (collinear || realOrder <= 1) {
        // return a quad that's a line between the first and last points
        // return [ps[0], [(ps[0][0] + ps[3][0])/2, (ps[0][1] + ps[3][1])/2], ps[3]];
        return [[ps[0], ps[3]]];
    }
    if (realOrder === 2) {
        // already a quadratic in disguise
        // It is not possible that `toQuadraticFromCubic(ps)` be undefined here
        // since the `real order` is exactly 2 and the control points are *not*
        // collinear.
        return [toQuadraticFromCubic(ps)];
    }
    const stack = [];
    // if endpoints coincide
    if (ps[0][0] === ps[3][0] && ps[0][1] === ps[3][1]) {
        stack.push([0, 0.5], [0.5, 1]);
    }
    else if (nodeType === 'cusp') {
        const t = bezierSelfIntersection(ps)[0];
        stack.push([0, t], [t, 1]); // split at cusp
    }
    else if (nodeType === 'crunode') {
        const ts = bezierSelfIntersection(ps);
        if (ts.length > 1) {
            stack.push([0, ts[0]], [ts[0], ts[1]], [ts[1], 1]); // split at intersections
        }
        else {
            // the intersection is outside the range [0,1]
            stack.push([0, 1]);
        }
    }
    else {
        stack.push([0, 1]);
    }
    const qs = [];
    while (stack.length !== 0) {
        const ts = stack.pop();
        const [tS, tE] = ts;
        /** the piece of the cubic bezier to approximate */
        const psCubic = fromTo3(ps, tS, tE).ps;
        const psQuad = toQuadraticFromCubic(psCubic);
        const spanRatio = tE - tS;
        if (psQuad === undefined ||
            spanRatio * getAbsAreaBetween(psQuad, psCubic) > tolerance) {
            const tM = (tE + tS) / 2;
            stack.push([tS, tM], [tM, tE]); // split cubic in 2 equal pieces
        }
        else {
            qs.push(psQuad);
        }
    }
    return qs.reverse();
}
export { fitQuadsToCubic };
//# sourceMappingURL=fit-quads-to-cubic.js.map