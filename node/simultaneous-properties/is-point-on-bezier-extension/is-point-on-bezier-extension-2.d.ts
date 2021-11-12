/**
 * Returns true if the given point is on the given quadratic bezier curve where
 * the parameter t is allowed to extend to +-infinity, i.e. t is an element of
 * [-inf, +inf], false otherwise.
 *
 * * **Precondition:** TODO - underflow/overflow
 *
 * @param ps a quadratic bezier curve
 * @param p A point with coordinates given as Shewchuk expansions. If only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as 1 and 2 set
 * `p === [[1],[2]]`. TODO - link to Schewchuk
 *
 * @internal
 */
declare function isPointOnBezierExtension2(ps: number[][], p: number[][]): boolean;
export { isPointOnBezierExtension2 };
