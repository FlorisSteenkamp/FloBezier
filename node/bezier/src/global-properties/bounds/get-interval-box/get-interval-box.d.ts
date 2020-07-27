/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
 * * **precondition**: 49-bit aligned coordinates (inherited from
 * evalDeCasteljauWithErr - can easily be relaxed)
 *
 * @param ps an order 1,2 or 3 bezier curve
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 */
declare function getIntervalBox(ps: number[][], ts: number[]): number[][];
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme
 * control points and finally finding a box that engulfs the control points
 * @internal
 *
 * @param ps
 * @param ts
 */
declare function getIntervalBox3(ps: number[][], ts: number[]): number[][];
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme
 * control points and finally finding a box that engulfs the control points
 *
 * @param param0
 * @param param1
 *
 * @internal
 */
declare function getIntervalBox2([[x0, y0], [x1, y1], [x2, y2]]: number[][], [t1, t2]: number[]): number[][];
/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given
 * bezier curve from t1 to t2.
 *
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme
 * control points and finally finding a box that engulfs the control points
 *
 * @param param0
 * @param param1
 *
 * @internal
 */
declare function getIntervalBox1([[x0, y0], [x1, y1]]: number[][], [t1, t2]: number[]): number[][];
export { getIntervalBox, getIntervalBox1, getIntervalBox2, getIntervalBox3 };
