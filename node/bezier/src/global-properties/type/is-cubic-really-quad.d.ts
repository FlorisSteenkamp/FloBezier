/**
 * Returns true if the given cubic bezier curve is really a quadratic curve.
 *
 * * **exact:** for any bitlength of the coefficients
 *
 * @param ps a cubic bezier curve
 *
 * @doc mdx
 */
declare function isCubicReallyQuad(ps: number[][]): boolean;
export { isCubicReallyQuad };
