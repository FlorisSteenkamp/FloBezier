
import { γγ } from "../../../../error-analysis/error-analysis";
import { getImplicitForm2_bitlength45_doubleDouble } from "../../../../implicit-form/inp-bitlength45/double-double/get-implicit-form2-bitlength45-double-double";
import { getXY } from "../../../../to-power-basis/get-xy";
import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;

let abs = Math.abs;
const γγ3 = γγ(3);


// TODO - better docs
function getCoeffs2x3Quad(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    } = getImplicitForm2_bitlength45_doubleDouble(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    let $vₓₓ  = vₓₓ [1];
    let $vₓᵧ  = vₓᵧ [1];
    let $vᵧᵧ  = vᵧᵧ [1];
    let $vₓ  =  vₓ  [1];
    let $vᵧ  =  vᵧ  [1];
    let $v  =   v   [1];

    let $c0c0 = c0*c0;
    let $c0c1 = c0*c1;
    let $c0c2 = c0*c2;
    let $c0c3 = c0*c3;
    let $c0d0 = c0*d0;
    let $c0d1 = c0*d1;
    let $c0d2 = c0*d2;
    let $c0d3 = c0*d3;
    let $c1c1 = c1*c1;
    let $c1c2 = c1*c2;
    let $c1c3 = c1*c3;
    let $c1d0 = c1*d0;
    let $c1d1 = c1*d1;
    let $c1d2 = c1*d2;
    let $c1d3 = c1*d3;
    let $c2d1 = c2*d1;
    let $c2c2 = c2*c2;    
    let $c2c3 = c2*c3;
    let $c2d0 = c2*d0;
    let $c2d2 = c2*d2;
    let $c2d3 = c2*d3;
    let $c3c3 = c3*c3;
    let $c3d0 = c3*d0;
    let $c3d1 = c3*d1;
    let $c3d2 = c3*d2;
    let $c3d3 = c3*d3;

    let $d0d0 = d0*d0;
    let $d0d1 = d0*d1;
    let $d0d2 = d0*d2;
    let $d0d3 = d0*d3;
    let $d1d1 = d1*d1;
    let $d1d2 = d1*d2;
    let $d3d3 = d3*d3;
    let $d2d2 = d2*d2;
    let $d2d3 = d2*d3;
    let $d1d3 = d1*d3;

    let c0c0 = tp(c0,c0);
    let c0c1 = tp(c0,c1);
    let c0c2 = tp(c0,c2);
    let c0c3 = tp(c0,c3);
    let c0d0 = tp(c0,d0);
    let c0d1 = tp(c0,d1);
    let c0d2 = tp(c0,d2);
    let c0d3 = tp(c0,d3);
    let c1c1 = tp(c1,c1);
    let c1c2 = tp(c1,c2);
    let c1c3 = tp(c1,c3);
    let c1d0 = tp(c1,d0);
    let c1d1 = tp(c1,d1);
    let c1d2 = tp(c1,d2);
    let c1d3 = tp(c1,d3);
    let c2d1 = tp(c2,d1);
    let c2c2 = tp(c2,c2);    
    let c2c3 = tp(c2,c3);
    let c2d0 = tp(c2,d0);
    let c2d2 = tp(c2,d2);
    let c2d3 = tp(c2,d3);
    let c3c3 = tp(c3,c3);
    let c3d0 = tp(c3,d0);
    let c3d1 = tp(c3,d1);
    let c3d2 = tp(c3,d2);
    let c3d3 = tp(c3,d3);
    let d0d0 = tp(d0,d0);
    let d0d1 = tp(d0,d1);
    let d0d2 = tp(d0,d2);
    let d0d3 = tp(d0,d3);
    let d1d1 = tp(d1,d1);
    let d1d2 = tp(d1,d2);
    let d3d3 = tp(d3,d3);
    let d2d2 = tp(d2,d2);
    let d2d3 = tp(d2,d3);
    let d1d3 = tp(d1,d3);

    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _c2 = abs(c2);
    let _c3 = abs(c3);
    let _d0 = abs(d0);
    let _d1 = abs(d1);
    let _d2 = abs(d2);
    let _d3 = abs(d3);


    // a3**2*vₓₓ + a3*b3*vₓᵧ + b3**2*vᵧᵧ
    //let v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    let $p1 = $c3c3*$vₓₓ;
    let p1 = qmq(c3c3,vₓₓ);
    let p1_ = 2*abs($p1);
    let $p2 = $c3d3*$vₓᵧ;
    let p2 = qmq(c3d3,vₓᵧ);
    let p2_ = 2*abs($p2);
    let $p3 = $d3d3*$vᵧᵧ;
    let p3 = qmq(d3d3,vᵧᵧ);
    let p3_ = 2*abs($p3);
    let $p4 = $p1 + $p2;
    let p4 = qaq(p1,p2);
    let p4_ = p1_ + p2_ + abs($p4);
    let $v6 = $p4 + $p3;
    let v6 = qaq(p4,p3);
    let v6_ = p4_ + p3_ + abs($v6);


    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //let v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    vₓᵧ*(c2d3 + c3d2);
    let $p5 = $c2c3*$vₓₓ;
    let p5 = qmq(c2c3,vₓₓ);
    let p5_ = 2*abs($p5);
    let $p6 = $d2d3*$vᵧᵧ;
    let p6 = qmq(d2d3,vᵧᵧ);
    let p6_ = 2*abs($p6);
    let $p7 = $p5 + $p6;
    let p7 = qaq(p5,p6);
    let p7_ = p5_ + p6_ + abs($p7);
    let $p8 = $c2d3 + $c3d2;
    let p8 = qaq(c2d3,c3d2);  // 48-bit aligned => error free
    let $p9 = $p8*$vₓᵧ;
    let p9 = qmq(p8,vₓᵧ);
    let p9_ = 2*abs($p9);
    let $v5 = 2*$p7 + $p9;
    let v5 = qaq(qm2(p7),p9);
    let v5_ = 2*p7_ + p9_ + abs($v5);


    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //let v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    let $pa = 2*$c1c3 + $c2c2;
    let pa = qaq(qm2(c1c3),c2c2);  // 48-bit aligned => error free
    let $pb = 2*$d1d3 + $d2d2;
    let pb = qaq(qm2(d1d3),d2d2);  // 48-bit aligned => error free
    let $pc = $c1d3 + $c2d2;
    let pc = qaq(c1d3,c2d2);  // 48-bit aligned => error free
    let $pd = $pc + $c3d1;
    let pd = qaq(pc,c3d1);  // 48-bit aligned => error free
    let $pe = $pa*$vₓₓ;
    let pe = qmq(pa,vₓₓ);
    let pe_ = 2*abs($pe);
    let $pf = $pb*$vᵧᵧ;
    let pf = qmq(pb,vᵧᵧ);
    let pf_ = 2*abs($pf);
    let $pg = $pe + $pf;
    let pg = qaq(pe,pf);
    let pg_ = pe_ + pf_ + abs($pg);
    let $rp = $pd*$vₓᵧ;
    let rp = qmq(pd,vₓᵧ);
    let rp_ = 2*abs($rp);
    let $v4 = $pg + $rp;
    let v4 = qaq(pg,rp);
    let v4_ = pg_ + rp_ + abs($v4);


    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    // a3*v_x + 2*b0*b3*vᵧᵧ + 2*b1*b2*vᵧᵧ + b3*v_y
    //let v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    let $ph = $c0c3 + $c1c2;
    let ph = qaq(c0c3,c1c2);  // 48-bit aligned => error free
    let $pi = $d0d3 + $d1d2;
    let pi = qaq(d0d3,d1d2);  // 48-bit aligned => error free
    let $pj = $c0d3 + $c1d2;
    let pj = qaq(c0d3,c1d2);  // 48-bit aligned => error free
    let $pk = $c2d1 + $c3d0;
    let pk = qaq(c2d1,c3d0);  // 48-bit aligned => error free
    let $pl = $pj + $pk;
    let pl = qaq(pj,pk);  // 48-bit aligned => error free
    let $pm = $ph*$vₓₓ;
    let pm = qmq(ph,vₓₓ);
    let pm_ = 2*abs($pm);
    let $pn = $pi*$vᵧᵧ;
    let pn = qmq(pi,vᵧᵧ);
    let pn_ = 2*abs($pn);
    let $po = 2*($pm + $pn);
    let po = qm2(qaq(pm,pn));
    let po_ = 2*(pm_ + pn_) + abs($po);
    let $pp = $pl*$vₓᵧ;
    let pp = qmq(pl,vₓᵧ);
    let pp_ = 2*abs($pp);
    let $rn = c3*$vₓ;
    let rn = qmd(c3,vₓ);
    let rn_ = _c3*vₓ_ + abs($rn);
    let $ro = d3*$vᵧ;
    let ro = qmd(d3,vᵧ);
    let ro_ = _d3*vᵧ_ + abs($ro);
    let $pq = $rn + $ro;
    let pq = qaq(rn,ro);
    let pq_ = rn_ + ro_ + abs($pq);
    let $pr = $po + $pp;
    let pr = qaq(po,pp);
    let pr_ = po_ + pp_ + abs($pr);
    let $v3 = $pr + $pq;
    let v3 = qaq(pr,pq);
    let v3_ = pr_ + pq_ + abs($v3);

    
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    // a1*b1*vₓᵧ + a2*b0*vₓᵧ + a2*v_x + 
    // 2*b0*b2*vᵧᵧ + b1**2*vᵧᵧ + b2*v_y
    //let v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    let $ps = 2*$c0c2 + $c1c1;
    let ps = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    let $pt = 2*$d0d2 + $d1d1;
    let pt = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    let $pu = $c0d2 + $c1d1;
    let pu = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    let $pv = $pu + $c2d0;
    let pv = qaq(pu,c2d0);  // 48-bit aligned => error free
    let $pw = $ps*$vₓₓ;
    let pw = qmq(ps,vₓₓ);
    let pw_ = 2*abs($pw);
    let $px = $pt*$vᵧᵧ;
    let px = qmq(pt,vᵧᵧ);
    let px_ = 2*abs($px);
    let $py = $pv*$vₓᵧ;
    let py = qmq(pv,vₓᵧ);
    let py_ = 2*abs($py);
    let $pz = $pw + $px;
    let pz = qaq(pw,px);
    let pz_ = pw_ + px_ + abs($pz);
    let $r1 = $pz + $py;
    let r1 = qaq(pz,py);
    let r1_ = pz_ + py_ + abs($r1);
    let $r2 = c2*$vₓ;
    let r2 = qmd(c2,vₓ);
    let r2_ = _c2*vₓ_ + abs($r2);
    let $r3 = d2*$vᵧ;
    let r3 = qmd(d2,vᵧ);
    let r3_ = _d2*vᵧ_ + abs($r3);
    let $r4 = $r2 + $r3;
    let r4 = qaq(r2,r3);
    let r4_ = r2_ + r3_ + abs($r4);
    let $v2 = $r1 + $r4;
    let v2 = qaq(r1,r4);
    let v2_ = r1_ + r4_ + abs($v2);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*v_x + 2*b0*b1*vᵧᵧ + b1*v_y
    //let v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    let $r5 = $c0c1*$vₓₓ;
    let r5 = qmq(c0c1,vₓₓ);
    let r5_ = 2*abs($r5);
    let $r6 = $d0d1*$vᵧᵧ;
    let r6 = qmq(d0d1,vᵧᵧ);
    let r6_ = 2*abs($r6);
    let $r7 = $c0d1 + $c1d0;
    let r7 = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    let $r8 = $r7*$vₓᵧ;
    let r8 = qmq(r7,vₓᵧ);
    let r8_ = 2*abs($r8);
    let $r9 = 2*($r5 + $r6);
    let r9 = qm2(qaq(r5,r6));
    let r9_ = 2*(r5_ + r6_) + abs($r9);
    let $ra = $r9 + $r8;
    let ra = qaq(r9,r8);
    let ra_ = r9_ + r8_ + abs($ra);
    let $rb = c1*$vₓ;
    let rb = qmd(c1,vₓ);
    let rb_ = _c1*vₓ_ + abs($rb);
    let $rc = d1*$vᵧ;
    let rc = qmd(d1,vᵧ);
    let rc_ = _d1*vᵧ_ + abs($rc);
    let $rd = $rb + $rc;
    let rd = qaq(rb,rc);
    let rd_ = rb_ + rc_ + abs($rd);
    let $v1 = $ra + $rd;
    let v1 = qaq(ra,rd);
    let v1_ = ra_ + rd_ + abs($v1);
    

    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*v_x + b0**2*vᵧᵧ + b0*v_y + v_0
    //let v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    let $re = $c0c0*$vₓₓ;
    let re = qmq(c0c0,vₓₓ);
    let re_ = 2*abs($re);
    let $rf = $c0d0*$vₓᵧ;
    let rf = qmq(c0d0,vₓᵧ);
    let rf_ = 2*abs($rf);
    let $rg = $d0d0*$vᵧᵧ;
    let rg = qmq(d0d0,vᵧᵧ);
    let rg_ = 2*abs($rg);
    let $rh = c0*$vₓ;
    let rh = qmd(c0,vₓ);
    let rh_ = _c0*vₓ_ + abs($rh);
    let $ri = d0*$vᵧ;
    let ri = qmd(d0,vᵧ);
    let ri_ = _d0*vᵧ_ + abs($ri);
    let $rj = $re + $rf;
    let rj = qaq(re,rf);
    let rj_ = re_ + rf_ + abs($rj);
    let $rk = $rj + $rg;
    let rk = qaq(rj,rg);
    let rk_ = rj_ + rg_ + abs($rk);
    let $rl = $rh + $ri;
    let rl = qaq(rh,ri);
    let rl_ = rh_ + ri_ + abs($rl);
    let $rm = $rk + $rl;
    let rm = qaq(rk,rl);
    let rm_ = rk_ + rl_ + abs($rm);
    let $v0 = $rm + $v;
    let v0 = qaq(rm,v);
    let v0_ = rm_ + v_ + abs($v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [γγ3*v6_, γγ3*v5_, γγ3*v4_, γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffs2x3Quad }
