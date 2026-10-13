import { getImplicitForm2WithRunningError } from "../../../../implicit-form/double/get-implicit-form2-with-running-error.js";
import { toPowerBasis1WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";
import { γ1 } from '../../../../error-analysis/error-analysis.js';
const { abs } = Math;
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line).
 *
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision
 * * the error bound returned still needs to be multiplied by `γ1`
 * * the calculation mirrors the double-double version,
 * `getCoeffsBez2Bez1Dd` (from which it was generated), with the error
 * bounds calculated using the standard running error rules: `a_ + b_ + |a ± b|`
 * for sums and `_a*b_ + a_*(_b + γ1*b_) + |a*b|` for products (where `_x` and
 * `x_` are the magnitude and the error bound of `x` respectively)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
function getCoeffsBez2Bez1(ps1, ps2) {
    const { coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v }, errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } } = getImplicitForm2WithRunningError(ps1);
    const { coeffs: [[c1, c0], [d1, d0]], errorBound: [[c1_], [d1_]] // `c0` and `d0` are error free
     } = toPowerBasis1WithRunningError(ps2);
    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);
    const _vₓ = abs(vₓ);
    const _vᵧ = abs(vᵧ);
    const _c1 = abs(c1);
    const _c0 = abs(c0);
    const _d1 = abs(d1);
    const _d0 = abs(d0);
    const c0c0 = c0 * c0;
    const _c0c0 = abs(c0c0);
    const c0c0_ = _c0c0;
    const c0c1 = c0 * c1;
    const _c0c1 = abs(c0c1);
    const c0c1_ = _c0 * c1_ + _c0c1;
    const c0d0 = c0 * d0;
    const _c0d0 = abs(c0d0);
    const c0d0_ = _c0d0;
    const c0d1 = c0 * d1;
    const _c0d1 = abs(c0d1);
    const c0d1_ = _c0 * d1_ + _c0d1;
    const c1c1 = c1 * c1;
    const _c1c1 = abs(c1c1);
    const c1c1_ = _c1 * c1_ + c1_ * (_c1 + γ1 * c1_) + _c1c1;
    const c1d0 = c1 * d0;
    const _c1d0 = abs(c1d0);
    const c1d0_ = c1_ * _d0 + _c1d0;
    const c1d1 = c1 * d1;
    const _c1d1 = abs(c1d1);
    const c1d1_ = _c1 * d1_ + c1_ * (_d1 + γ1 * d1_) + _c1d1;
    const d0d0 = d0 * d0;
    const _d0d0 = abs(d0d0);
    const d0d0_ = _d0d0;
    const d0d1 = d0 * d1;
    const _d0d1 = abs(d0d1);
    const d0d1_ = _d0 * d1_ + _d0d1;
    const d1d1 = d1 * d1;
    const _d1d1 = abs(d1d1);
    const d1d1_ = _d1 * d1_ + d1_ * (_d1 + γ1 * d1_) + _d1d1;
    const p1 = c1c1 * vₓₓ;
    const _p1 = abs(p1);
    const p1_ = _c1c1 * vₓₓ_ + c1c1_ * (_vₓₓ + γ1 * vₓₓ_) + _p1;
    const p2 = d1d1 * vᵧᵧ;
    const _p2 = abs(p2);
    const p2_ = _d1d1 * vᵧᵧ_ + d1d1_ * (_vᵧᵧ + γ1 * vᵧᵧ_) + _p2;
    const p3 = c1d1 * vₓᵧ;
    const _p3 = abs(p3);
    const p3_ = _c1d1 * vₓᵧ_ + c1d1_ * (_vₓᵧ + γ1 * vₓᵧ_) + _p3;
    const p4 = p1 + p2;
    const _p4 = abs(p4);
    const p4_ = p1_ + p2_ + _p4;
    const v2 = p4 + p3;
    const _v2 = abs(v2);
    const v2_ = p4_ + p3_ + _v2;
    const p5 = c0c1 * vₓₓ;
    const _p5 = abs(p5);
    const p5_ = _c0c1 * vₓₓ_ + c0c1_ * (_vₓₓ + γ1 * vₓₓ_) + _p5;
    const p6 = d0d1 * vᵧᵧ;
    const _p6 = abs(p6);
    const p6_ = _d0d1 * vᵧᵧ_ + d0d1_ * (_vᵧᵧ + γ1 * vᵧᵧ_) + _p6;
    const p7 = c0d1 + c1d0;
    const _p7 = abs(p7);
    const p7_ = c0d1_ + c1d0_ + _p7;
    const pn = p7 * vₓᵧ;
    const _pn = abs(pn);
    const pn_ = _p7 * vₓᵧ_ + p7_ * (_vₓᵧ + γ1 * vₓᵧ_) + _pn;
    const p8a = p5 + p6;
    const _p8a = abs(p8a);
    const p8a_ = p5_ + p6_ + _p8a;
    const p8 = 2 * p8a;
    const p8_ = 2 * p8a_;
    const p9 = p8 + pn;
    const _p9 = abs(p9);
    const p9_ = p8_ + pn_ + _p9;
    const pa = c1 * vₓ;
    const _pa = abs(pa);
    const pa_ = _c1 * vₓ_ + c1_ * (_vₓ + γ1 * vₓ_) + _pa;
    const pb = d1 * vᵧ;
    const _pb = abs(pb);
    const pb_ = _d1 * vᵧ_ + d1_ * (_vᵧ + γ1 * vᵧ_) + _pb;
    const pc = pa + pb;
    const _pc = abs(pc);
    const pc_ = pa_ + pb_ + _pc;
    const v1 = p9 + pc;
    const _v1 = abs(v1);
    const v1_ = p9_ + pc_ + _v1;
    const pe = c0c0 * vₓₓ;
    const _pe = abs(pe);
    const pe_ = _c0c0 * vₓₓ_ + c0c0_ * (_vₓₓ + γ1 * vₓₓ_) + _pe;
    const pf = c0d0 * vₓᵧ;
    const _pf = abs(pf);
    const pf_ = _c0d0 * vₓᵧ_ + c0d0_ * (_vₓᵧ + γ1 * vₓᵧ_) + _pf;
    const pg = d0d0 * vᵧᵧ;
    const _pg = abs(pg);
    const pg_ = _d0d0 * vᵧᵧ_ + d0d0_ * (_vᵧᵧ + γ1 * vᵧᵧ_) + _pg;
    const ph = pe + pf;
    const _ph = abs(ph);
    const ph_ = pe_ + pf_ + _ph;
    const pi = ph + pg;
    const _pi = abs(pi);
    const pi_ = ph_ + pg_ + _pi;
    const pj = c0 * vₓ;
    const _pj = abs(pj);
    const pj_ = _c0 * vₓ_ + _pj;
    const pk = d0 * vᵧ;
    const _pk = abs(pk);
    const pk_ = _d0 * vᵧ_ + _pk;
    const pl = pj + pk;
    const _pl = abs(pl);
    const pl_ = pj_ + pk_ + _pl;
    const pm = pi + pl;
    const _pm = abs(pm);
    const pm_ = pi_ + pl_ + _pm;
    const v0 = pm + v;
    const _v0 = abs(v0);
    const v0_ = pm_ + v_ + _v0;
    return {
        coeffs: [v2, v1, v0],
        errBound: [v2_, v1_, v0_] // still to be multiplied by `γ1`
    };
}
export { getCoeffsBez2Bez1 };
//# sourceMappingURL=get-coeffs-bez2-bez1.js.map