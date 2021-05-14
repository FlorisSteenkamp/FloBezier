import { getImplicitForm1 } from "../../../../implicit-form/double/get-implicit-form1";
import { getXY } from "../../../../to-power-basis/get-xy";


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of two 
 * order 1 bezier curves (i.e. 2 lines).
 * 
 * The returned polynomial degree will be 1 
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
function getCoeffsBez1Bez1(ps1: number[][], ps2: number[][]) {
    const { vₓ, vᵧ, v } = getImplicitForm1(ps1);

    const [[c1,c0],[d1,d0]] = getXY(ps2);

    //const v1 = c1*vₓ + d1*vᵧ;
    const p1 = c1*vₓ;
    const p2 = d1*vᵧ;
    const v1 = p1 + p2;

    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p3 = c0*vₓ;
    const p4 = d0*vᵧ;
    const p5 = p3 + p4;
    const v0 = p5 + v;

    return [v1, v0];
}


export { getCoeffsBez1Bez1 }
