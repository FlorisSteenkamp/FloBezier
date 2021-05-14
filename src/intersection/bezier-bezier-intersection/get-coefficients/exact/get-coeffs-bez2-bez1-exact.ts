import { getImplicitForm2Exact } from "../../../../implicit-form/exact/get-implicit-form2-exact";
import { scaleExpansion2, expansionProduct, fastExpansionSum, eMultBy2 } from 'big-float-ts';
import { twoProduct, ddAddDd } from "double-double";
import { getXY } from "../../../../to-power-basis/get-xy";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qaq = ddAddDd;
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const tp = twoProduct;


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
function getCoeffsBez2Bez1Exact(ps1: number[][], ps2: number[][]) {
    const { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2Exact(ps1);

    const [[c1,c0],[d1,d0]] = getXY(ps2);

    const c0c0 = tp(c0,c0);
    const c0c1 = tp(c0,c1);
    const c0d0 = tp(c0,d0);
    const c0d1 = tp(c0,d1);
    const c1c1 = tp(c1,c1);
    const c1d0 = tp(c1,d0);
    const c1d1 = tp(c1,d1);
    const d0d0 = tp(d0,d0);
    const d0d1 = tp(d0,d1);
    const d1d1 = tp(d1,d1);


    // a1**2*vₓₓ + a1*b1*vₓᵧ + b1**2*vᵧᵧ
    const p1 = epr(c1c1,vₓₓ);
    const p2 = epr(d1d1,vᵧᵧ);
    const p3 = epr(c1d1,vₓᵧ);
    const p4 = fes(p1,p2);
    const v2 = fes(p4,p3);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*vₓ + 2*b0*b1*vᵧᵧ + b1*vᵧ
    const p5 = epr(c0c1,vₓₓ);
    const p6 = epr(d0d1,vᵧᵧ);
    const p7 = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    const pn = epr(p7,vₓᵧ);
    const p8 = em2(fes(p5,p6));
    const p9 = fes(p8,pn);
    const pa = sce(c1,vₓ);
    const pb = sce(d1,vᵧ);
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

    return [v2, v1, v0];
}


export { getCoeffsBez2Bez1Exact }
