import { X } from "../bezier-bezier-intersection/x.js";
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
declare function getEndpointIntersections(psA: number[][], psB: number[][], orderAlreadyReduced?: boolean): X[];
export { getEndpointIntersections };
