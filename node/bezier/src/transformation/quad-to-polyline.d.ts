/**
 * Transforms the given quadratic bezier into a polyline approximation to within
 * a given tolerance.
 * @param ps A quadratic bezier curve given as an array of points.
 */
declare function quadToPolyline(ps: number[][], tolerance: number): number[][];
export { quadToPolyline };
