/**
 * Returns the polynomial whose roots are all the t values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at t is tangent to the bezier at t.
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * the resulting coefficients are guaranteed to have max bitlength 106 (so it
 * can fit in a double-double)
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p
 */
declare function getTangentPolyFromPointExact(ps: number[][], p: number[]): number[][];
export { getTangentPolyFromPointExact };
