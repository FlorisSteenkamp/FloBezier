/**
 * Split the given order 0,1,2 or 3 bezier curve into pieces (given as an
 * array of parameter `t` values) such that each piece is guaranteed to
 * deviate less than `maxD` from a straight line (the line segment connecting
 * the piece's endpoints).
 *
 * * useful e.g. for flattening a bezier curve into a polyline within a given
 * tolerance
 * * points and lines are returned as a single piece, i.e. `[0,1]`
 * * see also [[splitByDeviationFromStraightLine_Quad]] and
 * [[splitByDeviationFromStraightLine_Cubic]]
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param maxD the maximum allowed deviation of each piece from a straight line
 *
 * @doc mdx
 */
declare function splitByDeviationFromStraightLine(ps: number[][], maxD: number): number[];
export { splitByDeviationFromStraightLine };
