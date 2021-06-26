import type { X } from './x';
import { bezierBezierIntersectionBoundless } from './bezier-bezier-intersection-boundless';
import { getOtherTs } from '../..';


/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier 
 * curves. 
 * 
 * The algorithm employed uses advanced techniques such 
 * as floating point error bounding, adaptive multi-precision floating 
 * point arithmetic, pre-filtering of easy cases, certified root finding and 
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * * the second bezier curve's parameter `t` values are retuned; call [[getOtherTs]] to
 * get the first bezier's `t` values.
 * // TODO
 * * * **precondition:** the coordinates of the given bezier curves must be 
 * such that underflow / overflow does not occur 
 * * this algorithm is mathematically guaranteed accurate to within 
 * `4 * Number.EPSILON` in the t values of the *second* bezier curve (provided
 * the precondition is met).
 * * before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with [[isReallyQuadratic]]), else convert
 * them (cubics can be converted with [[toQuadraticFromCubic]])
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function bezierBezierIntersection(
        ps1: number[][], 
        ps2: number[][]): X[][] {

    const rs = bezierBezierIntersectionBoundless(ps1, ps2);

    return getOtherTs(ps1, ps2, rs);
}


export { bezierBezierIntersection }
