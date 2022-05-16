/**
 * Returns a bezier curve that starts and ends at the given `t` parameters.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @doc mdx
 */
declare function fromTo(ps: number[][], tS: number, tE: number): number[][];
export { fromTo };
