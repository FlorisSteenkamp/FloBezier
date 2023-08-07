/**
 * Returns the polynomial whose zero is the t value of maximum absolute
 * curvature for the given *quadratic* bezier curve.
 *
 * * **precondition:** the given parabola is not degenerate to a line
 * * **non-exact:** there is floating point roundof during calculation
 * * see e.g. [math.stackexchange](https://math.stackexchange.com/a/2971112)'s
 * answer by [KeithWM](https://math.stackexchange.com/a/2971112/130809)
 *
 * @param ps an order 2 bezier curve given as an array of control points,
 * e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
declare function getCurvatureExtremaQuadraticPolyE(ps: number[][]): number[][];
export { getCurvatureExtremaQuadraticPolyE };
