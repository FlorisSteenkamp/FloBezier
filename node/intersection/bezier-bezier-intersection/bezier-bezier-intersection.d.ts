import type { X } from './x.js';
/**
 * Returns the intersection between two bezier curves up to cubic order (i.e.
 * points, linear, quadratic or cubic bezier curves (i.e. order 0, 1, 2 or 3
 * curves).
 *
 * The algorithm employed uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed*
 * accurate results.
 *
 * TODO - make sure below points are correct (add to tests)
 * * if the two curves have an infinite number of intersections `undefined` is
 * returned
 * * TODO the second bezier curve's parameter `t` values are returned; call [[getOtherTs]] to
 * get the first bezier's `t` values.
 * // TODO
 * * * **precondition:** the coordinates of the given bezier curves must be
 * such that underflow / overflow does not occur
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the t values of the *second* bezier curve (provided
 * the precondition is met).
 *
 * @param ps
 *
 * @doc mdx
 */
declare function bezierBezierIntersection(ps1: number[][], ps2: number[][]): X[][];
export { bezierBezierIntersection };
