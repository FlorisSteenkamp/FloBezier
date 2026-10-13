import { getImplicitForm2WithRunningError } from "../../../../implicit-form/double/get-implicit-form2-with-running-error.js";
import { toPowerBasis2WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";
import { γ1 } from '../../../../error-analysis/error-analysis.js';

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 2 bezier curve (i.e. a quadratic bezier curve and a quadratic bezier curve).
 *
 * The returned polynomial degree will be 4
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision
 * * the error bound returned still needs to be multiplied by `γ1`
 * * the calculation mirrors the double-double version,
 * `getCoeffsBez2Bez2Dd` (from which it was generated), with the error
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
function getCoeffsBez2Bez2(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2WithRunningError(ps1);

    const {
        coeffs: [[c2,c1,c0],[d2,d1,d0]],
        errorBound: [[c2_, c1_],[d2_, d1_]]  // `c0` and `d0` are error free
    } = toPowerBasis2WithRunningError(ps2);

    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);
    const _vₓ = abs(vₓ);
    const _vᵧ = abs(vᵧ);
    const _c2 = abs(c2);
    const _c1 = abs(c1);
    const _c0 = abs(c0);
    const _d2 = abs(d2);
    const _d1 = abs(d1);
    const _d0 = abs(d0);
    const c0c0 = c0*c0;
    const _c0c0 = abs(c0c0);
    const c0c0_ = _c0c0;
    const c0c1 = c0*c1;
    const _c0c1 = abs(c0c1);
    const c0c1_ = _c0*c1_ + _c0c1;
    const c0c2 = c0*c2;
    const _c0c2 = abs(c0c2);
    const c0c2_ = _c0*c2_ + _c0c2;
    const c0d0 = c0*d0;
    const _c0d0 = abs(c0d0);
    const c0d0_ = _c0d0;
    const c0d1 = c0*d1;
    const _c0d1 = abs(c0d1);
    const c0d1_ = _c0*d1_ + _c0d1;
    const c0d2 = c0*d2;
    const _c0d2 = abs(c0d2);
    const c0d2_ = _c0*d2_ + _c0d2;
    const c1c1 = c1*c1;
    const _c1c1 = abs(c1c1);
    const c1c1_ = _c1*c1_ + c1_*(_c1 + γ1*c1_) + _c1c1;
    const c1c2 = c1*c2;
    const _c1c2 = abs(c1c2);
    const c1c2_ = _c1*c2_ + c1_*(_c2 + γ1*c2_) + _c1c2;
    const c1d0 = c1*d0;
    const _c1d0 = abs(c1d0);
    const c1d0_ = c1_*_d0 + _c1d0;
    const c1d1 = c1*d1;
    const _c1d1 = abs(c1d1);
    const c1d1_ = _c1*d1_ + c1_*(_d1 + γ1*d1_) + _c1d1;
    const c1d2 = c1*d2;
    const _c1d2 = abs(c1d2);
    const c1d2_ = _c1*d2_ + c1_*(_d2 + γ1*d2_) + _c1d2;
    const c2d1 = c2*d1;
    const _c2d1 = abs(c2d1);
    const c2d1_ = _c2*d1_ + c2_*(_d1 + γ1*d1_) + _c2d1;
    const c2c2 = c2*c2;
    const _c2c2 = abs(c2c2);
    const c2c2_ = _c2*c2_ + c2_*(_c2 + γ1*c2_) + _c2c2;
    const c2d0 = c2*d0;
    const _c2d0 = abs(c2d0);
    const c2d0_ = c2_*_d0 + _c2d0;
    const c2d2 = c2*d2;
    const _c2d2 = abs(c2d2);
    const c2d2_ = _c2*d2_ + c2_*(_d2 + γ1*d2_) + _c2d2;
    const d0d0 = d0*d0;
    const _d0d0 = abs(d0d0);
    const d0d0_ = _d0d0;
    const d0d1 = d0*d1;
    const _d0d1 = abs(d0d1);
    const d0d1_ = _d0*d1_ + _d0d1;
    const d0d2 = d0*d2;
    const _d0d2 = abs(d0d2);
    const d0d2_ = _d0*d2_ + _d0d2;
    const d1d1 = d1*d1;
    const _d1d1 = abs(d1d1);
    const d1d1_ = _d1*d1_ + d1_*(_d1 + γ1*d1_) + _d1d1;
    const d1d2 = d1*d2;
    const _d1d2 = abs(d1d2);
    const d1d2_ = _d1*d2_ + d1_*(_d2 + γ1*d2_) + _d1d2;
    const d2d2 = d2*d2;
    const _d2d2 = abs(d2d2);
    const d2d2_ = _d2*d2_ + d2_*(_d2 + γ1*d2_) + _d2d2;
    const p1 = c2c2*vₓₓ;
    const _p1 = abs(p1);
    const p1_ = _c2c2*vₓₓ_ + c2c2_*(_vₓₓ + γ1*vₓₓ_) + _p1;
    const p2 = c2d2*vₓᵧ;
    const _p2 = abs(p2);
    const p2_ = _c2d2*vₓᵧ_ + c2d2_*(_vₓᵧ + γ1*vₓᵧ_) + _p2;
    const p3 = d2d2*vᵧᵧ;
    const _p3 = abs(p3);
    const p3_ = _d2d2*vᵧᵧ_ + d2d2_*(_vᵧᵧ + γ1*vᵧᵧ_) + _p3;
    const p4 = p1 + p2;
    const _p4 = abs(p4);
    const p4_ = p1_ + p2_ + _p4;
    const v4 = p4 + p3;
    const _v4 = abs(v4);
    const v4_ = p4_ + p3_ + _v4;
    const p5 = c1c2*vₓₓ;
    const _p5 = abs(p5);
    const p5_ = _c1c2*vₓₓ_ + c1c2_*(_vₓₓ + γ1*vₓₓ_) + _p5;
    const p6 = d1d2*vᵧᵧ;
    const _p6 = abs(p6);
    const p6_ = _d1d2*vᵧᵧ_ + d1d2_*(_vᵧᵧ + γ1*vᵧᵧ_) + _p6;
    const p7 = c1d2 + c2d1;
    const _p7 = abs(p7);
    const p7_ = c1d2_ + c2d1_ + _p7;
    const p8 = p7*vₓᵧ;
    const _p8 = abs(p8);
    const p8_ = _p7*vₓᵧ_ + p7_*(_vₓᵧ + γ1*vₓᵧ_) + _p8;
    const p9a = p5 + p6;
    const _p9a = abs(p9a);
    const p9a_ = p5_ + p6_ + _p9a;
    const p9 = 2*p9a;
    const p9_ = 2*p9a_;
    const v3 = p9 + p8;
    const _v3 = abs(v3);
    const v3_ = p9_ + p8_ + _v3;
    const paa = 2*c0c2;
    const paa_ = 2*c0c2_;
    const pa = paa + c1c1;
    const _pa = abs(pa);
    const pa_ = paa_ + c1c1_ + _pa;
    const pba = 2*d0d2;
    const pba_ = 2*d0d2_;
    const pb = pba + d1d1;
    const _pb = abs(pb);
    const pb_ = pba_ + d1d1_ + _pb;
    const pc = c0d2 + c1d1;
    const _pc = abs(pc);
    const pc_ = c0d2_ + c1d1_ + _pc;
    const pd = pc + c2d0;
    const _pd = abs(pd);
    const pd_ = pc_ + c2d0_ + _pd;
    const pe = pa*vₓₓ;
    const _pe = abs(pe);
    const pe_ = _pa*vₓₓ_ + pa_*(_vₓₓ + γ1*vₓₓ_) + _pe;
    const pf = pb*vᵧᵧ;
    const _pf = abs(pf);
    const pf_ = _pb*vᵧᵧ_ + pb_*(_vᵧᵧ + γ1*vᵧᵧ_) + _pf;
    const pg = pd*vₓᵧ;
    const _pg = abs(pg);
    const pg_ = _pd*vₓᵧ_ + pd_*(_vₓᵧ + γ1*vₓᵧ_) + _pg;
    const ph = c2*vₓ;
    const _ph = abs(ph);
    const ph_ = _c2*vₓ_ + c2_*(_vₓ + γ1*vₓ_) + _ph;
    const pi = d2*vᵧ;
    const _pi = abs(pi);
    const pi_ = _d2*vᵧ_ + d2_*(_vᵧ + γ1*vᵧ_) + _pi;
    const pj = pe + pf;
    const _pj = abs(pj);
    const pj_ = pe_ + pf_ + _pj;
    const pk = pj + pg;
    const _pk = abs(pk);
    const pk_ = pj_ + pg_ + _pk;
    const pl = ph + pi;
    const _pl = abs(pl);
    const pl_ = ph_ + pi_ + _pl;
    const v2 = pk + pl;
    const _v2 = abs(v2);
    const v2_ = pk_ + pl_ + _v2;
    const pm = c0c1*vₓₓ;
    const _pm = abs(pm);
    const pm_ = _c0c1*vₓₓ_ + c0c1_*(_vₓₓ + γ1*vₓₓ_) + _pm;
    const pn = d0d1*vᵧᵧ;
    const _pn = abs(pn);
    const pn_ = _d0d1*vᵧᵧ_ + d0d1_*(_vᵧᵧ + γ1*vᵧᵧ_) + _pn;
    const po = c0d1 + c1d0;
    const _po = abs(po);
    const po_ = c0d1_ + c1d0_ + _po;
    const pp = po*vₓᵧ;
    const _pp = abs(pp);
    const pp_ = _po*vₓᵧ_ + po_*(_vₓᵧ + γ1*vₓᵧ_) + _pp;
    const pqa = pm + pn;
    const _pqa = abs(pqa);
    const pqa_ = pm_ + pn_ + _pqa;
    const pq = 2*pqa;
    const pq_ = 2*pqa_;
    const pr = c1*vₓ;
    const _pr = abs(pr);
    const pr_ = _c1*vₓ_ + c1_*(_vₓ + γ1*vₓ_) + _pr;
    const ps = d1*vᵧ;
    const _ps = abs(ps);
    const ps_ = _d1*vᵧ_ + d1_*(_vᵧ + γ1*vᵧ_) + _ps;
    const pt = pq + pp;
    const _pt = abs(pt);
    const pt_ = pq_ + pp_ + _pt;
    const pu = pr + ps;
    const _pu = abs(pu);
    const pu_ = pr_ + ps_ + _pu;
    const v1 = pt + pu;
    const _v1 = abs(v1);
    const v1_ = pt_ + pu_ + _v1;
    const pv = c0c0*vₓₓ;
    const _pv = abs(pv);
    const pv_ = _c0c0*vₓₓ_ + c0c0_*(_vₓₓ + γ1*vₓₓ_) + _pv;
    const pw = c0d0*vₓᵧ;
    const _pw = abs(pw);
    const pw_ = _c0d0*vₓᵧ_ + c0d0_*(_vₓᵧ + γ1*vₓᵧ_) + _pw;
    const px = d0d0*vᵧᵧ;
    const _px = abs(px);
    const px_ = _d0d0*vᵧᵧ_ + d0d0_*(_vᵧᵧ + γ1*vᵧᵧ_) + _px;
    const py = c0*vₓ;
    const _py = abs(py);
    const py_ = _c0*vₓ_ + _py;
    const pz = d0*vᵧ;
    const _pz = abs(pz);
    const pz_ = _d0*vᵧ_ + _pz;
    const q1 = pv + pw;
    const _q1 = abs(q1);
    const q1_ = pv_ + pw_ + _q1;
    const q2 = q1 + px;
    const _q2 = abs(q2);
    const q2_ = q1_ + px_ + _q2;
    const q3 = py + pz;
    const _q3 = abs(q3);
    const q3_ = py_ + pz_ + _q3;
    const q4 = q2 + q3;
    const _q4 = abs(q4);
    const q4_ = q2_ + q3_ + _q4;
    const v0 = q4 + v;
    const _v0 = abs(v0);
    const v0_ = q4_ + v_ + _v0;

    return {
        coeffs:   [v4, v3, v2, v1, v0],
        errBound: [v4_, v3_, v2_, v1_, v0_]  // still to be multiplied by `γ1`
    };
}


export { getCoeffsBez2Bez2 }
