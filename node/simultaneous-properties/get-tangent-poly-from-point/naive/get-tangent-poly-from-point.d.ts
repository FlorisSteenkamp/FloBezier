/**
 * Returns the polynomial whose roots are all the t values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at t is tangent to the bezier at t.
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p
 */
declare function getTangentPolyFromPoint(ps: number[][], p: number[]): number[];
export { getTangentPolyFromPoint };
