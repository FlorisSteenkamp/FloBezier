/**
 * Returns the polynomial whose roots are all the t values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at t is tangent to the bezier at t.
 *
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p
 *
 * @doc
 */
/**
 *
 * @param ps
 * @param p
 *
 * ```
 * return [
 *      t5_,  // <9>
 *      t4_,  // <10>
 *      t3_,  // <10>
 *      t2_,  // <10>
 *      t1_,  // <9>
 *      t0_   // <7>
 * ];
 * ```
 */
declare function getClosestOnBezier3FromPointErrorCounters(ps: number[][], p: number[]): number[];
/**
 *
 * @param ps
 * @param p
 * ```
 * return [
 *      t3_,  // <7>
 *      t2_,  // <8>
 *      t1_,  // <7>
 *      t0_   // <5>
 * ];
 * ```
 */
declare function getClosestOnBezier2FromPointErrorCounters(ps: number[][], p: number[]): number[];
/**
 *
 * @param ps
 * @param p
 *
 * ```
 * return [
 *     t1,  // <6>
 *     t0   // <5>
 * ];
 * ```
 */
declare function getClosestOnBezier1FromPointErrorCounters(ps: number[][], p: number[]): number[];
export { getClosestOnBezier3FromPointErrorCounters, getClosestOnBezier2FromPointErrorCounters, getClosestOnBezier1FromPointErrorCounters };
