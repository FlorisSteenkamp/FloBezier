import { XBounds } from "./bounds.js";
/**
 * Returns tight x-coordinate bounds of the given bezier curve.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getXBoundsTight(ps: number[][]): XBounds;
export { getXBoundsTight };
