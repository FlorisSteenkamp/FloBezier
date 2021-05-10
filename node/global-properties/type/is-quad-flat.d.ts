/**
 * Returns true if the given quadratic bezier curve is acute (see isQuadObtuse)
 * and can be approximated with a line segment with maximum Hausdorff distance
 * <= the given tolerance.
 *
 * @param ps A quadratic bezier curve.
 *
 * @internal
 */
declare function isQuadFlat(ps: number[][], tolerance: number): boolean;
export { isQuadFlat };
