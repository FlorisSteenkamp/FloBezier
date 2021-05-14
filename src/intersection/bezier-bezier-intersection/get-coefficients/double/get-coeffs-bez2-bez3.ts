import { getImplicitForm2 } from "../../../../implicit-form/double/get-implicit-form2";
import { getXY } from "../../../../to-power-basis/get-xy";


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
function getCoeffsBez2Bez3(ps1: number[][], ps2: number[][]) {
    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } 
        = getImplicitForm2(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

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

    // c3**2*vₓₓ + c3*d3*vₓᵧ + d3**2*vᵧᵧ
    //const v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    const p1 = c3c3*vₓₓ;
    const p2 = c3d3*vₓᵧ;
    const p3 = d3d3*vᵧᵧ;
    const p4 = p1 + p2;
    const v6 = p4 + p3;

    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //const v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    (c2d3 + c3d2)*vₓᵧ;
    const p5 = c2c3*vₓₓ;
    const p6 = d2d3*vᵧᵧ;
    const p7 = p5 + p6;
    const p8 = c2d3 + c3d2;
    const p9 = p8*vₓᵧ;
    const v5 = 2*p7 + p9;


    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //const v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    const pa = 2*c1c3 + c2c2;
    const pb = 2*d1d3 + d2d2;
    const pc = c1d3 + c2d2;
    const pd = pc + c3d1;
    const pe = pa*vₓₓ;
    const pf = pb*vᵧᵧ;
    const pg = pe + pf;
    const rp = pd*vₓᵧ;
    const v4 = pg + rp;


    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    //const v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    const ph = c0c3 + c1c2;
    const pi = d0d3 + d1d2;
    const pj = c0d3 + c1d2;
    const pk = c2d1 + c3d0;
    const pl = pj + pk;
    const pm = ph*vₓₓ;
    const pn = pi*vᵧᵧ;
    const po = 2*(pm + pn);
    const pp = pl*vₓᵧ;
    const rn = c3*vₓ;
    const ro = d3*vᵧ;
    const pq = rn + ro;
    const pr = po + pp;
    const v3 = pr + pq;

    
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    //const v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    const ps = 2*c0c2 + c1c1;
    const pt = 2*d0d2 + d1d1;
    const pu = c0d2 + c1d1;
    const pv = pu + c2d0;
    const pw = ps*vₓₓ;
    const px = pt*vᵧᵧ;
    const py = pv*vₓᵧ;
    const pz = pw + px;
    const r1 = pz + py;
    const r2 = c2*vₓ;
    const r3 = d2*vᵧ;
    const r4 = r2 + r3;
    const v2 = r1 + r4;


    //const v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    const r5 = c0c1*vₓₓ;
    const r6 = d0d1*vᵧᵧ;
    const r7 = c0d1 + c1d0;
    const r8 = r7*vₓᵧ;
    const r9 = 2*(r5 + r6);
    const ra = r9 + r8;
    const rb = c1*vₓ;
    const rc = d1*vᵧ;
    const rd = rb + rc;
    const v1 = ra + rd;
    
    

    //const v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const re = c0c0*vₓₓ;
    const rf = c0d0*vₓᵧ;
    const rg = d0d0*vᵧᵧ;
    const rh = c0*vₓ;
    const ri = d0*vᵧ;
    const rj = re + rf;
    const rk = rj + rg;
    const rl = rh + ri;
    const rm = rk + rl;
    const v0 = rm + v;

    return [v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez2Bez3 }
