import { γ } from "../../../../../src/error-analysis/error-analysis";
import { getXY } from "../../../../../src/to-power-basis/get-xy";
import { getImplicitForm2InclError } from "../../../../../src/implicit-form/double-with-error-counters/get-implicit-form2-incl-error";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line).
 * 
 * The returned polynomial degree will be 2
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
function getCoeffsBez2Bez1WithRunningError47(
        ps1: number[][], 
        ps2: number[][]) {
            
    const { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2InclError(ps1);

    const _vₓₓ = abs(vₓₓ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vᵧᵧ = abs(vᵧᵧ);

    const [[c1,c0],[d1,d0]] = getXY(ps2);

    const _c0 = abs(c0);
    const _d0 = abs(d0);
    const _c1 = abs(c1);
    const _d1 = abs(d1);

    const c0d1 = c0*d1;
    const c1c1 = c1*c1;
    const d1d1 = d1*d1;
    const c1d1 = c1*d1;
    const c0c1 = c0*c1;
    const d0d1 = d0*d1;
    const c1d0 = c1*d0;
    const c0c0 = c0*c0;
    const c0d0 = c0*d0;
    const d0d0 = d0*d0;

    const _c0d1 = abs(c0d1);
    const _c1c1 = abs(c1c1);
    const _d1d1 = abs(d1d1);
    const _c1d1 = abs(c1d1);
    const _c0c1 = abs(c0c1);
    const _d0d1 = abs(d0d1);
    const _c1d0 = abs(c1d0);
    const _c0c0 = abs(c0c0);
    const _c0d0 = abs(c0d0);
    const _d0d0 = abs(d0d0);


    // c1c1*vₓₓ + c1d1*vₓᵧ + d1d1*vᵧᵧ
    const p1 = c1c1*vₓₓ;
    const p1_ = _c1c1*(_vₓₓ + vₓₓ_) + abs(p1);
    const p2 = d1d1*vᵧᵧ;
    const p2_ = _d1d1*(_vᵧᵧ + vᵧᵧ_) + abs(p2);
    const p3 = c1d1*vₓᵧ;
    const p3_ = _c1d1*(_vₓᵧ + vₓᵧ_) + abs(p3);
    const p4 = p1 + p2;
    const p4_ = p1_ + p2_ + abs(p4);
    const v2 = p4 + p3;
    const v2_ = p4_ + p3_ + abs(v2);


    // 2*c0c1*vₓₓ + c0d1*vₓᵧ + c1d0*vₓᵧ + c1*vₓ + 2*d0d1*vᵧᵧ + d1*vᵧ
    //const v1 = 
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) + 
    //    (c0d1 + c1d0)*vₓᵧ + 
    //    c1*vₓ + 
    //    d1*vᵧ
    const p5 = c0c1*vₓₓ;
    const p5_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(p5);
    const p6 = d0d1*vᵧᵧ;
    const p6_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(p6);
    const p7 = c0d1 + c1d0;
    const _p7 = abs(p7);
    const p7_ = _c0d1 + _c1d0 + _p7;
    const pn = p7*vₓᵧ;
    const pn_ = p7_*_vₓᵧ + _p7*vₓᵧ_ + _p7;
    const p8 = 2*(p5 + p6);
    const p8_ = 2*(p5_ + p6_) + abs(p8);
    const p9 = p8 + pn;
    const p9_ = p8_ + pn_ + abs(p9);
    const pa = c1*vₓ;
    const pa_ = _c1*vₓ_ + abs(pa);
    const pb = d1*vᵧ;
    const pb_ = _d1*vᵧ_ + abs(pb);
    const pc = pa + pb;
    const pc_ = pa_ + pb_ + abs(pc);
    const v1 = p9 + pc;
    const v1_ = p9_ + pc_ + abs(v1);


    // c0c0*vₓₓ + c0d0*vₓᵧ + c0*vₓ + d0d0*vᵧᵧ + d0*vᵧ + v_0
    const pe = c0c0*vₓₓ;
    const pe_ = _c0c0*(_vₓₓ + vₓₓ_) + abs(pe);
    const pf = c0d0*vₓᵧ;
    const pf_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(pf);
    const pg = d0d0*vᵧᵧ;
    const pg_ = _d0d0*(_vᵧᵧ + vᵧᵧ_) + abs(pg);
    const ph = pe + pf;
    const ph_ = pe_ + pf_ + abs(ph);
    const pi = ph + pg;
    const pi_ = ph_ + pg_ + abs(pi);
    const pj = c0*vₓ;
    const pj_ = _c0*vₓ_ + abs(pj);
    const pk = d0*vᵧ;
    const pk_ = _d0*vᵧ_ + abs(pk);
    const pl = pj + pk;
    const pl_ = pj_ + pk_ + abs(pl);
    const pm = pi + pl;
    const pm_ = pi_ + pl_ + abs(pm);
    const v0 = pm + v;
    const v0_ = pm_ + v_ + abs(v0);


    return {
        coeffs:   [v2, v1, v0],
        errBound: [v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez2Bez1WithRunningError47 }
