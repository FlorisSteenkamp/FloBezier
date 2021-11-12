/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a cubic bezier curve
 *
 * ```
 * // (1 x γ) the error counters for double precision!
 * // (6 x γγ) the error counters for double-double precision!
 * return [
 *      t6_,  // <8>
 *      t5_,  // <8>
 *      t4_,  // <9>
 *      t3_,  // <9>
 *      t2_,  // <8>
 *      t1_,  // <5>
 *      t0_   // <5>
 * ];
 * ```
 *
 * @internal
 */
declare function getCoeffsCubicErrorCounters(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a quadratic bezier curve
 *
 * @internal
 *
 * ```
 * return [
 *      t4_,  // <6>
 *      t3_,  // <5>
 *      t2_,  // <6>
 *      t1_,  // <4>
 *      t0_   // <4>
 * ];
 * ```
 */
declare function getCoeffsQuadraticErrorCounters(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
/**
 * * **precondition** TODO - underflow/overflow conditions
 *
 * @param circle a circle
 * @param ps a linear bezier curve
 *
 * @internal
 *
 * ```
 * return [
 *      t2_,  // <4>
 *      t1_,  // <4>
 *      t0_   // <4>
 * ];
 * ```
 */
declare function getCoeffsLinearErrorCounters(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): number[];
export { getCoeffsCubicErrorCounters, getCoeffsQuadraticErrorCounters, getCoeffsLinearErrorCounters };
