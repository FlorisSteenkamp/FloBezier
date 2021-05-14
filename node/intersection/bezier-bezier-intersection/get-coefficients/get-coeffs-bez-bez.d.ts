/**
 * Returns an object with properties containing (1) the coefficients (in double-double
 * precision) of a polynomial in 1 variable whose roots are the parameter values
 * of the intersection points of two given order 1, 2 or 3 bezier curves (i.e. lines,
 * quadratic and cubic bezier curves), (2) the coefficientwise error bound of the polyomial,
 * and (3) a function that returns the *exact* polynomial coefficients as Shewchuck expansions.
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:** the coordinates of the given bezier curves must be
 * 47-bit aligned
 * * if all polynomial coefficients are exactly zero `undefined` is returned
 * so that is easy to check if the two curves are actually identical
 * algebraically (i.e. provided endpoints are ignored)
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output coefficient-wise error bound (which is approximately
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and
 * depends on the specific calculation, e.g. the order of the bezier curves)
 * * the error bound returned need **not** be scaled before use
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
declare function getCoeffsBezBez(ps1: number[][], ps2: number[][]): {
    coeffs: number[][];
    errBound: number[];
    getPExact: () => number[][];
};
export { getCoeffsBezBez };
