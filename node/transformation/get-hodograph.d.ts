/**
 * Returns the hodograph of the given bezier curve.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getHodograph(ps: number[][]): number[][];
export { getHodograph };
