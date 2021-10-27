/**
 * Returns the result of evaluating the given polynomial at 1 using double
 * precision for intermediate calculations.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function evaluateAt1(p: number[]): number;
export { evaluateAt1 };
