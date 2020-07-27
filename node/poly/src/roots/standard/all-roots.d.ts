/**
 * Finds an approximation to the real roots (or those within a range) of the
 * input polynomial.
 *
 * Multiple roots of even order that is close together may be missed.
 * @param p a polynomial
 * @param a lower limit of root values to be returned - defaults to -∞
 * @param b upper limit of root values to be returned - defaults to +∞
 * @example
 * allRoots([1, -10, 35, -50, 24]); //=> [1, 2.0000000000000036, 3.0000000000000067, 4]
 */
declare function allRoots(p: number[], a?: number, b?: number): number[];
export { allRoots };
