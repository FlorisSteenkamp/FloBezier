import { evalDeCasteljau } from "../local-properties-at-t/t-to-xy/double/eval-de-casteljau";
import { isPointOnBezierExtension } from "./is-point-on-bezier-extension/is-point-on-bezier-extension";


// TODO - bitlength calculation below is wrong due to evaluation.
// TODO - this algorithm is wrong - it actually checks for infinite number
// of intersections (which includes same-k-family cases) - could implicitizion provide a solution??
// TODO - also consider order 1 and 2 (and 0?) cases
/**
 * 
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions is the same curve. This algorithm is robust if the preconditions 
 * are met. 
 * 
 * * probably better to use the bezierBezierIntersection function and see if it
 * returns undefined which is the case iff the two beziers are in the same 
 * k-family.
 * * **precondition:** bezier control points must be grid-aligned
 * * **precondition:** max bit-length of each bezier's control points PLUS 4 
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
    // 'cubic x cubic -> 3 x 3' according to Bezout's Theorem. Also, make each
    // parametric t-value an integer power of two to keep the bitlength a 
    // minimum (1 in this case).
    let ps = [0.0625, 0.125, 0.25, 0.5, 1, 2, 4, 8, 16, 32].map(
        t => evalDeCasteljau(ps1, t)
    );

    for (let p of ps) {
        if (!isPointOnBezierExtension(ps2, p)) {
            return false;
        }
    } 

    return true;
}


export { areBeziersInSameKFamily }
