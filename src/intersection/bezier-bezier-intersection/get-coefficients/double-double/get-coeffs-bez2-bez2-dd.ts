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
function getCoeffsBez2Bez2Dd(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    } = getImplicitForm2Dd(ps1);

    let [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    let $vₓₓ  = vₓₓ [1];
    let $vₓᵧ  = vₓᵧ [1];
    let $vᵧᵧ  = vᵧᵧ [1];
    let $vₓ  =  vₓ  [1];
    let $vᵧ  =  vᵧ  [1];
    let $v  =   v   [1];

    let $c0c0 = c0*c0;
    let $c0c1 = c0*c1;
    let $c0c2 = c0*c2;
    let $c0d0 = c0*d0;
    let $c0d1 = c0*d1;
    let $c0d2 = c0*d2;
    let $c1c1 = c1*c1;
    let $c1c2 = c1*c2;
    let $c1d0 = c1*d0;
    let $c1d1 = c1*d1;
    let $c1d2 = c1*d2;
    let $c2d1 = c2*d1;
    let $c2c2 = c2*c2;    
    let $c2d0 = c2*d0;
    let $c2d2 = c2*d2;
    let $d0d0 = d0*d0;
    let $d0d1 = d0*d1;
    let $d0d2 = d0*d2;
    let $d1d1 = d1*d1;
    let $d1d2 = d1*d2;
    let $d2d2 = d2*d2;

    let c0c0 = tp(c0,c0);
    let c0c1 = tp(c0,c1);
    let c0c2 = tp(c0,c2);
    let c0d0 = tp(c0,d0);
    let c0d1 = tp(c0,d1);
    let c0d2 = tp(c0,d2);
    let c1c1 = tp(c1,c1);
    let c1c2 = tp(c1,c2);
    let c1d0 = tp(c1,d0);
    let c1d1 = tp(c1,d1);
    let c1d2 = tp(c1,d2);
    let c2d1 = tp(c2,d1);
    let c2c2 = tp(c2,c2);    
    let c2d0 = tp(c2,d0);
    let c2d2 = tp(c2,d2);
    let d0d0 = tp(d0,d0);
    let d0d1 = tp(d0,d1);
    let d0d2 = tp(d0,d2);
    let d1d1 = tp(d1,d1);
    let d1d2 = tp(d1,d2);
    let d2d2 = tp(d2,d2);

    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _c2 = abs(c2);
    let _d0 = abs(d0);
    let _d1 = abs(d1);
    let _d2 = abs(d2);


    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    //let v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    let $p1 = $c2c2*$vₓₓ;
    let p1 = qmq(c2c2,vₓₓ);
    let p1_ = 2*abs($p1);
    let $p2 = $c2d2*$vₓᵧ;
    let p2 = qmq(c2d2,vₓᵧ);
    let p2_ = 2*abs($p2);
    let $p3 = $d2d2*$vᵧᵧ;
    let p3 = qmq(d2d2,vᵧᵧ);
    let p3_ = 2*abs($p3);
    let $p4 = $p1 + $p2;
    let p4 = qaq(p1,p2);
    let p4_ = p1_ + p2_ + abs($p4);
    let $v4 = $p4 + $p3;
    let v4 = qaq(p4,p3);
    let v4_ = p4_ + p3_ + abs($v4);

        
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    //let v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    let $p5 = $c1c2*$vₓₓ;
    let p5 = qmq(c1c2,vₓₓ);
    let p5_ = 2*abs($p5);
    let $p6 = $d1d2*$vᵧᵧ;
    let p6 = qmq(d1d2,vᵧᵧ);
    let p6_ = 2*abs($p6);
    let $p7 = $c1d2 + $c2d1;
    let p7 = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    let $p8 = $p7*$vₓᵧ;
    let p8 = qmq(p7,vₓᵧ);
    let p8_ = 2*abs($p8);
    let $p9 = 2*($p5 + $p6);
    let p9 = qm2(qaq(p5,p6));
    let p9_ = 2*(p5_ + p6_) + abs($p9);
    let $v3 = $p9 + $p8;
    let v3 = qaq(p9,p8);
    let v3_ = p9_ + p8_ + abs($v3);
        
    
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //let v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    let $pa = 2*$c0c2 + $c1c1;
    let pa = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    let $pb = 2*$d0d2 + $d1d1;
    let pb = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    let $pc = $c0d2 + $c1d1;
    let pc = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    let $pd = $pc + $c2d0;
    let pd = qaq(pc,c2d0);  // 48-bit aligned => error free
    let $pe = $pa*$vₓₓ;
    let pe = qmq(pa,vₓₓ);
    let pe_ = 2*abs($pe);
    let $pf = $pb*$vᵧᵧ;
    let pf = qmq(pb,vᵧᵧ);
    let pf_ = 2*abs($pf);
    let $pg = $pd*$vₓᵧ;
    let pg = qmq(pd,vₓᵧ);
    let pg_ = 2*abs($pg);
    let $ph = c2*$vₓ;
    let ph = qmd(c2,vₓ);
    let ph_ = _c2*vₓ_ + abs($ph);
    let $pi = d2*$vᵧ;
    let pi = qmd(d2,vᵧ);
    let pi_ = _d2*vᵧ_ + abs($pi);
    let $pj = $pe + $pf;
    let pj = qaq(pe,pf);
    let pj_ = pe_ + pf_ + abs($pj);
    let $pk = $pj + $pg;
    let pk = qaq(pj,pg);
    let pk_ = pj_ + pg_ + abs($pk);
    let $pl = $ph + $pi;
    let pl = qaq(ph,pi);
    let pl_ = ph_ + pi_ + abs($pl);
    let $v2 = $pk + $pl;
    let v2 = qaq(pk,pl);
    let v2_ = pk_ + pl_ + abs($v2);


    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    let $pm = $c0c1*$vₓₓ;
    let pm = qmq(c0c1,vₓₓ);
    let pm_ = 2*abs($pm);
    let $pn = $d0d1*$vᵧᵧ;
    let pn = qmq(d0d1,vᵧᵧ);
    let pn_ = 2*abs($pn);
    let $po = $c0d1 + $c1d0;
    let po = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    let $pp = $po*$vₓᵧ;
    let pp = qmq(po,vₓᵧ);
    let pp_ = 2*abs($pp);
    let $pq = 2*($pm + $pn);
    let pq = qm2(qaq(pm,pn));
    let pq_ = 2*(pm_ + pn_) + abs($pq);
    let $pr = c1*$vₓ;
    let pr = qmd(c1,vₓ);
    let pr_ = _c1*vₓ_ + abs($pr);
    let $ps = d1*$vᵧ;
    let ps = qmd(d1,vᵧ);
    let ps_ = _d1*vᵧ_ + abs($ps);
    let $pt = $pq + $pp;
    let pt = qaq(pq,pp);
    let pt_ = pq_ + pp_ + abs($pt);
    let $pu = $pr + $ps;
    let pu = qaq(pr,ps);
    let pu_ = pr_ + ps_ + abs($pu);
    let $v1 = $pt + $pu;
    let v1 = qaq(pt,pu);
    let v1_ = pt_ + pu_ + abs($v1);

    
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    let $pv = $c0c0*$vₓₓ;
    let pv = qmq(c0c0,vₓₓ);
    let pv_ = 2*abs($pv);
    let $pw = $c0d0*$vₓᵧ;
    let pw = qmq(c0d0,vₓᵧ);
    let pw_ = 2*abs($pw);
    let $px = $d0d0*$vᵧᵧ;
    let px = qmq(d0d0,vᵧᵧ);
    let px_ = 2*abs($px);
    let $py = c0*$vₓ;
    let py = qmd(c0,vₓ);
    let py_ = _c0*vₓ_ + abs($py);
    let $pz = d0*$vᵧ;
    let pz = qmd(d0,vᵧ);
    let pz_ = _d0*vᵧ_ + abs($pz);
    let $q1 = $pv + $pw;
    let q1 = qaq(pv,pw);
    let q1_ = pv_ + pw_ + abs($q1);
    let $q2 = $q1 + $px;
    let q2 = qaq(q1,px);
    let q2_ = q1_ + px_ + abs($q2);
    let $q3 = $py + $pz;
    let q3 = qaq(py,pz);
    let q3_ = py_ + pz_ + abs($q3);
    let $q4 = $q2 + $q3;
    let q4 = qaq(q2,q3);
    let q4_ = q2_ + q3_ + abs($q4);
    let $v0 = $q4 + $v;
    let v0 = qaq(q4,v);
    let v0_ = q4_ + v_ + abs($v0);


    return {
        coeffs:   [v4, v3, v2, v1, v0],
        errBound: [γγ3*v4_, γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez2Bez2Dd }
