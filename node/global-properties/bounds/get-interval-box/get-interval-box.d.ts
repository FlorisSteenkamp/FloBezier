/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire
 * given bezier curve from t1 to t2. The returned box is given as an array
 * of points in double precision, e.g. `[[[1],[1]], [[2],[2]]]`.
 *
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
 * * **precondition:** 49-bit aligned coordinates (inherited from
 * evalDeCasteljauWithErr - can easily be relaxed)
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 *
 * @doc mdx
 */
declare function getIntervalBox(ps: number[][], ts: number[]): number[][];
export { getIntervalBox };
