import type { Iteration } from './iteration';
/**
 * Returns 0, 1 or 2 new narrowed ranges of possible intersections based on the
 * given current iteration's ranges.
 *
 * * helper function to the geometric interval bezier-bezier intersection
 * algorithm
 *
 * @param F the bezier curve that should be fat line bounded
 * @param G the bezier curve that should be geometric interval bounded
 *
 * @internal
 */
declare function checkIntersectionInRanges(iter: Iteration): Iteration[];
export { checkIntersectionInRanges };
