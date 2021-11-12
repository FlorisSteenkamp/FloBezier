import { γγ } from "../../../../error-analysis/error-analysis.js";
import { twoProduct, ddAddDd, ddMultDouble2, ddMultDd } from "double-double";
import { getImplicitForm1DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form1-dd-with-running-error.js";
import { getXY1DdWithRunningError } from "../../../../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qmq = ddMultDd;

const abs = Math.abs;
const γγ3 = γγ(3);


// TODO - modify docs
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of two 
 * order 1 bezier curves (i.e. 2 lines).
 * 
 * The returned polynomial degree will be 1 
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** none TODO - include underflow / overflow
 * * intermediate calculations are done in double-double precision and the
 * result is exact if the precondition is met
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 a linear bezier curve
 * @param ps2 a linear bezier curve
 * 
 * @doc mdx
 */
// TODO - rename all these by chopping off the AnyBitlength part since it
// is now implied implicitly
function getCoeffsBez1Bez1Dd(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓ, vᵧ, v },  // all these are double-doubles
        errorBound: { v_ }
    } = getImplicitForm1DdWithRunningError(ps1);

    const [[c1,c0],[d1,d0]] = getXY1DdWithRunningError(ps2);

    const $c1 = c1[1];
    const $d1 = d1[1];
    const $vₓ = vₓ[1];
    const $vᵧ = vᵧ[1];
    const $v  = v [1];

    //----------------------------------
    // const v1 = c1*vₓ + d1*vᵧ;
    //----------------------------------
    const $p1 = $c1*$vₓ;
    const _p1 = abs($p1);
    const p1_ = 2*_p1;
    const p1 = qmq(c1,vₓ);
    const $p2 = $d1*$vᵧ;
    const _p2 = abs($p2);
    const p2_ = 2*_p2;
    const p2 = qmq(d1,vᵧ);
    const $v1 = $p1+$p2;
    //const _$v1 = abs($v1);
    const v1 = qaq(p1,p2);
    const v1_ = p1_ + p2_ + abs($v1);


    //----------------------------------
    // const v0 = c0*vₓ + d0*vᵧ + v_0;
    //----------------------------------
    const $p3 = c0*$vₓ;
    const p3 = qmd(c0,vₓ);
    const _p3_ = abs($p3);
    const $p4 = d0*$vᵧ;
    const p4 = qmd(d0,vᵧ);
    const _p4_ = abs($p4);
    const $p5 = $p3+$p4;
    //const _p5 = abs($p5);
    const p5 = qaq(p3,p4);
    const p5_ = _p3_ + _p4_ + abs($p5);

    const v0 = qaq(p5,v);
    const v0_ = p5_ + v_ + abs($p5+$v)


    return {
        coeffs:   [v1, v0],
        errBound: [γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez1Bez1Dd }
