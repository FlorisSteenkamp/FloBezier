/**
 * Returns the result of adding two polynomials in double precision.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * add([1,2,3],[3,4]); //=> [1,5,7]
 * ```
 *
 * @doc
 */
declare function add(p1: number[], p2: number[]): number[];
export { add };
