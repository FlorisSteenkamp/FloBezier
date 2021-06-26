import { getImplicitForm2InclError } from "../../../../../src/implicit-form/double-incl-error/get-implicit-form2-incl-error";
import { γ } from "../../../../../src/error-analysis/error-analysis";
import { getXY } from "../../../../../src/to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of 2 order 
 * 2 bezier curves (i.e. 2 quadratic bezier curves).
 * 
 * The returned polynomial degree will be 4
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
function getCoeffsBez2Bez2WithRunningError47(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2InclError(ps1);

    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    const _c0 = abs(c0);
    const _d0 = abs(d0);
    const _c1 = abs(c1);
    const _d1 = abs(d1);
    const _c2 = abs(c2);
    const _d2 = abs(d2);

    const c0c0 = c0*c0;
    const c0d0 = c0*d0;
    const d0d0 = d0*d0;
    const c0c1 = c0*c1;
    const c0d1 = c0*d1;
    const c1c2 = c1*c2;    
    const c1d2 = c1*d2;
    const c1d0 = c1*d0;    
    const c2c2 = c2*c2;
    const c2d1 = c2*d1;
    const c2d2 = c2*d2;
    const d0d1 = d0*d1;
    const d1d2 = d1*d2;    
    const d2d2 = d2*d2;    
    const c0c2 = c0*c2;
    const c1c1 = c1*c1;
    const d0d2 = d0*d2;
    const d1d1 = d1*d1;
    const c0d2 = c0*d2;
    const c1d1 = c1*d1;
    const c2d0 = c2*d0;

    const _c2c2 = abs(c2c2);
    const _c2d2 = abs(c2d2);
    const _d2d2 = abs(d2d2);
    const _c1c2 = abs(c1c2);
    const _d1d2 = abs(d1d2);
    const _c1d2 = abs(c1d2);
    const _c2d1 = abs(c2d1);
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
    
    
    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    //const v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    const p1 = c2c2*vₓₓ;
    const p1_ = _c2c2*(_vₓₓ + vₓₓ_) + abs(p1);
    const p2 = c2d2*vₓᵧ;
    const p2_ = _c2d2*(_vₓᵧ + vₓᵧ_) + abs(p2);
    const p3 = d2d2*vᵧᵧ;
    const p3_ = _d2d2*(_vᵧᵧ + vᵧᵧ_) + abs(p3);
    const p4 = p1 + p2;
    const p4_ = p1_ + p2_ + abs(p4);
    const v4 = p4 + p3;
    const v4_ = p4_ + p3_ + abs(v4);

        
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    //const v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    const p5 = c1c2*vₓₓ;
    const p5_ = _c1c2*(_vₓₓ + vₓₓ_) + abs(p5);
    const p6 = d1d2*vᵧᵧ;
    const p6_ = _d1d2*(_vᵧᵧ + vᵧᵧ_) + abs(p6);
    const p7 = c1d2 + c2d1;
    const _p7 = abs(p7);
    const p7_ = _c1d2 + _c2d1 + _p7;
    const p8 = p7*vₓᵧ;
    const p8_ = p7_*_vₓᵧ + _p7*vₓᵧ_ + abs(p8);
    const p9 = 2*(p5 + p6);
    const p9_ = 2*(p5_ + p6_) + abs(p9);
    const v3 = p9 + p8;
    const v3_ = p9_ + p8_ + abs(v3);
        
    
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //const v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    const pa = 2*c0c2 + c1c1;
    const _pa = abs(pa);
    const pa_ = 2*_c0c2 + _c1c1 + _pa;
    const pb = 2*d0d2 + d1d1;
    const _pb = abs(pb);
    const pb_ = 2*_d0d2 + _d1d1 + _pb;
    const pc = c0d2 + c1d1;
    const _pc = abs(pc);
    const pc_ = _c0d2 + _c1d1 + _pc;
    const pd = pc + c2d0;
    const _pd = abs(pd);
    const pd_ = pc_ + _c2d0 + _pd;
    const pe = pa*vₓₓ;
    const pe_ = pa_*_vₓₓ + _pa*vₓₓ_ + abs(pe);
    const pf = pb*vᵧᵧ;
    const pf_ = pb_*_vᵧᵧ + _pb*vᵧᵧ_ + abs(pf);
    const pg = pd*vₓᵧ;
    const pg_ = pd_*_vₓᵧ + _pd*vₓᵧ_ + abs(pg);
    const ph = c2*vₓ;
    const ph_ = _c2*vₓ_ + abs(ph);
    const pi = d2*vᵧ;
    const pi_ = _d2*vᵧ_ + abs(pi);
    const pj = pe + pf;
    const pj_ = pe_ + pf_ + abs(pj);
    const pk = pj + pg;
    const pk_ = pj_ + pg_ + abs(pk);
    const pl = ph + pi;
    const pl_ = ph_ + pi_ + abs(pl);
    const v2 = pk + pl;
    const v2_ = pk_ + pl_ + abs(v2);


    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    const pm = c0c1*vₓₓ;
    const pm_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(pm);
    const pn = d0d1*vᵧᵧ;
    const pn_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(pn);
    const po = c0d1 + c1d0;
    const _po = abs(po);
    const po_ = _c0d1 + _c1d0 + _po;
    const pp = po*vₓᵧ;
    const pp_ = po_*_vₓᵧ + _po*vₓᵧ_ + abs(pp);
    const pq = 2*(pm + pn);
    const pq_ = 2*(pm_ + pn_) + abs(pq);
    const pr = c1*vₓ;
    const pr_ = _c1*vₓ_ + abs(pr);
    const ps = d1*vᵧ;
    const ps_ = _d1*vᵧ_ + abs(ps);
    const pt = pq + pp;
    const pt_ = pq_ + pp_ + abs(pt);
    const pu = pr + ps;
    const pu_ = pr_ + ps_ + abs(pu);
    const v1 = pt + pu;
    const v1_ = pt_ + pu_ + abs(v1);

    
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    const pv = c0c0*vₓₓ;
    const pv_ = _c0c0*(_vₓₓ + vₓₓ_) + abs(pv);
    const pw = c0d0*vₓᵧ;
    const pw_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(pw);
    const px = d0d0*vᵧᵧ;
    const px_ = _d0d0*(_vᵧᵧ + vᵧᵧ_) + abs(px);
    const py = c0*vₓ;
    const py_ = _c0*vₓ_ + abs(py);
    const pz = d0*vᵧ;
    const pz_ = _d0*vᵧ_ + abs(pz);
    const q1 = pv + pw;
    const q1_ = pv_ + pw_ + abs(q1);
    const q2 = q1 + px;
    const q2_ = q1_ + px_ + abs(q2);
    const q3 = py + pz;
    const q3_ = py_ + pz_ + abs(q3);
    const q4 = q2 + q3;
    const q4_ = q2_ + q3_ + abs(q4);
    const v0 = q4 + v;
    const v0_ = q4_ + v_ + abs(v0);


    return {
        coeffs:   [v4, v3, v2, v1, v0],
        errBound: [v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez2Bez2WithRunningError47 }
