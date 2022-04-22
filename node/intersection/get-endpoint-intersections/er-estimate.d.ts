/**
 * Estimates the result of the given expansion rational.
 *
 * * the sign of the returned result is guaranteed to be correct
 * * the result is guaranteed accurate to within 2 ulps
 *
 * @param a
 *
 * @internal
 */
declare function erEstimate(a: number[][]): number;
export { erEstimate };
