import { getClosestOnBezier3FromPoint } from "./get-coeffs/double/get-closest-on-bezier3-from-point";
import { getClosestOnBezier2FromPoint } from "./get-coeffs/double/get-closest-on-bezier2-from-point";
import { getClosestOnBezier1FromPoint } from "./get-coeffs/double/get-closest-on-bezier1-from-point";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRoots } from "flo-poly";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/double/eval-de-casteljau";


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
    }

    const ts = allRoots(poly, 0, 1);

    ts.push(0);
    ts.push(1); 

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minP: { p: number[], t: number } = undefined;
    for (const t of ts) {
        const p_ = evalDeCasteljau(ps,t);
        const d = squaredDistanceBetween(p_, p);
        if (d < minD) {
            minD = d;
            minP = { p: p_, t };
        }
    }

    return minP;
}


export { closestPointOnBezier }
