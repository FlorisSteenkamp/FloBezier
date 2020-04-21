/**
 * Returns true if the given bezier is a line and self-overlapping, i.e. if it
 * intersects itself at an infinite number of points.
 *
 * Note: A bezier curve can only intersect itself at an infinite number of
 * points if is a self-overlapping line.
 *
 * Robust: This function is robust via adaptive infinite precision floating
 * point arithmetic.
 * @param ps An order 1, 2 or 3 bezier curve
 */
declare function isSelfOverlapping(ps: number[][]): boolean;
export { isSelfOverlapping };
