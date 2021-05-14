import { γγ } from "../../../../error-analysis/error-analysis";
import { getImplicitForm2Dd } from "../../../../implicit-form/double-double/get-implicit-form2-dd";
import { getXY } from "../../../../to-power-basis/get-xy";
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
 * 2 and 3 bezier curve (i.e. a quadratic bezier curve and a cubic bezier curve).
 * 
 * The returned polynomial degree will be 6
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
function getCoeffsBez2Bez3DdAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    } = getImplicitForm2Dd(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    const $vₓₓ  = vₓₓ [1];
    const $vₓᵧ  = vₓᵧ [1];
    const $vᵧᵧ  = vᵧᵧ [1];
    const $vₓ  =  vₓ  [1];
    const $vᵧ  =  vᵧ  [1];
    const $v  =   v   [1];

    const $c0c0 = c0*c0;
    const $c0c1 = c0*c1;
    const $c0c2 = c0*c2;
    const $c0c3 = c0*c3;
    const $c0d0 = c0*d0;
    const $c0d1 = c0*d1;
    const $c0d2 = c0*d2;
    const $c0d3 = c0*d3;
    const $c1c1 = c1*c1;
    const $c1c2 = c1*c2;
    const $c1c3 = c1*c3;
    const $c1d0 = c1*d0;
    const $c1d1 = c1*d1;
    const $c1d2 = c1*d2;
    const $c1d3 = c1*d3;
    const $c2d1 = c2*d1;
    const $c2c2 = c2*c2;    
    const $c2c3 = c2*c3;
    const $c2d0 = c2*d0;
    const $c2d2 = c2*d2;
    const $c2d3 = c2*d3;
    const $c3c3 = c3*c3;
    const $c3d0 = c3*d0;
    const $c3d1 = c3*d1;
    const $c3d2 = c3*d2;
    const $c3d3 = c3*d3;

    const $d0d0 = d0*d0;
    const $d0d1 = d0*d1;
    const $d0d2 = d0*d2;
    const $d0d3 = d0*d3;
    const $d1d1 = d1*d1;
    const $d1d2 = d1*d2;
    const $d3d3 = d3*d3;
    const $d2d2 = d2*d2;
    const $d2d3 = d2*d3;
    const $d1d3 = d1*d3;

    const c0c0 = tp(c0,c0);
    const c0c1 = tp(c0,c1);
    const c0c2 = tp(c0,c2);
    const c0c3 = tp(c0,c3);
    const c0d0 = tp(c0,d0);
    const c0d1 = tp(c0,d1);
    const c0d2 = tp(c0,d2);
    const c0d3 = tp(c0,d3);
    const c1c1 = tp(c1,c1);
    const c1c2 = tp(c1,c2);
    const c1c3 = tp(c1,c3);
    const c1d0 = tp(c1,d0);
    const c1d1 = tp(c1,d1);
    const c1d2 = tp(c1,d2);
    const c1d3 = tp(c1,d3);
    const c2d1 = tp(c2,d1);
    const c2c2 = tp(c2,c2);    
    const c2c3 = tp(c2,c3);
    const c2d0 = tp(c2,d0);
    const c2d2 = tp(c2,d2);
    const c2d3 = tp(c2,d3);
    const c3c3 = tp(c3,c3);
    const c3d0 = tp(c3,d0);
    const c3d1 = tp(c3,d1);
    const c3d2 = tp(c3,d2);
    const c3d3 = tp(c3,d3);
    const d0d0 = tp(d0,d0);
    const d0d1 = tp(d0,d1);
    const d0d2 = tp(d0,d2);
    const d0d3 = tp(d0,d3);
    const d1d1 = tp(d1,d1);
    const d1d2 = tp(d1,d2);
    const d3d3 = tp(d3,d3);
    const d2d2 = tp(d2,d2);
    const d2d3 = tp(d2,d3);
    const d1d3 = tp(d1,d3);

    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _c2 = abs(c2);
    const _c3 = abs(c3);
    const _d0 = abs(d0);
    const _d1 = abs(d1);
    const _d2 = abs(d2);
    const _d3 = abs(d3);


    // a3**2*vₓₓ + a3*b3*vₓᵧ + b3**2*vᵧᵧ
    //const v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    const $p1 = $c3c3*$vₓₓ;
    const p1 = qmq(c3c3,vₓₓ);
    const p1_ = 2*abs($p1);
    const $p2 = $c3d3*$vₓᵧ;
    const p2 = qmq(c3d3,vₓᵧ);
    const p2_ = 2*abs($p2);
    const $p3 = $d3d3*$vᵧᵧ;
    const p3 = qmq(d3d3,vᵧᵧ);
    const p3_ = 2*abs($p3);
    const $p4 = $p1 + $p2;
    const p4 = qaq(p1,p2);
    const p4_ = p1_ + p2_ + abs($p4);
    const $v6 = $p4 + $p3;
    const v6 = qaq(p4,p3);
    const v6_ = p4_ + p3_ + abs($v6);


    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //const v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    vₓᵧ*(c2d3 + c3d2);
    const $p5 = $c2c3*$vₓₓ;
    const p5 = qmq(c2c3,vₓₓ);
    const p5_ = 2*abs($p5);
    const $p6 = $d2d3*$vᵧᵧ;
    const p6 = qmq(d2d3,vᵧᵧ);
    const p6_ = 2*abs($p6);
    const $p7 = $p5 + $p6;
    const p7 = qaq(p5,p6);
    const p7_ = p5_ + p6_ + abs($p7);
    const $p8 = $c2d3 + $c3d2;
    const p8 = qaq(c2d3,c3d2);  // 48-bit aligned => error free
    const $p9 = $p8*$vₓᵧ;
    const p9 = qmq(p8,vₓᵧ);
    const p9_ = 2*abs($p9);
    const $v5 = 2*$p7 + $p9;
    const v5 = qaq(qm2(p7),p9);
    const v5_ = 2*p7_ + p9_ + abs($v5);


    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //const v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    const $pa = 2*$c1c3 + $c2c2;
    const pa = qaq(qm2(c1c3),c2c2);  // 48-bit aligned => error free
    const $pb = 2*$d1d3 + $d2d2;
    const pb = qaq(qm2(d1d3),d2d2);  // 48-bit aligned => error free
    const $pc = $c1d3 + $c2d2;
    const pc = qaq(c1d3,c2d2);  // 48-bit aligned => error free
    const $pd = $pc + $c3d1;
    const pd = qaq(pc,c3d1);  // 48-bit aligned => error free
    const $pe = $pa*$vₓₓ;
    const pe = qmq(pa,vₓₓ);
    const pe_ = 2*abs($pe);
    const $pf = $pb*$vᵧᵧ;
    const pf = qmq(pb,vᵧᵧ);
    const pf_ = 2*abs($pf);
    const $pg = $pe + $pf;
    const pg = qaq(pe,pf);
    const pg_ = pe_ + pf_ + abs($pg);
    const $rp = $pd*$vₓᵧ;
    const rp = qmq(pd,vₓᵧ);
    const rp_ = 2*abs($rp);
    const $v4 = $pg + $rp;
    const v4 = qaq(pg,rp);
    const v4_ = pg_ + rp_ + abs($v4);


    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    // a3*v_x + 2*b0*b3*vᵧᵧ + 2*b1*b2*vᵧᵧ + b3*v_y
    //const v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    const $ph = $c0c3 + $c1c2;
    const ph = qaq(c0c3,c1c2);  // 48-bit aligned => error free
    const $pi = $d0d3 + $d1d2;
    const pi = qaq(d0d3,d1d2);  // 48-bit aligned => error free
    const $pj = $c0d3 + $c1d2;
    const pj = qaq(c0d3,c1d2);  // 48-bit aligned => error free
    const $pk = $c2d1 + $c3d0;
    const pk = qaq(c2d1,c3d0);  // 48-bit aligned => error free
    const $pl = $pj + $pk;
    const pl = qaq(pj,pk);  // 48-bit aligned => error free
    const $pm = $ph*$vₓₓ;
    const pm = qmq(ph,vₓₓ);
    const pm_ = 2*abs($pm);
    const $pn = $pi*$vᵧᵧ;
    const pn = qmq(pi,vᵧᵧ);
    const pn_ = 2*abs($pn);
    const $po = 2*($pm + $pn);
    const po = qm2(qaq(pm,pn));
    const po_ = 2*(pm_ + pn_) + abs($po);
    const $pp = $pl*$vₓᵧ;
    const pp = qmq(pl,vₓᵧ);
    const pp_ = 2*abs($pp);
    const $rn = c3*$vₓ;
    const rn = qmd(c3,vₓ);
    const rn_ = _c3*vₓ_ + abs($rn);
    const $ro = d3*$vᵧ;
    const ro = qmd(d3,vᵧ);
    const ro_ = _d3*vᵧ_ + abs($ro);
    const $pq = $rn + $ro;
    const pq = qaq(rn,ro);
    const pq_ = rn_ + ro_ + abs($pq);
    const $pr = $po + $pp;
    const pr = qaq(po,pp);
    const pr_ = po_ + pp_ + abs($pr);
    const $v3 = $pr + $pq;
    const v3 = qaq(pr,pq);
    const v3_ = pr_ + pq_ + abs($v3);

    
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    // a1*b1*vₓᵧ + a2*b0*vₓᵧ + a2*v_x + 
    // 2*b0*b2*vᵧᵧ + b1**2*vᵧᵧ + b2*v_y
    //const v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    const $ps = 2*$c0c2 + $c1c1;
    const ps = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    const $pt = 2*$d0d2 + $d1d1;
    const pt = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    const $pu = $c0d2 + $c1d1;
    const pu = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    const $pv = $pu + $c2d0;
    const pv = qaq(pu,c2d0);  // 48-bit aligned => error free
    const $pw = $ps*$vₓₓ;
    const pw = qmq(ps,vₓₓ);
    const pw_ = 2*abs($pw);
    const $px = $pt*$vᵧᵧ;
    const px = qmq(pt,vᵧᵧ);
    const px_ = 2*abs($px);
    const $py = $pv*$vₓᵧ;
    const py = qmq(pv,vₓᵧ);
    const py_ = 2*abs($py);
    const $pz = $pw + $px;
    const pz = qaq(pw,px);
    const pz_ = pw_ + px_ + abs($pz);
    const $r1 = $pz + $py;
    const r1 = qaq(pz,py);
    const r1_ = pz_ + py_ + abs($r1);
    const $r2 = c2*$vₓ;
    const r2 = qmd(c2,vₓ);
    const r2_ = _c2*vₓ_ + abs($r2);
    const $r3 = d2*$vᵧ;
    const r3 = qmd(d2,vᵧ);
    const r3_ = _d2*vᵧ_ + abs($r3);
    const $r4 = $r2 + $r3;
    const r4 = qaq(r2,r3);
    const r4_ = r2_ + r3_ + abs($r4);
    const $v2 = $r1 + $r4;
    const v2 = qaq(r1,r4);
    const v2_ = r1_ + r4_ + abs($v2);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*v_x + 2*b0*b1*vᵧᵧ + b1*v_y
    //const v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    const $r5 = $c0c1*$vₓₓ;
    const r5 = qmq(c0c1,vₓₓ);
    const r5_ = 2*abs($r5);
    const $r6 = $d0d1*$vᵧᵧ;
    const r6 = qmq(d0d1,vᵧᵧ);
    const r6_ = 2*abs($r6);
    const $r7 = $c0d1 + $c1d0;
    const r7 = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    const $r8 = $r7*$vₓᵧ;
    const r8 = qmq(r7,vₓᵧ);
    const r8_ = 2*abs($r8);
    const $r9 = 2*($r5 + $r6);
    const r9 = qm2(qaq(r5,r6));
    const r9_ = 2*(r5_ + r6_) + abs($r9);
    const $ra = $r9 + $r8;
    const ra = qaq(r9,r8);
    const ra_ = r9_ + r8_ + abs($ra);
    const $rb = c1*$vₓ;
    const rb = qmd(c1,vₓ);
    const rb_ = _c1*vₓ_ + abs($rb);
    const $rc = d1*$vᵧ;
    const rc = qmd(d1,vᵧ);
    const rc_ = _d1*vᵧ_ + abs($rc);
    const $rd = $rb + $rc;
    const rd = qaq(rb,rc);
    const rd_ = rb_ + rc_ + abs($rd);
    const $v1 = $ra + $rd;
    const v1 = qaq(ra,rd);
    const v1_ = ra_ + rd_ + abs($v1);
    

    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*v_x + b0**2*vᵧᵧ + b0*v_y + v_0
    //const v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const $re = $c0c0*$vₓₓ;
    const re = qmq(c0c0,vₓₓ);
    const re_ = 2*abs($re);
    const $rf = $c0d0*$vₓᵧ;
    const rf = qmq(c0d0,vₓᵧ);
    const rf_ = 2*abs($rf);
    const $rg = $d0d0*$vᵧᵧ;
    const rg = qmq(d0d0,vᵧᵧ);
    const rg_ = 2*abs($rg);
    const $rh = c0*$vₓ;
    const rh = qmd(c0,vₓ);
    const rh_ = _c0*vₓ_ + abs($rh);
    const $ri = d0*$vᵧ;
    const ri = qmd(d0,vᵧ);
    const ri_ = _d0*vᵧ_ + abs($ri);
    const $rj = $re + $rf;
    const rj = qaq(re,rf);
    const rj_ = re_ + rf_ + abs($rj);
    const $rk = $rj + $rg;
    const rk = qaq(rj,rg);
    const rk_ = rj_ + rg_ + abs($rk);
    const $rl = $rh + $ri;
    const rl = qaq(rh,ri);
    const rl_ = rh_ + ri_ + abs($rl);
    const $rm = $rk + $rl;
    const rm = qaq(rk,rl);
    const rm_ = rk_ + rl_ + abs($rm);
    const $v0 = $rm + $v;
    const v0 = qaq(rm,v);
    const v0_ = rm_ + v_ + abs($v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [γγ3*v6_, γγ3*v5_, γγ3*v4_, γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez2Bez3DdAnyBitlength }
