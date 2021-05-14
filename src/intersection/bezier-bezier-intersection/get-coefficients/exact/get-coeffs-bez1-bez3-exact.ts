
import { getImplicitForm1Exact } from "../../../../implicit-form/exact/get-implicit-form1-exact";
import { getXY } from "../../../../to-power-basis/get-xy";
import { twoProduct, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = twoProduct;
const qaq = ddAddDd;


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
function getCoeffsBez1Bez3Exact(ps1: number[][], ps2: number[][]) {
    const { vₓ, vᵧ, v } = getImplicitForm1Exact(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    
    // a3*v_x + b3*v_y
    //const v3 = c3*vₓ + d3*vᵧ;
    const p1 = tp(c3,vₓ);   // vₓ is a double => error free
    const p2 = tp(d3,vᵧ);   // vᵧ is a double => error free
    const v3 = qaq(p1,p2);  // 48-bit aligned => error free

    // a2*v_x + b2*v_y
    //const v2 = c2*vₓ + d2*vᵧ;
    const p3 = tp(c2,vₓ);   // vₓ is a double => error free
    const p4 = tp(d2,vᵧ);   // vᵧ is a double => error free
    const v2 = qaq(p3,p4);  // 48-bit aligned => error free

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const p5 = tp(c1,vₓ);   // vₓ is a double => error free
    const p6 = tp(d1,vᵧ);   // vᵧ is a double => error free
    const v1 = qaq(p5,p6);  // 48-bit aligned => error free

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p7 = tp(c0,vₓ);   // vₓ is a double => error free
    const p8 = tp(d0,vᵧ);   // vᵧ is a double => error free
    const p9 = qaq(p7,p8);  // 48-bit aligned => error free
    const v0 = qaq(p9,v);   // 48-bit aligned => error free


    return [v3, v2, v1, v0];
}


export { getCoeffsBez1Bez3Exact }
