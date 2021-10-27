/**
 * If the highest power coefficient of the given polynomial is 0 then
 * removeLeadingZeros can be called to remove all such highest terms so that
 * the returned array is a valid presentation of a polynomial.
 *
 * @param p a polynomial whose leading zeros should be removed
 *
 * @example
 * ```typescript
 * removeLeadingZeros([1e-18, 1e-10, 1e-1]); //=> [1e-18, 1e-10, 1e-1]
 * removeLeadingZeros([0, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 * ```
 *
 * @doc
 */
declare function removeLeadingZeros(p: number[]): number[];
export { removeLeadingZeros };
