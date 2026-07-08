import { getImplicitForm1WithRunningError } from "../../../../implicit-form/double/get-implicit-form1-with-running-error.js";
import { toPowerBasis2WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 2 bezier curve (i.e. a line and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * intermediate calculations are done in double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @internal
 */
function getCoeffsBez1Bez2(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ } 
    } = getImplicitForm1WithRunningError(ps1);

    const {
        coeffs: [[c2,c1,c0],[d2,d1,d0]],
        errorBound: [[c2_,c1_],[d2_,d1_]]  // `c0` and `d0` are error free
    } = toPowerBasis2WithRunningError(ps2);

    const _vₓ = abs(vₓ);
    const _vᵧ = abs(vᵧ);

    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _c2 = abs(c2);
    const _d0 = abs(d0);
    const _d1 = abs(d1);
    const _d2 = abs(d2);

    // --------------------------
    // a2*v_x + b2*v_y
    // const v2 = c2*vₓ + d2*vᵧ;
    // --------------------------
    const p1 = c2*vₓ;
    const p1_ = _c2*vₓ_ + c2_*_vₓ + abs(p1);
    const p2 = d2 * vᵧ;
    const p2_ = _d2*vᵧ_ + d2_*_vᵧ + abs(p2);
    const v2 = p1 + p2;
    const v2_ = p1_ + p2_ + abs(v2);

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const p3 = c1*vₓ;
    const p3_ = _c1*vₓ_ + c1_*_vₓ + abs(p3);
    const p4 = d1*vᵧ;
    const p4_ = _d1*vᵧ_ + d1_*_vᵧ + abs(p4);
    const v1 = p3 + p4;
    const v1_ = p3_ + p4_ + abs(v1);

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p5 = c0*vₓ;
    const p5_ = _c0*vₓ_ + abs(p5);
    const p6 = d0*vᵧ;
    const p6_ = _d0*vᵧ_ + abs(p6);
    const p7 = p5 + p6;
    const p7_ = p5_ + p6_ + abs(p7);
    const v0 = p7 + v;
    const v0_ = p7_ + v_ + abs(v0);


    return {
        coeffs:   [v2, v1, v0],
        errBound: [v2_, v1_, v0_]  // still to be multiplied by `γγ3`
    };
}


export { getCoeffsBez1Bez2 }
