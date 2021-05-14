import { γγ } from "../../../../error-analysis/error-analysis";
import { getImplicitForm3Dd } from "../../../../implicit-form/double-double/get-implicit-form3-dd";
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
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve).
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
function getCoeffsBez3Bez2DdAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3Dd(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

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
   
    const _c0 = abs(c0);
    const _c1 = abs(c1);
    const _c2 = abs(c2);
    const _d0 = abs(d0);
    const _d1 = abs(d1);
    const _d2 = abs(d2);
   

    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //const v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    const e1 = qmd(c2,vₓₓₓ);
    const $e1 = c2*$vₓₓₓ;
    const e1_ = _c2*vₓₓₓ_ + abs($e1);
    const e2 = qmd(c2,vₓᵧᵧ);
    const $e2 = c2*$vₓᵧᵧ;
    const e2_ = _c2*vₓᵧᵧ_ + abs($e2);
    const e3 = qmd(d2,vₓₓᵧ);
    const $e3 = d2*$vₓₓᵧ;
    const e3_ = _d2*vₓₓᵧ_ + abs($e3);
    const e4 = qmd(d2,vᵧᵧᵧ);
    const $e4 = d2*$vᵧᵧᵧ;
    const e4_ = _d2*vᵧᵧᵧ_ + abs($e4);
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
    const e7_ = _c2c2*e5_ + 2*abs($e7);
    const $e8 = $d2d2*$e6;
    const e8 = qmq(d2d2,e6);
    const e8_ = _d2d2*e6_ + 2*abs($e8);
    const $v6 = $e7 + $e8;
    const v6 = qaq(e7,e8);
    const v6_ = e7_ + e8_ + abs($v6);


    const $z1 = $c0c2 + $c1c1;
    const z1 = qaq(c0c2,c1c1);  // 48-bit aligned => error free
    const $z2 = $d0d2 + $d1d1;
    const z2 = qaq(d0d2,d1d1);  // 48-bit aligned => error free
    const $z3 = 2*$c0c2 + $c1c1;
    const z3 = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    const $z4 = 2*$d0d2 + $d1d1;
    const z4 = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    const $z5 = 2*$c1d1 + $c2d0;
    const z5 = qaq(qm2(c1d1),c2d0);  // 48-bit aligned => error free
    const $z6 = 2*$c1d1 + $c0d2;
    const z6 = qaq(qm2(c1d1),c0d2);  // 48-bit aligned => error free
    const $z7 = 2*$c2d0 + $c1d1;
    const z7 = qaq(qm2(c2d0),c1d1);  // 48-bit aligned => error free
    const $z8 = 6*$c0c2 + $c1c1;
    const z8 = qaq(qmd(6,c0c2),c1c1);  // 47-bit aligned => error free
    const $z9 = 6*$d0d2 + $d1d1;
    const z9 = qaq(qmd(6,d0d2),d1d1);  // 47-bit aligned => error free
    const $za = $c1d2 + $c2d1;
    const za = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    const $zb = $c0d2 + $c2d0;
    const zb = qaq(c0d2,c2d0);  // 48-bit aligned => error free
    const $zc = 2*$c1d0 + $c0d1;
    const zc = qaq(qm2(c1d0),c0d1);  // 48-bit aligned => error free
    const $zd = 2*$c0d1 + $c1d0;
    const zd = qaq(qm2(c0d1),c1d0);  // 48-bit aligned => error free
    const $zf = $c0d2 + $c1d1;
    const zf = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    const $ze = $zf + $c2d0;
    const ze = qaq(zf,c2d0);  // 48-bit aligned => error free
    
    const _z3 = abs($z3);
    const _z4 = abs($z4);
    const _z5 = abs($z5);
    const _za = abs($za);
    const _ze = abs($ze);


    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //const v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    const $s0 = 3*$c2c2;
    const s0 = qmd(3,c2c2);  // 48-bit aligned => error free
    const _s0 = abs($s0);
    const $t1 = 3*$d2d2;
    const t1 = qmd(3,d2d2);  // 48-bit aligned => error free
    const _t1 = abs($t1);
    const $s1 = $s0*$vₓₓₓ;
    const s1 = qmq(s0,vₓₓₓ);
    const s1_ = _s0*vₓₓₓ_ + 2*abs($s1);
    const $s2 = $c2c2*$vₓₓᵧ;
    const s2 = qmq(c2c2,vₓₓᵧ);
    const s2_ = _c2c2*vₓₓᵧ_ + 2*abs($s2);
    const $s3 = 2*$c2d2*$vₓₓᵧ;
    const s3 = qm2(qmq(c2d2,vₓₓᵧ));
    const s3_ = 2*(_c2d2*vₓₓᵧ_ + abs($s3));
    const $s4 = 2*$c2d2*$vₓᵧᵧ;
    const s4 = qm2(qmq(c2d2,vₓᵧᵧ));
    const s4_ = 2*(_c2d2*vₓᵧᵧ_ + abs($s4));
    const $s5 = $d2d2*$vₓᵧᵧ;
    const s5 = qmq(d2d2,vₓᵧᵧ);
    const s5_ = _d2d2*vₓᵧᵧ_ + 2*abs($s5);
    const $s6 = $t1*$vᵧᵧᵧ;
    const s6 = qmq(t1,vᵧᵧᵧ);
    const s6_ = _t1*vᵧᵧᵧ_ + 2*abs($s6);
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
    const $sb = c1*$s9;
    const sb = qmd(c1,s9);
    const sb_ = _c1*s9_ + abs($sb);
    const $sc = d1*$sa;
    const sc = qmd(d1,sa);
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
    const $sd = d2*$z3;
    const sd = qmd(d2,z3);
    const sd_ = abs($sd);
    const $se = d2*$z6;
    const se = qmd(d2,z6);
    const se_ = abs($se);
    const $sf = c2*$z5;
    const sf = qmd(c2,z5);
    const sf_ = abs($sf);
    const $sg = c2*$z4;
    const sg = qmd(c2,z4);
    const sg_ = abs($sg);
    const $sh = (3*c2)*$z1;
    const sh = qmd(3*c2,z1);  // 3*c2: 47-bit aligned => error free
    //const _sh = sh_;
    const sh_ = abs($sh);
    const $si = (3*d2)*$z2;
    const si = qmd(3*d2,z2);  // 3*d2: 47-bit aligned => error free
    //const _si = si_;
    const si_ = abs($si);
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
    const sl_ = sh_*(_vₓₓₓ + vₓₓₓ_) + 2*abs($sl);
    const $sm = $si*$vᵧᵧᵧ;
    const sm = qmq(si,vᵧᵧᵧ);
    const sm_ = si_*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($sm);
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
    const sr_ = _c2c2*vₓₓ_ + 2*abs($sr);
    const $ss = $d2d2*$vᵧᵧ;
    const ss = qmq(d2d2,vᵧᵧ);
    const ss_ = _d2d2*vᵧᵧ_ + 2*abs($ss);
    const $st = $c2d2*$vₓᵧ;
    const st = qmq(c2d2,vₓᵧ);
    const st_ = _c2d2*vₓᵧ_ + 2*abs($st);
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
    const $sx = c1*$z8;
    const sx = qmd(c1,z8);
    //const _sx = abs($sx);
    const sx_ = abs($sx);
    const $sy = d1*$z9;
    const sy = qmd(d1,z9);
    //const _sy = abs($sy);
    const sy_ = abs($sy);
    const $sz = 2*c0*$za;
    const sz = qmd(2*c0,za);
    const sz_ = abs($sz);
    const $o1 = 2*d1*$zb;
    const o1 = qmd(2*d1,zb);
    const o1_ = abs($o1);
    const $o2 = c1*$z7;
    const o2 = qmd(c1,z7);
    const o2_ = abs($o2);
    const $o3 = c1*$z4;
    const o3 = qmd(c1,z4);
    const o3_ = abs($o3);
    const $o4 = $sz + $o2;
    const o4 = qaq(sz,o2);
    const _o4 = abs($o4);
    const o4_ = sz_ + o2_ + _o4;
    const $o5 = $o1 + $o3;
    const o5 = qaq(o1,o3);
    const _o5 = abs($o5);
    const o5_ = o1_ + o3_ + _o5;
    const $o6 = $d1d2*$vᵧᵧ;
    const o6 = qmq(d1d2,vᵧᵧ);
    const o6_ = _d1d2*vᵧᵧ_ + 2*abs($o6);
    const $o7 = $c1c2*$vₓₓ;
    const o7 = qmq(c1c2,vₓₓ);
    const o7_ = _c1c2*vₓₓ_ + 2*abs($o7);
    const $o8 = $za*$vₓᵧ;
    const o8 = qmq(za,vₓᵧ);
    const o8_ = _za*vₓᵧ_ + 2*abs($o8);
    const $o9 = $o6 + $o7;
    const o9 = qaq(o6,o7);
    const o9_ = o6_ + o7_ + abs($o9);
    const $oa = $sx*$vₓₓₓ;
    const oa = qmq(sx,vₓₓₓ);
    const oa_ = sx_*(_vₓₓₓ + vₓₓₓ_) + 2*abs($oa);
    const $ob = $o4*$vₓₓᵧ;
    const ob = qmq(o4,vₓₓᵧ);
    const ob_ = o4_*_vₓₓᵧ + _o4*vₓₓᵧ_ + 2*abs($ob);
    const $oc = $sy*$vᵧᵧᵧ;
    const oc = qmq(sy,vᵧᵧᵧ);
    const oc_ = sy_*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($oc);
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
    //    c2*vₓ    +
    //    d2*vᵧ;
    //const v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    const $oj = (3*c0)*$z1;
    const oj = qmd(3*c0,z1);
    //const _oj = abs(oj);
    const oj_ = abs($oj);
    const $ok = (3*d0)*$z2;
    const ok = qmd(3*d0,z2);
    //const _ok = abs(ok);
    const ok_ = abs($ok);
    const $ol = c0*$z6;
    const ol = qmd(c0,z6);
    const ol_ = abs($ol);
    const $om = c0*$z4;
    const om = qmd(c0,z4);
    const om_ = abs($om);
    const $on = d0*$z3;
    const on = qmd(d0,z3);
    const on_ = abs($on);
    const $oo = d0*$z5;
    const oo = qmd(d0,z5);
    const oo_ = abs($oo);
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
    const or_ = oj_*(_vₓₓₓ + vₓₓₓ_) + 2*abs($or);
    const $os = $ok*$vᵧᵧᵧ;
    const os = qmq(ok,vᵧᵧᵧ);
    const os_ = ok_*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($os);
    const $ot = $op*$vₓₓᵧ;
    const ot = qmq(op,vₓₓᵧ);
    const ot_ = op_*_vₓₓᵧ + _op*vₓₓᵧ_ + 2*abs($ot);
    const $ou = $oq*$vₓᵧᵧ;
    const ou = qmq(oq,vₓᵧᵧ);
    const ou_ = oq_*_vₓᵧᵧ + _oq*vₓᵧᵧ_ + 2*abs($ou);
    const $ov = $z3*$vₓₓ;
    const ov = qmq(z3,vₓₓ);
    const ov_ = _z3*vₓₓ_ + 2*abs($ov);
    const $ow = $z4*$vᵧᵧ;
    const ow = qmq(z4,vᵧᵧ);
    const ow_ = _z4*vᵧᵧ_ + 2*abs($ow);
    const $ox = $ze*$vₓᵧ;
    const ox = qmq(ze,vₓᵧ);
    const ox_ = _ze*vₓᵧ_ + 2*abs($ox);
    const $oy = c2*$vₓ;
    const oy = qmd(c2,vₓ);
    const oy_ = _c2*vₓ_ + abs($oy);
    const $oz = d2*$vᵧ;
    const oz = qmd(d2,vᵧ);
    const oz_ = _d2*vᵧ_ + abs($oz);
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
    const $p8 = (3*c0)*$c0c1;
    const p8 = qmd(3*c0,c0c1);
    //const _p8 = abs(p8);
    const p8_ = abs($p8);
    const $p9 = (3*d0)*$d0d1;
    const p9 = qmd(3*d0,d0d1);
    //const _p9 = abs(p9);
    const p9_ = abs($p9);
    const $pa = c0*$zc;
    const pa = qmd(c0,zc);
    //const _pa = abs($pa);
    const pa_ = abs($pa);
    const $pb = d0*$zd;
    const pb = qmd(d0,zd);
    //const _pb = abs($pb);
    const pb_ = abs($pb);
    const $pc = $c0c1*$vₓₓ;
    const pc = qmq(c0c1,vₓₓ);
    const pc_ = _c0c1*vₓₓ_ + 2*abs($pc);
    const $pd = $d0d1*$vᵧᵧ;
    const pd = qmq(d0d1,vᵧᵧ);
    const pd_ = _d0d1*vᵧᵧ_ + 2*abs($pd);
    const $pe = $c0d1*$vₓᵧ;
    const pe = qmq(c0d1,vₓᵧ);
    const pe_ = _c0d1*vₓᵧ_ + 2*abs($pe);
    const $pf = $c1d0*$vₓᵧ;
    const pf = qmq(c1d0,vₓᵧ);
    const pf_ = _c1d0*vₓᵧ_ + 2*abs($pf);
    const $pg = 2*($pc + $pd);
    const pg = qm2(qaq(pc,pd));
    const pg_ = 2*(pc_ + pd_) + abs($pg);
    const $ph = $pe + $pf;
    const ph = qaq(pe,pf);
    const ph_ = pe_ + pf_ + abs($ph);
    const $pi = c1*$vₓ;
    const pi = qmd(c1,vₓ);
    const pi_ = _c1*vₓ_ + abs($pi);
    const $pj = d1*$vᵧ;
    const pj = qmd(d1,vᵧ);
    const pj_ = _d1*vᵧ_ + abs($pj);
    const $pk = $p8*$vₓₓₓ;
    const pk = qmq(p8,vₓₓₓ);
    const pk_ = p8_*(_vₓₓₓ + vₓₓₓ_) + 2*abs($pk);
    const $pl = $p9*$vᵧᵧᵧ;
    const pl = qmq(p9,vᵧᵧᵧ);
    const pl_ = p9_*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($pl);
    const $pm = $pa*$vₓₓᵧ;
    const pm = qmq(pa,vₓₓᵧ);
    const pm_ = pa_*(_vₓₓᵧ + vₓₓᵧ_) + 2*abs($pm);
    const $pn = $pb*$vₓᵧᵧ;
    const pn = qmq(pb,vₓᵧᵧ);
    const pn_ = pb_*(_vₓᵧᵧ + vₓᵧᵧ_) + 2*abs($pn);
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
        errBound: [γγ3*v6_, γγ3*v5_, γγ3*v4_, γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez3Bez2DdAnyBitlength }
