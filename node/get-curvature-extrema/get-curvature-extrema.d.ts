/**
 * Curve extrema
 *
 * @doc
 */
declare type Extrema = {
    /** list of paramter t values where minima occur */
    minima: number[];
    /** list of paramter t values where maxima occur */
    maxima: number[];
    /** list of paramter t values where inflection points occur */
    inflections: number[];
};
/**
 * Returns the parameter `t` values (in `[0,1]`) of local minimum / maximum
 * absolute curvature for the given bezier curve.
 *
 * If there are an infinite number of such t values (such as is the case for a
 * line), an empty array is returned.
 *
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)'s excellent
 * answer on math.stackexchange
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getCurvatureExtrema(ps: number[][]): Extrema;
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
declare function getCurvatureExtremaQuadraticPoly(ps: number[][]): number[];
export { getCurvatureExtrema, getCurvatureExtremaQuadraticPoly, Extrema };
