/**
 * Returns the tangent vector (in double-double precision not necessarily of
 * unit length) of an order 0,1,2 or 3 bezier curve at a specific given
 * parameter value `t`.
 *
 * * uses double-double precision calculations internally
 * * unlike [[ddTangent]], if the tangent vanishes at `t` (e.g. at a cusp or
 * where control points coincide) a tangent is still returned (based on the
 * direction the curve leaves the point in; or arrives at the point in if
 * `t === 1`); only if all control points coincide is `[0,0]` returned
 * * at `t === 0` and `t === 1` degeneracy is decided by *exact* equality of
 * the end control points and the fallback direction is calculated exactly;
 * at an interior cusp the fallback direction is calculated in double
 * precision only (by splitting the curve at `t`)
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 *
 * @doc mdx
 */
declare function ddTangent2(ps: number[][], t: number): number[][];
export { ddTangent2 };
