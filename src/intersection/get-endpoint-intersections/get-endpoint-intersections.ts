import { createRootExact } from "flo-poly";
import type { X } from "../bezier-bezier-intersection/x.js";
import { getIntervalBox } from "../../global-properties/bounds/get-interval-box/get-interval-box.js";
import { reduceOrderIfPossible } from "../../transformation/reduce-order-if-possible.js";
import { tFromXY } from "../../local-properties-to-t/t-from-xy.js";
import { getEndpointIntersections3 } from './get-endpoint-intersections3.js';
import { getEndpointIntersections2 } from './get-endpoint-intersections2.js';


// TODO - docs - test with boolean op
/**
 * Returns the intersection range (given as 2 pairs of intersections (`X`s) with 
 * the intersection of `ps1` always the first entry of each pair) where the 
 * endpoints of the two given *algebraically identical* curves 
 * overlap (provided they overlap).
 * 
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. identical except possibly for endpoints). This can be checked for by 
 * calling [[areBeziersInSameKFamily]]. TODO
 * 
 * * **precondition**: not all bezier control points collinear
 * 
 * @param psA an order 1,2 or 3 bezier curve
 * @param psB another bezier curve
 * 
 * @internal
 */
function getEndpointIntersections(
        psA: number[][],
        psB: number[][],
        orderAlreadyReduced = false): X[][] {

    if (!orderAlreadyReduced) {
        psA = reduceOrderIfPossible(psA);
        psB = reduceOrderIfPossible(psB);
    }

    // `psB.length` should equal `psB.length` (due to precondition)

    if (psA.length === 4) {
        return getEndpointIntersections3(psA, psB);
    }

    if (psA.length === 3) {
        return getEndpointIntersections2(psA, psB);
    }

    if (psA.length === 2) {
        // TODO
        // return getEndpointIntersections1(psA, psB);
    }

    throw new Error('The given bezier curve must be of order 1,2 or 3.');
}


export { getEndpointIntersections }
