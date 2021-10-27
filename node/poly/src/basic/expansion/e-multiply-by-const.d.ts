/**
 * Returns the exact result (bar underflow / overflow) of multiplying a
 * polynomial (with coefficients given as Shewchuk floating point expansions)
 * by a constant (given as a Shewchuk floating point expansion)
 *
 * @param c a constant (given as a Shewchuk floating point expansion)
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eMultiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]
 * ```
 *
 * @doc
 */
declare function eMultiplyByConst(c: number[], p: number[][]): number[][];
export { eMultiplyByConst };
