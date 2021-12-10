/**
 * Returns true if the given quadratic bezier curve is really a linear curve
 * (or a point).
 *
 * * the required condition is met if: `x0 + x2 = 2*x1` and `y0 + y2 = 2*y1`
 * * **exact:** for any input
 *
 * @param ps a quadratic bezier curve
 *
 * @doc mdx
 */
declare function isQuadReallyLine(ps: number[][]): boolean;
export { isQuadReallyLine };
