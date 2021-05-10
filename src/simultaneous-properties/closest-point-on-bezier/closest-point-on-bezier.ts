import { getTangentPolyFromPoint } from "../get-tangent-poly-from-point/naive/get-tangent-poly-from-point";
import { getTangentPolyFromPointExact } from "../get-tangent-poly-from-point/exact/get-tangent-poly-from-point";
import { evaluate_anyBitlength_exact } from "../../local-properties-at-t/t-to-xy/any-bitlength/exact/evaluate-any-bitlength-exact";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRoots, allRootsCertified, mid } from "flo-poly";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/eval-de-casteljau";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { eEstimate } from 'big-float-ts';
const estimate = eEstimate;


/**
 * Returns the closest point on the bezier to the given point - returns the point
 * and the t value.
 * * this function also acts as an excellent inversion formula.
 * 
 * @param ps 
 * @param p 
 * 
 * @doc
 */
function closestPointOnBezierPrecise(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; } {

    let poly = getTangentPolyFromPointExact(ps, p);

    // we give ample leeway for roots outside [0,1] since roots can be some 
    // distance outside this range at extemely high curvature where the tangent
    // is very small. These can later be coerced to 0 or 1 if the distance from
    // p to the bezier is calculated to be small enough. nope, we add [0,1] below
    // as endpoints to check so no need.

    let ts = allRootsCertified(poly, 0, 1).map(mid);

    ts.push(0);
    ts.push(1);

    let ps_ = ts.map(t => ({ p: evaluate_anyBitlength_exact(ps, t).map(estimate), t }));
    //let ps_ = ts.map(t => ({ p: evalDeCasteljau(ps, t), t }));

    
    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let minT: { p: number[], t: number } = undefined;
    ps_.forEach(p_ => {
        let d = squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            minT = p_;
        }
    });

    return minT;
}


function closestPointOnBezier(
        ps: number[][], 
        p: number[]): { p: number[]; t: number; } {

    let poly = getTangentPolyFromPoint(ps, p);

    let ts = allRoots(poly, 0, 1);

    ts.push(0);
    ts.push(1); 

    let ps_ = ts.map(t => ({ p: evalDeCasteljau(ps,t), t }));

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


export { closestPointOnBezier, closestPointOnBezierPrecise }
