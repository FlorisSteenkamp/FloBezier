/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve).
 *
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** the coordinates of the given bezier curves must be
 * 47-bit aligned
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
declare function getCoeffsBez2Bez3Dd(ps1: number[][], ps2: number[][]): {
    coeffs: number[][];
    errBound: number[];
};
export { getCoeffsBez2Bez3Dd };