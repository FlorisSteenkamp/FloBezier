import { getImplicitForm1InclError } from "../../../../implicit-form/double-incl-error/get-implicit-form1-incl-error";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 2 bezier curve (i.e. a line and a quadratic bezier curve).
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
function getCoeffsBez1Bez2InclError(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ } // vₓ_, vᵧ_ === 0
    } = getImplicitForm1InclError(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    // a2*v_x + b2*v_y
    //const v2 = c2*vₓ + d2*vᵧ;
    const p1 = c2*vₓ;
    const p1_ = abs(p1);  // vₓ_ === 0
    const p2 = d2*vᵧ;
    const p2_ = abs(p2);  // vᵧ_ === 0
    const v2 = p1 + p2;
    const v2_ = p1_ + p2_ + abs(v2);

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const p3 = c1*vₓ;
    const p3_ = abs(p3);  // vₓ_ === 0
    const p4 = d1*vᵧ;
    const p4_ = abs(p4);  // vᵧ_ === 0
    const v1 = p3 + p4;
    const v1_ = p3_ + p4_ + abs(v1);

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p5 = c0*vₓ;
    const p5_ = abs(p5);  // vₓ_ === 0
    const p6 = d0*vᵧ;
    const p6_ = abs(p6);  // vᵧ_ === 0
    const p7 = p5 + p6;
    const p7_ = p5_ + p6_ + abs(p7);
    const v0 = p7 + v;
    const v0_ = p7_ + v_ + abs(v0);


    return {
        coeffs:   [v2, v1, v0],
        errBound: [v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez1Bez2InclError }
