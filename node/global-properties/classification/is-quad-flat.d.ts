/**
 * Returns `true` if the given quadratic bezier curve is acute (see `isQuadObtuse`)
 * and can be approximated with a line segment with maximum Hausdorff distance
 * <= the given tolerance, `false` otherwise.
 *
 * @param ps a quadratic bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6]]`
 * @param tolerance a maximum Hausdorff distance tolerance; defaults to `2**-10`
 * of the maximum coordinate of the given bezier curve
 *
 * @internal
 */
declare function isQuadFlat(ps: number[][], tolerance?: number | undefined): boolean;
export { isQuadFlat };
