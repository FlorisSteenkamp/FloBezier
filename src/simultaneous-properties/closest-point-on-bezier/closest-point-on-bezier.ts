import { getClosestOnBezier3FromPoint } from "./get-coeffs/double/get-closest-on-bezier3-from-point.js";
import { getClosestOnBezier2FromPoint } from "./get-coeffs/double/get-closest-on-bezier2-from-point.js";
import { getClosestOnBezier1FromPoint } from "./get-coeffs/double/get-closest-on-bezier1-from-point.js";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRoots } from "flo-poly";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js";


function closestPointOnBezier(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; } {

    let poly: number[];
    if (ps.length === 4) {
        poly = getClosestOnBezier3FromPoint(ps, p);
    } else if (ps.length === 3) {
        poly = getClosestOnBezier2FromPoint(ps, p);
    } else if (ps.length === 2) {
        poly = getClosestOnBezier1FromPoint(ps, p);
    } else {
        // TODO - add case of degenerate point
        throw new Error('The given bezier curve is invalid.');
    }

    const ts = allRoots(poly, 0, 1);

    ts.push(0);
    ts.push(1); 

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minP: { p: number[], t: number } | undefined = undefined;
    for (const t of ts) {
        const p_ = evalDeCasteljau(ps,t);
        const d = squaredDistanceBetween(p_, p);
        if (d < minD) {
            minD = d;
            minP = { p: p_, t };
        }
    }

    // keep TypeScript happy; `minP` cannot be `undefined` here
    return minP!;
}


export { closestPointOnBezier }
