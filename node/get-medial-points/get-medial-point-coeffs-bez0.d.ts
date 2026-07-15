/**
 * Returns polynomial coefficients for ray parameter values `t`, bezier
 * parameter values `s` and medial points for points `q(t)` and b(s) (an order
 * 0 bezier curve) that satisfy the medial condition with respect to `p` and `ps`:
 *
 * Let `p` be a fixed point in the plane.
 * Let `v` be a direction vector defining the ray `q(t) = p + t⋅v`.
 * Let `ps` be an order 0 bezier curve (a single point).
 *
 * * `q(t)` is equidistant from `p` and the nearest point on `ps`
 * * that common distance is locally minimal among such candidates
 *
 * In other words, this function returns candidate ray parameters for the
 * sought medial point(s). Selecting physically valid solutions (if needed)
 * is done by the caller or by a later stage of this routine.
 *
 * @param p base point
 * @param v ray direction from `p`
 * @param ps order 0 bezier control point
 * given as an array of control points, e.g. `[[1,2]]`
 */
declare function getMedialPointCoeffsBez0(p: number[], v: number[], ps: number[][]): {
    A: number[];
    B: number[];
};
export { getMedialPointCoeffsBez0 };
