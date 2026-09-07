/**
 * Returns the unit normal vector of a bezier curve at a specific given
 * parameter value `t` (the `tangent` at that point rotated by 90 degrees and
 * normalized).
 *
 * * uses double precision calculations internally
 * * returns `undefined` if the tangent vanishes at `t` (e.g. at a cusp) since
 * the curve has no well-defined direction there
 *
 * @param ps a linear, quadratic or cubic bezier curve given by its ordered
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 *
 * @doc mdx
 */
declare function unitNormal(ps: number[][], t: number): number[] | undefined;
export { unitNormal };
