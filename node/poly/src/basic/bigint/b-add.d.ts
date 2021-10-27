/**
 * Returns the result of adding two polynomials with bigint coefficients.
 *
 * @param p1 a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * bAdd([1n,2n,3n],[3n,4n]); //=> [1n,5n,7n]
 * ```
 *
 * @doc
 */
declare function bAdd(p1: bigint[], p2: bigint[]): bigint[];
export { bAdd };
