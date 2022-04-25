import { toPowerBasis1Exact, toPowerBasis3Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { twoProduct, expansionProduct, fastExpansionSum, scaleExpansion2, eMultBy2, eSign as _eSign } from "big-float-ts";
import { getCoeffsBez2Bez1Exact } from "./get-coeffs-bez2-bez1-exact.js";
import { cubicToQuadratic } from "../../../../transformation/degree-or-type/cubic-to-quadratic.js";
import { getImplicitForm3ExactPb } from "../../../../implicit-form/exact/get-implicit-form3-exact.js";
const tp = twoProduct; // error -> 0
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const eSign = _eSign;
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line).
 *
 * The returned polynomial degree will be 3
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
  * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function getCoeffsBez3Bez1Exact(ps1, ps2) {
    /** ps1 in power bases */
    const ps1pb = toPowerBasis3Exact(ps1);
    //const [[e3,e2,e1,e0],[f3,f2,f1,f0]] = ps1pb;
    // if both polynomials' cubic terms are exactly zero then its really a quadratic
    if (eSign(ps1pb[0][0]) === 0 && eSign(ps1pb[1][0]) === 0) {
        // the input bezier curve is in fact not cubic but has order < 3
        return getCoeffsBez2Bez1Exact(cubicToQuadratic(ps1), ps2);
    }
    const [[c1, [c0]], [d1, [d0]]] = toPowerBasis1Exact(ps2);
    // if (eSign(c1) === 0 && eSign(d1) === 0) {
    // The input bezier curve is in fact not a line but has order < 1, i.e. it is a point.
    // This shouldn't happen due to being checked for earlier.
    // }
    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
    // this type coercion is justified since we already checked that the
    // curve really has order 3
    getImplicitForm3ExactPb(ps1pb);
    const c0c0 = tp(c0, c0);
    const c0c1 = sce(c0, c1);
    const c0d0 = tp(c0, d0);
    const c0d1 = sce(c0, d1);
    const c1c1 = epr(c1, c1);
    const c1d0 = sce(d0, c1);
    const c1d1 = epr(c1, d1);
    const d0d0 = tp(d0, d0);
    const d0d1 = sce(d0, d1);
    const d1d1 = epr(d1, d1);
    const z1 = sce(c0, vₓₓₓ);
    const z7 = epr(tp(3, c0), vₓₓₓ);
    const z2 = sce(c0, vₓₓᵧ);
    const z3 = sce(d0, vₓₓᵧ);
    const z4 = sce(c0, vₓᵧᵧ);
    const z5 = sce(d0, vₓᵧᵧ);
    const z6 = sce(d0, vᵧᵧᵧ);
    const z8 = epr(tp(3, d0), vᵧᵧᵧ);
    // a1**3*v_xxx + a1**2*b1*v_xxy + a1*b1**2*v_xyy + b1**3*v_yyy
    //const v3 =
    //    c1c1*(c1*vₓₓₓ + d1*vₓₓᵧ) +
    //    d1d1*(c1*vₓᵧᵧ + d1*vᵧᵧᵧ);
    const u1 = epr(c1, vₓₓₓ);
    const u2 = epr(c1, vₓᵧᵧ);
    const u3 = epr(d1, vₓₓᵧ);
    const u4 = epr(d1, vᵧᵧᵧ);
    const u5 = fes(u1, u3);
    const u6 = fes(u2, u4);
    const u7 = epr(c1c1, u5);
    const u8 = epr(d1d1, u6);
    const v3 = fes(u7, u8);
    // 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + a0*b1**2*v_xyy + a1**2*b0*v_xxy + a1**2*v_xx + 2*a1*b0*b1*v_xyy + a1*b1*v_xy + 3*b0*b1**2*v_yyy + b1**2*v_yy
    //const v2 =
    //    c1c1*(3*c0*vₓₓₓ +   d0*vₓₓᵧ + vₓₓ) +
    //    c1d1*(2*c0*vₓₓᵧ + 2*d0*vₓᵧᵧ + vₓᵧ) +
    //    d1d1*(  c0*vₓᵧᵧ + 3*d0*vᵧᵧᵧ + vᵧᵧ);
    //const v2 =
    //    c1c1*(3*z1 +   z3 + vₓₓ) +
    //    c1d1*(2*z2 + 2*z5 + vₓᵧ) +
    //    d1d1*(  z4 + 3*z6 + vᵧᵧ);
    const u9 = fes(z7, z3);
    const ua = em2(fes(z2, z5));
    const ub = fes(z4, z8);
    const uc = fes(u9, vₓₓ);
    const ud = fes(ua, vₓᵧ);
    const ue = fes(ub, vᵧᵧ);
    const uf = epr(c1c1, uc);
    const ug = epr(c1d1, ud);
    const uh = epr(d1d1, ue);
    const ui = fes(uf, ug);
    const v2 = fes(ui, uh);
    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    c0c1*(3*c0*vₓₓₓ + 2*(d0*vₓₓᵧ + vₓₓ)) +
    //    d0d1*(3*d0*vᵧᵧᵧ + 2*(c0*vₓᵧᵧ + vᵧᵧ)) +
    //    c0d1*(c0*vₓₓᵧ + vₓᵧ) +
    //    c1d0*(d0*vₓᵧᵧ + vₓᵧ) +
    //    vₓ*c1 +
    //    vᵧ*d1;
    const uj = em2(fes(z3, vₓₓ));
    const uk = em2(fes(z4, vᵧᵧ));
    const un = fes(z7, uj);
    const uo = fes(z8, uk);
    const up = fes(z2, vₓᵧ);
    const uq = fes(z5, vₓᵧ);
    const ur = epr(c0c1, un);
    const us = epr(d0d1, uo);
    const ut = epr(c0d1, up);
    const uu = epr(c1d0, uq);
    const uv = epr(c1, vₓ);
    const uw = epr(d1, vᵧ);
    const ux = fes(ur, us);
    const uy = fes(ut, uu);
    const uz = fes(ux, uy);
    const u0 = fes(uv, uw);
    const v1 = fes(uz, u0);
    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(d0*vᵧᵧᵧ + c0*vₓᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    //const v0 =
    //    c0c0*(z1 + z3 + vₓₓ) +
    //    d0d0*(z6 + z4 + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    const f1 = fes(z1, z3);
    const f2 = fes(z6, z4);
    const f3 = fes(f1, vₓₓ);
    const f4 = fes(f2, vᵧᵧ);
    const f5 = epr(c0c0, f3);
    const f6 = epr(d0d0, f4);
    const f7 = epr(c0d0, vₓᵧ);
    const f8 = fes(f5, f6);
    const f9 = fes(f8, f7);
    const fa = sce(c0, vₓ);
    const fb = sce(d0, vᵧ);
    const fc = fes(fa, fb);
    const fd = fes(f9, fc);
    const v0 = fes(fd, v);
    const r = [v3, v2, v1, v0];
    return r;
}
export { getCoeffsBez3Bez1Exact };
//# sourceMappingURL=get-coeffs-bez3-bez1-exact.js.map