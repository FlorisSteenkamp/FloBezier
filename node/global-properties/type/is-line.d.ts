/**
 * Returns true if the given bezier is a line or a line in diguise, i.e. if all
 * control points are collinear.
 *
 * Robust: Robust for any bitlength of the given coordinates.
 * @param ps An order 1, 2 or 3 bezier curve.
 */
declare function isLine(ps: number[][]): boolean;
/**
 * Returns true if the given bezier degenerates to a horizontal line (possibly
 * self-overlapping)
 * @param ps An order 1, 2 or 3 bezier curve.
 */
declare function isHorizontalLine(ps: number[][]): boolean;
/**
 * Returns true if the given bezier degenerates to a vertical line (possibly
 * self-overlapping)
 * @param ps An order 1, 2 or 3 bezier curve.
 */
declare function isVerticalLine(ps: number[][]): boolean;
export { isLine, isHorizontalLine, isVerticalLine };
