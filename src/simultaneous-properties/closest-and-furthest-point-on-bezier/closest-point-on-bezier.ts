import { getFootpointPoly3 } from "./get-coeffs/double/get-footpoint-poly-3.js";
import { getFootpointPoly2 } from "./get-coeffs/double/get-footpoint-poly-2.js";
import { getFootpointPoly1 } from "./get-coeffs/double/get-footpoint-poly-1.js";
import { distanceBetween, squaredDistanceBetween } from "flo-vector2d";
import { allRoots } from "flo-poly";
import { evalDeCasteljau } from "../../local-properties-at-t/evaluate/double/eval-de-casteljau.js";

const sqrt = Math.sqrt;


/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given 
 * bezier curve to the given point (with `t ∈ [0,1]`).
 * 
 * * intermediate calculations are done in double precision
 * * in some cases there can be more than one closest point, e.g. on the axis
 * of symmetry of a parabola (in which case only one of the points are returned)
 * * the returned point(s) are objects with the following properties:
 *     * `p`: the closest point on the bezier curve
 *     * `t`: the parameter value of the point on the bezier curve
 *     * `d`: the closest distance between the point and the bezier curve
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 * 
 * @doc mdx
 */
function closestPointOnBezier(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; d: number; } {

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

    const ts = allRoots(poly, 0, 1);

    ts.push(0);
    ts.push(1); 

    // Get point with minimum distance
    let minDSquared = Number.POSITIVE_INFINITY;
    let minP: { p: number[], t: number, d: number } | undefined = undefined;
    for (const t of ts) {
        const p_ = evalDeCasteljau(ps,t);
        const dSquared = squaredDistanceBetween(p_, p);
        if (dSquared < minDSquared) {
            minDSquared = dSquared;
            minP = { p: p_, t, d: sqrt(dSquared) };
        }
    }

    // keep TypeScript happy; `minP` cannot be `undefined` here
    return minP!;
}


export { closestPointOnBezier }
