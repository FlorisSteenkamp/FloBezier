import { getImplicitForm2 } from "../../../../implicit-form/double/get-implicit-form2";
import { getXY } from "../../../../to-power-basis/get-xy";


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
function getCoeffsBez2Bez2(ps1: number[][], ps2: number[][]) {
    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } 
        = getImplicitForm2(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

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

    //const v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    const p1 = c2c2*vₓₓ;
    const p2 = c2d2*vₓᵧ;
    const p3 = d2d2*vᵧᵧ;
    const p4 = p1 + p2;
    const v4 = p4 + p3;
        
    //const v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    const p5 = c1c2*vₓₓ;
    const p6 = d1d2*vᵧᵧ;
    const p7 = c1d2 + c2d1;
    const p8 = p7*vₓᵧ;
    const p9 = 2*(p5 + p6);
    const v3 = p9 + p8;
    
    //const v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    const pa = 2*c0c2 + c1c1;
    const pb = 2*d0d2 + d1d1;
    const pc = c0d2 + c1d1;
    const pd = pc + c2d0;
    const pe = pa*vₓₓ;
    const pf = pb*vᵧᵧ;
    const pg = pd*vₓᵧ;
    const ph = c2*vₓ;
    const pi = d2*vᵧ;
    const pj = pe + pf;
    const pk = pj + pg;
    const pl = ph + pi;
    const v2 = pk + pl;

    //const v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    const pm = c0c1*vₓₓ;
    const pn = d0d1*vᵧᵧ;
    const po = c0d1 + c1d0;
    const pp = po*vₓᵧ;
    const pq = 2*(pm + pn);
    const pr = c1*vₓ;
    const ps = d1*vᵧ;
    const pt = pq + pp;
    const pu = pr + ps;
    const v1 = pt + pu;
    
    //const v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    const pv = c0c0*vₓₓ;
    const pw = c0d0*vₓᵧ;
    const px = d0d0*vᵧᵧ;
    const py = c0*vₓ;
    const pz = d0*vᵧ;
    const q1 = pv + pw;
    const q2 = q1 + px;
    const q3 = py + pz;
    const q4 = q2 + q3;
    const v0 = q4 + v;

    return [v4, v3, v2, v1, v0];
}


export { getCoeffsBez2Bez2 }
