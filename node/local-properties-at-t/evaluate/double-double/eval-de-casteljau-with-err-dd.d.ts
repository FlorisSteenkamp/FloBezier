/**
 * Returns the resulting point (in double-double precision) of evaluating the
 * given bezier curve at the given parameter `t` (including a coordinate-wise
 * error bound).
 *
 * * uses [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double-double precision floating point arithmetic.
 *
 * The resulting point point is returned as `{ p: number[][], pE: number[] }`,
 * where `p` is the point `[x,y]` (with `x` and `y` in double-double precision)
 * and `pE` is the corresponding coordinate-wise absolute error bound of the
 * calculation.
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 **/
declare function evalDeCasteljauWithErrDd(ps: number[][], t: number[]): {
    p: number[][];
    pE: number[];
};
export { evalDeCasteljauWithErrDd };
