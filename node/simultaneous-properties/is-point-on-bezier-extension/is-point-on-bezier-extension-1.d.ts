/**
 * Returns `true` if the given point is on the given line where
 * the parameter `t` is allowed to extend to ±infinity, i.e. `t` is an
 * element of `[-∞, +∞]`, `false` otherwise.
 *
 * * there are alternative implementations to this function, e.g. ccw, etc;
 * it is kept for symmetry with the order 2 and 3 implementations.
 *
 * @param ps a linear bezier curve (a line)
 * @param p a point with coordinates given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions; if only double precision coordinates need to be provided then
 * wrap them in a one element array, e.g. for a point with `x` and `y` coordinates
 * of `1` and `2` set `p === [[1],[2]]`.
 *
 * @internal
 */
declare function isPointOnBezierExtension1(ps: number[][], p: number[][]): boolean;
export { isPointOnBezierExtension1 };
