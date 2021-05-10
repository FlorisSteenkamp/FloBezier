/**
 * Returns an axis-aligned bounding box of the given order 1, 2 or 3 bezier
 * curve given as an array of 2 points, e.g. `[[1,2], [3,4]]`.
 *
 * * **certified:** the box is guaranteed to engulf the given bezier curve.
 *
 * * returns the axis-aligned bounding box in the form `[[minX, minY], [maxX, maxY]`
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getBoundingBox(ps: number[][]): number[][];
export { getBoundingBox };
