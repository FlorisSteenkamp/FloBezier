/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of bigints / coefficients.
 *
 * @param p an array of bigints; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
declare function bPInfNorm(p: bigint[]): bigint;
export { bPInfNorm };
