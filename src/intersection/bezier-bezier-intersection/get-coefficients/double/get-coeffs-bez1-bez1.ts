import { getImplicitForm1WithRunningError } from "../../../../implicit-form/double/get-implicit-form1-with-running-error.js";
import { toPowerBasis1WithRunningError } from "../../../../to-power-basis/to-power-basis/double/to-power-basis-with-running-error.js";

const { abs } = Math;


/**
 * Returns a polynomial in 1 variable whose roots are the parameter values of
 * the intersection points of two order 1 bezier curves (i.e. 2 lines).
 * 
 * The returned polynomial degree will be 1 
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
function getCoeffsBez1Bez1(
        ps1: number[][],
        ps2: number[][]) {

    //--------------------------------------------------------------------------
    // See: error-analysis-double.txt
    //--------------------------------------------------------------------------

    const {
        coeffs: { vₓ, vᵧ, v },  // all these are double-doubles
        errorBound: { vₓ_, vᵧ_, v_ }
    } = getImplicitForm1WithRunningError(ps1);

    const {
        coeffs: [[c1,c0],[d1,d0]],
        errorBound: [[c1_],[d1_]],  // `c0` and `d0` are exact
    } = toPowerBasis1WithRunningError(ps2);

    const _c0 = abs(c0);
    const _d0 = abs(d0);
    const _c1 = abs(c1);
    const _d1 = abs(d1);
    const _vₓ = abs(vₓ);
    const _vᵧ = abs(vᵧ);

    //----------------------------------
    // const v1 = c1*vₓ + d1*vᵧ;
    //----------------------------------
    const p1 = c1*vₓ;
    const _p1 = abs(p1);
    const p1_ = _c1*vₓ_ + c1_*_vₓ + _p1;
    const p2 = d1*vᵧ;
    const _p2 = abs(p2);
    const p2_ = _d1*vᵧ_ + d1_*_vᵧ + _p2;
    const v1 = p1 + p2;
    const v1_ = p1_ + p2_ + abs(v1);


    //----------------------------------
    // const v0 = c0*vₓ + d0*vᵧ + v;
    //----------------------------------
    const p3 = c0*vₓ;
    const _p3 = abs(p3);
    const p3_ = _c0*vₓ_ + _p3;

    const p4 = d0*vᵧ;
    const _p4 = abs(p4);
    const p4_ = _d0*vᵧ_ + _p4;
    const p5 = p3 + p4;
    const p5_ = p3_ + p4_ + abs(p5);

    const v0 = p5 + v;
    const v0_ = p5_ + v_ + abs(v0);


    return {
        coeffs:   [v1, v0],
        errBound: [v1_, v0_]
    };
}


export { getCoeffsBez1Bez1 }
