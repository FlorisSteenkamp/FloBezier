/**
 * Returns a polynomial (and a coefficientwise error bound) whose roots are
 * the `x` coordinates given the `y` coordinate of the given bezier curve.
 *
 * * this is calculated by swapping the `x` and `y` coordinates of the bezier
 * (i.e. reflecting it in the line `y = x`) and getting the polynomial whose
 * roots are the `y` coordinates given the `x` coordinate (which is the given
 * `y`) of the reflected curve
 * * **precondition**: the given curve must really be of its stated order (e.g.
 * use [[reduceOrderIfPossible]] first); for a degenerate curve (e.g. a cubic
 * that is really a quadratic) all returned coefficients are zero (or, due to
 * round-off, very nearly zero); use [[eGetCoeffsXFromY]] instead which
 * correctly handles degenerate curves; the returned error bound remains valid
 * though, so that certified algorithms relying on it will correctly fall back
 * to exact arithmetic
 *
 * @param ps an order 1, 2 or 3 bezier curve
 * @param y the `y` coordinate
 */
declare function getCoeffsXFromY_WithRunningErr(ps: number[][], y: number): {
    coeffs: number[];
    errorBound: number[];
};
export { getCoeffsXFromY_WithRunningErr };
