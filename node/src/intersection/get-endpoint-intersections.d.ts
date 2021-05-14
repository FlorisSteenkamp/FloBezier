import { RootInterval } from "flo-poly";
/**
 * Returns the parameter `t` values where the endpoints of the two
 * given *algebraically identical* curves overlap.
 *
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. in the same k-family, in other words identical except possibly for
 * endpoints).
 *
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * @param minD an error bound given as a distance
 *
 * @doc mdx
 */
declare function getEndpointIntersections(ps1: number[][], ps2: number[][], minD: number): RootInterval[][];
export { getEndpointIntersections };
