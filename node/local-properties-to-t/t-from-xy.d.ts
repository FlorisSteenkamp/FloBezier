import { RootInterval } from 'flo-poly';
/**
 * Performs certified inversion, i.e. returns the `t` parameter value
 * interval(s) for the given `x` and `y` coordinates on the specified bezier
 * curve.
 *
 * * Only `t` values in `[0,1]` are returned.
 *
 * * see also [[closestPointOnBezier]] and [[closestPointOnBezierCertified]]
 *
 * **precondition**: `p` must be *exactly* on the curve for the result to be
 * certified
 *
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point, e.g. `[1,2]`
 */
declare function tFromXY(ps: number[][], p: number[]): RootInterval[];
export { tFromXY };
