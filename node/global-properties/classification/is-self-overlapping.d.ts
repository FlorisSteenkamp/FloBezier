/**
 * Returns `true` if the given bezier has all control points collinear and
 * it is self-overlapping, i.e. if it intersects itself at an infinite number
 * of points.
 *
 * * a bezier curve can only intersect itself at an infinite number of
 * points if its locus is a 'self-overlapping line'.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 *
 * @doc mdx
 */
declare function isSelfOverlapping(ps: number[][]): boolean;
export { isSelfOverlapping };
