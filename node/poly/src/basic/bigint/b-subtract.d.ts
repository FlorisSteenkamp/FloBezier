/**
 * Returns the result of subtracting the second polynomial from the first with
 * coefficients given as bigints; (p1 - p2).
 *
 * @param a minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 * @param b subtrahend; the polynomial that will be subtracted
 *
 * @example
 * ```typescript
 * bSubtract([2n,3n],[4n,4n]); //=> [-2n, -1n]
 * ```
 *
 * @doc
 */
declare function bSubtract(a: bigint[], b: bigint[]): bigint[];
export { bSubtract };
