import { getImplicitForm2 } from "../../../../src/index.js";
import { toPowerBasis1 } from "../../../../src/to-power-basis/to-power-basis/double/to-power-basis.js";


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
function getCoeffsBez2Bez1(
        ps1: number[][], 
        ps2: number[][]) {
            
    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm2(ps1);

    const [[c1,c0],[d1,d0]] = toPowerBasis1(ps2);

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

    // c1c1*vₓₓ + c1d1*vₓᵧ + d1d1*vᵧᵧ
    const p1 = c1c1*vₓₓ;
    const p2 = d1d1*vᵧᵧ;
    const p3 = c1d1*vₓᵧ;
    const p4 = p1 + p2;
    const v2 = p4 + p3;


    // 2*c0c1*vₓₓ + c0d1*vₓᵧ + c1d0*vₓᵧ + c1*vₓ + 2*d0d1*vᵧᵧ + d1*vᵧ
    //const v1 = 
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) + 
    //    (c0d1 + c1d0)*vₓᵧ + 
    //    c1*vₓ + 
    //    d1*vᵧ
    const p5 = c0c1*vₓₓ;
    const p6 = d0d1*vᵧᵧ;
    const p7 = c0d1 + c1d0;
    const pn = p7*vₓᵧ;
    const p8 = 2*(p5 + p6);
    const p9 = p8 + pn;
    const pa = c1*vₓ;
    const pb = d1*vᵧ;
    const pc = pa + pb;
    const v1 = p9 + pc;

    const pe = c0c0*vₓₓ;
    const pf = c0d0*vₓᵧ;
    const pg = d0d0*vᵧᵧ;
    const ph = pe + pf;
    const pi = ph + pg;
    const pj = c0*vₓ;
    const pk = d0*vᵧ;
    const pl = pj + pk;
    const pm = pi + pl;
    const v0 = pm + v;

    return [v2, v1, v0];
}


export { getCoeffsBez2Bez1 }
