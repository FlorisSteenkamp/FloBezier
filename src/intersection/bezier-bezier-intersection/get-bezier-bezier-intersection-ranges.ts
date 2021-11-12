import type { X } from './x';
import { reduceOrderIfPossible } from './reduce-order-if-possible.js';


/**
 * Returns the paramter `t` value ranges of intersections between any two of
 * linear, quadratic or cubic bezier curves.
 * 
 * **precondition:** The given bezier curves must be known to have an infinite
 * number of intersections. This can be checked by calling 
 * [[bezierBezierIntersection]]; if `undefined` is returned then there is
 * an infinite number of intersections else there is not.
 * 
 * @param ps1 
 * @param ps2 
 */
function getBezierBezierIntersectionRanges(
        ps1: number[][], 
        ps2: number[][]): X[][] | undefined {

    ps1 = reduceOrderIfPossible(ps1);
    ps2 = reduceOrderIfPossible(ps2);

    //aaa TODO
    return;
}


export { getBezierBezierIntersectionRanges }
