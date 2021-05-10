/**
 * Returns a **non-certified**, **rotated**, **tight** bounding box of the given
 * order 1, 2 or 3 bezier curve as four ordered points of a rotated rectangle.
 * (Each point is given as `[x,y]`)
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getBoundingBoxTight(ps: number[][]): number[][];
export { getBoundingBoxTight };
