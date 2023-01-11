/**
 * Returns an accurate approximation of the bending energy of the given bezier
 * curve.
 *
 * @param maxCurviness defaults to 1.125
 * @param gaussOrder defaults to 4
 * @param ps a cubic bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function getBendingEnergy(ps: number[][], maxCurviness?: number, gaussOrder?: 4 | 16 | 64): number;
export { getBendingEnergy };
