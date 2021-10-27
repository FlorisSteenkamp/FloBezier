/**
 * Returns the result of subtracting the second polynomial from the first in
 * double precision; (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of double floating point numbers
 * from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @example
 * ```typescript
 * subtract([2,3],[4,4]); //=> [-2, -1]
 * ```
 *
 * @doc
 */
declare function subtract(p1: number[], p2: number[]): number[];
export { subtract };
