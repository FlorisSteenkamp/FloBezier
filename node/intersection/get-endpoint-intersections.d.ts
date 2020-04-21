import { RootInterval } from "flo-poly/node/roots/multi-with-err-bound/root-interval";
/**
 * Returns the t pairs where the endpoints of the two given same-k-family curves
 * overlap.
 * * **precondition**: the two given curves must be in the same k-family.
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * @param minD an error bound given as a distance
 */
declare function getEndpointIntersections(ps1: number[][], ps2: number[][], minD: number): RootInterval[][];
export { getEndpointIntersections };
