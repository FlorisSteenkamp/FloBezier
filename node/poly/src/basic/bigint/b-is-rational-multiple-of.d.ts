/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
declare function bIsRationalMultipleOf(a: bigint[], b: bigint[]): boolean;
export { bIsRationalMultipleOf };
