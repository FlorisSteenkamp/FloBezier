/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the self-intersection points of the
 * given cubic bezier curve.
 *
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision and this is
 * reflected in the error bound
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a cubic bezier curve.
 *
 * @internal
 */
declare function getCoeffsBez3WithRunningError(ps: number[][]): {
    coeffs: number[];
    errBound: number[];
};
export { getCoeffsBez3WithRunningError };
