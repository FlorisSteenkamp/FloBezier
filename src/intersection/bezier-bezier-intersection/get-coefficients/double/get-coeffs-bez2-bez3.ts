import { getImplicitForm2WithRunningError } from "../../../../implicit-form/double/get-implicit-form2-with-running-error.js";
import { toPowerBasis3WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";
import { γ1 } from '../../../../error-analysis/error-analysis.js';

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve).
 *
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision
 * * the error bound returned still needs to be multiplied by `γ1`
 * * the calculation mirrors the double-double version,
 * `getCoeffsBez2Bez3Dd` (from which it was generated), with the error
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
function getCoeffsBez2Bez3(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2WithRunningError(ps1);

    const {
        coeffs: [[c3,c2,c1,c0],[d3,d2,d1,d0]],
        errorBound: [[c3_, c2_, c1_],[d3_, d2_, d1_]]  // `c0` and `d0` are error free
    } = toPowerBasis3WithRunningError(ps2);

    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);
    const _vₓ = abs(vₓ);
    const _vᵧ = abs(vᵧ);
    const _c3 = abs(c3);
    const _c2 = abs(c2);
    const _c1 = abs(c1);
    const _c0 = abs(c0);
    const _d3 = abs(d3);
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
    const c0c3 = c0*c3;
    const _c0c3 = abs(c0c3);
    const c0c3_ = _c0*c3_ + _c0c3;
    const c0d0 = c0*d0;
    const _c0d0 = abs(c0d0);
    const c0d0_ = _c0d0;
    const c0d1 = c0*d1;
    const _c0d1 = abs(c0d1);
    const c0d1_ = _c0*d1_ + _c0d1;
    const c0d2 = c0*d2;
    const _c0d2 = abs(c0d2);
    const c0d2_ = _c0*d2_ + _c0d2;
    const c0d3 = c0*d3;
    const _c0d3 = abs(c0d3);
    const c0d3_ = _c0*d3_ + _c0d3;
    const c1c1 = c1*c1;
    const _c1c1 = abs(c1c1);
    const c1c1_ = _c1*c1_ + c1_*(_c1 + γ1*c1_) + _c1c1;
    const c1c2 = c1*c2;
    const _c1c2 = abs(c1c2);
    const c1c2_ = _c1*c2_ + c1_*(_c2 + γ1*c2_) + _c1c2;
    const c1c3 = c1*c3;
    const _c1c3 = abs(c1c3);
    const c1c3_ = _c1*c3_ + c1_*(_c3 + γ1*c3_) + _c1c3;
    const c1d0 = c1*d0;
    const _c1d0 = abs(c1d0);
    const c1d0_ = c1_*_d0 + _c1d0;
    const c1d1 = c1*d1;
    const _c1d1 = abs(c1d1);
    const c1d1_ = _c1*d1_ + c1_*(_d1 + γ1*d1_) + _c1d1;
    const c1d2 = c1*d2;
    const _c1d2 = abs(c1d2);
    const c1d2_ = _c1*d2_ + c1_*(_d2 + γ1*d2_) + _c1d2;
    const c1d3 = c1*d3;
    const _c1d3 = abs(c1d3);
    const c1d3_ = _c1*d3_ + c1_*(_d3 + γ1*d3_) + _c1d3;
    const c2d1 = c2*d1;
    const _c2d1 = abs(c2d1);
    const c2d1_ = _c2*d1_ + c2_*(_d1 + γ1*d1_) + _c2d1;
    const c2c2 = c2*c2;
    const _c2c2 = abs(c2c2);
    const c2c2_ = _c2*c2_ + c2_*(_c2 + γ1*c2_) + _c2c2;
    const c2c3 = c2*c3;
    const _c2c3 = abs(c2c3);
    const c2c3_ = _c2*c3_ + c2_*(_c3 + γ1*c3_) + _c2c3;
    const c2d0 = c2*d0;
    const _c2d0 = abs(c2d0);
    const c2d0_ = c2_*_d0 + _c2d0;
    const c2d2 = c2*d2;
    const _c2d2 = abs(c2d2);
    const c2d2_ = _c2*d2_ + c2_*(_d2 + γ1*d2_) + _c2d2;
    const c2d3 = c2*d3;
    const _c2d3 = abs(c2d3);
    const c2d3_ = _c2*d3_ + c2_*(_d3 + γ1*d3_) + _c2d3;
    const c3c3 = c3*c3;
    const _c3c3 = abs(c3c3);
    const c3c3_ = _c3*c3_ + c3_*(_c3 + γ1*c3_) + _c3c3;
    const c3d0 = c3*d0;
    const _c3d0 = abs(c3d0);
    const c3d0_ = c3_*_d0 + _c3d0;
    const c3d1 = c3*d1;
    const _c3d1 = abs(c3d1);
    const c3d1_ = _c3*d1_ + c3_*(_d1 + γ1*d1_) + _c3d1;
    const c3d2 = c3*d2;
    const _c3d2 = abs(c3d2);
    const c3d2_ = _c3*d2_ + c3_*(_d2 + γ1*d2_) + _c3d2;
    const c3d3 = c3*d3;
    const _c3d3 = abs(c3d3);
    const c3d3_ = _c3*d3_ + c3_*(_d3 + γ1*d3_) + _c3d3;
    const d0d0 = d0*d0;
    const _d0d0 = abs(d0d0);
    const d0d0_ = _d0d0;
    const d0d1 = d0*d1;
    const _d0d1 = abs(d0d1);
    const d0d1_ = _d0*d1_ + _d0d1;
    const d0d2 = d0*d2;
    const _d0d2 = abs(d0d2);
    const d0d2_ = _d0*d2_ + _d0d2;
    const d0d3 = d0*d3;
    const _d0d3 = abs(d0d3);
    const d0d3_ = _d0*d3_ + _d0d3;
    const d1d1 = d1*d1;
    const _d1d1 = abs(d1d1);
    const d1d1_ = _d1*d1_ + d1_*(_d1 + γ1*d1_) + _d1d1;
    const d1d2 = d1*d2;
    const _d1d2 = abs(d1d2);
    const d1d2_ = _d1*d2_ + d1_*(_d2 + γ1*d2_) + _d1d2;
    const d3d3 = d3*d3;
    const _d3d3 = abs(d3d3);
    const d3d3_ = _d3*d3_ + d3_*(_d3 + γ1*d3_) + _d3d3;
    const d2d2 = d2*d2;
    const _d2d2 = abs(d2d2);
    const d2d2_ = _d2*d2_ + d2_*(_d2 + γ1*d2_) + _d2d2;
    const d2d3 = d2*d3;
    const _d2d3 = abs(d2d3);
    const d2d3_ = _d2*d3_ + d2_*(_d3 + γ1*d3_) + _d2d3;
    const d1d3 = d1*d3;
    const _d1d3 = abs(d1d3);
    const d1d3_ = _d1*d3_ + d1_*(_d3 + γ1*d3_) + _d1d3;
    const p1 = c3c3*vₓₓ;
    const _p1 = abs(p1);
    const p1_ = _c3c3*vₓₓ_ + c3c3_*(_vₓₓ + γ1*vₓₓ_) + _p1;
    const p2 = c3d3*vₓᵧ;
    const _p2 = abs(p2);
    const p2_ = _c3d3*vₓᵧ_ + c3d3_*(_vₓᵧ + γ1*vₓᵧ_) + _p2;
    const p3 = d3d3*vᵧᵧ;
    const _p3 = abs(p3);
    const p3_ = _d3d3*vᵧᵧ_ + d3d3_*(_vᵧᵧ + γ1*vᵧᵧ_) + _p3;
    const p4 = p1 + p2;
    const _p4 = abs(p4);
    const p4_ = p1_ + p2_ + _p4;
    const v6 = p4 + p3;
    const _v6 = abs(v6);
    const v6_ = p4_ + p3_ + _v6;
    const p5 = c2c3*vₓₓ;
    const _p5 = abs(p5);
    const p5_ = _c2c3*vₓₓ_ + c2c3_*(_vₓₓ + γ1*vₓₓ_) + _p5;
    const p6 = d2d3*vᵧᵧ;
    const _p6 = abs(p6);
    const p6_ = _d2d3*vᵧᵧ_ + d2d3_*(_vᵧᵧ + γ1*vᵧᵧ_) + _p6;
    const p7 = p5 + p6;
    const _p7 = abs(p7);
    const p7_ = p5_ + p6_ + _p7;
    const p8 = c2d3 + c3d2;
    const _p8 = abs(p8);
    const p8_ = c2d3_ + c3d2_ + _p8;
    const p9 = p8*vₓᵧ;
    const _p9 = abs(p9);
    const p9_ = _p8*vₓᵧ_ + p8_*(_vₓᵧ + γ1*vₓᵧ_) + _p9;
    const v5a = 2*p7;
    const v5a_ = 2*p7_;
    const v5 = v5a + p9;
    const _v5 = abs(v5);
    const v5_ = v5a_ + p9_ + _v5;
    const paa = 2*c1c3;
    const paa_ = 2*c1c3_;
    const pa = paa + c2c2;
    const _pa = abs(pa);
    const pa_ = paa_ + c2c2_ + _pa;
    const pba = 2*d1d3;
    const pba_ = 2*d1d3_;
    const pb = pba + d2d2;
    const _pb = abs(pb);
    const pb_ = pba_ + d2d2_ + _pb;
    const pc = c1d3 + c2d2;
    const _pc = abs(pc);
    const pc_ = c1d3_ + c2d2_ + _pc;
    const pd = pc + c3d1;
    const _pd = abs(pd);
    const pd_ = pc_ + c3d1_ + _pd;
    const pe = pa*vₓₓ;
    const _pe = abs(pe);
    const pe_ = _pa*vₓₓ_ + pa_*(_vₓₓ + γ1*vₓₓ_) + _pe;
    const pf = pb*vᵧᵧ;
    const _pf = abs(pf);
    const pf_ = _pb*vᵧᵧ_ + pb_*(_vᵧᵧ + γ1*vᵧᵧ_) + _pf;
    const pg = pe + pf;
    const _pg = abs(pg);
    const pg_ = pe_ + pf_ + _pg;
    const rp = pd*vₓᵧ;
    const _rp = abs(rp);
    const rp_ = _pd*vₓᵧ_ + pd_*(_vₓᵧ + γ1*vₓᵧ_) + _rp;
    const v4 = pg + rp;
    const _v4 = abs(v4);
    const v4_ = pg_ + rp_ + _v4;
    const ph = c0c3 + c1c2;
    const _ph = abs(ph);
    const ph_ = c0c3_ + c1c2_ + _ph;
    const pi = d0d3 + d1d2;
    const _pi = abs(pi);
    const pi_ = d0d3_ + d1d2_ + _pi;
    const pj = c0d3 + c1d2;
    const _pj = abs(pj);
    const pj_ = c0d3_ + c1d2_ + _pj;
    const pk = c2d1 + c3d0;
    const _pk = abs(pk);
    const pk_ = c2d1_ + c3d0_ + _pk;
    const pl = pj + pk;
    const _pl = abs(pl);
    const pl_ = pj_ + pk_ + _pl;
    const pm = ph*vₓₓ;
    const _pm = abs(pm);
    const pm_ = _ph*vₓₓ_ + ph_*(_vₓₓ + γ1*vₓₓ_) + _pm;
    const pn = pi*vᵧᵧ;
    const _pn = abs(pn);
    const pn_ = _pi*vᵧᵧ_ + pi_*(_vᵧᵧ + γ1*vᵧᵧ_) + _pn;
    const poa = pm + pn;
    const _poa = abs(poa);
    const poa_ = pm_ + pn_ + _poa;
    const po = 2*poa;
    const po_ = 2*poa_;
    const pp = pl*vₓᵧ;
    const _pp = abs(pp);
    const pp_ = _pl*vₓᵧ_ + pl_*(_vₓᵧ + γ1*vₓᵧ_) + _pp;
    const rn = c3*vₓ;
    const _rn = abs(rn);
    const rn_ = _c3*vₓ_ + c3_*(_vₓ + γ1*vₓ_) + _rn;
    const ro = d3*vᵧ;
    const _ro = abs(ro);
    const ro_ = _d3*vᵧ_ + d3_*(_vᵧ + γ1*vᵧ_) + _ro;
    const pq = rn + ro;
    const _pq = abs(pq);
    const pq_ = rn_ + ro_ + _pq;
    const pr = po + pp;
    const _pr = abs(pr);
    const pr_ = po_ + pp_ + _pr;
    const v3 = pr + pq;
    const _v3 = abs(v3);
    const v3_ = pr_ + pq_ + _v3;
    const psa = 2*c0c2;
    const psa_ = 2*c0c2_;
    const ps = psa + c1c1;
    const _ps = abs(ps);
    const ps_ = psa_ + c1c1_ + _ps;
    const pta = 2*d0d2;
    const pta_ = 2*d0d2_;
    const pt = pta + d1d1;
    const _pt = abs(pt);
    const pt_ = pta_ + d1d1_ + _pt;
    const pu = c0d2 + c1d1;
    const _pu = abs(pu);
    const pu_ = c0d2_ + c1d1_ + _pu;
    const pv = pu + c2d0;
    const _pv = abs(pv);
    const pv_ = pu_ + c2d0_ + _pv;
    const pw = ps*vₓₓ;
    const _pw = abs(pw);
    const pw_ = _ps*vₓₓ_ + ps_*(_vₓₓ + γ1*vₓₓ_) + _pw;
    const px = pt*vᵧᵧ;
    const _px = abs(px);
    const px_ = _pt*vᵧᵧ_ + pt_*(_vᵧᵧ + γ1*vᵧᵧ_) + _px;
    const py = pv*vₓᵧ;
    const _py = abs(py);
    const py_ = _pv*vₓᵧ_ + pv_*(_vₓᵧ + γ1*vₓᵧ_) + _py;
    const pz = pw + px;
    const _pz = abs(pz);
    const pz_ = pw_ + px_ + _pz;
    const r1 = pz + py;
    const _r1 = abs(r1);
    const r1_ = pz_ + py_ + _r1;
    const r2 = c2*vₓ;
    const _r2 = abs(r2);
    const r2_ = _c2*vₓ_ + c2_*(_vₓ + γ1*vₓ_) + _r2;
    const r3 = d2*vᵧ;
    const _r3 = abs(r3);
    const r3_ = _d2*vᵧ_ + d2_*(_vᵧ + γ1*vᵧ_) + _r3;
    const r4 = r2 + r3;
    const _r4 = abs(r4);
    const r4_ = r2_ + r3_ + _r4;
    const v2 = r1 + r4;
    const _v2 = abs(v2);
    const v2_ = r1_ + r4_ + _v2;
    const r5 = c0c1*vₓₓ;
    const _r5 = abs(r5);
    const r5_ = _c0c1*vₓₓ_ + c0c1_*(_vₓₓ + γ1*vₓₓ_) + _r5;
    const r6 = d0d1*vᵧᵧ;
    const _r6 = abs(r6);
    const r6_ = _d0d1*vᵧᵧ_ + d0d1_*(_vᵧᵧ + γ1*vᵧᵧ_) + _r6;
    const r7 = c0d1 + c1d0;
    const _r7 = abs(r7);
    const r7_ = c0d1_ + c1d0_ + _r7;
    const r8 = r7*vₓᵧ;
    const _r8 = abs(r8);
    const r8_ = _r7*vₓᵧ_ + r7_*(_vₓᵧ + γ1*vₓᵧ_) + _r8;
    const r9a = r5 + r6;
    const _r9a = abs(r9a);
    const r9a_ = r5_ + r6_ + _r9a;
    const r9 = 2*r9a;
    const r9_ = 2*r9a_;
    const ra = r9 + r8;
    const _ra = abs(ra);
    const ra_ = r9_ + r8_ + _ra;
    const rb = c1*vₓ;
    const _rb = abs(rb);
    const rb_ = _c1*vₓ_ + c1_*(_vₓ + γ1*vₓ_) + _rb;
    const rc = d1*vᵧ;
    const _rc = abs(rc);
    const rc_ = _d1*vᵧ_ + d1_*(_vᵧ + γ1*vᵧ_) + _rc;
    const rd = rb + rc;
    const _rd = abs(rd);
    const rd_ = rb_ + rc_ + _rd;
    const v1 = ra + rd;
    const _v1 = abs(v1);
    const v1_ = ra_ + rd_ + _v1;
    const re = c0c0*vₓₓ;
    const _re = abs(re);
    const re_ = _c0c0*vₓₓ_ + c0c0_*(_vₓₓ + γ1*vₓₓ_) + _re;
    const rf = c0d0*vₓᵧ;
    const _rf = abs(rf);
    const rf_ = _c0d0*vₓᵧ_ + c0d0_*(_vₓᵧ + γ1*vₓᵧ_) + _rf;
    const rg = d0d0*vᵧᵧ;
    const _rg = abs(rg);
    const rg_ = _d0d0*vᵧᵧ_ + d0d0_*(_vᵧᵧ + γ1*vᵧᵧ_) + _rg;
    const rh = c0*vₓ;
    const _rh = abs(rh);
    const rh_ = _c0*vₓ_ + _rh;
    const ri = d0*vᵧ;
    const _ri = abs(ri);
    const ri_ = _d0*vᵧ_ + _ri;
    const rj = re + rf;
    const _rj = abs(rj);
    const rj_ = re_ + rf_ + _rj;
    const rk = rj + rg;
    const _rk = abs(rk);
    const rk_ = rj_ + rg_ + _rk;
    const rl = rh + ri;
    const _rl = abs(rl);
    const rl_ = rh_ + ri_ + _rl;
    const rm = rk + rl;
    const _rm = abs(rm);
    const rm_ = rk_ + rl_ + _rm;
    const v0 = rm + v;
    const _v0 = abs(v0);
    const v0_ = rm_ + v_ + _v0;

    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [v6_, v5_, v4_, v3_, v2_, v1_, v0_]  // still to be multiplied by `γ1`
    };
}


export { getCoeffsBez2Bez3 }
