import { RootInterval } from 'flo-poly';
/**
 * Performs certified inversion, i.e. returns the `t` parameter value
 * interval(s) for the given `x` and `y` coordinates on the specified bezier
 * curve. Only `t` values in `[0,1]` are returned.
 *
 * Returns `undefined` if the point is on the curve and the curve is a point.
 *
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 *
 * @param ps
 * @param p
 */
declare function tFromXY(ps: number[][], p: number[]): RootInterval[] | undefined;
/**
 * Performs certified inversion, i.e. returns the `t` parameter value
 * interval(s) for the given `x` and `y` coordinates on the specified bezier
 * curve.
 *
 * Returns `undefined` if the point is on the curve and the curve is a point.
 *
 * **precondition:** `p` must be *exactly* on the curve
 * * **certified** here means no `t` value can be missed but (in rare cases)
 * an extra 1 or 2 `t`s could be returned (e.g. for self-overlapping curves
 * and when the point is exactly on the point of self-intersection of the curve)
 *
 * @param ps
 * @param p
 */
declare function tFromXY3(ps: number[][], p: number[]): RootInterval[] | undefined;
declare function tFromXY2(ps: number[][], p: number[]): RootInterval[] | undefined;
declare function tFromXY1(ps: number[][], p: number[]): RootInterval[] | undefined;
export { tFromXY3, tFromXY2, tFromXY1, tFromXY };
