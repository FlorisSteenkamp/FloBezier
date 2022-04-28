/**
 * Returns `true` if the given point is on the given bezier curve where the
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of
 * `(-∞, +∞)`, `false` otherwise.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param p a point with coordinates given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions; if only double precision coordinates need to be provided then
 * wrap them in a one element array, e.g. for a point with `x` and `y` coordinates
 * of `1` and `2` set `p === [[1],[2]]`.
 */
declare function isPointOnBezierExtension(ps: number[][], p: number[][]): boolean;
export { isPointOnBezierExtension };
