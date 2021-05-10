/**
 * Returns an upper bound for the length of the given order 1, 2 or 3 bezier
 * curve.
 *
 * The curve has lenhth 0 iff this bound is zero.
 *
 * This bound is quite loose as it uses the sum of the straight-line distances
 * between control points as a measure.
 * @param ps
 *
 * @doc mdx
 */
declare function lengthSquaredUpperBound(ps: number[][]): number;
export { lengthSquaredUpperBound };
