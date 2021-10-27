/**
 * Returns an error-free polynomial in 1 variable whose roots are the parameter
 * values of the intersection points of two order 1 bezier curves (i.e. 2 lines).
 *
 * The returned polynomial degree will be 1
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** TODO - add underflow / overflow conditions
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
declare function getCoeffsBez1Bez1Exact(ps1: number[][], ps2: number[][]): number[][];
export { getCoeffsBez1Bez1Exact };
