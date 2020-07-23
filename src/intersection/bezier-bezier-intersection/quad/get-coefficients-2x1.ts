
import { γγ } from "../../../error-analysis/error-analysis";
import { getImplicitForm2Quad } from "../../../implicit-form/quad/get-implicit-form2";
import { getXY } from "../../../to-power-basis/get-xy";
import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp  = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;

const abs = Math.abs;
const γγ3 = γγ(3);


// TODO - better docs
function getCoeffs2x1Quad(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓ_, vᵧ_, v_ }  // vₓₓ_, vₓᵧ_, vᵧᵧ_ === 0
    } = getImplicitForm2Quad(ps1);

    let [[c1,c0],[d1,d0]] = getXY(ps2);

    let $vₓₓ  = vₓₓ [1];
    let $vₓᵧ  = vₓᵧ [1];
    let $vᵧᵧ  = vᵧᵧ [1];
    let $vₓ  =  vₓ  [1];
    let $vᵧ  =  vᵧ  [1];
    let $v  =   v   [1];

    let $c0c0 = c0*c0;
    let $c0c1 = c0*c1;
    let $c0d0 = c0*d0;
    let $c0d1 = c0*d1;
    let $c1c1 = c1*c1;
    let $c1d0 = c1*d0;
    let $c1d1 = c1*d1;
    let $d0d0 = d0*d0;
    let $d0d1 = d0*d1;
    let $d1d1 = d1*d1;

    let c0c0 = tp(c0,c0);
    let c0c1 = tp(c0,c1);
    let c0d0 = tp(c0,d0);
    let c0d1 = tp(c0,d1);
    let c1c1 = tp(c1,c1);
    let c1d0 = tp(c1,d0);
    let c1d1 = tp(c1,d1);
    let d0d0 = tp(d0,d0);
    let d0d1 = tp(d0,d1);
    let d1d1 = tp(d1,d1);

    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _d0 = abs(d0);
    let _d1 = abs(d1);


    // a1**2*vₓₓ + a1*b1*vₓᵧ + b1**2*vᵧᵧ
    let $p1 = $c1c1*$vₓₓ;
    let p1 = qmq(c1c1,vₓₓ);
    let p1_ = 2*abs($p1);
    let $p2 = $d1d1*$vᵧᵧ;
    let p2 = qmq(d1d1,vᵧᵧ);
    let p2_ = 2*abs($p2);
    let $p3 = $c1d1*$vₓᵧ;
    let p3 = qmq(c1d1,vₓᵧ);
    let p3_ = 2*abs($p3);
    let $p4 = $p1 + $p2;
    let p4 = qaq(p1,p2);
    let p4_ = p1_ + p2_ + abs($p4);
    let $v2 = $p4 + $p3;
    let v2 = qaq(p4,p3);
    let v2_ = p4_ + p3_ + abs($v2);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*vₓ + 2*b0*b1*vᵧᵧ + b1*vᵧ
    let $p5 = $c0c1*$vₓₓ;
    let p5 = qmq(c0c1,vₓₓ);
    let p5_ = 2*abs($p5);
    let $p6 = $d0d1*$vᵧᵧ;
    let p6 = qmq(d0d1,vᵧᵧ);
    let p6_ = 2*abs($p6);
    let $p7 = $c0d1 + $c1d0;
    let p7 = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    let $pn = $p7*$vₓᵧ;
    let pn = qmq(p7,vₓᵧ);
    let pn_ = 2*abs($pn);
    let $p8 = 2*($p5 + $p6);
    let p8 = qm2(qaq(p5,p6));
    let p8_ = 2*(p5_ + p6_) + abs($p8);
    let $p9 = $p8 + $pn;
    let p9 = qaq(p8,pn);
    let p9_ = p8_ + pn_ + abs($p9);
    let $pa = c1*$vₓ;
    let pa = qmd(c1,vₓ);
    let pa_ = _c1*vₓ_ + abs($pa);
    let $pb = d1*$vᵧ;
    let pb = qmd(d1,vᵧ);
    let pb_ = _d1*vᵧ_ + abs($pb);
    let $pc = $pa + $pb;
    let pc = qaq(pa,pb);
    let pc_ = pa_ + pb_ + abs($pc);
    let $v1 = $p9 + $pc;
    let v1 = qaq(p9,pc);
    let v1_ = p9_ + pc_ + abs($v1);


    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*vₓ + b0**2*vᵧᵧ + b0*vᵧ + v_0
    let $pe = $c0c0*$vₓₓ;
    let pe = qmq(c0c0,vₓₓ);
    let pe_ = 2*abs($pe);
    let $pf = $c0d0*$vₓᵧ;
    let pf = qmq(c0d0,vₓᵧ);
    let pf_ = 2*abs($pf);
    let $pg = $d0d0*$vᵧᵧ;
    let pg = qmq(d0d0,vᵧᵧ);
    let pg_ = 2*abs($pg);
    let $ph = $pe + $pf;
    let ph = qaq(pe,pf);
    let ph_ = pe_ + pf_ + abs($ph);
    let $pi = $ph + $pg;
    let pi = qaq(ph,pg);
    let pi_ = ph_ + pg_ + abs($pi);
    let $pj = c0*$vₓ;
    let pj = qmd(c0,vₓ);
    let pj_ = _c0*vₓ_ + abs($pj);
    let $pk = d0*$vᵧ;
    let pk = qmd(d0,vᵧ);
    let pk_ = _d0*vᵧ_ + abs($pk);
    let $pl = $pj + $pk;
    let pl = qaq(pj,pk);
    let pl_ = pj_ + pk_ + abs($pl);
    let $pm = $pi + $pl;
    let pm = qaq(pi,pl);
    let pm_ = pi_ + pl_ + abs($pm);
    let $v0 = $pm + $v;
    let v0 = qaq(pm,v);
    let v0_ = pm_ + v_ + abs($v0);


    return {
        coeffs:   [v2, v1, v0],
        errBound: [γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffs2x1Quad }
