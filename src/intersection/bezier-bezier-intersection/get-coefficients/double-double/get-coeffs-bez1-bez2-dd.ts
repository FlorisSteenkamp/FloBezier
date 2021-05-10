
import { twoProduct, ddAddDd } from "double-double";
import { getImplicitForm1Dd } from "../../../../implicit-form/double-double/get-implicit-form1-dd";
import { getXY } from "../../../../to-power-basis/get-xy";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qaq = ddAddDd;


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
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
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
    let {
        coeffs: { vₓ, vᵧ, v }  // vₓ, vᵧ, v:  48-bit aligned => error free
    } = getImplicitForm1Dd(ps1);

    let [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    // a2*v_x + b2*v_y
    //let v2 = c2*vₓ + d2*vᵧ;
    let p1 = tp(c2,vₓ);   // vₓ is a double => error free
    let p2 = tp(d2,vᵧ);   // vᵧ is a double => error free
    let v2 = qaq(p1,p2);  // 48-bit aligned => error free

    // a1*v_x + b1*v_y
    //let v1 = c1*vₓ + d1*vᵧ;
    let p3 = tp(c1,vₓ);   // vₓ is a double => error free
    let p4 = tp(d1,vᵧ);   // vᵧ is a double => error free
    let v1 = qaq(p3,p4);  // 48-bit aligned => error free

    // a0*v_x + b0*v_y + v_0
    //let v0 = c0*vₓ + d0*vᵧ + v;
    let p5 = tp(c0,vₓ);   // vₓ is a double => error free
    let p6 = tp(d0,vᵧ);   // vᵧ is a double => error free
    let p7 = qaq(p5,p6);  // 48-bit aligned => error free
    let v0 = qaq(p7,v);   // 48-bit aligned => error free


    return {
        coeffs:   [v2, v1, v0],
        errBound: [0, 0, 0]  // 48-bit aligned => completely error free
    };
}


export { getCoeffsBez1Bez2Dd }
