/**
 * Returns an object with properties containing (1) the coefficients (in double-double
 * precision) of a polynomial in 1 variable whose roots are the parameter values
 * (of the second curve) of the intersection points of two given order 1, 2 or 3 bezier curves (i.e. lines,
 * quadratic and cubic bezier curves), (2) the coefficientwise error bound of the polyomial,
 * and (3) a function that returns the *exact* polynomial coefficients as
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions.
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * if there is an infinite number of intersections `undefined` is returned
 * * intermediate calculations are done in double-double precision with
 * fallback to infinite precision (bar underflow / overflow)
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
