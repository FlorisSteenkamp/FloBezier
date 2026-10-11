/**
 * Generates and returns a cubic bezier curve going through a specific point
 * given control points 0,1 and 3.
 *
 * * **non-exact:** the returned bezier does not necessarily go through the
 * point *exactly* (due to floating-point round-off).
 * * **precondition:** `t` must not be `0` or `1` (an error is thrown
 * otherwise) since the curve passes through control points 0 and 3 at those
 * parameter values regardless of the position of control point 2; typically
 * `0 < t < 1`
 *
 * @param ps a cubic bezier curve's 1st, 2nd and 4th control point coordinates,
 * i.e. `[[x0,y0], [x1,y1], [x3,y3]]`, e.g. `[[1,2], [3,4], [5,6]]`
 * @param p a point through which the bezier should go, e.g. `[4.5,6.1]`
 * @param t a `t` parameter value at which the bezier should go through the
 * point - this is necessary due to a degree of freedom still left
 *
 * @doc mdx
 */
declare function cubicThroughPointGiven013(ps: number[][], p: number[], t: number): number[][];
export { cubicThroughPointGiven013 };
