/**
 * Returns the exact result (bar underflow / overflow) of evaluating a
 * univariate polynomial at a point given as a Shewchuk expansion using
 * Horner's method - the result is returned as a Shewchuk expansion.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
declare function eeHorner(p: number[][], x: number[]): number[];
export { eeHorner };
