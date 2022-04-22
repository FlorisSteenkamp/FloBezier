import type { ImplicitFormExact1 } from "../../../../implicit-form/implicit-form-types.js";
import { getImplicitForm1ExactPb } from "../../../../implicit-form/exact/get-implicit-form1-exact.js";
import { getXY1Exact, getXY2Exact } from "../../../../to-power-basis/get-xy/exact/get-xy-exact.js";

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
import { expansionProduct, fastExpansionSum, scaleExpansion2, eSign as _eSign } from "big-float-ts";
import { getCoeffsBez1Bez1Exact } from "./get-coeffs-bez1-bez1-exact.js";

const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const eSign = _eSign;


/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order 
 * 1 and order 2 bezier curve (i.e. a line and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @internal
 */
function getCoeffsBez1Bez2Exact(ps1: number[][], ps2: number[][]): number[][] {
    /** ps1 in power bases */
    const ps1pb = getXY1Exact(ps1);
        
    // if both polynomials' linear terms are exactly zero then it really is a point
    // if (eSign(ps1pb[0][0]) === 0 && eSign(ps1pb[1][0]) === 0) {
        // The input bezier curve is in fact not a line but has order < 1, i.e. it is a point.
        // This shouldn't happen due to being checked for earlier.
    // }

    const [[c2,c1,c0],[d2,d1,d0]] = getXY2Exact(ps2);

    if (eSign(c2) === 0 && eSign(d2) === 0) {
        // the input bezier curve is in fact not quadratic but has order < 2
        return getCoeffsBez1Bez1Exact(ps1, [ps2[0],ps2[2]]);
    }

    const { vₓ, vᵧ, v } = 
        // this type coercion is justified since we already checked that the
        // curve really has order 1
        getImplicitForm1ExactPb(ps1pb) as ImplicitFormExact1;


    // a2*v_x + b2*v_y
    //const v2 = c2*vₓ + d2*vᵧ;
    const p1 = epr(c2,vₓ);
    const p2 = epr(d2,vᵧ);
    const v2 = fes(p1,p2);

    // a1*v_x + b1*v_y
    //const v1 = c1*vₓ + d1*vᵧ;
    const p3 = epr(c1,vₓ);
    const p4 = epr(d1,vᵧ);
    const v1 = fes(p3,p4);

    // a0*v_x + b0*v_y + v_0
    //const v0 = c0*vₓ + d0*vᵧ + v;
    const p5 = sce(c0,vₓ);
    const p6 = sce(d0,vᵧ);
    const p7 = fes(p5,p6);
    const v0 = fes(p7,v);

    const r = [v2, v1, v0];

    return r;
}


export { getCoeffsBez1Bez2Exact }
