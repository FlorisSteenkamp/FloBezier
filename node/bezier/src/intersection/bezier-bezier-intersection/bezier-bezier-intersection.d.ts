import type { X } from './x';
/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier
 * curves.
 *
 * The algorithm employed uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results.
 *
 * TODO
 * * in the rare case if an infinite number of intersections exist, this function
 * will return another (0 arity, i.e parameterless) function that returns the
 * intersection of the endpoints of the given beziers
 * * if the two curves have an infinite number of intersections `undefined` is returned
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
