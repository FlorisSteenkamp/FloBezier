/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 * ```
 *
 * @doc
 */
declare function eReflectAboutYAxis(p: number[][]): number[][];
export { eReflectAboutYAxis };
