import { getImplicitForm3 } from "../../../../../src/implicit-form/double/get-implicit-form3";
import { getXY1 } from "../../../../../src/to-power-basis/get-xy/double/get-xy";


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line).
 * 
 * The returned polynomial degree will be 3
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
function getCoeffsBez3Bez1(ps1: number[][], ps2: number[][]) {
    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } 
        = getImplicitForm3(ps1);

    const [[c1,c0],[d1,d0]] = getXY1(ps2);



    const c0c0 = c0*c0;
    const c0c1 = c0*c1;
    const c0d0 = c0*d0;
    const c0d1 = c0*d1;
    const c1c1 = c1*c1;
    const c1d0 = c1*d0;
    const c1d1 = c1*d1;
    const d0d0 = d0*d0;
    const d0d1 = d0*d1;
    const d1d1 = d1*d1;


    const z1 = c0*vₓₓₓ;
    const z7 = (3*c0)*vₓₓₓ;
    const z2 = c0*vₓₓᵧ;
    const z3 = d0*vₓₓᵧ;
    const z4 = c0*vₓᵧᵧ;
    const z5 = d0*vₓᵧᵧ;
    const z6 = d0*vᵧᵧᵧ;
    const z8 = (3*d0)*vᵧᵧᵧ;


    //const v3 =
    //    c1c1*(c1*vₓₓₓ + d1*vₓₓᵧ) +
    //    d1d1*(c1*vₓᵧᵧ + d1*vᵧᵧᵧ);
    const u1 = c1*vₓₓₓ;
    const u2 = c1*vₓᵧᵧ;
    const u3 = d1*vₓₓᵧ;
    const u4 = d1*vᵧᵧᵧ;
    const u5 = u1 + u3;
    const u6 = u2 + u4;
    const u7 = c1c1*u5;
    const u8 = d1d1*u6;
    const v3 = u7 + u8;


    //const v2 =
    //    c1c1*(3*c0*vₓₓₓ +   d0*vₓₓᵧ + vₓₓ) +
    //    c1d1*(2*c0*vₓₓᵧ + 2*d0*vₓᵧᵧ + vₓᵧ) +
    //    d1d1*(  c0*vₓᵧᵧ + 3*d0*vᵧᵧᵧ + vᵧᵧ);
    //const v2 =
    //    c1c1*(3*z1 +   z3 + vₓₓ) +
    //    c1d1*(2*z2 + 2*z5 + vₓᵧ) +
    //    d1d1*(  z4 + 3*z6 + vᵧᵧ);
    const u9 = z7 + z3;
    const ua = 2*(z2 + z5);
    const ub = z4 + z8;
    const uc = u9 + vₓₓ;
    const ud = ua + vₓᵧ;
    const ue = ub + vᵧᵧ;
    const uf = c1c1*uc;
    const ug = c1d1*ud;
    const uh = d1d1*ue;
    const ui = uf + ug;
    const v2 = ui + uh;


    //const v1 =
    //    c0c1*(3*c0*vₓₓₓ + 2*(d0*vₓₓᵧ + vₓₓ)) +
    //    d0d1*(3*d0*vᵧᵧᵧ + 2*(c0*vₓᵧᵧ + vᵧᵧ)) +
    //    c0d1*(c0*vₓₓᵧ + vₓᵧ) +
    //    c1d0*(d0*vₓᵧᵧ + vₓᵧ) +
    //    vₓ*c1 +
    //    vᵧ*d1;
    const uj = 2*(z3 + vₓₓ);
    const uk = 2*(z4 + vᵧᵧ);
    const un = z7 + uj;
    const uo = z8 + uk;
    const up = z2 + vₓᵧ;
    const uq = z5 + vₓᵧ;
    const ur = c0c1*un;
    const us = d0d1*uo;
    const ut = c0d1*up;
    const uu = c1d0*uq;
    const uv = c1*vₓ;
    const uw = d1*vᵧ;
    const ux = ur + us;
    const uy = ut + uu;
    const uz = ux + uy;
    const u0 = uv + uw;
    const v1 = uz + u0;


    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(d0*vᵧᵧᵧ + c0*vₓᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    //const v0 =
    //    c0c0*(z1 + z3 + vₓₓ) +
    //    d0d0*(z6 + z4 + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    const f1 = z1 + z3;
    const f2 = z6 + z4;
    const f3 = f1 + vₓₓ;
    const f4 = f2 + vᵧᵧ;
    const f5 = c0c0*f3;
    const f6 = d0d0*f4;
    const f7 = c0d0*vₓᵧ;
    const f8 = f5 + f6;
    const f9 = f8 + f7;
    const fa = c0*vₓ;
    const fb = d0*vᵧ;
    const fc = fa + fb;
    const fd = f9 + fc;
    const v0 = fd + v;

    return [v3, v2, v1, v0];
}


export { getCoeffsBez3Bez1 }
