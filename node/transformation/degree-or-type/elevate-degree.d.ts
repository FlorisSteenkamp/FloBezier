/**
 * Returns the degree-elevated version of the given bezier curve, i.e. the
 * identical curve represented by one additional control point.
 *
 * * degree elevation is exact in exact arithmetic (the elevated curve is the
 * identical curve); the computed control points, however, are generally subject
 * to floating point rounding - e.g. elevating a quadratic (`n === 2`) divides
 * by 3
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function elevateDegree(ps: number[][]): number[][];
export { elevateDegree };
