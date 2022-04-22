/**
 * Returns `true` if the given quadratic bezier curve is acute (see `isQuadObtuse`)
 * and can be approximated with a line segment with maximum Hausdorff distance
 * <= the given tolerance.
 *
 * @param ps a quadratic bezier curve
 * @param tolerance a maximum Hausdorff distance tolerance; defaults to `2**-10`
 * of the maximum coordinate of the given bezier curve
 *
 * @internal
 */
declare function isQuadFlat(ps: number[][], tolerance?: number | undefined): boolean;
export { isQuadFlat };
