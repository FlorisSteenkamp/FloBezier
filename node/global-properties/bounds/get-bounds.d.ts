/**
 * Returns an axis-aligned bounding box together with the `t` values where the
 * bounds on the bezier are reached.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getBounds(ps: number[][]): {
    ts: number[][];
    box: number[][];
};
export { getBounds };
