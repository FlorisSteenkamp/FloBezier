import { getImplicitForm3 } from "../../../../../src/implicit-form/double/get-implicit-form3";
import { getXY3 } from "../../../../../src/to-power-basis/get-xy/double/get-xy";


/**
 * Returns a polynomial in 1 variable whose roots are the parameter values of 
 * the intersection points of 2 order 3 bezier curves (i.e. 2 cubic bezier 
 * curves).
 * 
 * The returned polynomial degree will be 9
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** none
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
function getCoeffsBez3Bez3(ps1: number[][], ps2: number[][]) {

    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } 
        = getImplicitForm3(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY3(ps2);

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
    const c2d1 = c2*d1;
    const c2c2 = c2*c2;    
    const c2c3 = c2*c3;
    const c2d0 = c2*d0;
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
    const d3d3 = d3*d3;
    const d2d2 = d2*d2;
    const d2d3 = d2*d3;
    const d1d3 = d1*d3;
    
    const v9 =  
        (c3*c3c3)*vₓₓₓ + 
        (c3*d3d3)*vₓᵧᵧ + 
        (d3*c3c3)*vₓₓᵧ + 
        (d3*d3d3)*vᵧᵧᵧ;  

    const v8 =  
        2*c2*c3d3*vₓₓᵧ + 
        2*c3*d2d3*vₓᵧᵧ + 
          c2*d3d3*vₓᵧᵧ + 
          d2*c3c3*vₓₓᵧ + 
        3*c2*c3c3*vₓₓₓ + 
        3*d2*d3d3*vᵧᵧᵧ;  

    const wc = c1c3 + c2c2;
    const wd = d1d3 + d2d2;
    const v7 =  
        vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
        vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
        vₓₓₓ*3*c3*wc +
        vᵧᵧᵧ*3*d3*wd;

    const wo = c2d3 + c3d2;

    const v6 =
        vₓₓᵧ*(d2*c2c2 + 2*c1*wo + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
        vₓᵧᵧ*(c2*d2d2 + 2*d1*wo + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
        vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
        vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
        vₓₓ *c3c3 +
        vᵧᵧ *d3d3 +
        vₓᵧ *c3d3;

    const r4 = c2d2 + c3d1;
    const r5 = c1d3 + c2d2;
    const v5 =
        vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
        vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
        3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
           vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
        vₓᵧ*wo +
        2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);

    const r1 = c1d3 + r4;
    const r2 = 2*c1c3 + c2c2;
    const r3 = 2*d1d3 + d2d2;
    const v4 =
        vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
        vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
        vₓₓₓ*3*(c0*r2 + c2*c1c1) +
        vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
        vₓᵧ*r1 +
        vₓₓ*r2 +
        vᵧᵧ*r3;

    const r6 = c1d2 + c2d1;
    const r7 = c3d0 + c0d3;
    const r8 = c1c2 + c0c3;
    const r9 = d1d2 + d0d3;
    const v3 =
        vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
        vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
        vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
        vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
        vₓᵧ*(r7 + r6) +
        2*(vₓₓ*r8 + vᵧᵧ*r9) +
        vₓ*c3 + vᵧ*d3;
    
    const ra = c1d1 + c2d0;
    const rb = c1d1 + c0d2;
    const v2 =
        vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
        vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
        3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
        3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
        vₓᵧ*(ra + c0d2) +
        vₓₓ*(2*c0c2 + c1c1) + 
        vᵧᵧ*(2*d0d2 + d1d1) +
        c2*vₓ + d2*vᵧ;

    const rc = c1d0 + c0d1;
    const v1 =
        vₓₓᵧ*c0*(rc + c1d0) +
        vₓᵧᵧ*d0*(rc + c0d1) +
        3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
        vₓᵧ*rc +
        2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
        c1*vₓ + d1*vᵧ ;

    // v0
    const v0 = 
        c0c0*((c0*vₓₓₓ + d0*vₓₓᵧ) + vₓₓ) + 
        d0d0*((c0*vₓᵧᵧ + d0*vᵧᵧᵧ) + vᵧᵧ) + 
        c0d0*vₓᵧ + 
        c0*vₓ + 
        d0*vᵧ + 
        v;

    return [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez3Bez3 }
