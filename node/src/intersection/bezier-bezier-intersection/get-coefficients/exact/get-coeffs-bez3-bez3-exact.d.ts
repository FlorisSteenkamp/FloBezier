/**
 * Returns an error-free polynomial in in 1 variable
 * whose roots are the parameter values of the intersection points of 2 order
 * 3 bezier curves (i.e. 2 cubic bezier curves).
 *
 * The returned polynomial degree will be 9
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** the coordinates of the given bezier curves must be
 * 47-bit aligned
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
declare function getCoeffsBez3Bez3Exact(ps1: number[][], ps2: number[][]): number[][];
export { getCoeffsBez3Bez3Exact };
