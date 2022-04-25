import { toPowerBasis_1stDerivative } from "../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { toPowerBasis_2ndDerivative } from "../to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js";
import { toPowerBasis_3rdDerivative } from "../to-power-basis/to-power-basis-3rd-derivative/double/to-power-basis-3rd-derivative.js";
/**
 * Returns the polynomials whose zeros are the t values of the local
 * minima / maxima of the absolute curvature for the given bezier curve.
 *
 * The polynomials are in the form p1*p2 where the zeros
 * of p1 are the inflection points and the zeros of p2 are the other minima /
 * maxima.
 *
 * * **precondition:** must be a true cubic bezier (not degenerate to line or
 * quadratic)
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)'s excellent
 * * **non-exact:** there is floating point roundof during calculation
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @internal
 */
function getAbsCurvatureExtremaPolys(ps) {
    // It is a real cubic - use the excellent answer from the description:
    // dd(kappa^2)/dt === (x′′y′ − x′y′′)*((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′))
    // Inflection points at: (x′′y′ − x′y′′) === 0
    // Max abs curvature at: ((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′)) === 0
    const [[dx2, dx1, dx0], [dy2, dy1, dy0]] = toPowerBasis_1stDerivative(ps); // max bitlength increase === 5
    const [[ddx1, ddx0], [ddy1, ddy0]] = toPowerBasis_2ndDerivative(ps); // max bitlength increase === 6
    const [dddx, dddy] = toPowerBasis_3rdDerivative(ps); // max bitlength increase === 6
    // ((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′))
    // or 
    // x′′′x′x′y′ + x′′′y′y′y′ - y′′′x′x′x′ - y′′′x′y′y′ + 
    // 3(x′′y′′x′x′ - x′′x′′x′y′ - x′′y′′y′y′ + y′′y′′x′y′)
    // The above line becomes
    // ((dddx*dy(t) − dx(t)*dddy)(dx(t)dx(t) + dy(t)dy(t)) − 3(dx(t)ddx(t) + dy(t)ddy(t))(ddx(t)dy(t) − dx(t)ddy(t)))
    // or 
    // dddx*dxt**2*dyt + dddx*dyt**3 - dddy*dxt**3 - dddy*dxt*dyt**2 - 
    // 3*ddxt**2*dxt*dyt + 3*ddxt*ddyt*dxt**2 - 3*ddxt*ddyt*dyt**2 + 3*ddyt**2*dxt*dyt
    // which becomes: (after substituting e.g. dy(t) = dy2*t^2 + dy1*t + dy0, etc. using Python and
    // then expanding and collecting terms)
    const dddx_dy1 = dddx * dy1;
    const dddy_dx1 = dddy * dx1;
    const ddx0_dy0 = ddx0 * dy0;
    const ddx0_dy1 = ddx0 * dy1;
    const ddy1_ddy1 = ddy1 * ddy1;
    const ddx1_dy0 = ddx1 * dy0;
    const ddy0_dx0 = ddy0 * dx0;
    const ddy0_dx1 = ddy0 * dx1;
    const ddy1_dx0 = ddy1 * dx0;
    const dx0_dx1 = dx0 * dx1;
    const dx0_dx2 = dx0 * dx2;
    const dx0_dy2 = dx0 * dy2;
    const dx1_dx1 = dx1 * dx1;
    const dx1_dx2 = dx1 * dx2;
    const dx1_dy1 = dx1 * dy1;
    const dx2_dy0 = dx2 * dy0;
    const dx2_dy2 = dx2 * dy2;
    const dx2_dx2 = dx2 * dx2;
    const dy0_dy1 = dy0 * dy1;
    const dy0_dy2 = dy0 * dy2;
    const dy1_dy1 = dy1 * dy1;
    const dy1_dy2 = dy1 * dy2;
    const dy2_dy2 = dy2 * dy2;
    const ss = dddx * dy0 - dddy * dx0;
    const uu = dddx_dy1 - dddy_dx1;
    const vv = ddx0 * dx0 + ddy0 * dy0;
    const ww = ddx0 * dx1 + ddx1 * dx0 + ddy0 * dy1 + ddy1 * dy0;
    const xx = ddx0_dy0 - ddy0_dx0;
    const yy = ddx0_dy1 + ddx1_dy0 - ddy0_dx1 - ddy1_dx0;
    const qq = dx0 * dx0 + dy0 * dy0;
    const rr = dx0_dx1 + dy0_dy1;
    // t6 cancels! see https://math.stackexchange.com/a/1956264/130809
    const z1 = dx1_dy1 + dx2_dy0;
    const z2 = dy0_dy2 + dy1_dy1;
    const z3 = dx0_dx2 + dx1_dx1;
    const z4 = dx1 * dy2 + dx2 * dy1;
    const z5 = dx2_dx2 - dy2_dy2;
    const z6 = dx1_dx2 - dy1_dy2;
    const z7 = dx0_dy2 + dx1_dy1;
    const z8 = dx0_dx1 - dy0_dy1;
    const z9 = dx0 * dy1 + dx1 * dy0;
    const x1 = dy0_dy2 + z2;
    const x2 = dx0_dx2 + z3;
    const x3 = dx0_dy2 + z1;
    const x4 = dx1_dy1 + z1;
    const x5 = x2 - x1;
    const x6 = z1 + dx2_dy0;
    const x7 = z7 + dx2_dy0;
    const x8 = 2 * ddy0_dx1 + ddy1_dx0;
    const t5 = dx2_dx2 * (dddx_dy1 - 3 * dddy_dx1) +
        dy2_dy2 * (3 * dddx_dy1 - dddy_dx1) +
        2 * ((dx2_dy2) * ((dddx * dx1 - dddy * dy1) + 3 * (ddy0 * ddy1 - ddx0 * ddx1)) + 3 * ddx1 * ddy1 * z6) +
        3 * (z4 * (ddy1_ddy1 - ddx1 * ddx1) + z5 * (ddx0 * ddy1 + ddy0 * ddx1));
    const t4 = dddx * (dy2 * (x2 + 3 * z2) + dx2 * x4) -
        dddy * (dx0 * (3 * dx2_dx2 + dy2_dy2) + dx1 * (3 * dx1_dx2 + 2 * dy1_dy2) + dx2 * x1) +
        3 * (ddx0 * ((ddy0 * z5 - ddx0 * dx2_dy2) + 2 * (ddy1 * z6 - ddx1 * z4)) +
            ddx1 * (2 * ddy0 * z6 + ddy1 * (2 * (dx0_dx2 - dy0_dy2) + (dx1_dx1 - dy1_dy1)) - ddx1 * x7) +
            ddy0 * (ddy0 * dx2_dy2 + 2 * ddy1 * z4) +
            ddy1_ddy1 * x3);
    const t3 = dddx * (2 * dx0 * z4 + dx1 * x6 + dy1 * (4 * dy0_dy2 + x1)) -
        dddy * (2 * dx0 * (3 * dx1_dx2 + dy1_dy2) + dx1 * (dx1_dx1 + 2 * dy0_dy2) + dy1 * x6) +
        3 * (ddx0 * (2 * (ddy0 * z6 - ddx1 * x7) + ddy1 * x5 - ddx0 * z4) +
            ddx1 * (2 * ddy1 * z8 - ddx1 * z9) +
            ddy0 * (ddy0 * z4 + 2 * ddy1 * x3 + ddx1 * x5) +
            ddy1_ddy1 * z9);
    const t2 = dddx * (dx0 * (dx0_dy2 + 2 * z1) + dy0 * (dx1_dx1 + 3 * z2)) -
        dddy * (dx0 * (3 * z3 + x1) + dy0 * x4) +
        3 * (ddx0 * (ddy0 * x5 - ddx0 * x3 + 2 * (ddy1 * z8 - ddx1 * z9)) +
            ddx1 * (dx0 * (x8 - ddx1 * dy0) - dy0 * (2 * ddy0 * dy1 + ddy1 * dy0)) +
            ddy0 * (ddy0 * z1 + dx0 * (2 * ddy1 * dy1 + ddy0 * dy2)) +
            ddy1 * dy0 * x8);
    const t1 = (qq * uu + 2 * rr * ss) - 3 * (vv * yy + ww * xx);
    const t0 = ss * qq - 3 * vv * xx;
    const r3 = ddx1 * dy2 - ddy1 * dx2;
    const r2 = ddx0 * dy2 + ddx1 * dy1 - ddy0 * dx2 - ddy1 * dx1;
    const r1 = ddx0_dy1 + ddx1_dy0 - ddy0_dx1 - ddy1_dx0;
    const r0 = ddx0_dy0 - ddy0_dx0;
    return {
        inflectionPoly: [r3, r2, r1, r0],
        otherExtremaPoly: [t5, t4, t3, t2, t1, t0]
    };
}
export { getAbsCurvatureExtremaPolys };
//# sourceMappingURL=get-abs-curvature-extrema-polys.js.map