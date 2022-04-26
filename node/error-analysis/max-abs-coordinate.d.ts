/**
 * Returns the maximum absolute value of the coordinates of the control points
 * of the given bezier curve.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @internal
 */
declare function maxAbsCoordinate(ps: number[][]): number;
export { maxAbsCoordinate };
