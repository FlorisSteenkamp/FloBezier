import type { Iteration } from './iteration.js';
/**
 * Returns 0, 1 or 2 new narrowed ranges of possible intersections based on the
 * given current iteration's ranges.
 *
 * * helper function to the geometric interval bezier-bezier intersection
 * algorithm
 *
 * @param iter
 *
 * @internal
 */
declare function checkIntersectionInRanges(iter: Iteration): Iteration[];
export { checkIntersectionInRanges };
