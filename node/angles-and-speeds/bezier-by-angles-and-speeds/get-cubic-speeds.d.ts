/**
 * For the given bernstein basis cubic bezier curve return its initial and
 * terminal speeds in the form `[s0,s1]`.
 *
 * @param ps an order 3 (cubic) bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function getCubicSpeeds(ps: number[][]): number[];
export { getCubicSpeeds };
