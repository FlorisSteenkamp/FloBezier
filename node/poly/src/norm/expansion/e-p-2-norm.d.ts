/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of Shewchuk
 * expansions (with intermediate calculations (and the final result) done in
 * double precision).
 *
 * @param p an array of Shewchuk expansions; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
declare function eP2Norm(p: number[][]): number;
export { eP2Norm };
