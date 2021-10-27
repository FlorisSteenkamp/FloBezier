/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (0,1) of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function bNumRootsIn01(p: bigint[]): number;
export { bNumRootsIn01 };
