/**
 * Returns true if two polynomials are exactly equal by comparing coefficients,
 * false otherwise.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 * @example
 * ```typescript
 * equal([1,2,3,4], [1,2,3,4]);   //=> true
 * equal([1,2,3,4], [1,2,3,4,5]); //=> false
 * ```
 *
 * @doc
 */
declare function equal(p1: number[], p2: number[]): boolean;
export { equal };
