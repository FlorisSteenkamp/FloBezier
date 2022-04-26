import { X } from './x.js';
/**
 * Returns an array of intersections between two bezier curves up to cubic order
 * (i.e. points, linear, quadratic or cubic bezier curves (i.e. order 0,1,2 or 3
 * curves).
 *
 * The algorithm employed uses advanced techniques such as floating point error
 * bounding, adaptive multi-precision floating point arithmetic, pre-filtering
 * of easy cases, certified root finding and algebraic implicitization of the
 * curves in order to find *guaranteed* accurate results.
 *
 * * this algorithm is mathematically guaranteed accurate to within
 * `4 * Number.EPSILON` in the returned `t` parameter values of the bezier
 * curves (bar underflow/overflow)
 *
 * * the returned intersections are *ordered* by `t` parameter value of the
 * first bezier curve
 * * if the two curves have an infinite number of intersections then the
 * intersection of the endpoints of each curve with the other is returned
 * instead (and the intersection `kind` property will equal `5`)
 *
 * * each intersection in the returned array of intersections is an object with
 * the following properties (see the type [[X]]`):
 *      * `p`: point of intersection (calculated from the guaranteed root interval)
 *      * `t1`: first bezier curve's parameter `t` value (calculated from the guaranteed root interval)
 *      * `t2`: second bezier curve's parameter `t` value (calculated from the guaranteed root interval)
 *      * `kind`: kind of intersection (see [[X]] for details)
 *      * `ri1`: first bezier curve's root interval guaranteed to contain the
 *               correct `t` value in the form `{ tS, tE, multiplicity }`,
 *               where `tS` and `tE` are the start and end of the interval
 *      * `ri2`: second bezier curve's root interval guaranteed to contain the
 *               correct `t` value in the form `{ tS, tE, multiplicity }`,
 *               where `tS` and `tE` are the start and end of the interval
 *      * `box`: small box that is guaranteed to contain the intersection
 *               (calculated from the guaranteed root interval)
 *
 * @param ps1 an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ps2 an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function bezierBezierIntersection(ps1: number[][], ps2: number[][]): X[];
export { bezierBezierIntersection };
