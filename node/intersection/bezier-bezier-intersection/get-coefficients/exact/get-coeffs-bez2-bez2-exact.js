import { getImplicitForm2ExactPb } from "../../../../implicit-form/exact/get-implicit-form2-exact.js";
import { toPowerBasis2Exact } from "../../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { twoProduct, expansionProduct, fastExpansionSum, scaleExpansion2, eMultBy2, eSign as _eSign } from "big-float-ts";
import { getCoeffsBez1Bez2Exact } from "./get-coeffs-bez1-bez2-exact.js";
import { getCoeffsBez2Bez1Exact } from "./get-coeffs-bez2-bez1-exact.js";
const tp = twoProduct; // error -> 0
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const eSign = _eSign;
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of 2 order
 * 2 bezier curves (i.e. 2 quadratic bezier curves).
 *
 * The returned polynomial degree will be 4
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
function getCoeffsBez2Bez2Exact(ps1, ps2) {
    /** ps1 in power bases */
    const ps1pb = toPowerBasis2Exact(ps1);
    // if both polynomials' quadratic terms are exactly zero then its really a line
    if (eSign(ps1pb[0][0]) === 0 && eSign(ps1pb[1][0]) === 0) {
        // the input bezier curve is in fact not quadratic but has order < 2
        return getCoeffsBez1Bez2Exact([ps1[0], ps1[2]], ps2);
    }
    const [[c2, c1, [c0]], [d2, d1, [d0]]] = toPowerBasis2Exact(ps2);
    if (eSign(c2) === 0 && eSign(d2) === 0) {
        // the input bezier curve is in fact not quadratic but has order < 2
        return getCoeffsBez2Bez1Exact(ps1, [ps2[0], ps2[2]]);
    }
    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
    // this type coercion is justified since we already checked that the
    // curve really has order 2
    getImplicitForm2ExactPb(ps1pb);
    const c0c0 = tp(c0, c0);
    const c0c1 = sce(c0, c1);
    const c0c2 = sce(c0, c2);
    const c0d0 = tp(c0, d0);
    const c0d1 = sce(c0, d1);
    const c0d2 = sce(c0, d2);
    const c1c1 = epr(c1, c1);
    const c1c2 = epr(c1, c2);
    const c1d0 = sce(d0, c1);
    const c1d1 = epr(c1, d1);
    const c1d2 = epr(c1, d2);
    const c2d1 = epr(c2, d1);
    const c2c2 = epr(c2, c2);
    const c2d0 = sce(d0, c2);
    const c2d2 = epr(c2, d2);
    const d0d0 = tp(d0, d0);
    const d0d1 = sce(d0, d1);
    const d0d2 = sce(d0, d2);
    const d1d1 = epr(d1, d1);
    const d1d2 = epr(d1, d2);
    const d2d2 = epr(d2, d2);
    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    //const v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    const p1 = epr(c2c2, vₓₓ);
    const p2 = epr(c2d2, vₓᵧ);
    const p3 = epr(d2d2, vᵧᵧ);
    const p4 = fes(p1, p2);
    const v4 = fes(p4, p3);
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    //const v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    const p5 = epr(c1c2, vₓₓ);
    const p6 = epr(d1d2, vᵧᵧ);
    const p7 = fes(c1d2, c2d1);
    const p8 = epr(p7, vₓᵧ);
    const p9 = em2(fes(p5, p6));
    const v3 = fes(p9, p8);
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //const v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    const pa = fes(em2(c0c2), c1c1);
    const pb = fes(em2(d0d2), d1d1);
    const pc = fes(c0d2, c1d1);
    const pd = fes(pc, c2d0);
    const pe = epr(pa, vₓₓ);
    const pf = epr(pb, vᵧᵧ);
    const pg = epr(pd, vₓᵧ);
    const ph = epr(c2, vₓ);
    const pi = epr(d2, vᵧ);
    const pj = fes(pe, pf);
    const pk = fes(pj, pg);
    const pl = fes(ph, pi);
    const v2 = fes(pk, pl);
    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    const pm = epr(c0c1, vₓₓ);
    const pn = epr(d0d1, vᵧᵧ);
    const po = fes(c0d1, c1d0);
    const pp = epr(po, vₓᵧ);
    const pq = em2(fes(pm, pn));
    const pr = epr(c1, vₓ);
    const ps = epr(d1, vᵧ);
    const pt = fes(pq, pp);
    const pu = fes(pr, ps);
    const v1 = fes(pt, pu);
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    const pv = epr(c0c0, vₓₓ);
    const pw = epr(c0d0, vₓᵧ);
    const px = epr(d0d0, vᵧᵧ);
    const py = sce(c0, vₓ);
    const pz = sce(d0, vᵧ);
    const q1 = fes(pv, pw);
    const q2 = fes(q1, px);
    const q3 = fes(py, pz);
    const q4 = fes(q2, q3);
    const v0 = fes(q4, v);
    const r = [v4, v3, v2, v1, v0];
    return r;
}
export { getCoeffsBez2Bez2Exact };
//# sourceMappingURL=get-coeffs-bez2-bez2-exact.js.map