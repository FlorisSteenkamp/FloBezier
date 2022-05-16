/**
 * Transforms the given quadratic bezier curve into a polyline approximation to
 * within a given tolerance and returns the result.
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tolerance defaults to `2**-10` of the maximum coordinate of the given
 * bezier curve; a tolerance given as the maximum Hausdorff distance allowed
 * between the polyline and the bezier curve
 *
 * @doc mdx
 */
declare function quadraticToPolyline(ps: number[][], tolerance?: number): number[][];
export { quadraticToPolyline };
