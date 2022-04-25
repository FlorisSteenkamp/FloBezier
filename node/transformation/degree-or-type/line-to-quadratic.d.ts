/**
 * Returns a quadratic bezier from the given line with evenly spaced control points.
 *
 * @param ps a 2d line represented by two points, e.g. `[[1,2],[3,4]]`
 *
 * @internal
 */
declare function lineToQuadratic(ps: number[][]): number[][];
export { lineToQuadratic };
