/**
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * * intermediate calculations are done (and the final result returned in)
 * double-double precision
 *
 * @param ps an order 2 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @internal
 */
declare function getFootpointPoly2Dd(ps: number[][], p: number[]): number[][];
export { getFootpointPoly2Dd };
