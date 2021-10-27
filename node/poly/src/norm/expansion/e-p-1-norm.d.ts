/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of Shewchuk expansions (with intermediate
 * calculations (and the final result) done in double precision).
 *
 * * if the array of expansions represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of Shewchuk expansions
 *
 * @doc
 */
declare function eP1Norm(p: number[][]): number;
export { eP1Norm };
