/**
 * Returns a cubic bezier curve of the given order with a zero tangent (as a
 * vector) at t = 0.5 (i.e. a 'cusp').
 * @param p0 the bezier start point
 * @param pz the point at which the vanishing tangent should occur
 * @param pE the bezier end point
 */
declare function generateCuspAtHalf3(p0: number[], pz: number[], pE: number[]): number[][];
export { generateCuspAtHalf3 };
