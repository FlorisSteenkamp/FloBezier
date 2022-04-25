/**
 * Curve extrema
 *
 * @doc
 */
interface Extrema {
    /** list of paramter t values where minima occur */
    minima: number[];
    /** list of paramter t values where maxima occur */
    maxima: number[];
    /** list of paramter t values where inflection points occur */
    inflections: number[];
}
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
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getCurvatureExtrema(ps: number[][]): Extrema;
export { getCurvatureExtrema, Extrema };
