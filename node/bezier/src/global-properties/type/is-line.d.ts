/**
 * Returns true if the given bezier curve is a line or if all control points
 * are collinear.
 *
 * * if you need to know whether a given bezier curve can be converted to an
 * order 1 bezier curve (a line) such that the same `(x,y)` point is returned
 * for the same `t` value then use e.g. [[isQuadReallyLine]] instead.
 * * **exact:** for any bitlength of the given coordinates.
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc mdx
 */
declare function isLine(ps: number[][]): boolean;
/**
 * Returns true if the given bezier degenerates to a horizontal line (possibly
 * self-overlapping)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
declare function isHorizontalLine(ps: number[][]): boolean;
/**
 * Returns true if the given bezier degenerates to a vertical line (possibly
 * self-overlapping)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
declare function isVerticalLine(ps: number[][]): boolean;
export { isLine, isHorizontalLine, isVerticalLine };
