import { RootInterval } from 'flo-poly/node/roots/multi-with-err-bound/root-interval';
import { X } from './x';
/**
 * Returns the intersection polynomial coefficients between two bezier curves
 * unless all coefficients are exactly zero in which case undefined is returned
 * so that is easy to check if the two curves are actually identical
 * algebraically, i.e. if we ignore endpoints.
 * @param ps1
 * @param ps2
 */
declare function getIntersectionCoeffs(ps1: number[][], ps2: number[][]): {
    coeffs: number[][];
    errBound: number[];
    getPsExact: () => number[][][];
};
/**
 * Returns the intersection between two linear, quadratic or cubic bezier curves
 * in any combination.
 * * Returns **undefined** only in the case that the two beziers are in the same
 * k-family.
 * * The second bezier's t values are retuned. Call getOtherTs to get the first
 * bezier's t values.
 * * this algorithm is nearly always accurate to 1 u in the t values for the **second**
 * bezier (except if there are several extremely close intersections) and
 * a few u accurate for the second t values.
 * * Before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with isReallyQuadratic), else convert
 * them (cubics can be converted with toQuadraticFromCubic)
 * See http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
declare function bezierBezierIntersectionImplicit(ps1: number[][], ps2: number[][]): RootInterval[];
/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve. If the t
 * values given is undefined, undefined is returned; if it is an empty array,
 * an empty array is returned. If the t values given is not an empty array and
 * it turns out the curves are in the same k family then undefined is returned.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
declare function getOtherTs(ps1: number[][], ps2: number[][], ts2: RootInterval[]): X[][];
export { getIntersectionCoeffs, bezierBezierIntersectionImplicit, getOtherTs };
