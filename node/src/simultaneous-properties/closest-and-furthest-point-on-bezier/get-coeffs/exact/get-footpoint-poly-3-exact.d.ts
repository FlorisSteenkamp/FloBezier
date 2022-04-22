/**
 * Returns the polynomial whose roots are all the `t` values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at `t` is tangent to the bezier curve at `t`.
 *
 * @param ps
 * @param p
 */
declare function getFootpointPoly3Exact(ps: number[][], p: number[]): number[][];
export { getFootpointPoly3Exact };
