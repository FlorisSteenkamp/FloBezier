/**
 * Returns the *exact* number of *distinct* real roots in the interval (-∞,+∞)
 * of the given polynomial.
 *
 * * From Wikipedia: "In the case of a non-square-free polynomial,
 * if neither a nor b is a multiple root of p, then V(a) − V(b) is the number
 * of distinct real roots of P".
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [n1, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
declare function bNumRoots(p: bigint[]): number;
export { bNumRoots };
