/**
 * Approximate the given cubic bezier curve (up to the given tolerance) by
 * fitting an array of ordered (by `t` value) piecewise bezier curves
 * (of quadratic order or less).
 *
 * * the start and end point of each approximating curve lies on the cubic
 * curve and the the tangents of each approximating curve coincide with that of
 * the cubic at each such point
 *
 * @param ps the cubic bezier curve to approximate
 * @param tolerance tolerance given as the maximum total absolute area difference
 * between the two curves
 */
declare function fitQuadsToCubic(ps: number[][], tolerance: number): number[][][];
export { fitQuadsToCubic };