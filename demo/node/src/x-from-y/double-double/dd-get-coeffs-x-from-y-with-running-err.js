import { ddGetCoeffsYFromX_WithRunningErr } from "../../y-from-x/double-double/dd-get-coeffs-y-from-x-with-running-err.js";
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
function ddGetCoeffsXFromY_WithRunningErr(ps, y) {
    // swap the x and y coordinates (reflect in the line y = x)
    const psₛ = ps.map(p => [p[1], p[0]]);
    return ddGetCoeffsYFromX_WithRunningErr(psₛ, y);
}
export { ddGetCoeffsXFromY_WithRunningErr };
//# sourceMappingURL=dd-get-coeffs-x-from-y-with-running-err.js.map