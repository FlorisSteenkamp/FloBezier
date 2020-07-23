/**
 * Returns a cubic bezier curve with a zero tangent (as a vector) at
 * t = 0.5 (i.e. a 'cusp').
 * * **non-exact:** the cusp is not necessarily *exactly* at the given point,
 * nor does the tangent vector necessarily vanish *exactly*.
 * @param p0 the bezier start point
 * @param pz the point at which the vanishing tangent should occur
 * @param pE the bezier end point
 */
declare function generateCuspAtHalf3(p0: number[], pz: number[], pE: number[]): number[][];
export { generateCuspAtHalf3 };
