/**
 * Returns the result of multiplies a polynomial by a constant in double
 * precision.
 *
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]
 * ```
 *
 * @doc
 */
declare function multiplyByConst(c: number, p: number[]): number[];
export { multiplyByConst };
