/**
 * Returns `true` if the given quadratic bezier curve is really a linear curve
 * (or a point), i.e. if all control points collinear *and* it can be converted
 * to an order 1 bezier curve (a line) such that the
 * same `(x,y)` point is returned for the same `t` value, `false` otherwise.
 *
 * * the required condition is met if: `x0 + x2 = 2*x1` and `y0 + y2 = 2*y1`
 * * **exact**: not susceptible to floating point round-off
 *
 * @param ps a quadratic bezier curve given as an array of its control
 * points, e.g. `[[1,2],[5,6],[7,8]]`
 *
 * @doc mdx
 */
declare function isQuadReallyLine(ps: number[][]): boolean;
export { isQuadReallyLine };
