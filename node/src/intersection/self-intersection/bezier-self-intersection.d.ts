/**
 * Returns the self-intersection parameter `t` values of the given cubic bezier
 * curve if they exist and are in the range `[0,1]`, else returns `undefined`.
 *
 * * only cubic (or higher order) bezier curves have self-intersections
 * * * **precondition:** the coordinates of the given bezier curve must be
 * 47-bit aligned
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the `t` values (provided the precondition is met).
 *
 * @param ps A cubic bezier curve.
 *
 * @doc mdx
 */
declare function bezierSelfIntersection(ps: number[][]): number[];
export { bezierSelfIntersection };
