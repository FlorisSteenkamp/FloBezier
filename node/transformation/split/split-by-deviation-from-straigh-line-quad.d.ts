/**
 * Split the given quadratic bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is guaranteed to deviate less
 * than `maxD` from a straigh line.
 *
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param maxD
 */
declare function splitByDeviationFromStraighLine_Quad(ps: number[][], maxD: number): number[];
export { splitByDeviationFromStraighLine_Quad };
