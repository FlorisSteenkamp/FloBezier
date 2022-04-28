/**
 * Returns the resulting point (in double-double precision) of evaluating the
 * given bezier curve at the given parameter `t` (given as a double-double
 * precision floating point number).
 *
 * * uses [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * with intermediate calculations done in double-double precision floating point
 * arithmetic.
 *
 * * to get an absolute error bound on the result call [[evalDeCasteljauError]]
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated (given in
 * double-double precision)
 *
 * @doc mdx
 **/
declare function evalDeCasteljauDd(ps: number[][], t: number[]): number[][];
export { evalDeCasteljauDd };
