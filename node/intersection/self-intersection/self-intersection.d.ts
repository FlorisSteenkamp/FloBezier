/**
 * Returns the self-intersection t values of the given bezier curve if it
 * exists and if both t-values are in [0,1], else returns undefined.
 * * **precondition**: max bit-aligned bitlength: 47
 * * only cubic (or higher order) bezier curves have self-intersections
 * * see http://www.mare.ee/indrek/misc/2d.pdf
 * * the returned t values are within 1 ulp accurate
 * @param ps A cubic bezier curve.
 */
declare function bezierSelfIntersection(ps: number[][]): number[];
/**
 * Returns the result of converting a floating point expansion to a
 * double-double.
 */
export { bezierSelfIntersection };
