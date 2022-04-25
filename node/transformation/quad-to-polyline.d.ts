/**
 * Transforms the given quadratic bezier into a polyline approximation to within
 * a given tolerance and returns the result.
 *
 * @param ps an quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tolerance a tolerance given as the maximum Hausdorff distance allowed
 * between the polyline and the bezier curve
 *
 * @doc
 */
declare function quadToPolyline(ps: number[][], tolerance: number): number[][];
export { quadToPolyline };
