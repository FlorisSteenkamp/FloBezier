/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function bAbsCoeff(p: bigint[]): bigint[];
export { bAbsCoeff };
