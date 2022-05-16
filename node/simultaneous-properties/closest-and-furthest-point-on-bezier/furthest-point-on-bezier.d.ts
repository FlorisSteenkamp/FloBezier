/**
 * Returns the furthest point(s) (and parameter `t` value(s)) on the given
 * bezier curve to the given point (with `t ∈ [0,1]`).
 *
 * * intermediate calculations are done in double precision
 * * in some cases there can be more than one furthest point, e.g. on parts of
 * the axis of symmetry of a parabola (in which case only one of the points are returned)
 * * the returned point(s) are objects with the following properties:
 *     * `p`: the furthest point on the bezier curve
 *     * `t`: the parameter value of the point on the bezier curve
 *     * `d`: the furthest distance between the point and the bezier curve
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @doc mdx
 */
declare function furthestPointOnBezier(ps: number[][], p: number[]): {
    p: number[];
    t: number;
    d: number;
};
export { furthestPointOnBezier };
