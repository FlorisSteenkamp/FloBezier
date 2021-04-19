import { isPointOnBezierExtension } from "./is-point-on-bezier-extension";
import { evalDeCasteljau } from "../local-properties-at-t/t-to-xy/eval-de-casteljau";


/**
 * * TODO - bitlength calculation below is wrong due to evaluation.
 * 
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions turn them into the same curve. This algorithm is robust if the
 * preconditions are met. 
 * * probably better to use the bezierBezierIntersection function and see if it
 * returns undefined which is the case iff the two beziers are in the same 
 * k-family.
 * * **Precondition**: bezier control points must be grid-aligned
 * * **Precondition**: max bit-length of each bezier's control points PLUS 4 
 * (due to power basis conversion that can add 4 bits) PLUS 1 (due to testing of 
 * t values at 1, 2, 4, 8, ...) must be < 53, therefore the max bitlength === 48.
 *
 * @param ps1 A bezier curve
 * @param ps2 Another bezier curve
 * 
 * @doc
 */
function areBeziersInSameKFamily(
        ps1: number[][], 
        ps2: number[][]) {

    // Get ten points on the first bezier or its extension. Ten, since there is
    // max 9 intersections between two cubic bezier curves; 
    // cubic x cubic -> 3 x 3 according to Bezout's Theorem. Also, make each
    // parametric t-value an integer power of two to keep the bitlength a 
    // minimum (1 in this case). Don't use 1 either since it could be likely
    // two beziers share an endpoint by design causing the algorithm to do an
    // additional check and run slower.
    let ps = [0.03125, 0.0625, 0.125, 0.25, 0.5, 2, 4, 8, 16, 32].map(t => evalDeCasteljau(ps1,t));

    for (let p of ps) {
        if (!isPointOnBezierExtension(ps2, p)) {
            return false;
        }
    } 

    return true;
}


export { areBeziersInSameKFamily }
