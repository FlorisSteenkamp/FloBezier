/**
 * Returns the Bernstein basis representation of a line, quadratic or cubic
 * bezier given its power bases.
 *
 * * **non-exact** (see implementation under what conditions the result
 * would be exact)
 *
 * @param cs An order 1, 2 or 3 parametric curve in power bases with the
 * x-coordinate coefficients given first (as an array representing the
 * polynomial from highest to lowest power coefficient), e.g. `[[1,2,3,4],
 * [5,6,7,8]]` represents a cubic parametric curve given by
 * x(t) = x^3 + 2x^2 + 3x^3 + 4x^4, y(t) = 5y^3 + 6y^2 + 7y + 8.
 */
declare function fromPowerBases(cs: number[][]): number[][];
export { fromPowerBases };
