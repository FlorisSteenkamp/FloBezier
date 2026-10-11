/**
 * A closest point on a bezier curve to some other point, see
 * [[closestPointOnBezier]].
 */
interface ClosestPoint {
    /** the closest point on the bezier curve */
    p: number[];
    /** the parameter value of the point on the bezier curve */
    t: number;
    /** the closest distance between the point and the bezier curve */
    d: number;
}
/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given
 * bezier curve to the given point (with `t ∈ [0,1]`).
 *
 * * intermediate calculations are done in double precision
 * * in some cases there can be more than one closest point, e.g. on the axis
 * of symmetry of a parabola (in which case only one of the points are returned)
 * * if `inclEndpoints` is `false` then `undefined` will be returned in case
 * there is no closest point not on an endpoint (the return type only includes
 * `undefined` in this case, i.e. if `inclEndpoints` is omitted or `true` the
 * return type is non-nullable)
 * * the returned point(s) are objects with the following properties:
 *     * `p`: the closest point on the bezier curve
 *     * `t`: the parameter value of the point on the bezier curve
 *     * `d`: the closest distance between the point and the bezier curve
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 * @param inclEndpoints
 *
 * @doc mdx
 */
declare function closestPointOnBezier(ps: number[][], p: number[]): ClosestPoint;
declare function closestPointOnBezier(ps: number[][], p: number[], inclEndpoints: true): ClosestPoint;
declare function closestPointOnBezier(ps: number[][], p: number[], inclEndpoints: false): ClosestPoint | undefined;
declare function closestPointOnBezier(ps: number[][], p: number[], inclEndpoints: boolean): ClosestPoint | undefined;
export { closestPointOnBezier };
export type { ClosestPoint };
