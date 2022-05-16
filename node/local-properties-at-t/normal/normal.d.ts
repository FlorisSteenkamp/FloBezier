/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier curve given by its ordered
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 *
 * @doc mdx
 */
declare function normal(ps: number[][], t: number): number[];
export { normal };
