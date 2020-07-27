/**
 * Returns the number of sign changes in the polynomial coefficents
 * when ordered in descending order; zeros are ignored.
 *
 * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * See https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs
 * @param p a polynomial
 * @example
 * signChanges([1,2,-3,0,0,3,-1]); //=> 3
 */
declare function signChanges(p: number[]): number;
/**
 * Returns the number of sign changes in the polynomial coefficents
 * when ordered in descending order; zeros are ignored.
 *
 * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable
 * exponent, then the number of positive roots of the polynomial is
 * either equal to the number of sign differences between consecutive
 * nonzero coefficients, or is less than it by an even number. Multiple
 * roots of the same value are counted separately."
 *
 * See https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs
 * @param p a polynomial
 * @example
 * signChanges([[1],[2],[-3],[0],[0],[3],[-1]]); //=> 3
 */
declare function expSignChanges(p: number[][]): number;
export { signChanges, expSignChanges };
