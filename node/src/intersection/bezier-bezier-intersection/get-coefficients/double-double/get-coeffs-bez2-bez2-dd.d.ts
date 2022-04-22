/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of 2 order
 * 2 bezier curves (i.e. 2 quadratic bezier curves).
 *
 * The returned polynomial degree will be 4
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** none
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
declare function getCoeffsBez2Bez2Dd(ps1: number[][], ps2: number[][]): {
    coeffs: number[][];
    errBound: number[];
};
export { getCoeffsBez2Bez2Dd };
