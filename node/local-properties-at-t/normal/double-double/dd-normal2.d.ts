/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 *
 * * uses double-double precision calculations internally
 * * unlike [[ddNormal]], if the tangent vanishes at `t` (e.g. at a cusp or
 * where control points coincide) a normal is still returned (based on the
 * direction the curve leaves the point in; or arrives at the point in if
 * `t === 1`); only if all control points coincide is `[0,0]` returned
 * * at `t === 0` and `t === 1` degeneracy is decided by *exact* equality of
 * the end control points and the fallback direction is calculated exactly;
 * at an interior cusp the fallback direction is calculated in double
 * precision only (by splitting the curve at `t`)
 * * equals [[ddTangent2]] rotated by 90 degrees
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 *
 * @doc mdx
 */
declare function ddNormal2(ps: number[][], t: number): number[][];
export { ddNormal2 };
