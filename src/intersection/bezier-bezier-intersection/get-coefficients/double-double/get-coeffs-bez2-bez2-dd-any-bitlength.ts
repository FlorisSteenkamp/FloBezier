import { γγ } from "../../../../error-analysis/error-analysis";
import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";
import { getImplicitForm2Dd } from "../../../../implicit-form/double-double/get-implicit-form2-dd";
import { getXY } from "../../../../to-power-basis/get-xy";

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
 * whose roots are the parameter values of the intersection points of 2 order 
 * 2 bezier curves (i.e. 2 quadratic bezier curves).
 * 
 * The returned polynomial degree will be 4
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** none
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
function getCoeffsBez2Bez2DdAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    } = getImplicitForm2Dd(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    const $vₓₓ  = vₓₓ[1];
    const $vₓᵧ  = vₓᵧ[1];
    const $vᵧᵧ  = vᵧᵧ[1];
    const $vₓ  =  vₓ [1];
    const $vᵧ  =  vᵧ [1];
    const $v  =   v  [1];

    const $c0c0 = c0*c0;
    const $c0c1 = c0*c1;
    const $c0c2 = c0*c2;
    const $c0d0 = c0*d0;
    const $c0d1 = c0*d1;
    const $c0d2 = c0*d2;
    const $c1c1 = c1*c1;
    const $c1c2 = c1*c2;
    const $c1d0 = c1*d0;
    const $c1d1 = c1*d1;
    const $c1d2 = c1*d2;
    const $c2d1 = c2*d1;
    const $c2c2 = c2*c2;    
    const $c2d0 = c2*d0;
    const $c2d2 = c2*d2;
    const $d0d0 = d0*d0;
    const $d0d1 = d0*d1;
    const $d0d2 = d0*d2;
    const $d1d1 = d1*d1;
    const $d1d2 = d1*d2;
    const $d2d2 = d2*d2;

    const c0c0 = tp(c0,c0);
    const c0c1 = tp(c0,c1);
    const c0c2 = tp(c0,c2);
    const c0d0 = tp(c0,d0);
    const c0d1 = tp(c0,d1);
    const c0d2 = tp(c0,d2);
    const c1c1 = tp(c1,c1);
    const c1c2 = tp(c1,c2);
    const c1d0 = tp(c1,d0);
    const c1d1 = tp(c1,d1);
    const c1d2 = tp(c1,d2);
    const c2d1 = tp(c2,d1);
    const c2c2 = tp(c2,c2);    
    const c2d0 = tp(c2,d0);
    const c2d2 = tp(c2,d2);
    const d0d0 = tp(d0,d0);
    const d0d1 = tp(d0,d1);
    const d0d2 = tp(d0,d2);
    const d1d1 = tp(d1,d1);
    const d1d2 = tp(d1,d2);
    const d2d2 = tp(d2,d2);

    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _c2 = abs(c2);
    const _d0 = abs(d0);
    const _d1 = abs(d1);
    const _d2 = abs(d2);


    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    //const v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    const $p1 = $c2c2*$vₓₓ;
    const p1 = qmq(c2c2,vₓₓ);
    const p1_ = 2*abs($p1);
    const $p2 = $c2d2*$vₓᵧ;
    const p2 = qmq(c2d2,vₓᵧ);
    const p2_ = 2*abs($p2);
    const $p3 = $d2d2*$vᵧᵧ;
    const p3 = qmq(d2d2,vᵧᵧ);
    const p3_ = 2*abs($p3);
    const $p4 = $p1 + $p2;
    const p4 = qaq(p1,p2);
    const p4_ = p1_ + p2_ + abs($p4);
    const $v4 = $p4 + $p3;
    const v4 = qaq(p4,p3);
    const v4_ = p4_ + p3_ + abs($v4);

        
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    //const v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    const $p5 = $c1c2*$vₓₓ;
    const p5 = qmq(c1c2,vₓₓ);
    const p5_ = 2*abs($p5);
    const $p6 = $d1d2*$vᵧᵧ;
    const p6 = qmq(d1d2,vᵧᵧ);
    const p6_ = 2*abs($p6);
    const $p7 = $c1d2 + $c2d1;
    const p7 = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    const $p8 = $p7*$vₓᵧ;
    const p8 = qmq(p7,vₓᵧ);
    const p8_ = 2*abs($p8);
    const $p9 = 2*($p5 + $p6);
    const p9 = qm2(qaq(p5,p6));
    const p9_ = 2*(p5_ + p6_) + abs($p9);
    const $v3 = $p9 + $p8;
    const v3 = qaq(p9,p8);
    const v3_ = p9_ + p8_ + abs($v3);
        
    
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //const v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    const $pa = 2*$c0c2 + $c1c1;
    const pa = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    const $pb = 2*$d0d2 + $d1d1;
    const pb = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    const $pc = $c0d2 + $c1d1;
    const pc = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    const $pd = $pc + $c2d0;
    const pd = qaq(pc,c2d0);  // 48-bit aligned => error free
    const $pe = $pa*$vₓₓ;
    const pe = qmq(pa,vₓₓ);
    const pe_ = 2*abs($pe);
    const $pf = $pb*$vᵧᵧ;
    const pf = qmq(pb,vᵧᵧ);
    const pf_ = 2*abs($pf);
    const $pg = $pd*$vₓᵧ;
    const pg = qmq(pd,vₓᵧ);
    const pg_ = 2*abs($pg);
    const $ph = c2*$vₓ;
    const ph = qmd(c2,vₓ);
    const ph_ = _c2*vₓ_ + abs($ph);
    const $pi = d2*$vᵧ;
    const pi = qmd(d2,vᵧ);
    const pi_ = _d2*vᵧ_ + abs($pi);
    const $pj = $pe + $pf;
    const pj = qaq(pe,pf);
    const pj_ = pe_ + pf_ + abs($pj);
    const $pk = $pj + $pg;
    const pk = qaq(pj,pg);
    const pk_ = pj_ + pg_ + abs($pk);
    const $pl = $ph + $pi;
    const pl = qaq(ph,pi);
    const pl_ = ph_ + pi_ + abs($pl);
    const $v2 = $pk + $pl;
    const v2 = qaq(pk,pl);
    const v2_ = pk_ + pl_ + abs($v2);


    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    const $pm = $c0c1*$vₓₓ;
    const pm = qmq(c0c1,vₓₓ);
    const pm_ = 2*abs($pm);
    const $pn = $d0d1*$vᵧᵧ;
    const pn = qmq(d0d1,vᵧᵧ);
    const pn_ = 2*abs($pn);
    const $po = $c0d1 + $c1d0;
    const po = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    const $pp = $po*$vₓᵧ;
    const pp = qmq(po,vₓᵧ);
    const pp_ = 2*abs($pp);
    const $pq = 2*($pm + $pn);
    const pq = qm2(qaq(pm,pn));
    const pq_ = 2*(pm_ + pn_) + abs($pq);
    const $pr = c1*$vₓ;
    const pr = qmd(c1,vₓ);
    const pr_ = _c1*vₓ_ + abs($pr);
    const $ps = d1*$vᵧ;
    const ps = qmd(d1,vᵧ);
    const ps_ = _d1*vᵧ_ + abs($ps);
    const $pt = $pq + $pp;
    const pt = qaq(pq,pp);
    const pt_ = pq_ + pp_ + abs($pt);
    const $pu = $pr + $ps;
    const pu = qaq(pr,ps);
    const pu_ = pr_ + ps_ + abs($pu);
    const $v1 = $pt + $pu;
    const v1 = qaq(pt,pu);
    const v1_ = pt_ + pu_ + abs($v1);

    
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    const $pv = $c0c0*$vₓₓ;
    const pv = qmq(c0c0,vₓₓ);
    const pv_ = 2*abs($pv);
    const $pw = $c0d0*$vₓᵧ;
    const pw = qmq(c0d0,vₓᵧ);
    const pw_ = 2*abs($pw);
    const $px = $d0d0*$vᵧᵧ;
    const px = qmq(d0d0,vᵧᵧ);
    const px_ = 2*abs($px);
    const $py = c0*$vₓ;
    const py = qmd(c0,vₓ);
    const py_ = _c0*vₓ_ + abs($py);
    const $pz = d0*$vᵧ;
    const pz = qmd(d0,vᵧ);
    const pz_ = _d0*vᵧ_ + abs($pz);
    const $q1 = $pv + $pw;
    const q1 = qaq(pv,pw);
    const q1_ = pv_ + pw_ + abs($q1);
    const $q2 = $q1 + $px;
    const q2 = qaq(q1,px);
    const q2_ = q1_ + px_ + abs($q2);
    const $q3 = $py + $pz;
    const q3 = qaq(py,pz);
    const q3_ = py_ + pz_ + abs($q3);
    const $q4 = $q2 + $q3;
    const q4 = qaq(q2,q3);
    const q4_ = q2_ + q3_ + abs($q4);
    const $v0 = $q4 + $v;
    const v0 = qaq(q4,v);
    const v0_ = q4_ + v_ + abs($v0);


    return {
        coeffs:   [v4, v3, v2, v1, v0],
        errBound: [γγ3*v4_, γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez2Bez2DdAnyBitlength }
