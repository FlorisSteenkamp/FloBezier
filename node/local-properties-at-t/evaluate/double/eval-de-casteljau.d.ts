/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double precision floating point arithmetic.
 *
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are
 * double precision floating point numbers.
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 **/
declare function evalDeCasteljau(ps: number[][], t: number): number[];
export { evalDeCasteljau };
