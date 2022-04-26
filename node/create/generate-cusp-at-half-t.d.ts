/**
 * Returns the cubic bezier curve control points with a zero tangent vector
 * (i.e. `[0,0]`) at `t = 0.5` (i.e. a 'cusp') at the given point with
 * given starting and ending control points.
 * * **non-exact**: due to floating-point round-off the cusp is not
 * necessarily *exactly* at the given point, nor does the tangent vector
 * necessarily vanish *exactly*.
 *
 * @param p0 the bezier start point
 * @param pz the point at which the vanishing tangent should occur
 * @param pE the bezier end point
 *
 * @doc mdx
 */
declare function generateCuspAtHalf3(p0: number[], pz: number[], pE: number[]): number[][];
export { generateCuspAtHalf3 };
