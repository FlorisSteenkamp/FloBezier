/**
 * If the highest power coefficient is 0 then removeLeadingZeros can be called
 * to remove all such highest terms so that the array is a valid presentation of
 * a polynomial.
 * @param p The polynomial to be clipped.
 * @example
 * removeLeadingZeros([1e-18, 1e-10, 1e-1]); //=> [1e-18, 1e-10, 1e-1]
 * removeLeadingZeros([0, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
declare function removeLeadingZeros(p: number[]): number[];
/**
 * If the highest power coefficient is 0 then clip can be called to remove all
 * such highest terms so that the array is a valid presentation of a polynomial.
 * @param p The polynomial to be clipped.
 * @example
 * expRemoveLeadingZeros([[1e-18], [1e-10], [1e-1]]); //=> [[1e-18], [1e-10], [1e-1]]
 * expRemoveLeadingZeros([[0], [1e-10], [1e-1]]); //=> [[1e-10], [1e-1]]
 */
declare function expRemoveLeadingZeros(p: number[][]): number[][];
/**
 * If the highest power coefficient is small in the sense that the highest power
 * term has a negligible contribution (compared to the other terms) at x = 1
 * then this function can be called to remove all such highest terms. A
 * contribution of less than Number.EPSILON of the highest coefficient will be
 * considered negligible by default.
 * @param p the polynomial to be clipped.
 * @param δ the optional contribution tolerence else Number.EPSILON will be used
 * by default.
 * @example
 * approxRemoveLeadingZeros([1e-18, 1e-10, 1e-5]); //=> [1e-18, 1e-10, 1e-5]
 * approxRemoveLeadingZeros([1e-18, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
declare function approxRemoveLeadingZeros(p: number[], δ?: number): number[];
/**
 * Like expRemoveLeadingZeros, but useful when underflow might have occured
 * since this function will remove all leading zeros < 2.2250738585072014e−308
 * which is the smallest non-subnormal float.
 * @param p
 * @param δ
 */
declare function expApproxRemoveLeadingZeros(p: number[][]): number[][];
export { removeLeadingZeros, expRemoveLeadingZeros, approxRemoveLeadingZeros, expApproxRemoveLeadingZeros };
