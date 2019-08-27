
import { getTangentPolyFromPoint } from "./get-tangent-poly-from-point";
import { evaluate } from "./evaluate/evaluate";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRoots } from "flo-poly";


function closestPointOnBezier(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; } {

    let poly = getTangentPolyFromPoint(ps, p);

    let ts = allRoots(poly, 0, 1);

    ts.push(0);
    ts.push(1); 

    let ev = evaluate(ps);
    let ps_ = ts.map(t => ({ p: ev(t), t }));

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minP: { p: number[], t: number } = undefined;
    ps_.forEach(p_ => {
        let d = squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            minP = p_;
        }
    });

    return minP;
}


export { closestPointOnBezier }
