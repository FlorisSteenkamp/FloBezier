/**
 * Returns true if the given linear bezier curve is really a point.
 *
 * * the required condition is met if: `x0 === x1` and `y0 === y1`
 * * **exact:** for any input
 *
 * @param ps a linear bezier curve
 *
 * @doc mdx
 */
declare function isLineReallyPoint(ps: number[][]): boolean;
export { isLineReallyPoint };
