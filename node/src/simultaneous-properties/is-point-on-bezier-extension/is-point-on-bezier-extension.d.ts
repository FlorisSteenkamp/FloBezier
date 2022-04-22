/**
 * Returns `true` if the given point is on the given bezier curve where the
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of
 * `(-∞, +∞)`, `false` otherwise.
 *
 * @param ps a bezier curve
 * @param p a point with coordinates given as Shewchuk expansions; if only
 * double precision coordinates need to be provided then wrap it in an array,
 * e.g. for a point with x and y coordinates given as `1` and `2` set
 * `p === [[1],[2]]`
 */
declare function isPointOnBezierExtension(ps: number[][], p: number[][]): boolean;
export { isPointOnBezierExtension };
