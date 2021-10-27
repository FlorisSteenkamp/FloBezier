/**
 * Inverts the given polynomial by reversing the order of the coefficients,
 * i.e. p(x) -> x^deg(p) * p(1/x)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * invert([3,2,-5]);  // => [-5,2,3]
 * ```
 *
 * @doc
 */
declare function invert(p: number[]): number[];
export { invert };
