import { γγ } from "../../../../../src/error-analysis/error-analysis";
import { getImplicitForm2DdWithRunningError47 } from "../../../../implicit-form/double-double/get-implicit-form2-dd-with-running-error-47";
import { getXY } from "../../../../../src/to-power-basis/get-xy";
import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;

const abs = Math.abs;
const γγ3 = γγ(3);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line).
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
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately 
 * `n * (Number.EPSILON**2) * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez2Bez1DdWithRunningError47(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    } = getImplicitForm2DdWithRunningError47(ps1);

    const [[c1,c0],[d1,d0]] = getXY(ps2);

    const $vₓₓ  = vₓₓ [1];
    const $vₓᵧ  = vₓᵧ [1];
    const $vᵧᵧ  = vᵧᵧ [1];
    const $vₓ  =  vₓ  [1];
    const $vᵧ  =  vᵧ  [1];
    const $v  =   v   [1];

    const $c0c0 = c0*c0;
    const $c0c1 = c0*c1;
    const $c0d0 = c0*d0;
    const $c0d1 = c0*d1;
    const $c1c1 = c1*c1;
    const $c1d0 = c1*d0;
    const $c1d1 = c1*d1;
    const $d0d0 = d0*d0;
    const $d0d1 = d0*d1;
    const $d1d1 = d1*d1;

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

    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _d0 = abs(d0);
    const _d1 = abs(d1);


    // a1**2*vₓₓ + a1*b1*vₓᵧ + b1**2*vᵧᵧ
    const $p1 = $c1c1*$vₓₓ;
    const p1 = qmq(c1c1,vₓₓ);
    const p1_ = 2*abs($p1);
    const $p2 = $d1d1*$vᵧᵧ;
    const p2 = qmq(d1d1,vᵧᵧ);
    const p2_ = 2*abs($p2);
    const $p3 = $c1d1*$vₓᵧ;
    const p3 = qmq(c1d1,vₓᵧ);
    const p3_ = 2*abs($p3);
    const $p4 = $p1 + $p2;
    const p4 = qaq(p1,p2);
    const p4_ = p1_ + p2_ + abs($p4);
    const $v2 = $p4 + $p3;
    const v2 = qaq(p4,p3);
    const v2_ = p4_ + p3_ + abs($v2);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*vₓ + 2*b0*b1*vᵧᵧ + b1*vᵧ
    const $p5 = $c0c1*$vₓₓ;
    const p5 = qmq(c0c1,vₓₓ);
    const p5_ = 2*abs($p5);
    const $p6 = $d0d1*$vᵧᵧ;
    const p6 = qmq(d0d1,vᵧᵧ);
    const p6_ = 2*abs($p6);
    const $p7 = $c0d1 + $c1d0;
    const p7 = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    const $pn = $p7*$vₓᵧ;
    const pn = qmq(p7,vₓᵧ);
    const pn_ = 2*abs($pn);
    const $p8 = 2*($p5 + $p6);
    const p8 = qm2(qaq(p5,p6));
    const p8_ = 2*(p5_ + p6_) + abs($p8);
    const $p9 = $p8 + $pn;
    const p9 = qaq(p8,pn);
    const p9_ = p8_ + pn_ + abs($p9);
    const $pa = c1*$vₓ;
    const pa = qmd(c1,vₓ);
    const pa_ = _c1*vₓ_ + abs($pa);
    const $pb = d1*$vᵧ;
    const pb = qmd(d1,vᵧ);
    const pb_ = _d1*vᵧ_ + abs($pb);
    const $pc = $pa + $pb;
    const pc = qaq(pa,pb);
    const pc_ = pa_ + pb_ + abs($pc);
    const $v1 = $p9 + $pc;
    const v1 = qaq(p9,pc);
    const v1_ = p9_ + pc_ + abs($v1);


    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*vₓ + b0**2*vᵧᵧ + b0*vᵧ + v_0
    const $pe = $c0c0*$vₓₓ;
    const pe = qmq(c0c0,vₓₓ);
    const pe_ = 2*abs($pe);
    const $pf = $c0d0*$vₓᵧ;
    const pf = qmq(c0d0,vₓᵧ);
    const pf_ = 2*abs($pf);
    const $pg = $d0d0*$vᵧᵧ;
    const pg = qmq(d0d0,vᵧᵧ);
    const pg_ = 2*abs($pg);
    const $ph = $pe + $pf;
    const ph = qaq(pe,pf);
    const ph_ = pe_ + pf_ + abs($ph);
    const $pi = $ph + $pg;
    const pi = qaq(ph,pg);
    const pi_ = ph_ + pg_ + abs($pi);
    const $pj = c0*$vₓ;
    const pj = qmd(c0,vₓ);
    const pj_ = _c0*vₓ_ + abs($pj);
    const $pk = d0*$vᵧ;
    const pk = qmd(d0,vᵧ);
    const pk_ = _d0*vᵧ_ + abs($pk);
    const $pl = $pj + $pk;
    const pl = qaq(pj,pk);
    const pl_ = pj_ + pk_ + abs($pl);
    const $pm = $pi + $pl;
    const pm = qaq(pi,pl);
    const pm_ = pi_ + pl_ + abs($pm);
    const $v0 = $pm + $v;
    const v0 = qaq(pm,v);
    const v0_ = pm_ + v_ + abs($v0);


    return {
        coeffs:   [v2, v1, v0],
        errBound: [γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez2Bez1DdWithRunningError47 }
