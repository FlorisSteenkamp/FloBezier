/**
 * TODO
 * Returns the signed area between the given bezier curve and the line between
 * its 1st and last control points.
 *
 * * precondition: the curve must have monotone curvature (this condition would
 * be easy to relax if need be)
 *
 * @param ps
 */
declare function area(ps: number[][]): number;
export { area };
