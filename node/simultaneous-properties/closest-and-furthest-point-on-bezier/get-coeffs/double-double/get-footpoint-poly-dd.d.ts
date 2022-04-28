/**
 * Returns the polynomial whose roots are all the `t` parameter values on the
 * given bezier curve such that the line from the given point to the point on
 * the bezier curve evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * * intermediate calculations are done (and the final result returned in)
 * double-double precision
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 */
declare function getFootpointPolyDd(ps: number[][], p: number[]): number[][];
export { getFootpointPolyDd };
