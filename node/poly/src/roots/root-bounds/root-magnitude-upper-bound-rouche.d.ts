/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem with
 * k = n.
 *
 * This function is fast but the bound is not tight.
 * @param p a polynomial.
 */
declare function rootMagnitudeUpperBound_rouche(p: number[]): number;
export { rootMagnitudeUpperBound_rouche };
