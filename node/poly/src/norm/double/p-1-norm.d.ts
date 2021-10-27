/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of numbers (with intermediate calculations done
 * in double precision).
 *
 * * if the array of numbers represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of numbers
 *
 * @doc
 */
declare function p1Norm(p: number[]): number;
export { p1Norm };
