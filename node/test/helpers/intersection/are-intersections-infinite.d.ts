/**
 * Returns true if the infinte extensions of two bezier curves (by extending the
 * `t` parameter value from `-∞` to `+∞`) are identical (when they are seen as
 * point sets), e.g. `[[1,1],[2,2]]` and `[[3,3],[4,4]]` would be considered
 * identical.
 *
 * * **note**: if the two bezier curves are not in general position then there
 * are many examples wherein they can have an infinite number of intersections
 * yet not be identical in the sense of this function, e.g. `[[1,1],[2,2]]` and
 * `[[1.5,1.5],[3,3],[0,0]]`
 *
 * * **precondition:** underflow / overflow
 *
 * @param ps1 a bezier curve
 * @param ps2 another bezier curve
 *
 * @doc
 */
declare function areIntersectionsInfinte(ps1: number[][], ps2: number[][]): boolean;
export { areIntersectionsInfinte };
