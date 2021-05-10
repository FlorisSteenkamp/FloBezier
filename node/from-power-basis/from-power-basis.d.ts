/**
 * Returns the Bernstein basis representation (i.e. control points) of a line,
 * quadratic or cubic bezier given its power bases.
 * * **non-exact** - due to floating-point round-off (see implementation to
 * understand under what conditions the result would be exact)
 *
 * @param cs An order 1, 2 or 3 parametric curve in power bases with the
 * x-coordinate coefficients given first (as an array representing the
 * polynomial from highest to lowest power coefficient), e.g. `[[1,2,3,4],
 * [5,6,7,8]]` represents a cubic parametric curve given by
 * `x(t) = t^3 + 2t^2 + 3t^3 + 4t^4, y(t) = 5t^3 + 6t^2 + 7t + 8`.
 *
 * @doc
 */
declare function fromPowerBasis(cs: number[][]): number[][];
export { fromPowerBasis };
