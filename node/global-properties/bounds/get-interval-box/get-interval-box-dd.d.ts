/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire
 * given bezier curve from `t1` to `t2`. The returned box is given as an array
 * of points in double-double precision, e.g. `[[[0,1],[0,1]], [[0,2],[0,2]]]`.
 *
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
 * * **precondition:** 49-bit aligned bezier coordinates
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, given in double-double
 * precision, e.g. [[0,0.11], [0,0.12]]. (Use [[getIntervalBox]] instead for
 * double precision)
 *
 * @doc mdx
 */
declare function getIntervalBoxDd(ps: number[][], ts: number[][]): number[][][];
export { getIntervalBoxDd };
