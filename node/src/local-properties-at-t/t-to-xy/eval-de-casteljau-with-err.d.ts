/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * using [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double precision floating point arithmetic.
 *
 * The result is returned as an object with properties: (1) the resulting
 * point `p` given as the pair `[x,y]`, where `x` and `y` are double
 * precision floating point numbers and (2) an absolute error bound on the
 * returned coordinates, `pE`, given as the pair `[x,y]`, where `x` and `y` are
 * non-negative double precision floating point numbers.
 *
 * * **precondition**: 49-bit aligned input bezier coordinates
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 **/
declare function evalDeCasteljauWithErr(ps: number[][], t: number): {
    p: number[];
    pE: number[];
};
export { evalDeCasteljauWithErr };
