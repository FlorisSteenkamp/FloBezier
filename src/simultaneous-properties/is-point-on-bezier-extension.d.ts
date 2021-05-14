/**
 * Returns `true` if the given point is on the given bezier curve where the
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of
 * `(-∞, +∞)`, `false` otherwise.
 *
 * * **precondition**: `ps` and `p` must be bit-aligned with a maximum
 * bitlength of 47.
 *
 * @param ps
 * @param p
 */
declare function isPointOnBezierExtension(ps: number[][], p: number[]): boolean;
export { isPointOnBezierExtension };
