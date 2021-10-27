/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial - subject to floating point underflow / overflow of
 * intermediate calculations.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
declare function eNumRoots(p: number[][]): number;
export { eNumRoots };
