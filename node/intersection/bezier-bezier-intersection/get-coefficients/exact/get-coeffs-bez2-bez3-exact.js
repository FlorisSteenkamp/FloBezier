import { getImplicitForm2ExactPb } from "../../../../implicit-form/exact/get-implicit-form2-exact.js";
import { getXY2Exact, getXY3Exact } from "../../../../to-power-basis/get-xy/exact/get-xy-exact";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { twoProduct, expansionProduct, fastExpansionSum, scaleExpansion2, eMultBy2, eSign as _eSign } from "big-float-ts";
import { getCoeffsBez1Bez3Exact } from "./get-coeffs-bez1-bez3-exact.js";
import { getCoeffsBez2Bez2Exact } from "./get-coeffs-bez2-bez2-exact.js";
import { toQuadraticFromCubic } from "../../../../transformation/degree-or-type/to-quad-from-cubic.js";
const tp = twoProduct; // error -> 0
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const eSign = _eSign;
/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve).
 *
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * **precondition:**  TODO - add underflow / overflow conditions
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @doc mdx
 */
function getCoeffsBez2Bez3Exact(ps1, ps2) {
    /** ps1 in power bases */
    const ps1pb = getXY2Exact(ps1);
    //const [[e2,e1,e0],[f2,f1,f0]] = ps1pb;
    // if both polynomials' quadratic terms are exactly zero then its really a line
    if (eSign(ps1pb[0][0]) === 0 && eSign(ps1pb[1][0]) === 0) {
        // the input bezier curve is in fact not quadratic but has order < 2
        return getCoeffsBez1Bez3Exact([ps1[0], ps1[2]], ps2);
    }
    const [[c3, c2, c1, c0], [d3, d2, d1, d0]] = getXY3Exact(ps2);
    if (eSign(c3) === 0 && eSign(d3) === 0) {
        // the input bezier curve is in fact not cubic but has order < 3
        return getCoeffsBez2Bez2Exact(ps1, toQuadraticFromCubic(ps2));
    }
    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
    // this type coercion is justified since we already checked that the
    // curve really has order 2
    getImplicitForm2ExactPb(ps1pb);
    const c0c0 = tp(c0, c0);
    const c0c1 = sce(c0, c1);
    const c0c2 = sce(c0, c2);
    const c0c3 = sce(c0, c3);
    const c0d0 = tp(c0, d0);
    const c0d1 = sce(c0, d1);
    const c0d2 = sce(c0, d2);
    const c0d3 = sce(c0, d3);
    const c1c1 = epr(c1, c1);
    const c1c2 = epr(c1, c2);
    const c1c3 = epr(c1, c3);
    const c1d0 = sce(d0, c1);
    const c1d1 = epr(c1, d1);
    const c1d2 = epr(c1, d2);
    const c1d3 = epr(c1, d3);
    const c2d1 = epr(c2, d1);
    const c2c2 = epr(c2, c2);
    const c2c3 = epr(c2, c3);
    const c2d0 = sce(d0, c2);
    const c2d2 = epr(c2, d2);
    const c2d3 = epr(c2, d3);
    const c3c3 = epr(c3, c3);
    const c3d0 = sce(d0, c3);
    const c3d1 = epr(c3, d1);
    const c3d2 = epr(c3, d2);
    const c3d3 = epr(c3, d3);
    const d0d0 = tp(d0, d0);
    const d0d1 = sce(d0, d1);
    const d0d2 = sce(d0, d2);
    const d0d3 = sce(d0, d3);
    const d1d1 = epr(d1, d1);
    const d1d2 = epr(d1, d2);
    const d3d3 = epr(d3, d3);
    const d2d2 = epr(d2, d2);
    const d2d3 = epr(d2, d3);
    const d1d3 = epr(d1, d3);
    // a3**2*vₓₓ + a3*b3*vₓᵧ + b3**2*vᵧᵧ
    //const v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    const p1 = epr(c3c3, vₓₓ);
    const p2 = epr(c3d3, vₓᵧ);
    const p3 = epr(d3d3, vᵧᵧ);
    const p4 = fes(p1, p2);
    const v6 = fes(p4, p3);
    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //const v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    vₓᵧ*(c2d3 + c3d2);
    const p5 = epr(c2c3, vₓₓ);
    const p6 = epr(d2d3, vᵧᵧ);
    const p7 = fes(p5, p6);
    const p8 = fes(c2d3, c3d2);
    const p9 = epr(p8, vₓᵧ);
    const v5 = fes(em2(p7), p9);
    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //const v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    const pa = fes(em2(c1c3), c2c2);
    const pb = fes(em2(d1d3), d2d2);
    const pc = fes(c1d3, c2d2);
    const pd = fes(pc, c3d1);
    const pe = epr(pa, vₓₓ);
    const pf = epr(pb, vᵧᵧ);
    const pg = fes(pe, pf);
    const rp = epr(pd, vₓᵧ);
    const v4 = fes(pg, rp);
    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    // a3*v_x + 2*b0*b3*vᵧᵧ + 2*b1*b2*vᵧᵧ + b3*v_y
    //const v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    const ph = fes(c0c3, c1c2);
    const pi = fes(d0d3, d1d2);
    const pj = fes(c0d3, c1d2);
    const pk = fes(c2d1, c3d0);
    const pl = fes(pj, pk);
    const pm = epr(ph, vₓₓ);
    const pn = epr(pi, vᵧᵧ);
    const po = em2(fes(pm, pn));
    const pp = epr(pl, vₓᵧ);
    const rn = epr(c3, vₓ);
    const ro = epr(d3, vᵧ);
    const pq = fes(rn, ro);
    const pr = fes(po, pp);
    const v3 = fes(pr, pq);
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    // a1*b1*vₓᵧ + a2*b0*vₓᵧ + a2*v_x + 
    // 2*b0*b2*vᵧᵧ + b1**2*vᵧᵧ + b2*v_y
    //const v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    const ps = fes(em2(c0c2), c1c1);
    const pt = fes(em2(d0d2), d1d1);
    const pu = fes(c0d2, c1d1);
    const pv = fes(pu, c2d0);
    const pw = epr(ps, vₓₓ);
    const px = epr(pt, vᵧᵧ);
    const py = epr(pv, vₓᵧ);
    const pz = fes(pw, px);
    const r1 = fes(pz, py);
    const r2 = epr(c2, vₓ);
    const r3 = epr(d2, vᵧ);
    const r4 = fes(r2, r3);
    const v2 = fes(r1, r4);
    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*v_x + 2*b0*b1*vᵧᵧ + b1*v_y
    //const v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    const r5 = epr(c0c1, vₓₓ);
    const r6 = epr(d0d1, vᵧᵧ);
    const r7 = fes(c0d1, c1d0);
    const r8 = epr(r7, vₓᵧ);
    const r9 = em2(fes(r5, r6));
    const ra = fes(r9, r8);
    const rb = epr(c1, vₓ);
    const rc = epr(d1, vᵧ);
    const rd = fes(rb, rc);
    const v1 = fes(ra, rd);
    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*v_x + b0**2*vᵧᵧ + b0*v_y + v_0
    //const v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const re = epr(c0c0, vₓₓ);
    const rf = epr(c0d0, vₓᵧ);
    const rg = epr(d0d0, vᵧᵧ);
    const rh = sce(c0, vₓ);
    const ri = sce(d0, vᵧ);
    const rj = fes(re, rf);
    const rk = fes(rj, rg);
    const rl = fes(rh, ri);
    const rm = fes(rk, rl);
    const v0 = fes(rm, v);
    const r = [v6, v5, v4, v3, v2, v1, v0];
    // remove leading zero coefficients
    //while (r.length > 1 && eSign(r[0]) === 0) {
    //    r.shift();
    //}
    return r;
}
export { getCoeffsBez2Bez3Exact };
//# sourceMappingURL=get-coeffs-bez2-bez3-exact.js.map