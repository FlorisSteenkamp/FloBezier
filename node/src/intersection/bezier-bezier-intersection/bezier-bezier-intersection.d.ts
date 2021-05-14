import { RootInterval } from "flo-poly";
import { X } from './x';
/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier
 * curves.
 *
 * The algorithm employed is state-of-the-art and uses advanced techniques such
 * as floating point error bounding, adaptive multi-precision floating
 * point arithmetic, pre-filtering of easy cases, certified root finding and
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * if the two curves are identical algebraically (i.e. provided
 * endpoints are ignored) `undefined` is returned
 * * the second bezier curve's parameter `t` values are retuned; call [[getOtherTs]] to
 * get the first bezier's `t` values.
 * * * **precondition:** the coordinates of the given bezier curves must be
 * 47-bit aligned
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
declare function bezierBezierIntersection(ps1: number[][], ps2: number[][]): RootInterval[];
/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve. The `t`
 * values of the second curve can be found using bezierBezierIntersection
 *
 * * If the t values given is undefined, undefined is returned
 * * if it is an empty array, an empty array is returned.
 * * If the t values given is not an empty array and it turns out the curves
 * are in the same k family then undefined is returned.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
declare function getOtherTs(ps1: number[][], ps2: number[][], ts2: RootInterval[]): X[][];
export { bezierBezierIntersection, getOtherTs };
