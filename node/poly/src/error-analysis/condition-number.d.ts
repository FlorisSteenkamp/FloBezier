/**
 * Returns an accurate estimate (K === 4 => double-double-double-double
 * precision) of the condition number of the given polynomial when evaluated at
 * a given point.
 *
 * * **for testing purposes**
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare function conditionNumber(p: number[], x: number): number;
export { conditionNumber };
