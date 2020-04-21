/**
 * Returns the approximate Bernstein basis representation of a line, quadratic
 * or cubic bezier's power bases.
 *
 * @param cs An order 1, 2 or 3 parametric curve in power bases with the
 * x-coordinate coefficients given first as an array representing the polynomial
 * in the parameter from highest to lowest order, e.g. [[1,2,3,4], [5,6,7,8]]
 * represents a cubic parametric curve.
 */
declare function fromPowerBases(cs: number[][]): number[][];
export { fromPowerBases };
