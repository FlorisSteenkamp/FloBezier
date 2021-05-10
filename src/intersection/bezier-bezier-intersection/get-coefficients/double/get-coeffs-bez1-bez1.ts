import { getImplicitForm1 } from "../../../../implicit-form/double/get-implicit-form1";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


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
    let { 
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ } // vₓ_, vᵧ_ === 0
    } = getImplicitForm1(ps1);

    let [[c1,c0],[d1,d0]] = getXY(ps2);


    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p1 = c1*vₓ;
    let p1_ = abs(p1);  // vₓ_ === 0
    let p2 = d1*vᵧ;
    let p2_ = abs(p2);  // vᵧ_ === 0
    let v1 = p1 + p2;
    let v1_ = p1_ + p2_ + abs(v1);

    // v0 = a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p3 = c0*vₓ;
    let p3_ = abs(p3);  // vₓ_ === 0
    let p4 = d0*vᵧ;
    let p4_ = abs(p4);  // vᵧ_ === 0
    let p5 = p3 + p4;
    let p5_ = p3_ + p4_ + abs(p5);
    let v0 = p5 + v;
    let v0_ = p5_ + v_ + abs(v0);    


    return {
        coeffs:   [v1, v0],
        errBound: [v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffsBez1Bez1 }
