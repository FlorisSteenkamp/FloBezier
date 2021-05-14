
import { getImplicitForm1Exact } from "../../../../implicit-form/exact/get-implicit-form1-exact";
import { getXY } from "../../../../to-power-basis/get-xy";
import { twoProduct, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = twoProduct;
const qaq = ddAddDd;


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
function getCoeffsBez1Bez1Exact(ps1: number[][], ps2: number[][]) {
    const { vₓ, vᵧ, v } = getImplicitForm1Exact(ps1);

    const [[c1,c0],[d1,d0]] = getXY(ps2);


    //const v1 = c1*vₓ + d1*vᵧ;
    const p1 = tp(c1,vₓ);   // vₓ is a double => error free
    const p2 = tp(d1,vᵧ);   // vᵧ is a double => error free
    const v1 = qaq(p1,p2);  // 48-bit aligned => error free

    //const v0 = c0*vₓ + d0*vᵧ + v_0;
    const p3 = tp(c0,vₓ);   // vₓ is a double => error free
    const p4 = tp(d0,vᵧ);   // vᵧ is a double => error free
    const p5 = qaq(p3,p4);  // 48-bit aligned => error free
    const v0 = qaq(p5,v);   // 48-bit aligned => error free 

    return [v1, v0];
}


export { getCoeffsBez1Bez1Exact }
