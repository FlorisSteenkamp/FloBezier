import { getImplicitForm3WithRunningError } from "../../../../implicit-form/double/get-implicit-form3-with-running-error.js";
import { toPowerBasis1WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";
import { γ1 } from '../../../../error-analysis/error-analysis.js';

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line).
 *
 * The returned polynomial degree will be 3
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 *
 * * intermediate calculations are done in double precision
 * * the error bound returned still needs to be multiplied by `γ1`
 * * the calculation mirrors the double-double version,
 * `getCoeffsBez3Bez1Dd` (from which it was generated), with the error
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
function getCoeffsBez3Bez1(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3WithRunningError(ps1);

    const {
        coeffs: [[c1,c0],[d1,d0]],
        errorBound: [[c1_],[d1_]]  // `c0` and `d0` are error free
    } = toPowerBasis1WithRunningError(ps2);

    const _vₓₓₓ = abs(vₓₓₓ);
    const _vₓₓᵧ = abs(vₓₓᵧ);
    const _vₓᵧᵧ = abs(vₓᵧᵧ);
    const _vᵧᵧᵧ = abs(vᵧᵧᵧ);
    const _vₓᵧ = abs(vₓᵧ);
    const _vₓ = abs(vₓ);
    const _vᵧ = abs(vᵧ);
    const _c1 = abs(c1);
    const _c0 = abs(c0);
    const _d1 = abs(d1);
    const _d0 = abs(d0);
    const c0c0 = c0*c0;
    const _c0c0 = abs(c0c0);
    const c0c0_ = _c0c0;
    const c0c1 = c0*c1;
    const _c0c1 = abs(c0c1);
    const c0c1_ = _c0*c1_ + _c0c1;
    const c0d0 = c0*d0;
    const _c0d0 = abs(c0d0);
    const c0d0_ = _c0d0;
    const c0d1 = c0*d1;
    const _c0d1 = abs(c0d1);
    const c0d1_ = _c0*d1_ + _c0d1;
    const c1c1 = c1*c1;
    const _c1c1 = abs(c1c1);
    const c1c1_ = _c1*c1_ + c1_*(_c1 + γ1*c1_) + _c1c1;
    const c1d0 = c1*d0;
    const _c1d0 = abs(c1d0);
    const c1d0_ = c1_*_d0 + _c1d0;
    const c1d1 = c1*d1;
    const _c1d1 = abs(c1d1);
    const c1d1_ = _c1*d1_ + c1_*(_d1 + γ1*d1_) + _c1d1;
    const d0d0 = d0*d0;
    const _d0d0 = abs(d0d0);
    const d0d0_ = _d0d0;
    const d0d1 = d0*d1;
    const _d0d1 = abs(d0d1);
    const d0d1_ = _d0*d1_ + _d0d1;
    const d1d1 = d1*d1;
    const _d1d1 = abs(d1d1);
    const d1d1_ = _d1*d1_ + d1_*(_d1 + γ1*d1_) + _d1d1;
    const z1 = c0*vₓₓₓ;
    const _z1 = abs(z1);
    const z1_ = _c0*vₓₓₓ_ + _z1;
    const za = 3*c0;
    const _za = abs(za);
    const za_ = _za;
    const z7 = za*vₓₓₓ;
    const _z7 = abs(z7);
    const z7_ = _za*vₓₓₓ_ + za_*(_vₓₓₓ + γ1*vₓₓₓ_) + _z7;
    const z2 = c0*vₓₓᵧ;
    const _z2 = abs(z2);
    const z2_ = _c0*vₓₓᵧ_ + _z2;
    const z3 = d0*vₓₓᵧ;
    const _z3 = abs(z3);
    const z3_ = _d0*vₓₓᵧ_ + _z3;
    const z4 = c0*vₓᵧᵧ;
    const _z4 = abs(z4);
    const z4_ = _c0*vₓᵧᵧ_ + _z4;
    const z5 = d0*vₓᵧᵧ;
    const _z5 = abs(z5);
    const z5_ = _d0*vₓᵧᵧ_ + _z5;
    const z6 = d0*vᵧᵧᵧ;
    const _z6 = abs(z6);
    const z6_ = _d0*vᵧᵧᵧ_ + _z6;
    const zb = 3*d0;
    const _zb = abs(zb);
    const zb_ = _zb;
    const z8 = zb*vᵧᵧᵧ;
    const _z8 = abs(z8);
    const z8_ = _zb*vᵧᵧᵧ_ + zb_*(_vᵧᵧᵧ + γ1*vᵧᵧᵧ_) + _z8;
    const u1 = c1*vₓₓₓ;
    const _u1 = abs(u1);
    const u1_ = _c1*vₓₓₓ_ + c1_*(_vₓₓₓ + γ1*vₓₓₓ_) + _u1;
    const u2 = c1*vₓᵧᵧ;
    const _u2 = abs(u2);
    const u2_ = _c1*vₓᵧᵧ_ + c1_*(_vₓᵧᵧ + γ1*vₓᵧᵧ_) + _u2;
    const u3 = d1*vₓₓᵧ;
    const _u3 = abs(u3);
    const u3_ = _d1*vₓₓᵧ_ + d1_*(_vₓₓᵧ + γ1*vₓₓᵧ_) + _u3;
    const u4 = d1*vᵧᵧᵧ;
    const _u4 = abs(u4);
    const u4_ = _d1*vᵧᵧᵧ_ + d1_*(_vᵧᵧᵧ + γ1*vᵧᵧᵧ_) + _u4;
    const u5 = u1 + u3;
    const _u5 = abs(u5);
    const u5_ = u1_ + u3_ + _u5;
    const u6 = u2 + u4;
    const _u6 = abs(u6);
    const u6_ = u2_ + u4_ + _u6;
    const u7 = c1c1*u5;
    const _u7 = abs(u7);
    const u7_ = _c1c1*u5_ + c1c1_*(_u5 + γ1*u5_) + _u7;
    const u8 = d1d1*u6;
    const _u8 = abs(u8);
    const u8_ = _d1d1*u6_ + d1d1_*(_u6 + γ1*u6_) + _u8;
    const v3 = u7 + u8;
    const _v3 = abs(v3);
    const v3_ = u7_ + u8_ + _v3;
    const u9 = z7 + z3;
    const _u9 = abs(u9);
    const u9_ = z7_ + z3_ + _u9;
    const uaa = z2 + z5;
    const _uaa = abs(uaa);
    const uaa_ = z2_ + z5_ + _uaa;
    const ua = 2*uaa;
    const ua_ = 2*uaa_;
    const ub = z4 + z8;
    const _ub = abs(ub);
    const ub_ = z4_ + z8_ + _ub;
    const uc = u9 + vₓₓ;
    const _uc = abs(uc);
    const uc_ = u9_ + vₓₓ_ + _uc;
    const ud = ua + vₓᵧ;
    const _ud = abs(ud);
    const ud_ = ua_ + vₓᵧ_ + _ud;
    const ue = ub + vᵧᵧ;
    const _ue = abs(ue);
    const ue_ = ub_ + vᵧᵧ_ + _ue;
    const uf = c1c1*uc;
    const _uf = abs(uf);
    const uf_ = _c1c1*uc_ + c1c1_*(_uc + γ1*uc_) + _uf;
    const ug = c1d1*ud;
    const _ug = abs(ug);
    const ug_ = _c1d1*ud_ + c1d1_*(_ud + γ1*ud_) + _ug;
    const uh = d1d1*ue;
    const _uh = abs(uh);
    const uh_ = _d1d1*ue_ + d1d1_*(_ue + γ1*ue_) + _uh;
    const ui = uf + ug;
    const _ui = abs(ui);
    const ui_ = uf_ + ug_ + _ui;
    const v2 = ui + uh;
    const _v2 = abs(v2);
    const v2_ = ui_ + uh_ + _v2;
    const uja = z3 + vₓₓ;
    const _uja = abs(uja);
    const uja_ = z3_ + vₓₓ_ + _uja;
    const uj = 2*uja;
    const uj_ = 2*uja_;
    const uka = z4 + vᵧᵧ;
    const _uka = abs(uka);
    const uka_ = z4_ + vᵧᵧ_ + _uka;
    const uk = 2*uka;
    const uk_ = 2*uka_;
    const un = z7 + uj;
    const _un = abs(un);
    const un_ = z7_ + uj_ + _un;
    const uo = z8 + uk;
    const _uo = abs(uo);
    const uo_ = z8_ + uk_ + _uo;
    const up = z2 + vₓᵧ;
    const _up = abs(up);
    const up_ = z2_ + vₓᵧ_ + _up;
    const uq = z5 + vₓᵧ;
    const _uq = abs(uq);
    const uq_ = z5_ + vₓᵧ_ + _uq;
    const ur = c0c1*un;
    const _ur = abs(ur);
    const ur_ = _c0c1*un_ + c0c1_*(_un + γ1*un_) + _ur;
    const us = d0d1*uo;
    const _us = abs(us);
    const us_ = _d0d1*uo_ + d0d1_*(_uo + γ1*uo_) + _us;
    const ut = c0d1*up;
    const _ut = abs(ut);
    const ut_ = _c0d1*up_ + c0d1_*(_up + γ1*up_) + _ut;
    const uu = c1d0*uq;
    const _uu = abs(uu);
    const uu_ = _c1d0*uq_ + c1d0_*(_uq + γ1*uq_) + _uu;
    const uv = c1*vₓ;
    const _uv = abs(uv);
    const uv_ = _c1*vₓ_ + c1_*(_vₓ + γ1*vₓ_) + _uv;
    const uw = d1*vᵧ;
    const _uw = abs(uw);
    const uw_ = _d1*vᵧ_ + d1_*(_vᵧ + γ1*vᵧ_) + _uw;
    const ux = ur + us;
    const _ux = abs(ux);
    const ux_ = ur_ + us_ + _ux;
    const uy = ut + uu;
    const _uy = abs(uy);
    const uy_ = ut_ + uu_ + _uy;
    const uz = ux + uy;
    const _uz = abs(uz);
    const uz_ = ux_ + uy_ + _uz;
    const u0 = uv + uw;
    const _u0 = abs(u0);
    const u0_ = uv_ + uw_ + _u0;
    const v1 = uz + u0;
    const _v1 = abs(v1);
    const v1_ = uz_ + u0_ + _v1;
    const f1 = z1 + z3;
    const _f1 = abs(f1);
    const f1_ = z1_ + z3_ + _f1;
    const f2 = z6 + z4;
    const _f2 = abs(f2);
    const f2_ = z6_ + z4_ + _f2;
    const f3 = f1 + vₓₓ;
    const _f3 = abs(f3);
    const f3_ = f1_ + vₓₓ_ + _f3;
    const f4 = f2 + vᵧᵧ;
    const _f4 = abs(f4);
    const f4_ = f2_ + vᵧᵧ_ + _f4;
    const f5 = c0c0*f3;
    const _f5 = abs(f5);
    const f5_ = _c0c0*f3_ + c0c0_*(_f3 + γ1*f3_) + _f5;
    const f6 = d0d0*f4;
    const _f6 = abs(f6);
    const f6_ = _d0d0*f4_ + d0d0_*(_f4 + γ1*f4_) + _f6;
    const f7 = c0d0*vₓᵧ;
    const _f7 = abs(f7);
    const f7_ = _c0d0*vₓᵧ_ + c0d0_*(_vₓᵧ + γ1*vₓᵧ_) + _f7;
    const f8 = f5 + f6;
    const _f8 = abs(f8);
    const f8_ = f5_ + f6_ + _f8;
    const f9 = f8 + f7;
    const _f9 = abs(f9);
    const f9_ = f8_ + f7_ + _f9;
    const fa = c0*vₓ;
    const _fa = abs(fa);
    const fa_ = _c0*vₓ_ + _fa;
    const fb = d0*vᵧ;
    const _fb = abs(fb);
    const fb_ = _d0*vᵧ_ + _fb;
    const fc = fa + fb;
    const _fc = abs(fc);
    const fc_ = fa_ + fb_ + _fc;
    const fd = f9 + fc;
    const _fd = abs(fd);
    const fd_ = f9_ + fc_ + _fd;
    const v0 = fd + v;
    const _v0 = abs(v0);
    const v0_ = fd_ + v_ + _v0;

    return {
        coeffs:   [v3, v2, v1, v0],
        errBound: [v3_, v2_, v1_, v0_]  // still to be multiplied by `γ1`
    };
}


export { getCoeffsBez3Bez1 }
