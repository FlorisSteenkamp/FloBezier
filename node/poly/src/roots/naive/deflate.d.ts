/**
 * Deflates the given polynomial *approximately* by removing a factor (x - r),
 * where r is a root of the polynomial.
 *
 * * **non-exact:** the deflation is done in double precision - it is not
 * possible to deflate a root exactly in most cases and round-off will thus
 * occur - use only if approximate deflation is acceptable
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param root a root of the polynomial.
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * deflate([1, -5, 8, -4], 2);  //=> [1, -3, 2]
 * deflate([1, -3, 2], 2);      //=> [1,-1]
 * deflate([1, -1], 1);         //=> [1]
 * ```
 *
 * @doc
 */
declare function deflate(p: number[], root: number): number[];
export { deflate };
