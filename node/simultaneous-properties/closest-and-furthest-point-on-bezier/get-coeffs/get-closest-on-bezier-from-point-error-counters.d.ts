/**
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier at `t`.
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
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
 *
 * @internal
 */
declare function getClosestOnBezier3FromPointErrorCounters(ps: number[][], p: number[]): number[];
/**
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier at `t`.
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param p a point, e.g. `[1,2]`
 * ```
 * return [
 *      t3_,  // <7>
 *      t2_,  // <8>
 *      t1_,  // <7>
 *      t0_   // <5>
 * ];
 * ```
 *
 * @internal
 */
declare function getClosestOnBezier2FromPointErrorCounters(ps: number[][], p: number[]): number[];
/**
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier at `t`.
 *
 * @param ps a linear bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param p a point, e.g. `[1,2]`
 *
 * ```
 * return [
 *     t1,  // <6>
 *     t0   // <5>
 * ];
 * ```
 *
 * @internal
 */
declare function getClosestOnBezier1FromPointErrorCounters(ps: number[][], p: number[]): number[];
export { getClosestOnBezier3FromPointErrorCounters, getClosestOnBezier2FromPointErrorCounters, getClosestOnBezier1FromPointErrorCounters };
