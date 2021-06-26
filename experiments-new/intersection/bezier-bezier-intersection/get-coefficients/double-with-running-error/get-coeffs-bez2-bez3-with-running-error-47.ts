import { getImplicitForm2InclError } from "../../../../../src/implicit-form/double-with-error-counters/get-implicit-form2-incl-error";
import { γ } from "../../../../../src/error-analysis/error-analysis";
import { getXY } from "../../../../../src/to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve).
 * 
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * intermediate calculations are done in double precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez2Bez3WithRunningError47(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2InclError(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    const _c0 = abs(c0);
    const _d0 = abs(d0);
    const _c1 = abs(c1);
    const _d1 = abs(d1);
    const _c2 = abs(c2);
    const _d2 = abs(d2);
    const _c3 = abs(c3);
    const _d3 = abs(d3);

    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);

    const c0c0 = c0*c0;
    const c0c1 = c0*c1;
    const c0c2 = c0*c2;
    const c0c3 = c0*c3;
    const c0d0 = c0*d0;
    const c0d1 = c0*d1;
    const c0d2 = c0*d2;
    const c0d3 = c0*d3;
    const c1c1 = c1*c1;
    const c1c2 = c1*c2;
    const c1c3 = c1*c3;
    const c1d0 = c1*d0;
    const c1d1 = c1*d1;
    const c1d2 = c1*d2;
    const c1d3 = c1*d3;
    const c2c2 = c2*c2;
    const c2c3 = c2*c3;
    const c2d0 = c2*d0;
    const c2d1 = c2*d1;
    const c2d2 = c2*d2;
    const c2d3 = c2*d3;
    const c3c3 = c3*c3;
    const c3d0 = c3*d0;
    const c3d1 = c3*d1;
    const c3d2 = c3*d2;
    const c3d3 = c3*d3;
    const d0d0 = d0*d0;
    const d0d1 = d0*d1;    
    const d0d2 = d0*d2;
    const d0d3 = d0*d3;
    const d1d1 = d1*d1;
    const d1d2 = d1*d2;
    const d1d3 = d1*d3;
    const d2d2 = d2*d2;
    const d2d3 = d2*d3;
    const d3d3 = d3*d3;

    const _c1c3 = abs(c1c3);
    const _c1d3 = abs(c1d3);
    const _c2c2 = abs(c2c2);
    const _c2c3 = abs(c2c3);
    const _c2d2 = abs(c2d2);
    const _c2d3 = abs(c2d3);
    const _c3c3 = abs(c3c3);
    const _c3d1 = abs(c3d1);
    const _c3d2 = abs(c3d2);
    const _c3d3 = abs(c3d3);
    const _d1d3 = abs(d1d3);
    const _d2d2 = abs(d2d2);
    const _d2d3 = abs(d2d3);
    const _d3d3 = abs(d3d3);
    const _c0c3 = abs(c0c3);
    const _c1c2 = abs(c1c2);
    const _d0d3 = abs(d0d3);
    const _d1d2 = abs(d1d2);
    const _c0d3 = abs(c0d3);
    const _c1d2 = abs(c1d2);
    const _c2d1 = abs(c2d1);
    const _c3d0 = abs(c3d0);
    const _c0c2 = abs(c0c2);
    const _c1c1 = abs(c1c1);
    const _d0d2 = abs(d0d2);
    const _d1d1 = abs(d1d1);
    const _c0d2 = abs(c0d2);
    const _c1d1 = abs(c1d1);
    const _c2d0 = abs(c2d0);
    const _c0c1 = abs(c0c1);
    const _d0d1 = abs(d0d1);
    const _c0d1 = abs(c0d1);
    const _c1d0 = abs(c1d0);
    const _c0c0 = abs(c0c0);
    const _c0d0 = abs(c0d0);
    const _d0d0 = abs(d0d0);


    // c3**2*vₓₓ + c3*d3*vₓᵧ + d3**2*vᵧᵧ
    //const v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    const p1 = c3c3*vₓₓ;
    const p1_ = _c3c3*(_vₓₓ + vₓₓ_) + abs(p1);
    const p2 = c3d3*vₓᵧ;
    const p2_ = _c3d3*(_vₓᵧ + vₓᵧ_) + abs(p2);
    const p3 = d3d3*vᵧᵧ;
    const p3_ = _d3d3*(_vᵧᵧ + vᵧᵧ_) + abs(p3);
    const p4 = p1 + p2;
    const p4_ = p1_ + p2_ + abs(p4);
    const v6 = p4 + p3;
    const v6_ = p4_ + p3_ + abs(v6);


    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //const v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    (c2d3 + c3d2)*vₓᵧ;
    const p5 = c2c3*vₓₓ;
    const p5_ = _c2c3*(_vₓₓ + vₓₓ_) + abs(p5);
    const p6 = d2d3*vᵧᵧ;
    const p6_ = _d2d3*(_vᵧᵧ + vᵧᵧ_) + abs(p6);
    const p7 = p5 + p6;
    const p7_ = p5_ + p6_ + abs(p7);
    const p8 = c2d3 + c3d2;
    const _p8 = abs(p8);
    const p8_ = _c2d3 + _c3d2 + _p8;
    const p9 = p8*vₓᵧ;
    const p9_ = p8_*_vₓᵧ + _p8*vₓᵧ_ + abs(p9);
    const v5 = 2*p7 + p9;
    const v5_ = 2*p7_ + p9_ + abs(v5);


    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //const v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    const pa = 2*c1c3 + c2c2;
    const _pa = abs(pa);
    const pa_ = 2*_c1c3 + _c2c2 + _pa;
    const pb = 2*d1d3 + d2d2;
    const _pb = abs(pb);
    const pb_ = 2*_d1d3 + _d2d2 + _pb;
    const pc = c1d3 + c2d2;
    const pc_ = _c1d3 + _c2d2 + abs(pc);
    const pd = pc + c3d1;
    const _pd = abs(pd);
    const pd_ = pc_ + _c3d1 + _pd;
    const pe = pa*vₓₓ;
    const pe_ = pa_*vₓₓ_ + _pa*vₓₓ_ + abs(pe);
    const pf = pb*vᵧᵧ;
    const pf_ = pb_*vᵧᵧ_ + _pb*vᵧᵧ_ + abs(pf);
    const pg = pe + pf;
    const pg_ = pe_ + pf_ + abs(pg);
    const rp = pd*vₓᵧ;
    const rp_ = pd_*_vₓᵧ + _pd*vₓᵧ_ + abs(rp);
    const v4 = pg + rp;
    const v4_ = pg_ + rp_ + abs(v4);


    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    // a3*v_x + 2*b0*b3*vᵧᵧ + 2*b1*b2*vᵧᵧ + b3*v_y
    //const v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    const ph = c0c3 + c1c2;
    const _ph = abs(ph);
    const ph_ = _c0c3 + _c1c2 + _ph;
    const pi = d0d3 + d1d2;
    const _pi = abs(pi);
    const pi_ = _d0d3 + _d1d2 + _pi;
    const pj = c0d3 + c1d2;
    const pj_ = _c0d3 + _c1d2 + abs(pj);
    const pk = c2d1 + c3d0;
    const pk_ = _c2d1 + _c3d0 + abs(pk);
    const pl = pj + pk;
    const _pl = abs(pl);
    const pl_ = pj_ + pk_ + _pl;
    const pm = ph*vₓₓ;
    const pm_ = ph_*_vₓₓ + _ph*vₓₓ_ + abs(pm);
    const pn = pi*vᵧᵧ;
    const pn_ = pi_*_vᵧᵧ + _pi*vᵧᵧ_ + abs(pn);
    const po = 2*(pm + pn);
    const po_ = 2*(pm_ + pn_) + abs(po);
    const pp = pl*vₓᵧ;
    const pp_ = pl_*_vₓᵧ + _pl*vₓᵧ_ + abs(pp);
    const rn = c3*vₓ;
    const rn_ = _c3*vₓ_ + abs(rn);
    const ro = d3*vᵧ;
    const ro_ = _d3*vᵧ_ + abs(ro);
    const pq = rn + ro;
    const pq_ = rn_ + ro_ + abs(pq);
    const pr = po + pp;
    const pr_ = po_ + pp_ + abs(pr);
    const v3 = pr + pq;
    const v3_ = pr_ + pq_ + abs(v3);

    
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    // a1*b1*vₓᵧ + a2*b0*vₓᵧ + a2*v_x + 
    // 2*b0*b2*vᵧᵧ + b1**2*vᵧᵧ + b2*v_y
    //const v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    const ps = 2*c0c2 + c1c1;
    const _ps = abs(ps);
    const ps_ = 2*_c0c2 + _c1c1 + _ps;
    const pt = 2*d0d2 + d1d1;
    const _pt = abs(pt);
    const pt_ = 2*_d0d2 + _d1d1 + _pt;
    const pu = c0d2 + c1d1;
    const pu_ = _c0d2 + _c1d1 + abs(pu);
    const pv = pu + c2d0;
    const _pv = abs(pv);
    const pv_ = pu_ + _c2d0 + _pv;
    const pw = ps*vₓₓ;
    const pw_ = ps_*_vₓₓ + _ps*vₓₓ_ + abs(pw);
    const px = pt*vᵧᵧ;
    const px_ = pt_*_vᵧᵧ + _pt*vᵧᵧ_ + abs(px);
    const py = pv*vₓᵧ;
    const py_ = pv_*_vₓᵧ + _pv*vₓᵧ_ + abs(py);
    const pz = pw + px;
    const pz_ = pw_ + px_ + abs(pz);
    const r1 = pz + py;
    const r1_ = pz_ + py_ + abs(r1);
    const r2 = c2*vₓ;
    const r2_ = _c2*vₓ_ + abs(r2);
    const r3 = d2*vᵧ;
    const r3_ = _d2*vᵧ_ + abs(r3);
    const r4 = r2 + r3;
    const r4_ = r2_ + r3_ + abs(r4);
    const v2 = r1 + r4;
    const v2_ = r1_ + r4_ + abs(v2);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*v_x + 2*b0*b1*vᵧᵧ + b1*v_y
    //const v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    const r5 = c0c1*vₓₓ;
    const r5_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(r5);
    const r6 = d0d1*vᵧᵧ;
    const r6_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(r6);
    const r7 = c0d1 + c1d0;
    const _r7 = abs(r7);
    const r7_ = _c0d1 + _c1d0 + _r7;
    const r8 = r7*vₓᵧ;
    const r8_ = r7_*_vₓᵧ + _r7*vₓᵧ_ + abs(r8);
    const r9 = 2*(r5 + r6);
    const r9_ = 2*(r5_ + r6_) + abs(r9);
    const ra = r9 + r8;
    const ra_ = r9_ + r8_ + abs(ra);
    const rb = c1*vₓ;
    const rb_ = _c1*vₓ_ + abs(rb);
    const rc = d1*vᵧ;
    const rc_ = _d1*vᵧ_ + abs(rc);
    const rd = rb + rc;
    const rd_ = rb_ + rc_ + abs(rd);
    const v1 = ra + rd;
    const v1_ = ra_ + rd_ + abs(v1);
    
    

    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*v_x + b0**2*vᵧᵧ + b0*v_y + v_0
    //const v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const re = c0c0*vₓₓ;
    const re_ = _c0c0*(_vₓₓ + vₓₓ_) + abs(re);
    const rf = c0d0*vₓᵧ;
    const rf_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(rf);
    const rg = d0d0*vᵧᵧ;
    const rg_ = _d0d0*(_vᵧᵧ + vᵧᵧ_) + abs(rg);
    const rh = c0*vₓ;
    const rh_ = _c0*vₓ_ + abs(rh);
    const ri = d0*vᵧ;
    const ri_ = _d0*vᵧ_ + abs(ri);
    const rj = re + rf;
    const rj_ = re_ + rf_ + abs(rj);
    const rk = rj + rg;
    const rk_ = rj_ + rg_ + abs(rk);
    const rl = rh + ri;
    const rl_ = rh_ + ri_ + abs(rl);
    const rm = rk + rl;
    const rm_ = rk_ + rl_ + abs(rm);
    const v0 = rm + v;
    const v0_ = rm_ + v_ + abs(v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez2Bez3WithRunningError47 }
