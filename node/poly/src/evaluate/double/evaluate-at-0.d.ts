/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * evaluateAt0([3,2,99]); //=> 99
 * ```
 *
 * @doc
 */
declare function evaluateAt0(p: number[]): number;
export { evaluateAt0 };
