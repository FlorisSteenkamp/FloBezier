/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire
 * given bezier curve from t1 to t2. The returned box is given as a pair
 * of points (the box corners) in double precision, e.g. `[[1,1], [2,2]]`.
 *
 * * **precondition:** (to satisfy guarantee) t1 < t2
 * * **precondition:** (to satisfy guarantee) t1,t2 >= 0 && t1,t2 <= 1
 *
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 *
 * @doc mdx
 */
declare function getIntervalBox(ps: number[][], ts: number[]): number[][];
export { getIntervalBox };
