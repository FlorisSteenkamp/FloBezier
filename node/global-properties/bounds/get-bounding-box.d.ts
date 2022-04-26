/**
 * Returns a tight axis-aligned bounding box of the given bezier curve.
 *
 * * **certified**: the box is guaranteed to engulf the given bezier curve.
 *
 * * returns the box in the form `[[minX, minY], [maxX, maxY]`
 *
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getBoundingBox(ps: number[][]): number[][];
export { getBoundingBox };
