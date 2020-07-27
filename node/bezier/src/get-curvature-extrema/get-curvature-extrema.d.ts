declare type Extrema = {
    minima: number[];
    maxima: number[];
    inflections: number[];
};
/**
 * Returns the parameter t values (in [0,1]) of local minimum / maximum absolute
 * curvature for the given bezier curve.
 *
 * If there are an infinite number of such t values (such as is the case for a
 * line), an empty array is returned.
 *
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)'s excellent
 * answer on math.stackexchange
 * * endpoints are not considered by default
 * * **non-exact:** the resulting t values may not be the exact t values of the
 * extrema due to floating point roundof during calculation
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
declare function getCurvatureExtrema(ps: number[][]): Extrema;
export { getCurvatureExtrema };
