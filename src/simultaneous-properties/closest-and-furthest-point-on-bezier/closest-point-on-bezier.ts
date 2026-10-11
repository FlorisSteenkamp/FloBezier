import { roots } from "flo-poly";
import { getFootpointPoly3 } from "./get-coeffs/double/get-footpoint-poly-3.js";
import { getFootpointPoly2 } from "./get-coeffs/double/get-footpoint-poly-2.js";
import { getFootpointPoly1 } from "./get-coeffs/double/get-footpoint-poly-1.js";
import { distanceBetween, squaredDistanceBetween } from "flo-vector2d";
import { evalDeCasteljau } from "../../local-properties-at-t/evaluate/double/eval-de-casteljau.js";

const { sqrt } = Math;


/** 
 * A closest point on a bezier curve to some other point, see 
 * [[closestPointOnBezier]].
 */
interface ClosestPoint {
    /** the closest point on the bezier curve */
    p: number[];
    /** the parameter value of the point on the bezier curve */
    t: number;
    /** the closest distance between the point and the bezier curve */
    d: number;
}


/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given 
 * bezier curve to the given point (with `t ∈ [0,1]`).
 * 
 * * intermediate calculations are done in double precision
 * * in some cases there can be more than one closest point, e.g. on the axis
 * of symmetry of a parabola (in which case only one of the points are returned)
 * * if `inclEndpoints` is `false` then `undefined` will be returned in case
 * there is no closest point not on an endpoint (the return type only includes
 * `undefined` in this case, i.e. if `inclEndpoints` is omitted or `true` the
 * return type is non-nullable)
 * * the returned point(s) are objects with the following properties:
 *     * `p`: the closest point on the bezier curve
 *     * `t`: the parameter value of the point on the bezier curve
 *     * `d`: the closest distance between the point and the bezier curve
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 * @param inclEndpoints
 * 
 * @doc mdx
 */
function closestPointOnBezier(ps: number[][], p: number[]): ClosestPoint;
function closestPointOnBezier(ps: number[][], p: number[], inclEndpoints: true): ClosestPoint;
function closestPointOnBezier(ps: number[][], p: number[], inclEndpoints: false): ClosestPoint | undefined;
function closestPointOnBezier(ps: number[][], p: number[], inclEndpoints: boolean): ClosestPoint | undefined;
function closestPointOnBezier(
        ps: number[][], 
        p: number[],
        inclEndpoints = true): ClosestPoint | undefined {

    let poly: number[];
    if (ps.length === 4) {
        poly = getFootpointPoly3(ps, p);
    } else if (ps.length === 3) {
        poly = getFootpointPoly2(ps, p);
    } else if (ps.length === 2) {
        poly = getFootpointPoly1(ps, p);
    } else if (ps.length === 1) {
        return { p: ps[0], t: 0, d: distanceBetween(ps[0], p) }
    } else {
        throw new Error('The given bezier curve must be of order <= 3.');
    }

    const ts = roots(poly, 0, 1)?.map(r => r.t) || [];

    if (inclEndpoints) {
        ts.push(0);
        ts.push(1);
    }

    // Get point with minimum distance
    let minDSquared = Infinity;
    let minP: ClosestPoint | undefined = undefined;
    for (const t of ts) {
        const p_ = evalDeCasteljau(ps,t);
        const dSquared = squaredDistanceBetween(p_, p);
        if (dSquared < minDSquared) {
            minDSquared = dSquared;
            minP = { p: p_, t, d: sqrt(dSquared) };
        }
    }

    // `minP` can only be `undefined` if `inclEndpoints === false` and there is
    // no interior foot point (as documented)
    return minP;
}


export { closestPointOnBezier }
export type { ClosestPoint }
