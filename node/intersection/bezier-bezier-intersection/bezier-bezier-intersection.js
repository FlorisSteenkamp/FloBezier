import { bezierBezierIntersectionBoundless } from './bezier-bezier-intersection-boundless.js';
import { isPointOnBezierExtension } from '../../simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension.js';
import { tFromXY } from '../../local-properties-to-t/t-from-xy.js';
import { getIntervalBox } from '../../global-properties/bounds/get-interval-box/get-interval-box.js';
import { intersectBoxes } from '../../boxes/intersect-boxes.js';
import { bezierSelfIntersection } from '../self-intersection/bezier-self-intersection.js';
import { getEndpointIntersections } from '../get-endpoint-intersections.js';
import { isCollinear } from '../../global-properties/classification/is-collinear.js';
import { getXY1DdWithRunningError, getXY2DdWithRunningError, getXY3DdWithRunningError } from '../../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js';
import { getDxy2Exact, getDxy3Exact } from '../../to-power-basis/get-dxy/exact/get-dxy-exact.js';
import { getDxy2Dd, getDxy3Dd } from '../../to-power-basis/get-dxy/double-double/get-dxy-dd.js';
import { getDxy2ErrorCounters, getDxy3ErrorCounters } from '../../to-power-basis/get-dxy/get-dxy-error-counters.js';
import { allRootsCertified } from 'flo-poly';
import { γγ } from '../../error-analysis/error-analysis.js';
import { reduceOrderIfPossible } from './reduce-order-if-possible.js';
const eps = Number.EPSILON;
const eps2 = 2 * eps;
const γγ3 = γγ(3);
/**
 * Returns the intersection between two bezier curves up to cubic order (i.e.
 * points, linear, quadratic or cubic bezier curves (i.e. order 0, 1, 2 or 3
 * curves).
 *
 * The algorithm employed uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed*
 * accurate results.
 *
 * * the returned intersections are *ordered* by `t` value of the first bezier
 * curve
 * TODO - make sure below points are correct (add to tests)
 * * if the two curves have an infinite number of intersections `undefined` is
 * returned
 * * TODO the second bezier curve's parameter `t` values are returned; call [[getOtherTs]] to
 * get the first bezier's `t` values.
 * // TODO
 * * * **precondition:** the coordinates of the given bezier curves must be
 * such that underflow / overflow does not occur
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the t values of the *second* bezier curve (provided
 * the precondition is met).
 *
 * @param ps
 *
 * @doc mdx
 */
