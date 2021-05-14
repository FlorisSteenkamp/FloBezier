/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve.
 *
 * The algorithm employed is state-of-the-art and uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * the bezier curve's parameter `t` values are retuned
 * * * **precondition:** the coordinates of the given bezier curves must be
 * 47-bit aligned
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the t values of the bezier curve (provided
 * the precondition is met).
 *
 * @param circle
 * @param ps
 *
 * @doc mdx
 */
declare function circleBezierIntersection(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): {
    t: number;
    p: number[];
}[];
export { circleBezierIntersection };
