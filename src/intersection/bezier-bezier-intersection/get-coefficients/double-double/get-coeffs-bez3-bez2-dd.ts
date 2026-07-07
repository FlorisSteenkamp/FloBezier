import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";
import { γγ } from "../../../../error-analysis/error-analysis.js";
import { getImplicitForm3DdWithRunningError } from "../../../../implicit-form/double-double/get-implicit-form3-dd-with-running-error.js";
import { toPowerBasis2DdWithRunningError } from "../../../../to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js";

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
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 6
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * intermediate calculations are done in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @internal
 */
function getCoeffsBez3Bez2Dd(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3DdWithRunningError(ps1);

    const {
        coeffs: [[c2,c1,[,c0]],[d2,d1,[,d0]]],
        errorBound: [[c2_],[d2_]]
    } = toPowerBasis2DdWithRunningError(ps2);

    const $vₓₓₓ = vₓₓₓ[1];
    const $vₓₓᵧ = vₓₓᵧ[1];
    const $vₓᵧᵧ = vₓᵧᵧ[1];
    const $vᵧᵧᵧ = vᵧᵧᵧ[1];
    const $vₓₓ  = vₓₓ [1];
    const $vₓᵧ  = vₓᵧ [1];
    const $vᵧᵧ  = vᵧᵧ [1];
    const $vₓ  =  vₓ  [1];
    const $vᵧ  =  vᵧ  [1];
    const $v  =   v   [1];

    const _vₓₓₓ = abs($vₓₓₓ);
    const _vₓₓᵧ = abs($vₓₓᵧ);
    const _vₓᵧᵧ = abs($vₓᵧᵧ);
    const _vᵧᵧᵧ = abs($vᵧᵧᵧ);
    const _vₓₓ  = abs($vₓₓ );
    const _vᵧᵧ  = abs($vᵧᵧ );
    const _vₓᵧ  = abs($vₓᵧ );
    const _vₓ   = abs($vₓ  );
    const _vᵧ   = abs($vᵧ  );

    const $c1 = c1[1];
    const $c2 = c2[1];
    const $d1 = d1[1];
    const $d2 = d2[1];

    const _c0 = abs(c0);
    const _c1 = abs($c1);
    const _c2 = abs($c2);
    const _d0 = abs(d0);
    const _d1 = abs($d1);
    const _d2 = abs($d2);

    const $c0c0 = c0*c0;
    const $c0c1 = c0*$c1;
    const $c0c2 = c0*$c2;
    const $c0d0 = c0*d0;
    const $c0d1 = c0*$d1;
    const $c0d2 = c0*$d2;
    const $c1c1 = $c1*$c1;
    const $c1c2 = $c1*$c2;
    const $c1d0 = $c1*d0;
    const $c1d1 = $c1*$d1;
    const $c1d2 = $c1*$d2;
    const $c2d1 = $c2*$d1;
    const $c2c2 = $c2*$c2;    
    const $c2d0 = $c2*d0;
    const $c2d2 = $c2*$d2;

    const $d0d0 = d0*d0;
    const $d0d1 = d0*$d1;
    const $d0d2 = d0*$d2;
    const $d1d1 = $d1*$d1;
    const $d1d2 = $d1*$d2;
    const $d2d2 = $d2*$d2;

    const c0c0 = tp(c0,c0);  // error free
    const c0c1 = qmd(c0,c1);
    const c0c1_ = abs($c0c1);
    const c0c2 = qmd(c0,c2);
    const c0c2_ = _c0*c2_ + abs($c0c2);
    const c0d0 = tp(c0,d0);  // error free
    const c0d1 = qmd(c0,d1);
    const c0d1_ = abs($c0d1);
    const c0d2 = qmd(c0,d2);
    const c0d2_ = _c0*d2_ + abs($c0d2);
    const c1c1 = qmq(c1,c1);
    const c1c1_ = 2*abs($c1c1);
    const c1c2 = qmq(c1,c2);
    const c1c2_ = _c1*c2_ + 2*abs($c1c2);
    const c1d0 = qmd(d0,c1);
    const c1d0_ = abs($c1d0);
    const c1d1 = qmq(c1,d1);
    const c1d1_ = 2*abs($c1d1);
    const c1d2 = qmq(c1,d2);
    const c1d2_ = _c1*d2_ + 2*abs($c1d2);
    const c2d1 = qmq(c2,d1);
    const c2d1_ = c2_*_d1 + 2*abs($c2d1);
    const c2c2 = qmq(c2,c2);    
    const c2c2_ = 2*(c2_*_c2 + abs($c2c2));
    const c2d0 = qmd(d0,c2);
    const c2d0_ = _d0*c2_ + abs($c2d0);
    const c2d2 = qmq(c2,d2);
    const c2d2_ = c2_*_d2 + _c2*d2_ + 2*abs($c2d2);
    const d0d0 = tp(d0,d0);  // error free
    const d0d1 = qmd(d0,d1);
    const d0d1_ = abs($d0d1);
    const d0d2 = qmd(d0,d2);
    const d0d2_ = _d0*d2_ + abs($d0d2);
    const d1d1 = qmq(d1,d1);
    const d1d1_ = 2*abs($d1d1);
    const d1d2 = qmq(d1,d2);
    const d1d2_ = _d1*d2_ + 2*abs($d1d2);
    const d2d2 = qmq(d2,d2);
    const d2d2_ = 2*(d2_*_d2 + abs($d2d2));
    
    const _c0c0 = abs($c0c0);
    const _c0c1 = abs($c0c1);
    const _c0d0 = abs($c0d0);    
    const _c0d1 = abs($c0d1);
    const _c1c2 = abs($c1c2);    
    const _c2c2 = abs($c2c2);
    const _c2d2 = abs($c2d2);
    const _c1d0 = abs($c1d0);
    const _d0d0 = abs($d0d0);
    const _d0d1 = abs($d0d1);
    const _d1d2 = abs($d1d2);
    const _d2d2 = abs($d2d2);
   

    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //const v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    const e1 = qmq(c2,vₓₓₓ);
    const $e1 = $c2*$vₓₓₓ;
    const e1_ = c2_*_vₓₓₓ + _c2*vₓₓₓ_ + 2*abs($e1);
    const e2 = qmq(c2,vₓᵧᵧ);
    const $e2 = $c2*$vₓᵧᵧ;
    const e2_ = c2_*_vₓᵧᵧ + _c2*vₓᵧᵧ_ + 2*abs($e2);
    const e3 = qmq(d2,vₓₓᵧ);
    const $e3 = $d2*$vₓₓᵧ;
    const e3_ = d2_*_vₓₓᵧ + _d2*vₓₓᵧ_ + 2*abs($e3);
    const e4 = qmq(d2,vᵧᵧᵧ);
    const $e4 = $d2*$vᵧᵧᵧ;
    const e4_ = d2_*_vᵧᵧᵧ + _d2*vᵧᵧᵧ_ + 2*abs($e4);
    const $e5 = $e1 + $e3;
    const e5 = qaq(e1,e3);
    const _e5 = abs($e5);
    const e5_ = e1_ + e3_ + _e5;
    const $e6 = $e2 + $e4;
    const e6 = qaq(e2,e4);
    const _e6 = abs($e6);
    const e6_ = e2_ + e4_ + _e6;
    const $e7 = $c2c2*$e5;
    const e7 = qmq(c2c2,e5);
    const e7_ = c2c2_*_e5 + _c2c2*e5_ + 2*abs($e7);
    const $e8 = $d2d2*$e6;
    const e8 = qmq(d2d2,e6);
    const e8_ = d2d2_*_e6 + _d2d2*e6_ + 2*abs($e8);
    const $v6 = $e7 + $e8;
    const v6 = qaq(e7,e8);
    const v6_ = e7_ + e8_ + abs($v6);

    ///
    const $z1 = $c0c2 + $c1c1;
    const z1 = qaq(c0c2,c1c1);
    const _z1 = abs($z1);
    const z1_ = c0c2_ + c1c1_ + _z1;
    const $z2 = $d0d2 + $d1d1;
    const z2 = qaq(d0d2,d1d1);
    const _z2 = abs($z2);
    const z2_ = d0d2_ + d1d1_ + _z2;
    const $z3 = 2*$c0c2 + $c1c1;
    const _z3 = abs($z3);
    const z3 = qaq(qm2(c0c2),c1c1);
    const z3_ = 2*c0c2_ + c1c1_ + _z3;
    const $z4 = 2*$d0d2 + $d1d1;
    const z4 = qaq(qm2(d0d2),d1d1);
    const _z4 = abs($z4);
    const z4_ = 2*d0d2_ + d1d1_ + _z4;
    const $z5 = 2*$c1d1 + $c2d0;
    const z5 = qaq(qm2(c1d1),c2d0);
    const _z5 = abs($z5);
    const z5_ = 2*c1d1_ + c2d0_ + _z5;
    const $z6 = 2*$c1d1 + $c0d2;
    const z6 = qaq(qm2(c1d1),c0d2);
    const _z6 = abs($z6);
    const z6_ = 2*c1d1_ + c0d2_ + _z6;
    const $z7 = 2*$c2d0 + $c1d1;
    const z7 = qaq(qm2(c2d0),c1d1);
    const z7_ = 2*c2d0_ + c1d1_ + abs($z7);
    const $z8 = 6*$c0c2 + $c1c1;

    const $q1 = 6*$c0c2;
    const q1 = qmd(6,c0c2);
    const q1_ = 6*c0c2_ + abs($q1)
    const z8 = qaq(q1,c1c1);
    const z8_ = q1_ + c1c1_ + abs($q1 + $c1c1);
    const $z9 = 6*$d0d2 + $d1d1;
    const $q2 = 6*$d0d2;
    const q2 = qmd(6,d0d2);
    const q2_ = 6*d0d2_ + abs($q2)
    const z9 = qaq(q2,d1d1);
    const z9_ = q2_ + d1d1_ + abs($q2 + $d1d1);
    const $za = $c1d2 + $c2d1;
    const za = qaq(c1d2,c2d1);
    const _za = abs($za);
    const za_ = c1d2_ + c2d1_ + _za;
    const $zb = $c0d2 + $c2d0;
    const zb = qaq(c0d2,c2d0);
    const zb_ = c0d2_ + c2d0_ + abs($zb);
    const $zc = 2*$c1d0 + $c0d1;
    const zc = qaq(qm2(c1d0),c0d1);
    const zc_ = 2*c1d0_ + c0d1_ + abs($zc);
    const $zd = 2*$c0d1 + $c1d0;
    const zd = qaq(qm2(c0d1),c1d0);
    const zd_ = 2*c0d1_ + c1d0_ + abs($zd);
    const $zf = $c0d2 + $c1d1;
    const zf = qaq(c0d2,c1d1);
    const zf_ = c0d2_ + c1d1_ + abs($zf);
    const $ze = $zf + $c2d0;
    const ze = qaq(zf,c2d0);
    const _ze = abs($ze);
    const ze_ = zf_ + c2d0_ + _ze;


    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //const v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    const $s0 = 3*$c2c2;
    const s0 = qmd(3,c2c2);
    const s0_ = 3*c2c2_ + abs($s0);
    const _s0 = abs($s0);
    const $t1 = 3*$d2d2;
    const t1 = qmd(3,d2d2);
    const t1_ = 3*d2d2_ + abs($t1);
    const _t1 = abs($t1);
    const $s1 = $s0*$vₓₓₓ;
    const s1 = qmq(s0,vₓₓₓ);
    const s1_ = s0_*_vₓₓₓ + _s0*vₓₓₓ_ + 2*abs($s1);
    const $s2 = $c2c2*$vₓₓᵧ;
    const s2 = qmq(c2c2,vₓₓᵧ);
    const s2_ = c2c2_*_vₓₓᵧ + _c2c2*vₓₓᵧ_ + 2*abs($s2);
    const $s3 = 2*$c2d2*$vₓₓᵧ;
    const s3 = qm2(qmq(c2d2,vₓₓᵧ));
    const s3_ = 2*(c2d2_*_vₓₓᵧ + _c2d2*vₓₓᵧ_ + abs($s3));
    const $s4 = 2*$c2d2*$vₓᵧᵧ;
    const s4 = qm2(qmq(c2d2,vₓᵧᵧ));
    const s4_ = 2*(c2d2_*_vₓᵧᵧ + _c2d2*vₓᵧᵧ_ + abs($s4));
    const $s5 = $d2d2*$vₓᵧᵧ;
    const s5 = qmq(d2d2,vₓᵧᵧ);
    const s5_ = d2d2_*_vₓᵧᵧ + _d2d2*vₓᵧᵧ_ + 2*abs($s5);
    const $s6 = $t1*$vᵧᵧᵧ;
    const s6 = qmq(t1,vᵧᵧᵧ);
    const s6_ = t1_*_vᵧᵧᵧ + _t1*vᵧᵧᵧ_ + 2*abs($s6);
    const $s7 = $s1 + $s3;
    const s7 = qaq(s1,s3);
    const s7_ = s1_ + s3_ + abs($s7);
    const $s8 = $s2 + $s4;
    const s8 = qaq(s2,s4);
    const s8_ = s2_ + s4_ + abs($s8);
    const $s9 = $s7 + $s5;
    const s9 = qaq(s7,s5);
    const s9_ = s7_ + s5_ + abs($s9);
    const $sa = $s8 + $s6;
    const sa = qaq(s8,s6);
    const sa_ = s8_ + s6_ + abs($sa);
    const $sb = $c1*$s9;
    const sb = qmq(c1,s9);
    const sb_ = _c1*s9_ + abs($sb);
    const $sc = $d1*$sa;
    const sc = qmq(d1,sa);
    const sc_ = _d1*sa_ + abs($sc);
    const $v5 = $sb + $sc;
    const v5 = qaq(sb,sc);
    const v5_ = sb_ + sc_ + abs($v5);


    // 3*a0*a2**2*v_xxx + 2*a0*a2*b2*v_xxy + a0*b2**2*v_xyy + 
    // 3*a1**2*a2*v_xxx + a1**2*b2*v_xxy + 2*a1*a2*b1*v_xxy + 
    // 2*a1*b1*b2*v_xyy + a2**2*b0*v_xxy + a2**2*v_xx + 
    // 2*a2*b0*b2*v_xyy + a2*b1**2*v_xyy + a2*b2*v_xy + 
    // 3*b0*b2**2*v_yyy + 3*b1**2*b2*v_yyy + b2**2*v_yy
    //const v4 =
    //    3*c2*(c0c2 + c1c1)*vₓₓₓ + 
    //    3*d2*(d0d2 + d1d1)*vᵧᵧᵧ + 
    //    (d2*(2*c0c2 + c1c1) + c2*(2*c1d1 + c2d0))*vₓₓᵧ +
    //    (d2*(2*c1d1 + c0d2) + c2*(2*d0d2 + d1d1))*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    //const v4 =
    //    (3*c2)*z1*vₓₓₓ + 
    //    (3*d2)*z2*vᵧᵧᵧ + 
    //    (d2*z3 + c2*z5)*vₓₓᵧ +
    //    (d2*z6 + c2*z4)*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    const $sd = $d2*$z3;
    const sd = qmq(d2,z3);
    const sd_ = d2_*_z3 + _d2*z3_ + 2*abs($sd);
    const $se = $d2*$z6;
    const se = qmq(d2,z6);
    const se_ = d2_*_z6 + _d2*z6_ + 2*abs($se);
    const $sf = $c2*$z5;
    const sf = qmq(c2,z5);
    const sf_ = c2_*_z5 + _c2*z5_ + 2*abs($sf);
    const $sg = $c2*$z4;
    const sg = qmq(c2,z4);
    const sg_ = c2_*_z4 + _c2*z4_ + 2*abs($sg);
    const $q3 = 3*$c2;
    const q3 = qmd(3,c2);
    const _q3 = abs($q3);
    const q3_ = 3*c2_ + _q3;
    const $sh = $q3*$z1;
    const sh = qmq(q3,z1);
    const _sh = abs($sh);
    const sh_ = q3_*_z1 + _q3*z1_ + _sh;
    const $q4 = 3*$d2;
    const q4 = qmd(3,d2);
    const _q4 = abs($q4);
    const q4_ = 3*d2_ + _q4;
    const $si = $q4*$z2;
    const si = qmq(q4,z2);
    const _si = abs($si);
    const si_ = q4_*_z2 + _q4*z2_ + _si;
    const $sj = $sd + $sf;
    const sj = qaq(sd,sf);
    const _sj = abs($sj);
    const sj_ = sd_ + sf_ + _sj;
    const $sk = $se + $sg;
    const sk = qaq(se,sg);
    const _sk = abs($sk);
    const sk_ = se_ + sg_ + _sk;
    const $sl = $sh*$vₓₓₓ;
    const sl = qmq(sh,vₓₓₓ);
    const sl_ = sh_*_vₓₓₓ + _sh*vₓₓₓ_ + 2*abs($sl);
    const $sm = $si*$vᵧᵧᵧ;
    const sm = qmq(si,vᵧᵧᵧ);
    const sm_ = si_*_vᵧᵧᵧ + _si*vᵧᵧᵧ_ + 2*abs($sm);
    const $sn = $sj*$vₓₓᵧ;
    const sn = qmq(sj,vₓₓᵧ);
    const sn_ = sj_*_vₓₓᵧ + _sj*vₓₓᵧ_ + 2*abs($sn);
    const $so = $sk*$vₓᵧᵧ;
    const so = qmq(sk,vₓᵧᵧ);
    const so_ = sk_*_vₓᵧᵧ + _sk*vₓᵧᵧ_ + 2*abs($so);
    const $sp = $sl + $sm;
    const sp = qaq(sl,sm);
    const sp_ = sl_ + sm_ + abs($sp);
    const $sq = $sn + $so;
    const sq = qaq(sn,so);
    const sq_ = sn_ + so_ + abs($sq);
    const $sr = $c2c2*$vₓₓ;
    const sr = qmq(c2c2,vₓₓ);
    const sr_ = c2c2_*_vₓₓ + _c2c2*vₓₓ_ + 2*abs($sr);
    const $ss = $d2d2*$vᵧᵧ;
    const ss = qmq(d2d2,vᵧᵧ);
    const ss_ = d2d2_*_vᵧᵧ + _d2d2*vᵧᵧ_ + 2*abs($ss);
    const $st = $c2d2*$vₓᵧ;
    const st = qmq(c2d2,vₓᵧ);
    const st_ = c2d2_*_vₓᵧ + _c2d2*vₓᵧ_ + 2*abs($st);
    const $su = $sr + $ss;
    const su = qaq(sr,ss);
    const su_ = sr_ + ss_ + abs($su);
    const $sv = $sp + $sq;
    const sv = qaq(sp,sq);
    const sv_ = sp_ + sq_ + abs($sv);
    const $sw = $su + $st;
    const sw = qaq(su,st);
    const sw_ = su_ + st_ + abs($sw);
    const $v4 = $sv + $sw;
    const v4 = qaq(sv,sw);
    const v4_ = sv_ + sw_ + abs($v4);


    // 6*a0*a1*a2*v_xxx + 2*a0*a1*b2*v_xxy + 2*a0*a2*b1*v_xxy + 
    // 2*a0*b1*b2*v_xyy + a1**3*v_xxx + a1**2*b1*v_xxy + 
    // 2*a1*a2*b0*v_xxy + 2*a1*a2*v_xx + 2*a1*b0*b2*v_xyy + 
    // a1*b1**2*v_xyy + a1*b2*v_xy + 2*a2*b0*b1*v_xyy + 
    // a2*b1*v_xy + 6*b0*b1*b2*v_yyy + b1**3*v_yyy + 
    // 2*b1*b2*v_yy
    //const v3 =
    //    c1*(6*c0c2 + c1c1)*vₓₓₓ +
    //    d1*(6*d0d2 + d1d1)*vᵧᵧᵧ +        
    //    (2*c0*(c1d2 + c2d1) + c1*(c1d1 + 2*c2d0))*vₓₓᵧ +
    //    (2*d1*(c0d2 + c2d0) + c1*(d1d1 + 2*d0d2))*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    c1d2*vₓᵧ + c2d1*vₓᵧ;
    //const v3 =
    //    c1*z8*vₓₓₓ +
    //    d1*z9*vᵧᵧᵧ +        
    //    (2*c0*za + c1*z7)*vₓₓᵧ +
    //    (2*d1*zb + c1*z4)*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    za*vₓᵧ;
    const $sx = $c1*$z8;
    const sx = qmq(c1,z8);
    const _sx = _c1*z8_ + 2*abs($sx);
    const sx_ = 2*_sx;
    const $sy = $d1*$z9;
    const sy = qmq(d1,z9);
    const _sy = _d1*z9_ + 2*abs($sy);
    const sy_ = 2*_sy;
    const $sz = 2*c0*$za;
    const sz = qmd(2*c0,za);
    const sz_ = 2*_c0*za_ + abs($sz);
    const $o1 = 2*$d1*$zb;
    const o1 = qmq(qm2(d1),zb);
    const o1_ = 2*_d1*zb_ + 2*abs($o1);
    const $o2 = $c1*$z7;
    const o2 = qmq(c1,z7);
    const o2_ = _c1*z7_ + 2*abs($o2);
    const $o3 = $c1*$z4;
    const o3 = qmq(c1,z4);
    const o3_ = _c1*z4_ + 2*abs($o3);
    const $o4 = $sz + $o2;
    const o4 = qaq(sz,o2);
    const _o4 = sz_ + o2_ + abs($o4);
    const o4_ = sz_ + o2_ + _o4;
    const $o5 = $o1 + $o3;
    const o5 = qaq(o1,o3);
    const _o5 = o1_ + o3_ + abs($o5);
    const o5_ = o1_ + o3_ + _o5;
    const $o6 = $d1d2*$vᵧᵧ;
    const o6 = qmq(d1d2,vᵧᵧ);
    const o6_ = d1d2_*_vᵧᵧ + _d1d2*vᵧᵧ_ + 2*abs($o6);
    const $o7 = $c1c2*$vₓₓ;
    const o7 = qmq(c1c2,vₓₓ);
    const o7_ = c1c2_*_vₓₓ + _c1c2*vₓₓ_ + 2*abs($o7);
    const $o8 = $za*$vₓᵧ;
    const o8 = qmq(za,vₓᵧ);
    const o8_ = za_*_vₓᵧ + _za*vₓᵧ_ + 2*abs($o8);
    const $o9 = $o6 + $o7;
    const o9 = qaq(o6,o7);
    const o9_ = o6_ + o7_ + abs($o9);
    const $oa = $sx*$vₓₓₓ;
    const oa = qmq(sx,vₓₓₓ);
    const oa_ = sx_*_vₓₓₓ + _sx*vₓₓₓ_ + 2*abs($oa);
    const $ob = $o4*$vₓₓᵧ;
    const ob = qmq(o4,vₓₓᵧ);
    const ob_ = o4_*_vₓₓᵧ + _o4*vₓₓᵧ_ + 2*abs($ob);
    const $oc = $sy*$vᵧᵧᵧ;
    const oc = qmq(sy,vᵧᵧᵧ);
    const oc_ = sy_*_vᵧᵧᵧ + _sy*vᵧᵧᵧ_ + 2*abs($oc);
    const $od = $o5*$vₓᵧᵧ;
    const od = qmq(o5,vₓᵧᵧ);
    const od_ = o5_*_vₓᵧᵧ + _o5*vₓᵧᵧ_ + 2*abs($od);
    const $oe = $oa + $oc;
    const oe = qaq(oa,oc);
    const oe_ = oa_ + oc_ + abs($oe);
    const $og = $ob + $od;
    const og = qaq(ob,od);
    const og_ = ob_ + od_ + abs($og);
    const $oh = $oe + $og;
    const oh = qaq(oe,og);
    const oh_ = oe_ + og_ + abs($oh);
    const $oi = 2*$o9 + $o8;
    const oi = qaq(qm2(o9),o8);
    const oi_ = 2*o9_ + o8_ + abs($oi);
    const $v3 = $oh + $oi;
    const v3 = qaq(oh,oi);
    const v3_ = oh_ + oi_ + abs($v3);


    // 3*a0**2*a2*v_xxx + a0**2*b2*v_xxy + 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + 2*a0*a2*b0*v_xxy + 
    // 2*a0*a2*v_xx + 2*a0*b0*b2*v_xyy + a0*b1**2*v_xyy + a0*b2*v_xy + a1**2*b0*v_xxy + a1**2*v_xx + 
    // 2*a1*b0*b1*v_xyy + a1*b1*v_xy + a2*b0**2*v_xyy + a2*b0*v_xy + a2*v_x + 3*b0**2*b2*v_yyy + 
    // 3*b0*b1**2*v_yyy + 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //const v2 =
    //    (3*c0*(c0c2 + c1c1))*vₓₓₓ +
    //    (3*d0*(d0d2 + d1d1))*vᵧᵧᵧ +
    //    (c0*(2*c1d1 + c0d2) + d0*(2*c0c2 + c1c1))*vₓₓᵧ +
    //    (c0*(2*d0d2 + d1d1) + d0*(2*c1d1 + c2d0))*vₓᵧᵧ +
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    //const v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    const $q5 = 3*c0;
    const _q5 = abs($q5);
    const q5 = tp(3,c0);  // error free
    const $oj = $q5*$z1;
    const oj = qmq(q5,z1);
    const _oj = abs($oj);
    const oj_ = _q5*z1_ + 2*abs($oj);
    const $q6 = 3*d0;
    const _q6 = abs($q6);
    const q6 = tp(3,d0);  // error free
    const $ok = $q6*$z2;
    const ok = qmq(q6,z2);
    const _ok = abs($ok);
    const ok_ = _q6*z2_ + 2*abs($ok);
    const $ol = c0*$z6;
    const ol = qmd(c0,z6);
    const ol_ = _c0*z6_ + abs($ol);
    const $om = c0*$z4;
    const om = qmd(c0,z4);
    const om_ = _c0*z4_ + abs($om);
    const $on = d0*$z3;
    const on = qmd(d0,z3);
    const on_ = _d0*z3_ + abs($on);
    const $oo = d0*$z5;
    const oo = qmd(d0,z5);
    const oo_ = _d0*z5_ + abs($oo);
    const $op = $ol + $on;
    const op = qaq(ol,on);
    const _op = abs($op);
    const op_ = ol_ + on_ + _op;
    const $oq = $om + $oo;
    const oq = qaq(om,oo);
    const _oq = abs($oq);
    const oq_ = om_ + oo_ + _oq;
    const $or = $oj*$vₓₓₓ;
    const or = qmq(oj,vₓₓₓ);
    const or_ = oj_*_vₓₓₓ + _oj*vₓₓₓ_ + 2*abs($or);
    const $os = $ok*$vᵧᵧᵧ;
    const os = qmq(ok,vᵧᵧᵧ);
    const os_ = ok_*_vᵧᵧᵧ + _ok*vᵧᵧᵧ_ + 2*abs($os);
    const $ot = $op*$vₓₓᵧ;
    const ot = qmq(op,vₓₓᵧ);
    const ot_ = op_*_vₓₓᵧ + _op*vₓₓᵧ_ + 2*abs($ot);
    const $ou = $oq*$vₓᵧᵧ;
    const ou = qmq(oq,vₓᵧᵧ);
    const ou_ = oq_*_vₓᵧᵧ + _oq*vₓᵧᵧ_ + 2*abs($ou);
    const $ov = $z3*$vₓₓ;
    const ov = qmq(z3,vₓₓ);
    const ov_ = z3_*_vₓₓ + _z3*vₓₓ_ + 2*abs($ov);
    const $ow = $z4*$vᵧᵧ;
    const ow = qmq(z4,vᵧᵧ);
    const ow_ = z4_*_vᵧᵧ + _z4*vᵧᵧ_ + 2*abs($ow);
    const $ox = $ze*$vₓᵧ;
    const ox = qmq(ze,vₓᵧ);
    const ox_ = ze_*_vₓᵧ + _ze*vₓᵧ_ + 2*abs($ox);
    const $oy = $c2*$vₓ;
    const oy = qmq(c2,vₓ);
    const oy_ = c2_*_vₓ + _c2*vₓ_ + 2*abs($oy);
    const $oz = $d2*$vᵧ;
    const oz = qmq(d2,vᵧ);
    const oz_ = d2_*_vᵧ + _d2*vᵧ_ + 2*abs($oz);
    const $p1 = $or + $os;
    const p1 = qaq(or,os);
    const p1_ = or_ + os_ + abs($p1);
    const $p2 = $ot + $ou;
    const p2 = qaq(ot,ou);
    const p2_ = ot_ + ou_ + abs($p2);
    const $p3 = $ov + $ow;
    const p3 = qaq(ov,ow);
    const p3_ = ov_ + ow_ + abs($p3);
    const $p4 = $p1 + $p2;
    const p4 = qaq(p1,p2);
    const p4_ = p1_ + p2_ + abs($p4);
    const $p5 = $p3 + $ox;
    const p5 = qaq(p3,ox);
    const p5_ = p3_ + ox_ + abs($p5);
    const $p6 = $oy + $oz;
    const p6 = qaq(oy,oz);
    const p6_ = oy_ + oz_ + abs($p6);
    const $p7 = $p4 + $p5;
    const p7 = qaq(p4,p5);
    const p7_ = p4_ + p5_ + abs($p7);
    const $v2 = $p7 + $p6;
    const v2 = qaq(p7,p6);
    const v2_ = p7_ + p6_ + abs($v2);


    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + 
    // a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*(c0d1 + 2*c1d0)*vₓₓᵧ +
    //    d0*(c1d0 + 2*c0d1)*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*zc*vₓₓᵧ +
    //    d0*zd*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    const $p8 = $q5*$c0c1;
    const p8 = qmq(q5,c0c1);
    const _p8 = abs($p8);
    const p8_ = _q5*c0c1_ + 2*_p8;
    const $p9 = $q6*$d0d1;
    const p9 = qmq(q6,d0d1);
    const _p9 = abs($p9);
    const p9_ = _q6*d0d1_ + 2*_p9;
    const $pa = c0*$zc;
    const pa = qmd(c0,zc);
    const _pa = abs($pa);
    const pa_ = _c0*zc_ + abs($pa);
    const $pb = d0*$zd;
    const pb = qmd(d0,zd);
    const _pb = abs($pb);
    const pb_ = _d0*zd_ + abs($pb);
    const $pc = $c0c1*$vₓₓ;
    const pc = qmq(c0c1,vₓₓ);
    const pc_ = c0c1_*_vₓₓ + _c0c1*vₓₓ_ + 2*abs($pc);
    const $pd = $d0d1*$vᵧᵧ;
    const pd = qmq(d0d1,vᵧᵧ);
    const pd_ = d0d1_*_vᵧᵧ + _d0d1*vᵧᵧ_ + 2*abs($pd);
    const $pe = $c0d1*$vₓᵧ;
    const pe = qmq(c0d1,vₓᵧ);
    const pe_ = c0d1_*_vₓᵧ + _c0d1*vₓᵧ_ + 2*abs($pe);
    const $pf = $c1d0*$vₓᵧ;
    const pf = qmq(c1d0,vₓᵧ);
    const pf_ = c1d0_*_vₓᵧ + _c1d0*vₓᵧ_ + 2*abs($pf);
    const $pg = 2*($pc + $pd);
    const pg = qm2(qaq(pc,pd));
    const pg_ = 2*(pc_ + pd_) + abs($pg);
    const $ph = $pe + $pf;
    const ph = qaq(pe,pf);
    const ph_ = pe_ + pf_ + abs($ph);
    const $pi = $c1*$vₓ;
    const pi = qmq(c1,vₓ);
    const pi_ = _c1*vₓ_ + 2*abs($pi);
    const $pj = $d1*$vᵧ;
    const pj = qmq(d1,vᵧ);
    const pj_ = _d1*vᵧ_ + 2*abs($pj);
    const $pk = $p8*$vₓₓₓ;
    const pk = qmq(p8,vₓₓₓ);
    const pk_ = p8_*_vₓₓₓ + _p8*vₓₓₓ_ + 2*abs($pk);
    const $pl = $p9*$vᵧᵧᵧ;
    const pl = qmq(p9,vᵧᵧᵧ);
    const pl_ = p9_*_vᵧᵧᵧ + _p9*vᵧᵧᵧ_ + 2*abs($pl);
    const $pm = $pa*$vₓₓᵧ;
    const pm = qmq(pa,vₓₓᵧ);
    const pm_ = pa_*_vₓₓᵧ + _pa*vₓₓᵧ_ + 2*abs($pm);
    const $pn = $pb*$vₓᵧᵧ;
    const pn = qmq(pb,vₓᵧᵧ);
    const pn_ = pb_*_vₓᵧᵧ + _pb*vₓᵧᵧ_ + 2*abs($pn);
    const $po = $pk + $pl;
    const po = qaq(pk,pl);
    const po_ = pk_ + pl_ + abs($po);
    const $pp = $pm + $pn;
    const pp = qaq(pm,pn);
    const pp_ = pm_ + pn_ + abs($pp);
    const $pq = $po + $pp;
    const pq = qaq(po,pp);
    const pq_ = po_ + pp_ + abs($pq);
    const $pr = $pg + $ph;
    const pr = qaq(pg,ph);
    const pr_ = pg_ + ph_ + abs($pr);
    const $ps = $pi + $pj;
    const ps = qaq(pi,pj);
    const ps_ = pi_ + pj_ + abs($ps);
    const $pt = $pq + $pr;
    const pt = qaq(pq,pr);
    const pt_ = pq_ + pr_ + abs($pt);
    const $v1 = $pt + $ps;
    const v1 = qaq(pt,ps);
    const v1_ = pt_ + ps_ + abs($v1);


    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const $pu = c0*$vₓₓₓ;
    const pu = qmd(c0,vₓₓₓ);
    const pu_ = _c0*vₓₓₓ_ + abs($pu);
    const $pv = c0*$vₓᵧᵧ;
    const pv = qmd(c0,vₓᵧᵧ);
    const pv_ = _c0*vₓᵧᵧ_ + abs($pv);
    const $pw = d0*$vₓₓᵧ;
    const pw = qmd(d0,vₓₓᵧ);
    const pw_ = _d0*vₓₓᵧ_ + abs($pw);
    const $px = d0*$vᵧᵧᵧ;
    const px = qmd(d0,vᵧᵧᵧ);
    const px_ = _d0*vᵧᵧᵧ_ + abs($px);
    const $py = $pu + $pw;
    const py = qaq(pu,pw);
    const py_ = pu_ + pw_ + abs($py);
    const $pz = $pv + $px;
    const pz = qaq(pv,px);
    const pz_ = pv_ + px_ + abs($pz);
    const $u1 = $py + $vₓₓ;
    const u1 = qaq(py,vₓₓ);
    const _u1 = abs($u1);
    const u1_ = py_ + vₓₓ_ + _u1;
    const $u2 = $pz + $vᵧᵧ;
    const u2 = qaq(pz,vᵧᵧ);
    const _u2 = abs($u2);
    const u2_ = pz_ + vᵧᵧ_ + _u2;
    const $u3 = $c0c0*$u1;
    const u3 = qmq(c0c0,u1);
    const u3_ = _c0c0*u1_ + 2*abs($u3);
    const $u4 = $d0d0*$u2;
    const u4 = qmq(d0d0,u2);
    const u4_ = _d0d0*u2_ + 2*abs($u4);
    const $u5 = $c0d0*$vₓᵧ;
    const u5 = qmq(c0d0,vₓᵧ);
    const u5_ = _c0d0*vₓᵧ_ + 2*abs($u5);
    const $u6 = c0*$vₓ;
    const u6 = qmd(c0,vₓ);
    const u6_ = _c0*vₓ_ + abs($u6);
    const $u7 = d0*$vᵧ;
    const u7 = qmd(d0,vᵧ);
    const u7_ = _d0*vᵧ_ + abs($u7);
    const $u8 = $u3 + $u4;
    const u8 = qaq(u3,u4);
    const u8_ = u3_ + u4_ + abs($u8);
    const $u9 = $u8 + $u5;
    const u9 = qaq(u8,u5);
    const u9_ = u8_ + u5_ + abs($u9);
    const $ua = $u6 + $u7;
    const ua = qaq(u6,u7);
    const ua_ = u6_ + u7_ + abs($ua);
    const $ub = $u9 + $ua;
    const ub = qaq(u9,ua);
    const ub_ = u9_ + ua_ + abs($ub);
    const $v0 = $ub + $v;
    const v0 = qaq(ub,v);
    const v0_ = ub_ + v_ + abs($v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [v6_, v5_, v4_, v3_, v2_, v1_, v0_]  // still to be multiplied by `γγ3`
    };
}


export { getCoeffsBez3Bez2Dd }
