import { getTangentPolyFromPoint } from "../get-tangent-poly-from-point/naive/get-tangent-poly-from-point";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRoots } from "flo-poly";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/eval-de-casteljau";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗



function closestPointOnBezier(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; } {

    const poly = getTangentPolyFromPoint(ps, p);

    const ts = allRoots(poly, 0, 1);

    ts.push(0);
    ts.push(1); 

    const ps_ = ts.map(t => ({ p: evalDeCasteljau(ps,t), t }));

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minP: { p: number[], t: number } = undefined;
    ps_.forEach(p_ => {
        const d = squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            minP = p_;
        }
    });

    return minP;
}


export { closestPointOnBezier }
