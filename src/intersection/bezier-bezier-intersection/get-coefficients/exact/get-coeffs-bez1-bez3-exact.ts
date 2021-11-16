import { getImplicitForm1ExactPb } from "../../../../implicit-form/exact/get-implicit-form1-exact.js";
import { getXY1Exact, getXY3Exact } from "../../../../to-power-basis/get-xy/exact/get-xy-exact.js";
import { toQuadraticFromCubic } from "../../../../transformation/degree-or-type/to-quad-from-cubic.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { expansionProduct, fastExpansionSum, scaleExpansion2, eSign as _eSign } from "big-float-ts";
import { getCoeffsBez1Bez2Exact } from "./get-coeffs-bez1-bez2-exact.js";

const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const eSign = _eSign;


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
 * * **precondition:**  TODO - add underflow / overflow conditions
 * * **precondition:** TODO curve orders must be as stated
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez1Bez3Exact(ps1: number[][], ps2: number[][]) {
    /** ps1 in power bases */
    const ps1pb = getXY1Exact(ps1);
    
    //const [[e1,e0],[f1,f0]] = ps1pb;
    // if both polynomials' linear terms are exactly zero then it really is a point
    if (eSign(ps1pb[0][0]) === 0 && eSign(ps1pb[1][0]) === 0) {
        // the input bezier curve is in fact not a line but has order < 1,
        // i.e. it is a point
        // TODO
        //return getCoeffsBez0Bez3ExactAnyBitlength([ps1[0]], ps2]);
    }

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY3Exact(ps2);

    if (eSign(c3) === 0 && eSign(d3) === 0) {
        // the input bezier curve is in fact not cubic but has order < 3
        return getCoeffsBez1Bez2Exact(ps1, toQuadraticFromCubic(ps2));
    }

    // it is a precondition that the curve really has order 1
    // keep TypeScript happy; `getImplicitForm1ExactPb` cannot return `undefined` here
    const { vₓ, vᵧ, v } = getImplicitForm1ExactPb(ps1pb)!;
    
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

    const r = [v3, v2, v1, v0];
    
    // remove leading zero coefficients
    //while (r.length > 1 && eSign(r[0]) === 0) {
    //    r.shift();
    //}

    return r;
}


export { getCoeffsBez1Bez3Exact }
