/**
 * Returns `true` if the given bezier curve has all control points collinear,
 * `false` otherwise.
 *
 * * if you need to know whether a given bezier curve can be converted to an
 * order 1 bezier curve (a line) such that the same `(x,y)` point is returned
 * for the same `t` value then use e.g. [[isQuadReallyLine]] instead.
 *
 * * **exact** not susceptible to floating point round-off
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 *
 * @doc mdx
 */
declare function isCollinear(ps: number[][]): boolean;
/**
 * Returns `true` if the given bezier curve has all control points the
 * same `y` value (possibly self-overlapping), `false` otherwise.
 *
 * @param ps An order 0, 1, 2 or 3 bezier curve.
 *
 * @doc
 */
declare function isHorizontal(ps: number[][]): boolean;
/**
 * Returns `true` if the given bezier curve has all control points the
 * same `x` value (possibly self-overlapping), `false` otherwise.
 *
 * @param ps An order 0, 1, 2 or 3 bezier curve.
 *
 * @doc
 */
declare function isVertical(ps: number[][]): boolean;
export { isCollinear, isHorizontal, isVertical };
