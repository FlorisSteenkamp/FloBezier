import { γγ } from "../../../../error-analysis/error-analysis.js";
import { twoProduct, ddAddDd, ddMultDouble2, ddMultDd } from "double-double";
import { getImplicitForm1DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form1-dd-with-running-error.js";
import { getXY3DdWithRunningError } from "../../../../to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const tp  = twoProduct;
const qaq = ddAddDd;
const qmd = ddMultDouble2;
const qmq = ddMultDd;

const abs = Math.abs;
const γγ3 = γγ(3);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 3 bezier curve (i.e. a line and a cubic bezier curve).
 * 
 * The returned polynomial degree will be 3
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * intermediate calculations are done in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @internal
 */
function getCoeffsBez1Bez3Dd(ps1: number[][], ps2: number[][]) {
    const {
        coeffs: { vₓ, vᵧ, v },
        errorBound: { v_ } 
    } = getImplicitForm1DdWithRunningError(ps1);

    const {
        coeffs: [[c3,c2,c1,c0],[d3,d2,d1,d0]],
        errorBound: [[c3_,c2_,c1_],[d3_,d2_,d1_]]  // c0 and d0 is error free
    } = getXY3DdWithRunningError(ps2);

    const _vₓ = abs(vₓ[1]);
    const _vᵧ = abs(vᵧ[1]);

    // a3*v_x + b3*v_y
    //const v3 = c3*vₓ + d3*vᵧ;
    const p1 = qmq(c3,vₓ);  // vₓ is error free
    const p1_ = c3_*_vₓ + 2*abs(p1[1]);
    const p2 = qmq(d3,vᵧ);  // vᵧ is error free
    const p2_ = d3_*_vᵧ + 2*abs(p2[1]);
    const v3 = qaq(p1,p2);
    const v3_ = p1_ + p2_ + abs(v3[1]);

    // a2*v_x + b2*v_y
    //const v2 = c2*vₓ + d2*vᵧ;
    const p3 = qmq(c2,vₓ);  // vₓ is error free
    const p3_ = c2_*_vₓ + 2*abs(p3[1]);
    const p4 = qmq(d2,vᵧ);  // vᵧ is error free
    const p4_ = d2_*_vᵧ + 2*abs(p4[1]);
    const v2 = qaq(p3,p4);
    const v2_ = p3_ + p4_ + abs(v2[1]);

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const p5 = qmq(c1,vₓ);  // vₓ is error free
    const p5_ = c1_*_vₓ + 2*abs(p5[1]);
    const p6 = qmq(d1,vᵧ);  // vᵧ is error free
    const p6_ = d1_*_vᵧ + 2*abs(p6[1]);
    const v1 = qaq(p5,p6);
    const v1_ = p5_ + p6_ + abs(v1[1]);

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p7 = qmd(c0,vₓ);  // vₓ is error free
    const p7_ = abs(p7[1]);
    const p8 = qmd(d0,vᵧ);  // vᵧ is error free
    const p8_ = abs(p8[1]);
    const p9 = qaq(p7,p8);
    const p9_ = p7_ + p8_ + abs(p9[1]);
    const v0 = qaq(p9,v);
    const v0_ = p9_ + v_ + abs(v0[1]);

    return {
        coeffs:   [v3, v2, v1, v0],
        errBound: [γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez1Bez3Dd }
