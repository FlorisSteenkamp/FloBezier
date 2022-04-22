/**
 * Returns true if the given bezier is a line and self-overlapping, i.e. if it
 * intersects itself at an infinite number of points.
 *
 * * a bezier curve can only intersect itself at an infinite number of
 * points if its locus is a 'self-overlapping line'.
 *
 * @param ps an order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
declare function isSelfOverlapping(ps: number[][]): boolean;
export { isSelfOverlapping };
