/**
 * Returns the tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific given parameter value `t`.
 *
 * * uses double precision calculations internally
 * * unlike [[tangent]], if the tangent vanishes at `t` (e.g. at a cusp or
 * where control points coincide) a tangent is still returned (based on the
 * direction the curve leaves the point in; or arrives at the point in if
 * `t === 1`); only if all control points coincide is `[0,0]` returned
 *
 * @param ps a linear, quadratic or cubic bezier curve given by its ordered
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the tangent should be evaluated
 *
 * @doc mdx
 */
declare function tangent2(ps: number[][], t: number): number[];
export { tangent2 };
