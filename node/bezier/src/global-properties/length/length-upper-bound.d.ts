/**
 * Returns an upper bound for the length of the given bezier curve - this bound
 * is not very strict as it uses the sum of the straight-line distances between
 * control points as a measure.
 *
 * @param ps
 *
 * @doc mdx
 */
declare function lengthUpperBound(ps: number[][]): number;
export { lengthUpperBound };
