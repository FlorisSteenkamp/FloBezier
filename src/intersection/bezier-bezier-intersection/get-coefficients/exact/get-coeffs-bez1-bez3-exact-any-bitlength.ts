import { getImplicitForm1ExactAnyBitlength } from "../../../../implicit-form/exact/get-implicit-form1-exact-any-bitlength";
import { getXYExactAnyBitlength3 } from "../../../../to-power-basis/any-bitlength/exact/get-xy-exact-any-bitlength";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { expansionProduct, fastExpansionSum, scaleExpansion2 } from "big-float-ts";

const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;


/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 3 bezier curve (i.e. a line and a cubic bezier curve).
 * 
 * The returned polynomial degree will be 3
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * Shewchuk floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez1Bez3ExactAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { vₓ, vᵧ, v } = getImplicitForm1ExactAnyBitlength(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXYExactAnyBitlength3(ps2);

    
    // a3*v_x + b3*v_y
    //const v3 = c3*vₓ + d3*vᵧ;
    const p1 = epr(c3,vₓ);
    const p2 = epr(d3,vᵧ);
    const v3 = fes(p1,p2);

    // a2*v_x + b2*v_y
    //const v2 = c2*vₓ + d2*vᵧ;
    const p3 = epr(c2,vₓ);
    const p4 = epr(d2,vᵧ);
    const v2 = fes(p3,p4);

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const p5 = epr(c1,vₓ);
    const p6 = epr(d1,vᵧ);
    const v1 = fes(p5,p6);

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p7 = sce(c0,vₓ);
    const p8 = sce(d0,vᵧ);
    const p9 = fes(p7,p8);
    const v0 = fes(p9,v);


    return [v3, v2, v1, v0];
}


export { getCoeffsBez1Bez3ExactAnyBitlength }
