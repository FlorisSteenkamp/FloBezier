/**
 * Returns `true` if the given point is on the given quadratic bezier curve where
 * the parameter `t` is allowed to extend to ±infinity, i.e. `t` is an element of
 * `[-∞, +∞]`, `false` otherwise.
 *
 * @param ps a quadratic bezier curve
 * @param p a point with coordinates given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions; if only double precision coordinates need to be provided then
 * wrap them in a one element array, e.g. for a point with `x` and `y` coordinates
 * of `1` and `2` set `p === [[1],[2]]`.
 *
 * @internal
 */
declare function isPointOnBezierExtension2(ps: number[][], p: number[][]): boolean;
export { isPointOnBezierExtension2 };
