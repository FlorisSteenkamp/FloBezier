import type { ImplicitFormExact2 } from "../../../../implicit-form/implicit-form-types";
import { getImplicitForm2ExactPb } from "../../../../implicit-form/exact/get-implicit-form2-exact.js";
import { getXY1Exact, getXY2Exact } from "../../../../to-power-basis/get-xy/exact/get-xy-exact";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { 
    twoProduct, expansionProduct, fastExpansionSum, scaleExpansion2, 
    eMultBy2, eSign as _eSign
} from "big-float-ts";
import { getCoeffsBez1Bez1Exact } from "./get-coeffs-bez1-bez1-exact.js";

const tp  = twoProduct;    // error -> 0
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const eSign = _eSign;


/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order 
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line).
 * 
 * The returned polynomial degree will be 2
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * Shewchuk floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:**  TODO - add underflow / overflow conditions
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez2Bez1Exact(ps1: number[][], ps2: number[][]) {
    /** ps1 in power bases */
    const ps1pb = getXY2Exact(ps1);
    
    //const [[e2,e1,e0],[f2,f1,f0]] = ps1pb;
    // if both polynomials' quadratic terms are exactly zero then its really a line
    if (eSign(ps1pb[0][0]) === 0 && eSign(ps1pb[1][0]) === 0) {
        // the input bezier curve is in fact not quadratic but has order < 2
        return getCoeffsBez1Bez1Exact([ps1[0],ps1[2]], ps2);
    }

    const [[c1,c0],[d1,d0]] = getXY1Exact(ps2);

    if (eSign(c1) === 0 && eSign(d1) === 0) {
        // the input bezier curve is in fact not a line but has order < 1,
        // i.e. it is a point
        // TODO
        //return getCoeffsBez2Bez0ExactAnyBitlength(ps1, [ps2[0]]);
    }

    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        // this type coercion is justified since we already checked that the
        // curve really has order 2
        getImplicitForm2ExactPb(ps1pb) as ImplicitFormExact2;

    const c0c0 = tp(c0,c0);
    const c0c1 = sce(c0,c1);
    const c0d0 = tp(c0,d0);
    const c0d1 = sce(c0,d1);
    const c1c1 = epr(c1,c1);
    const c1d0 = sce(d0,c1);
    const c1d1 = epr(c1,d1);
    const d0d0 = tp(d0,d0);
    const d0d1 = sce(d0,d1);
    const d1d1 = epr(d1,d1);


    // a1**2*vₓₓ + a1*b1*vₓᵧ + b1**2*vᵧᵧ
    const p1 = epr(c1c1,vₓₓ);
    const p2 = epr(d1d1,vᵧᵧ);
    const p3 = epr(c1d1,vₓᵧ);
    const p4 = fes(p1,p2);
    const v2 = fes(p4,p3);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*vₓ + 2*b0*b1*vᵧᵧ + b1*vᵧ
    const p5 = epr(c0c1,vₓₓ);
    const p6 = epr(d0d1,vᵧᵧ);
    const p7 = fes(c0d1,c1d0);
    const pn = epr(p7,vₓᵧ);
    const p8 = em2(fes(p5,p6));
    const p9 = fes(p8,pn);
    const pa = epr(c1,vₓ);
    const pb = epr(d1,vᵧ);
    const pc = fes(pa,pb);
    const v1 = fes(p9,pc);


    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*vₓ + b0**2*vᵧᵧ + b0*vᵧ + v_0
    const pe = epr(c0c0,vₓₓ);
    const pf = epr(c0d0,vₓᵧ);
    const pg = epr(d0d0,vᵧᵧ);
    const ph = fes(pe,pf);
    const pi = fes(ph,pg);
    const pj = sce(c0,vₓ);
    const pk = sce(d0,vᵧ);
    const pl = fes(pj,pk);
    const pm = fes(pi,pl);
    const v0 = fes(pm,v);

    const r = [v2, v1, v0];
    
    // remove leading zero coefficients
    //while (r.length > 1 && eSign(r[0]) === 0) {
    //    r.shift();
    //}

    return r;
}


export { getCoeffsBez2Bez1Exact }
