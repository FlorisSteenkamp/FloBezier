/**
 * Returns an arc approximation using unit eighth circle quadratic bezier
 * curves. The result is returned as an array of quadratic bezier curves.
 *
 * * if the last returned arc is approximately smaller than 2**-40 of a quarter
 * circle it is not added to the returned value
 * * if the last returned arc is approximately (1 - 2**-40) of a quarter
 * circle a full quarter circle is added to the returned value
 *
 * @param c arc circle center
 * @param p1 arc goes from this point
 * @param p2 to a point on a line from c to this point (since the problem is over-specified)
 * (if `p1` and `p2` lies on a line through c a full circle is generated using
 * 8 quadratic bezier curves)
 *
 * @doc mdx
 */
declare function generateArcFromQuads(c: number[], p1: number[], p2: number[]): number[][][];
export { generateArcFromQuads };
