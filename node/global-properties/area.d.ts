/**
 * Returns the signed area between the given bezier curve and the line between
 * its 1st and last control points.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
declare function area(ps: number[][]): number;
export { area };
