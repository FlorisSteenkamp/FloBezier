import { getTangentPolyFromPoint as _getTangentPolyFromPoint } from "../../simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point";
import { squaredDistanceBetween as _squaredDistanceBetween } from "flo-vector2d";
import { allRoots as _allRoots } from "flo-poly";
import { evalDeCasteljau as _evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/eval-de-casteljau";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const getTangentPolyFromPoint = _getTangentPolyFromPoint;
const squaredDistanceBetween = _squaredDistanceBetween;
const allRoots = _allRoots;
const evalDeCasteljau = _evalDeCasteljau;


function closestPointOnBezierExclEndpoints(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; } {

    const poly = getTangentPolyFromPoint(ps, p);

    const ts = allRoots(poly, 0, 1);

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minP: { p: number[], t: number } = undefined;
    for (let i=0; i<ts.length; i++) {
        const t = ts[i];
        const pp = evalDeCasteljau(ps,t);
        const d = squaredDistanceBetween(pp, p);
        if (d < minD) {
            minD = d;
            //minP = p_;
            minP = { p: pp, t };
        }
    }

    return minP;
}


export { closestPointOnBezierExclEndpoints }
