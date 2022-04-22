import { X } from './x.js';
/**
 * Returns the intersection between two bezier curves up to cubic order (i.e.
 * points, linear, quadratic or cubic bezier curves (i.e. order 0,1,2 or 3
 * curves).
 *
 * The algorithm employed uses advanced techniques such as floating point error
 * bounding, adaptive multi-precision floating point arithmetic, pre-filtering
 * of easy cases, certified root finding and algebraic implicitization of the
 * curves in order to find *guaranteed* accurate results.
 *
 * * the returned intersections are *ordered* by `t` parameter value of the
 * first bezier curve
 * * if the two curves have an infinite number of intersections then the
 * intersection of the endpoints of each curve with the other is returned,
 * except in the extreme case of a curve degenerating to a point in which case
 * the intersection `t` value is returned (if any) having `tS === 0`
 * and `tE === 1`
 *
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the `t` values of the bezier curves (bar
 * underflow/overflow)
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
declare function bezierBezierIntersection(ps1: number[][], ps2: number[][]): X[];
export { bezierBezierIntersection };
