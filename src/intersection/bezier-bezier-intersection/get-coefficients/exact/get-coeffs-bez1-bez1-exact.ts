import type { ImplicitFormExact1 } from "../../../../implicit-form/implicit-form-types.js";
import { getImplicitForm1ExactPb } from "../../../../implicit-form/exact/get-implicit-form1-exact.js";
import { getXY1Exact } from "../../../../to-power-basis/get-xy/exact/get-xy-exact.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { expansionProduct, fastExpansionSum, scaleExpansion2, eSign as _eSign } from "big-float-ts";

const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const eSign = _eSign;


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
 * * **precondition:** TODO - add underflow / overflow conditions
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
// TODO - rename all these by chopping off the AnyBitlength part since it
// is now implied implicitly
function getCoeffsBez1Bez1Exact(ps1: number[][], ps2: number[][]) {
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

    const [[c1,c0],[d1,d0]] = getXY1Exact(ps2);

    if (eSign(c1) === 0 && eSign(d1) === 0) {
        // the input bezier curve is in fact not a line but has order < 1,
        // i.e. it is a point
        // TODO
        //return getCoeffsBez2Bez0ExactAnyBitlength(ps1, [ps2[0]]);
    }

    const { vₓ, vᵧ, v } = 
        // this type coercion is justified since we already checked that the
        // curve really has order 1
        getImplicitForm1ExactPb(ps1pb) as ImplicitFormExact1;


    //const v1 = c1*vₓ + d1*vᵧ;
    const p1 = epr(c1,vₓ);
    const p2 = epr(d1,vᵧ);
    const v1 = fes(p1,p2);

    //const v0 = c0*vₓ + d0*vᵧ + v_0;
    const p3 = sce(c0,vₓ);
    const p4 = sce(d0,vᵧ);
    const p5 = fes(p3,p4);
    const v0 = fes(p5,v);

    const r = [v1, v0];
    
    // remove leading zero coefficients
    //while (r.length > 1 && eSign(r[0]) === 0) {
    //    r.shift();
    //}

    return r;
}


export { getCoeffsBez1Bez1Exact }
