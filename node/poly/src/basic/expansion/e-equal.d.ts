/**
 * Returns true if two polynomials (with coefficients given as Shewchuk floating
 * point expansions) are exactly equal by comparing coefficients, false otherwise.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * eEqual([[1],[2],[3],[0,4]], [[1],[2],[3],[4]]);   //=> true
 * eEqual([[1],[2],[3],[4]], [[1],[2],[3],[4],[5]]); //=> false
 * ```
 *
 * @doc
 */
declare function eEqual(p1: number[][], p2: number[][]): boolean;
export { eEqual };
