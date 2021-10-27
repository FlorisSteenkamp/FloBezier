/**
 * Returns the exact result (bar underflow / overflow) of subtracting the
 * second polynomial from the first (both with coefficients given as Shewchuk
 * floating point expansions); (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as Shewchuk floating point expansions
 * from highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @example
 * ```typescript
 * eSubtract([[2],[3]],[[4],[4]]); //=> [[-2], [-1]]
 * ```
 *
 * @doc
 */
declare function eSubtract(p1: number[][], p2: number[][]): number[][];
export { eSubtract };
