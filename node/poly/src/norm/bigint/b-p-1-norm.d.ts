/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of bigints.
 *
 * * if the array of bigints represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of bigints
 *
 * @doc
 */
declare function bP1Norm(p: bigint[]): bigint;
export { bP1Norm };
