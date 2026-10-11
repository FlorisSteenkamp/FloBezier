/**
 * Approximate the given cubic bezier curve (up to the given tolerance) by
 * fitting an array of ordered (by `t` value) piecewise bezier curves
 * (of quadratic order or less).
 *
 * * the start and end point of each approximating curve lies on the cubic
 * curve (the tangents at those points are, in general, *not* preserved)
 *
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tolerance tolerance given as the maximum hausdorff distance between
 * the two curves
 *
 * @doc mdx
 */
declare function fitQuadsToCubicHausdorff(ps: number[][], tolerance: number): number[][][];
export { fitQuadsToCubicHausdorff };
