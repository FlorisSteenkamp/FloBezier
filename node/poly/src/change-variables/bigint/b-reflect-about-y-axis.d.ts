/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bReflectAboutYAxis([5n, 4n, 3n, 2n, 1n]); //=> [5n, -4n, 3n, -2n, 1n]
 * ```
 *
 * @doc
 */
declare function bReflectAboutYAxis(p: bigint[]): bigint[];
export { bReflectAboutYAxis };
