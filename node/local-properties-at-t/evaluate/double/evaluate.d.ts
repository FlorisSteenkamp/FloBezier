/**
 * Returns the resulting point of evaluating the given bezier curve at the
 * given parameter `t`.
 *
 * * uses power bases conversion and subsequently [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * to evaluate the polynomial in double precision floating point arithmetic.
 *
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are
 * double precision floating point numbers.
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 */
declare function evaluate(ps: number[][], t: number): number[];
export { evaluate };
