/**
 * Transforms the given quadratic bezier into a polyline approximation to within
 * a given tolerance.
 *
 * @param ps A quadratic bezier curve given as an array of points.
 * @param tolerance a tolerance given as the maximum Hausdorff distance allowed
 * between the polyline and the bezier curve
 *
 * @doc
 */
declare function quadToPolyline(ps: number[][], tolerance: number): number[][];
export { quadToPolyline };
