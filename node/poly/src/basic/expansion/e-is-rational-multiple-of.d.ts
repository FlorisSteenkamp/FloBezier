/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
declare function eIsRationalMultipleOf(a: number[][], b: number[][]): boolean;
export { eIsRationalMultipleOf };
