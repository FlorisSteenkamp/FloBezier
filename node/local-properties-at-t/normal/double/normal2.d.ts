/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 *
 * * uses double precision calculations internally
 * * unlike [[normal]], if the tangent vanishes at `t` (e.g. at a cusp or
 * where control points coincide) a normal is still returned (based on the
 * direction the curve leaves the point in; or arrives at the point in if
 * `t === 1`); only if all control points coincide is `[0,0]` returned
 * * equals [[tangent2]] rotated by 90 degrees
 *
 * @param ps a linear, quadratic or cubic bezier curve given by its ordered
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 *
 * @doc mdx
 */
declare function normal2(ps: number[][], t: number): number[];
export { normal2 };
