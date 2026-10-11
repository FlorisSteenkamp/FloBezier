/**
 * Split the given quadratic bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is guaranteed to deviate less
 * than `maxD` from a straight line.
 *
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param maxD the maximum allowed deviation of each piece from a straight line
 */
declare function splitByDeviationFromStraightLine_Quad(ps: number[][], maxD: number): number[];
export { splitByDeviationFromStraightLine_Quad };
