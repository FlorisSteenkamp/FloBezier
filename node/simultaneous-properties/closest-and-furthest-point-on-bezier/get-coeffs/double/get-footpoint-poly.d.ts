/**
 * Returns a polynomial in 1 variable whose roots are the parameter values of
 * the foot points on the given bezier curve of the given point.
 *
 * The returned polynomial coefficients are given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 * @param p
 */
declare function getFootpointPoly(ps: number[][], p: number[]): number[];
export { getFootpointPoly };
