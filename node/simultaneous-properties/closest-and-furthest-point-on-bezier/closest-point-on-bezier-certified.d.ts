import { RootInterval } from "flo-poly";
/**
 * Returns the closest point(s) (and parameter `t` value(s)) on the given
 * bezier curve to the given point.
 *
 * * guaranteed accurate to 4 ulps in `t` value
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p
 *
 * @doc
 */
declare function closestPointOnBezierCertified(ps: number[][], p: number[]): {
    intervalBox: number[][];
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
