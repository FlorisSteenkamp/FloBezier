import { X } from "../bezier-bezier-intersection/x.js";
/**
 * Returns the intersection range (given as 2 intersections (`X`s)) where the
 * endpoints of the two given *algebraically identical* curves
 * overlap (provided they overlap, else an empty array is returned).
 *
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. identical except possibly for endpoints)
 *
 * * **precondition**: not all bezier control points collinear
 *
 * @param psA an order 1,2 or 3 bezier curve
 * @param psB another bezier curve
 *
 * @internal but still exported for backwards compatibility
 */
declare function getEndpointIntersections(psA: number[][], psB: number[][], orderAlreadyReduced?: boolean): X[];
export { getEndpointIntersections };
