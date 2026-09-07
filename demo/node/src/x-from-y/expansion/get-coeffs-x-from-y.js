import { eGetCoeffsYFromX } from "../../y-from-x/expansion/get-coeffs-y-from-x.js";
/**
 * Returns a polynomial whose roots are the `x` coordinates given the `y`
 * coordinate of the given bezier curve.
 *
 * * the returned coefficients are given *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
 * * this is calculated by swapping the `x` and `y` coordinates of the bezier
 * (i.e. reflecting it in the line `y = x`) and getting the polynomial whose
 * roots are the `y` coordinates given the `x` coordinate (which is the given
 * `y`) of the reflected curve
 *
 * @param ps an order 1, 2 or 3 bezier curve
 * @param y the `y` coordinate
 */
function eGetCoeffsXFromY(ps, y) {
    // swap the x and y coordinates (reflect in the line y = x)
    const psₛ = ps.map(p => [p[1], p[0]]);
    return eGetCoeffsYFromX(psₛ, y);
}
export { eGetCoeffsXFromY };
//# sourceMappingURL=get-coeffs-x-from-y.js.map