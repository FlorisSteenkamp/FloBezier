/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem
 * with k = n.
 *
 * * fast but the bound is not very tight
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function rootMagnitudeUpperBound_rouche(p: number[]): number;
export { rootMagnitudeUpperBound_rouche };
