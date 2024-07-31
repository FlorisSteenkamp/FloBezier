import { classify } from "../global-properties/classification/classify.js";
import { fromTo3InclErrorBound } from "../transformation/split/from-to/from-to-3-incl-error-bound.js";
import { cubicToQuadratic } from "../transformation/degree-or-type/cubic-to-quadratic.js";
import { bezierSelfIntersection } from '../intersection/self-intersection/bezier-self-intersection.js';
import { hausdorffDistance } from '../simultaneous-properties/hausdorff-distance/hausdorff-distance.js';


/**
 * Approximate the given cubic bezier curve (up to the given tolerance) by 
 * fitting an array of ordered (by `t` value) piecewise bezier curves 
 * (of quadratic order or less).
 * 
 * * the start and end point of each approximating curve lies on the cubic 
 * curve and the the tangents of each approximating curve coincide with that of
 * the cubic at each such point
 * 
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tolerance tolerance given as the maximum hausdorff distance between
 * the two curves
 * 
 * @doc mdx
 */
function fitQuadsToCubicHausdorff(
        ps: number[][], 
        tolerance: number): number[][][] {

    if (ps.length < 4) {
        throw new Error('Only cubic bezier curves are supported by this function.');
    }

    const { collinear, realOrder, nodeType } = classify(ps);

    // if all points collinear or a line (or point)
    if (collinear || realOrder <= 1) {
        // return a quad that's a line between the first and last points
        // return [ps[0], [(ps[0][0] + ps[3][0])/2, (ps[0][1] + ps[3][1])/2], ps[3]];
        return [[ps[0],ps[3]]];
    }

    if (realOrder === 2) {
        // already a quadratic in disguise

        // It is not possible that `toQuadraticFromCubic(ps)` be undefined here
        // since the `real order` is exactly 2 and the control points are *not*
        // collinear.
        return [cubicToQuadratic(ps)!];
    }

    const stack: number[][] = [];

    // if endpoints coincide
    if (ps[0][0] === ps[3][0] && ps[0][1] === ps[3][1]) {
        stack.push([0, 0.5], [0.5,1]);
    } else if (nodeType === 'cusp') {
        const t = bezierSelfIntersection(ps)[0];
        if (t !== undefined) {
            // split at cusp IF the cusp is within [0,1]
            stack.push([0,t], [t,1]);
        } else {
            stack.push([0,1]);
        }
    } else if (nodeType === 'crunode') {
        const ts = bezierSelfIntersection(ps);
        if (ts.length > 1) {
            stack.push(
                [0, ts[0]],
                [ts[0], ts[1]],
                [ts[1], 1]
            );  // split at intersections
        } else {
            // the intersection is outside the range [0,1]
            stack.push([0,1]);
        }
    } else {
        stack.push([0,1]);
    }

    const qs: number[][][] = [];
    while (stack.length !== 0) {
        const ts = stack.pop()!;

        const [tS,tE] = ts;
        /** the piece of the cubic bezier to approximate */
        const psCubic = fromTo3InclErrorBound(ps, tS, tE).ps;
        const psQuad = cubicToQuadratic(psCubic);
        if (psQuad === undefined || 
            hausdorffDistance(psQuad, psCubic) > tolerance) {

            const tM = (tE + tS)/2;
            stack.push([tS,tM], [tM,tE]);  // split cubic in 2 equal pieces
        } else {
            qs.push(psQuad)
        }
    }
    
    return qs.reverse();
}


export { fitQuadsToCubicHausdorff }
