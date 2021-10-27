/**
 * Returns the number of sign changes in the polynomial coefficents when
 * ordered in descending order; zeros are ignored.
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * signChanges([1,2,-3,0,0,3,-1]); //=> 3
 * ```
 *
 * @doc
 */
declare function signChanges(p: number[]): number;
export { signChanges };
