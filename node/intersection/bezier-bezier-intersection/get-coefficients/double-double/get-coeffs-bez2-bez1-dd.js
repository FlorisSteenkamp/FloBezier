import { γγ } from "../../../../error-analysis/error-analysis.js";
import { getImplicitForm2DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form2-dd-with-running-error.js";
import { toPowerBasis1DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";
import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";
const tp = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;
const abs = Math.abs;
const γγ3 = γγ(3);
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line).
 *
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function getCoeffsBez2Bez1Dd(ps1, ps2) {
    const { coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v }, errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } } = getImplicitForm2DdWithRunningError(ps1);
    const [[c1, [, c0]], [d1, [, d0]]] = toPowerBasis1DdWithRunningError(ps2);
    const $vₓₓ = vₓₓ[1];
    const $vₓᵧ = vₓᵧ[1];
    const $vᵧᵧ = vᵧᵧ[1];
    const $vₓ = vₓ[1];
    const $vᵧ = vᵧ[1];
    const $v = v[1];
    const _vₓₓ = abs($vₓₓ);
    const _vₓᵧ = abs($vₓᵧ);
    const _vᵧᵧ = abs($vᵧᵧ);
    const $c1 = c1[1];
    const $d1 = d1[1];
    const _c0 = abs(c0);
    const _c1 = abs($c1);
    const _d0 = abs(d0);
    const _d1 = abs($d1);
    const $c0c0 = c0 * c0;
    const $c0c1 = c0 * $c1;
    const $c0d0 = c0 * d0;
    const $c0d1 = c0 * $d1;
    const $c1c1 = $c1 * $c1;
    const $c1d0 = $c1 * d0;
    const $c1d1 = $c1 * $d1;
    const $d0d0 = d0 * d0;
    const $d0d1 = d0 * $d1;
    const $d1d1 = $d1 * $d1;
    const c0c0 = tp(c0, c0);
    const c0c1 = qmd(c0, c1);
    const _c0c1_ = abs($c0c1);
    const c0d0 = tp(c0, d0);
    const c0d1 = qmd(c0, d1);
    const c0d1_ = abs($c0d1);
    const _c1c1 = abs($c1c1);
    const c1c1 = qmq(c1, c1);
    const c1c1_ = 2 * _c1c1;
    const c1d0 = qmd(d0, c1);
    const c1d0_ = abs($c1d0);
    const _c1d1 = abs($c1d1);
    const c1d1 = qmq(c1, d1);
    const c1d1_ = 2 * _c1d1;
    const d0d0 = tp(d0, d0);
    const d0d1 = qmd(d0, d1);
    const _d0d1_ = abs($d0d1);
    const _d1d1 = abs($d1d1);
    const d1d1 = qmq(d1, d1);
    const d1d1_ = 2 * _d1d1;
    // a1**2*vₓₓ + a1*b1*vₓᵧ + b1**2*vᵧᵧ
    const $p1 = $c1c1 * $vₓₓ;
    const p1 = qmq(c1c1, vₓₓ);
    const p1_ = c1c1_ * _vₓₓ * _c1c1 * vₓₓ_ + 2 * abs($p1);
    const $p2 = $d1d1 * $vᵧᵧ;
    const p2 = qmq(d1d1, vᵧᵧ);
    const p2_ = d1d1_ * _vᵧᵧ * _d1d1 * vᵧᵧ_ + 2 * abs($p2);
    const $p3 = $c1d1 * $vₓᵧ;
    const p3 = qmq(c1d1, vₓᵧ);
    const p3_ = c1d1_ * _vₓᵧ * _c1d1 * vₓᵧ_ + 2 * abs($p3);
    const $p4 = $p1 + $p2;
    const p4 = qaq(p1, p2);
    const p4_ = p1_ + p2_ + abs($p4);
    const $v2 = $p4 + $p3;
    const v2 = qaq(p4, p3);
    const v2_ = p4_ + p3_ + abs($v2);
    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*vₓ + 2*b0*b1*vᵧᵧ + b1*vᵧ
    const $p5 = $c0c1 * $vₓₓ;
    const p5 = qmq(c0c1, vₓₓ);
    const p5_ = _c0c1_ * (_vₓₓ + vₓₓ_) + 2 * abs($p5);
    const $p6 = $d0d1 * $vᵧᵧ;
    const p6 = qmq(d0d1, vᵧᵧ);
    const p6_ = _d0d1_ * (_vᵧᵧ + vᵧᵧ_) + 2 * abs($p6);
    const $p7 = $c0d1 + $c1d0;
    const p7 = qaq(c0d1, c1d0);
    const p7_ = c0d1_ + c1d0_ + abs($p7);
    const $pn = $p7 * $vₓᵧ;
    const pn = qmq(p7, vₓᵧ);
    const pn_ = p7_ * _vₓᵧ + abs($p7) * vₓᵧ_ + 2 * abs($pn);
    const $p8 = 2 * ($p5 + $p6);
    const p8 = qm2(qaq(p5, p6));
    const p8_ = 2 * (p5_ + p6_) + abs($p8);
    const $p9 = $p8 + $pn;
    const p9 = qaq(p8, pn);
    const p9_ = p8_ + pn_ + abs($p9);
    const $pa = $c1 * $vₓ;
    const pa = qmq(c1, vₓ);
    const pa_ = _c1 * vₓ_ + 2 * abs($pa);
    const $pb = $d1 * $vᵧ;
    const pb = qmq(d1, vᵧ);
    const pb_ = _d1 * vᵧ_ + 2 * abs($pb);
    const $pc = $pa + $pb;
    const pc = qaq(pa, pb);
    const pc_ = pa_ + pb_ + abs($pc);
    const $v1 = $p9 + $pc;
    const v1 = qaq(p9, pc);
    const v1_ = p9_ + pc_ + abs($v1);
    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*vₓ + b0**2*vᵧᵧ + b0*vᵧ + v_0
    const $pe = $c0c0 * $vₓₓ;
    const pe = qmq(c0c0, vₓₓ);
    const pe_ = 2 * abs($pe);
    const $pf = $c0d0 * $vₓᵧ;
    const pf = qmq(c0d0, vₓᵧ);
    const pf_ = 2 * abs($pf);
    const $pg = $d0d0 * $vᵧᵧ;
    const pg = qmq(d0d0, vᵧᵧ);
    const pg_ = 2 * abs($pg);
    const $ph = $pe + $pf;
    const ph = qaq(pe, pf);
    const ph_ = pe_ + pf_ + abs($ph);
    const $pi = $ph + $pg;
    const pi = qaq(ph, pg);
    const pi_ = ph_ + pg_ + abs($pi);
    const $pj = c0 * $vₓ;
    const pj = qmd(c0, vₓ);
    const pj_ = _c0 * vₓ_ + abs($pj);
    const $pk = d0 * $vᵧ;
    const pk = qmd(d0, vᵧ);
    const pk_ = _d0 * vᵧ_ + abs($pk);
    const $pl = $pj + $pk;
    const pl = qaq(pj, pk);
    const pl_ = pj_ + pk_ + abs($pl);
    const $pm = $pi + $pl;
    const pm = qaq(pi, pl);
    const pm_ = pi_ + pl_ + abs($pm);
    const $v0 = $pm + $v;
    const v0 = qaq(pm, v);
    const v0_ = pm_ + v_ + abs($v0);
    return {
        coeffs: [v2, v1, v0],
        errBound: [v2_, v1_, v0_] // still to be multiplied by `γγ3`
    };
}
export { getCoeffsBez2Bez1Dd };
//# sourceMappingURL=get-coeffs-bez2-bez1-dd.js.map