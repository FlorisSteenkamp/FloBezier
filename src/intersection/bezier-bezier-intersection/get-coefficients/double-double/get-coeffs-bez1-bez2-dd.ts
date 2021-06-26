import { γγ } from "../../../../error-analysis/error-analysis";
import { twoProduct, ddAddDd, ddMultDouble2, ddMultDd } from "double-double";
import { getImplicitForm1DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form1-dd-with-running-error";
import { getXY2DdWithRunningError } from "../../../../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qmq = ddMultDd;

const abs = Math.abs;
const γγ3 = γγ(3);


// TODO - change docs
/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 2 bezier curve (i.e. a line and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** none
 * * intermediate calculations are done in double-double precision and the
 * result is exact if the precondition is met
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez1Bez2Dd(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ } 
    } = getImplicitForm1DdWithRunningError(ps1);

    const {
        coeffs: [[c2,c1,c0],[d2,d1,d0]],
        errorBound: [[c2_],[d2_]]
    } = getXY2DdWithRunningError(ps2);

    const $vₓ  =  vₓ[1];
    const $vᵧ  =  vᵧ[1];
    const $v  =   v [1];

    const _vₓ = abs($vₓ);
    const _vᵧ = abs($vᵧ);
    const _v =  abs($v);

    const $c1 = c1[1];
    const $c2 = c2[1];
    const $d1 = d1[1];
    const $d2 = d2[1];

    // --------------------------
    // a2*v_x + b2*v_y
    // const v2 = c2*vₓ + d2*vᵧ;
    // --------------------------
    const $p1 = $c2 * $vₓ;
    const p1 = qmq(c2,vₓ);
    const p1_ = c2_*_vₓ + 2*abs($p1);
    const $p2 = $d2 * $vᵧ;
    const p2 = qmq(d2,vᵧ);
    const p2_ = d2_*_vᵧ + 2*abs($p2);
    const $v2 = $p1 + $p2;
    const v2 = qaq(p1,p2);
    const v2_ = p1_ + p2_ + abs($v2);

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const $p3 = $c1*$vₓ;
    const p3 = qmq(c1,vₓ);
    const p3_ = 2*abs($p3);
    const $p4 = $d1*$vᵧ;
    const p4 = qmq(d1,vᵧ);
    const p4_ = 2*abs($p4);
    const $v1 = $p3 + $p4;
    const v1 = qaq(p3,p4);
    const v1_ = p3_ + p4_ + abs($v1);

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p5 = qmd(c0,vₓ);
    const $p5 = c0*$vₓ;
    const p5_ = abs($p5);
    const p6 = qmd(d0,vᵧ);
    const $p6 = d0*$vᵧ;
    const p6_ = abs($p6);
    const $p7 = $p5 + $p6;
    const p7 = qaq(p5,p6);
    const p7_ = p5_ + p6_ + abs($p7);
    const $v0 = $p7 + $v;
    const v0 = qaq(p7,v);
    const v0_ = p7_ + v_ + abs($v0);


    return {
        coeffs:   [v2, v1, v0],
        errBound: [γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez1Bez2Dd }
