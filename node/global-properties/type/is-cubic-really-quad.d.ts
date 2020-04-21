/**
 * Returns true if the given bezier curve is really a quadratic curve.
 * * there is no limit on the bitlength of the coefficients
 * @param ps a cubic bezier curve
 */
declare function isCubicReallyQuad(ps: number[][]): boolean;
export { isCubicReallyQuad };