function bezierBezierIntersection(ps1, ps2) {
    ps1 = reduceOrderIfPossible(ps1);
    ps2 = reduceOrderIfPossible(ps2);
    if (ps1.length === 1 || ps2.length === 1) {
        return handlePointDegenerateCases(ps1, ps2);
    }
    const ris2 = bezierBezierIntersectionBoundless(ps1, ps2);
    if (ris2 === undefined) {
        return handleInfiniteIntersections(ps1, ps2);
    }
    if (ris2.length === 0) {
        return [];
    }
    // `ris1` are ordered by inersection `t` values of `ps1`
    const ris1 = bezierBezierIntersectionBoundless(ps2, ps1);
    if (ris1.length === 0) {
        return [];
    }
    let is1 = ris1.map(ri => getIntervalBox(ps1, [ri.tS, ri.tE]));
    let is2 = ris2.map(ri => getIntervalBox(ps2, [ri.tS, ri.tE]));
    let xPairs = [];
    for (let i = 0; i < ris1.length; i++) {
        let box1 = is1[i];
        for (let j = 0; j < ris2.length; j++) {
            let box2 = is2[j];
            let box = intersectBoxes(box1, box2);
            if (box !== undefined) {
                let x1 = { ri: ris1[i], box, kind: 1 };
                let x2 = { ri: ris2[j], box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }
    return xPairs;
}
/**
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 * * **precondition:** `bezierBezierIntersectionBoundless(ps1, ps2)` must
 * return `undefined` to represent the fact of an infinite number of
 * intersections exist
 * * **precondition:** neither bezier curve may be of order 1 (a point)
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function handleInfiniteIntersections(ps1, ps2) {
    // At this point there are an infinite number of intersections, i.e.:
    // `bezierBezierIntersectionBoundless(ps1, ps2) === undefined`
    if (isCollinear(ps1)) {
        // `ps2` must also be a line
        return handleCollinearIntersections(ps1, ps2);
    }
    const xPairs = [];
    xPairs.push(...getEndpointIntersections(ps1, ps2));
    xPairs.push(...getCoincidingSelfIntersections(ps1, ps2));
    return xPairs;
}
/**
 * Get the intersection (if it exist) that is the double-point of both given
 * algebraically identical curves if both the double-points are given for `t`
 * values in `[0,1]` for each curve.
 *
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 * * **precondition:** `bezierBezierIntersectionBoundless(ps1, ps2)` must
 * return `undefined` to represent the fact of an infinite number of
 * intersections exist
 * * **precondition:** neither curve is allowed to have all points collinear
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function getCoincidingSelfIntersections(ps1, ps2) {
    const ts1 = bezierSelfIntersection(ps1, false);
    const ts2 = bezierSelfIntersection(ps2, false);
    const len1 = ts1.length;
    const len2 = ts2.length;
    if (len1 < 1 || len2 < 1) {
        return [];
    }
    const xPairs = [];
    // this is a *very* rare case
    for (let t1 of ts1) {
        for (let t2 of ts2) {
            xPairs.push([{
                    kind: 1,
                    ri: { tS: t1 - eps2, tE: t1 + eps2, multiplicity: 1 },
                    box: getIntervalBox(ps1, [t1 - eps2, t1 + eps2])
                }, {
                    kind: 1,
                    ri: { tS: t1 - eps2, tE: t1 + eps2, multiplicity: 1 },
                    box: getIntervalBox(ps2, [t2 - eps2, t2 + eps2])
                }]);
        }
    }
    return xPairs;
}
/**
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 * * **precondition:** `bezierBezierIntersectionBoundless(ps1, ps2)` must
 * return `undefined` to represent the fact of an infinite number of
 * intersections exist
 * * **precondition:** all points (from both curves) must be collinear
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function handleCollinearIntersections(ps1, ps2) {
    // Get curve 'turn-around points' when extending `t` from negative to 
    // positive infinity.
    const ris1 = getTurnaroundPoints(ps1);
    const ris2 = getTurnaroundPoints(ps2);
    //aaa TODO
    return [];
}
/**
 * Get curve 'turn-around points' when extending `t` from negative to positive
 * infinity.
 *
 * This is a helper function and is used by [[handleCollinearIntersections]]
 * only.
 *
 * @param ps
 *
 * @internal
 */
function getTurnaroundPoints(ps) {
    // Get curve 'turn-around points' when extending `t` from negative to 
    // positive infinity.
    // Since we're already constrained to a line we only need look at either
    // `x(t)` or `y(t)`.
    // # of 'turn-around points': 
    //  * line: 0
    //  * quadratic: 0,1
    //  * cubic: 0,1 or 2
    let ris;
    if (ps.length === 4) {
        const coeffs1 = getDxy3Dd(ps)[0]; // x-coordinate only
        let [dx2_, dx1_, dx0_] = getDxy3ErrorCounters(ps)[0];
        dx2_ = 3 * γγ3 * dx2_;
        dx1_ = 2 * γγ3 * dx1_;
        dx0_ = 1 * γγ3 * dx0_;
        // keep TypeScript happy; `allRootsCertified` cannot return `undefined` here
        ris = allRootsCertified(coeffs1, 0, 1, [dx2_, dx1_, dx0_], () => getDxy3Exact(ps)[0]);
    }
    else if (ps.length === 3) {
        const coeffs1 = getDxy2Dd(ps)[0]; // x-coordinate only
        let [dx1_, dx0_] = getDxy2ErrorCounters(ps)[0];
        dx1_ = γγ3 * dx1_;
        dx0_ = 0;
        // keep TypeScript happy; `allRootsCertified` cannot return `undefined` here
        ris = allRootsCertified(coeffs1, 0, 1, [dx1_, dx0_], () => getDxy2Exact(ps)[0]);
    }
    else if (ps.length === 2 || ps.length === 1) {
        ris = []; // no 'turn-around points' possible (its a line)
    }
    else {
        throw new Error('The given bezier curve is invalid.');
    }
    // keep TypeScript happy; `ris` cannot be `undefined` here if 
    // preconditions are met
    return ris;
}
function getXYDdWithRunningError(ps) {
    if (ps.length === 4) {
        return getXY3DdWithRunningError(ps);
    }
    if (ps.length === 3) {
        return getXY2DdWithRunningError(ps);
    }
    if (ps.length === 2) {
        return {
            coeffs: getXY1DdWithRunningError(ps),
            errorBound: [[0, 0], [0, 0]]
        };
    }
}
/**
 * Handles the degenerate cases where either bezier curve is really a point and
 * returns the relevant intersections if any.
 *
 * * **precondition:** either or both bezier curves must be a point
 * * **precondition:** the bezier curves must be of lowest possible
 * representable order
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function handlePointDegenerateCases(ps1, ps2) {
    if (ps1.length === 1) {
        const p1 = ps1[0];
        const box = [p1, p1];
        if (ps2.length === 1) {
            const p2 = ps2[0];
            if (p1[0] === p2[0] && p1[1] === p2[1]) {
                // literally the same points - very degenerate
                return [
                    [
                        { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
                        { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
                    ]
                ];
            }
            return [];
        }
        if (isPointOnBezierExtension(ps2, [[p1[0]], [p1[1]]])) {
            // keep TypeScript happy; at this point `tFromXY` cannot return `undefined`
            return tFromXY(ps2, p1).map(ri => [
                { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
                { ri, kind: 6, box },
            ]);
        }
        return [];
    }
    const p2 = ps2[0];
    const box = [p2, p2];
    if (isPointOnBezierExtension(ps1, [[p2[0]], [p2[1]]])) {
        // keep TypeScript happy; at this point `tFromXY` cannot return `undefined`
        return tFromXY(ps1, p2).map(ri => [
            { ri, kind: 6, box },
            { ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }, kind: 6, box },
        ]);
    }
    return [];
}
export { bezierBezierIntersection };
//# sourceMappingURL=bezier-bezier-intersection.js.map