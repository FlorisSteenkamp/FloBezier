import { getFootpointPoly3 } from "./get-coeffs/double/get-footpoint-poly-3.js";
import { getFootpointPoly2 } from "./get-coeffs/double/get-footpoint-poly-2.js";
import { getFootpointPoly1 } from "./get-coeffs/double/get-footpoint-poly-1.js";
import { distanceBetween, squaredDistanceBetween } from "flo-vector2d";
import { allRoots } from "flo-poly";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js";

const sqrt = Math.sqrt;


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
