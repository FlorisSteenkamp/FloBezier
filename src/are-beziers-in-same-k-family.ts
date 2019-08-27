
import { evaluate } from "./evaluate/evaluate";
import { isPointOnBezierExtension } from "./is-point-on-bezier-extension";


/**
 * Returns true if two beziers are in the same K-family, i.e. when their infinte
 * extensions turn them into the same curve. This algorithm is robust if the
 * preconditions are met. 
 * 
 * It would not be hard to change the algorithm to relax 
 * the preconditions to allow any two bezier curves with double-float coordinates 
 * but this would slow it down since its run-time complexity is based on the
 * bit-length of the coordinates.
 * 
 * Preconditions: 
 * * Bezier control points must be grid-aligned
 * * The max bit-length of each bezier's control points PLUS 3 (due to power
 * basis conversion that can add 3 bits) PLUS 1 (due to testing of t values at
 * 1, 2, 4, 8, ...) must be < 53, therefore the max bitlength === 49.
 *
 * @param ps1 A bezier curve
 * @param ps2 Another bezier curve
 */
function areBeziersInSameKFamily(
        ps1: number[][], 
        ps2: number[][]) {

    // TODO - Use fast filters - this is very slow without filters, especially
    // if the matrix used in isPointOnBezierExtension is ill-conditioned.

    // Get ten points on the first bezier or its extension. Ten, since there is
    // max 9 intersections between two cubic bezier curves; 
    // cubic x cubic -> 3 x 3 according to Bezout's Theorem. Also, make each
    // parametric t-value an integer power of two to keep the bitlength a 
    // minimum (1 in this case). Don't use 1 either since it could be likely
    // two beziers share an endpoint by design causing the algorithm to do an
    // additional check and run slower.
    let evaluate_ = evaluate(ps1);
    let ps = [0.03125, 0.0625, 0.125, 0.25, 0.5, 2, 4, 8, 16, 32].map(evaluate_);

    //let isSamkeKFamily = ps.every(p => isPointOnBezierExtension(ps2, p));
    for (let p of ps) {
        if (!isPointOnBezierExtension(ps2, p)) {
            return false;
        }
    } 

    //console.log('isSamkeKFamily', ps1, ps2);
    return true;
}


export { areBeziersInSameKFamily }
