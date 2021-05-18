import { getImplicitForm1ExactAnyBitlength } from "../../../../implicit-form/exact/get-implicit-form1-exact-any-bitlength";
import { getXYExactAnyBitlength1 } from "../../../../to-power-basis/any-bitlength/exact/get-xy-exact-any-bitlength";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { expansionProduct, fastExpansionSum, scaleExpansion2 } from "big-float-ts";

const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;


/**
 * Returns an error-free polynomial in 1 variable whose roots are the parameter 
 * values of the intersection points of two order 1 bezier curves (i.e. 2 lines).
 * 
 * The returned polynomial degree will be 1 
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
function getCoeffsBez1Bez1ExactAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { vₓ, vᵧ, v } = getImplicitForm1ExactAnyBitlength(ps1);

    const [[c1,c0],[d1,d0]] = getXYExactAnyBitlength1(ps2);


    //const v1 = c1*vₓ + d1*vᵧ;
    const p1 = epr(c1,vₓ);
    const p2 = epr(d1,vᵧ);
    const v1 = fes(p1,p2);

    //const v0 = c0*vₓ + d0*vᵧ + v_0;
    const p3 = sce(c0,vₓ);
    const p4 = sce(d0,vᵧ);
    const p5 = fes(p3,p4);
    const v0 = fes(p5,v);

    return [v1, v0];
}


export { getCoeffsBez1Bez1ExactAnyBitlength }
