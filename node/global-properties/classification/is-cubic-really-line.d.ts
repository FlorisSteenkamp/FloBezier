/**
 * Returns `true` if the given bezier curve has all control points collinear
 * *and* it can be converted to an order 1 bezier curve (a line) such that the
 * same `(x,y)` point is returned for the same `t` value, `false` otherwise.
 *
 * * **exact**: not susceptible to floating point round-off
 *
 * @param ps a cubic bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 *
 * @doc mdx
 */
declare function isCubicReallyLine(ps: number[][]): boolean;
export { isCubicReallyLine };
