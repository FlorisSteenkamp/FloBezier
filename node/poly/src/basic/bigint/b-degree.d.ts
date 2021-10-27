/**
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 *
 * @param p a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bDegree([9n,8n,7n,6n,5n,4n,3n,2n,1n]); //=> 8
 * ```
 *
 * @doc
 */
declare function bDegree(p: bigint[]): number;
export { bDegree };
