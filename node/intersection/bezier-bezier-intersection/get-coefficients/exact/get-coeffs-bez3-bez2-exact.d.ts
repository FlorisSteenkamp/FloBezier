/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve).
 *
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
  * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
declare function getCoeffsBez3Bez2Exact(ps1: number[][], ps2: number[][]): number[][];
export { getCoeffsBez3Bez2Exact };
