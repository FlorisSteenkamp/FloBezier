import { RootInterval } from "flo-poly";
/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given
 * bezier curve to the given point (with `t ∈ [0,1]`).
 *
 * * guaranteed accurate to within `4*Number.EPSILON` in the returned `t`
 * value(s)
 * * in some cases there can be more than one closest point, e.g. on the axis
 * of symmetry of a parabola
 * * the returned point(s) are objects with the following properties:
 *     * `p`: the best estimate point on the bezier curve (calculated from the root interval `ri`)
 *     * `t`: the best estimate `t` parameter value (calculated from the root interval `ri`)
 *     * `d`: the best estimate closest distance from the point to the bezier curve (calculated from the root interval `ri`)
 *     * `ri`: a root interval guaranteed to contain the actual `t` value
 *     * `box`: a small box guaranteed to contain the relevant point on the bezier curve
 *     * `dSquaredI`: a small squared distance interval guaranteed to contain the actual distance squared
 *        between the point and the bezier curve
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 *
 * @doc
 */
declare function closestPointOnBezierCertified(ps: number[][], p: number[]): {
    p: number[];
    t: number;
    d: number;
    box: number[][];
    ri: RootInterval;
    dSquaredI: number[];
}[];
export { closestPointOnBezierCertified };
/**
 * Returns the closest point on the bezier to the given point - returns the point
 * and the t value.
 *
 * * this function also acts as an excellent inversion formula.
 *
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 */
