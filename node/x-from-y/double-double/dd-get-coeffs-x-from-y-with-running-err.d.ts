/**
 * Returns a polynomial (and a coefficientwise error bound) whose roots are
 * the `x` coordinates given the `y` coordinate of the given bezier curve.
 *
 * * this is calculated by swapping the `x` and `y` coordinates of the bezier
 * (i.e. reflecting it in the line `y = x`) and getting the polynomial whose
 * roots are the `y` coordinates given the `x` coordinate (which is the given
 * `y`) of the reflected curve
 *
 * @param ps an order 1, 2 or 3 bezier curve
 * @param y the `y` coordinate
 */
declare function ddGetCoeffsXFromY_WithRunningErr(ps: number[][], y: number): {
    coeffs: number[][];
    errorBound: number[];
} | undefined;
export { ddGetCoeffsXFromY_WithRunningErr };
