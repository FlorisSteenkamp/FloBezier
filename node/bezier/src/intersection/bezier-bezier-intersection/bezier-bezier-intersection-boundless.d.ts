import { RootInterval } from "flo-poly";
/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier
 * curves without limiting the `t` value in [0,1], i.e. `t ∈ [-∞,+∞]`.
 *
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * * the second bezier curve's parameter `t` values are retuned
 *
 * * **precondition:** TODO underflow / overflow
 * * **precondition:** cubics are really cubics, etc. TODO
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
declare function bezierBezierIntersectionBoundless(ps1: number[][], ps2: number[][]): RootInterval[] | undefined;
export { bezierBezierIntersectionBoundless };
