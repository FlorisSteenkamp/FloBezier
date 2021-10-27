/**
 * Returns the exact result (bar underflow / overflow) of adding two
 * polynomials with coefficients given as Shewchuk floating point expansions.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * eAdd([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 * ```
 *
 * @doc
 */
declare function eAdd(p1: number[][], p2: number[][]): number[][];
export { eAdd };
