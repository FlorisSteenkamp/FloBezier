/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval (a,b) of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRootsInRange(p,-20,-11);  //=> 0
 * bNumRootsInRange(p,-11,-9);   //=> 1
 * bNumRootsInRange(p,-11,3.5);  //=> 3
 * bNumRootsInRange(p,-11,5);    //=> 4
 * ```
 *
 * @doc
 */
declare function bNumRootsInRange(p: bigint[], a: bigint, b: bigint): number;
export { bNumRootsInRange };
