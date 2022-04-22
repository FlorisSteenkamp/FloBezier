import { X } from '../bezier-bezier-intersection/x.js';
/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve.
 *
 * The algorithm employed uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * the bezier curve's parameter `t` values are retuned
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the t values of the bezier curve
 *
 * @param circle
 * @param ps
 *
 * @doc mdx
 */
declare function circleBezierIntersection(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): X[];
export { circleBezierIntersection };
