/**
 * Returns the result of multiplies a polynomial (with bigint coefficients) by
 * a constant.
 *
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function bMultiplyByConst(c: bigint, p: bigint[]): bigint[];
export { bMultiplyByConst };
