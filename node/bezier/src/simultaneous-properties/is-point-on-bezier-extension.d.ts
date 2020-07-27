/**
 * Returns true if the given point is on the given bezier curve where the
 * parameter t is allowed to extend to +-infinity, i.e. t is an element of
 * [-inf, +inf], false otherwise.
 *
 * * **precondition**: ps and p must be grid-aligned with a maximum bitlength of 47.
 * @param ps
 * @param p
 */
declare function isPointOnBezierExtension(ps: number[][], p: number[]): boolean;
export { isPointOnBezierExtension };
