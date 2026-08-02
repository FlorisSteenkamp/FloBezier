/**
 * Returns a tight axis-aligned bounding box of the given bezier curve's control
 * points.
 *
 * * the box is not a tight bound of the bezier curve itself
 * * the result is returned as `[[minX, minY], [maxX, maxY]]`
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getControlPointBox(ps: number[][]): number[][];
export { getControlPointBox };
