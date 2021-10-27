/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of numbers / coefficients (with intermediate
 * calculations done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
declare function pInfNorm(p: number[]): number;
export { pInfNorm };
