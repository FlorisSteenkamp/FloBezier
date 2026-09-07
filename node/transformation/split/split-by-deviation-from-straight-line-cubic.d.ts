/**
 * Split the given cubic bezier curve into pieces (given as an array of
 * parameter `t` values) such that each piece is guaranteed to deviate less
 * than `maxD` from a straigh line.
 *
 * * a crude method is employed (for efficiency) by noting that the hausdorff
 * distance between a cubic and the line segment connecting its endpoints is at
 * most 3/4 the distance of the max distance between any control point and the
 * line segment if the control points are on the same side of the line segment
 * and at most 4/9 if they are on opposite sides AND (in both cases) the cubic
 * is not obtuse, i.e. the inner control points are not outside the strip formed
 * by the two lines passing through the endpoint control points normal to the
 * line segment connecting the endpoint control points.
 *
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param maxD
 */
declare function splitByDeviationFromStraighLine_Cubic(ps: number[][], maxD: number): number[];
export { splitByDeviationFromStraighLine_Cubic };
