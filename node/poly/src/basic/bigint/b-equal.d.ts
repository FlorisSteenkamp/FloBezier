/**
 * Returns true if two polynomials are exactly equal by comparing coefficients,
 * false otherwise.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @example
 * ```typescript
 * bEqual([1n,2n,3n,4n], [1n,2n,3n,4n]);   //=> true
 * bEqual([1n,2n,3n,4n], [1n,2n,3n,4n,5n]); //=> false
 * ```
 *
 * @doc
 */
declare function bEqual(a: bigint[], b: bigint[]): boolean;
export { bEqual };
