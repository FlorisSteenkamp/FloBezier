/**
 * For the given bernstein basis cubic bezier curve return a new cubic bezier
 * curve with its initial and terminal speeds modified.
 *
 * * only the 2nd and 3rd control points are modified
 * * call the original curve `A` and the returned curve `B` then it will be
 * true that `A[0] === B[0]` and `A[3] === B[3]`
 *
 * @param ps an order 3 (cubic) bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function setCubicSpeeds(ps: number[][], s0: number, s1: number): number[][];
export { setCubicSpeeds };
