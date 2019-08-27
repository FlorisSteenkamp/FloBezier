/**
 * Returns true if the given point is on the given bezier curve where the
 * parameter t is allowed to extend to +-infinity, i.e. t is an element of
 * [-inf, +inf], false otherwise.
 *
 * Exact: This algorithm uses exact floating point arithmetic and thus not
 * susceptible to round-off error.
 *
 * Precondition: ps and p must be grid-aligned and have a maximum bitlength
 * of 50.
 * (note: it is relatively easy to extend the algorithm to relax this condition
 * but would then run much slower)
 * (note: 53 - 3 = 50 bits due to the power representation calculation that
 * multiplies the coordinates by 1,2,3, or 6. When multiplied by 6 a coordinate
 * can move 3 bits off the grid (to the left of course)
 */
declare function isPointOnBezierExtension(ps: number[][], p: number[]): boolean;
export { isPointOnBezierExtension };
