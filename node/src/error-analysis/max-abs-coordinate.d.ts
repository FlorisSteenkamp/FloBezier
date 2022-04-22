/**
 * Returns the maximum absolute value of the coordinates of the control points
 * of the given bezier curve.
 *
 * @param ps a bezier curve given by an ordered array of its control points,
 * e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
declare function maxAbsCoordinate(ps: number[][]): number;
export { maxAbsCoordinate };
