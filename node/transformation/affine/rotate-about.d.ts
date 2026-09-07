/**
 * Returns the given bezier curve rotated anti-clockwise about the given point
 * by the given angle (in radians).
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param θ the rotation angle in radians (anti-clockwise)
 * @param center the point to rotate about, e.g. `[1,2]`
 *
 * @doc mdx
 */
declare function rotateAbout(ps: number[][], θ: number, center: number[]): number[][];
export { rotateAbout };
