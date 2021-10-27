/**
 * Returns the result of differentiating the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bDifferentiate([5n, 4n, 3n, 2n, 1n]); //=> [20n, 12n, 6n, 2n]
 * ```
 *
 * @doc
 */
declare function bDifferentiate(p: bigint[]): bigint[];
export { bDifferentiate };
