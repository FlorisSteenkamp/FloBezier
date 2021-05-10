"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoeffs3x2Quad = void 0;
const error_analysis_1 = require("../../../../error-analysis/error-analysis");
const get_implicit_form3_bitlength45_double_double_1 = require("../../../../implicit-form/double-double/get-implicit-form3-bitlength45-double-double");
const get_xy_1 = require("../../../../to-power-basis/get-xy");
const double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const tp = double_double_1.twoProduct;
const qm2 = double_double_1.ddMultBy2;
const qmd = double_double_1.ddMultDouble2;
const qmq = double_double_1.ddMultDd;
const qaq = double_double_1.ddAddDd;
let abs = Math.abs;
const γγ3 = error_analysis_1.γγ(3);
// TODO - better docs
function getCoeffs3x2Quad(ps1, ps2) {
    let { coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v }, errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ } } = get_implicit_form3_bitlength45_double_double_1.getImplicitForm3_bitlength45_doubleDouble(ps1);
    let [[c2, c1, c0], [d2, d1, d0]] = get_xy_1.getXY(ps2);
    let $vₓₓₓ = vₓₓₓ[1];
    let $vₓₓᵧ = vₓₓᵧ[1];
    let $vₓᵧᵧ = vₓᵧᵧ[1];
    let $vᵧᵧᵧ = vᵧᵧᵧ[1];
    let $vₓₓ = vₓₓ[1];
    let $vₓᵧ = vₓᵧ[1];
    let $vᵧᵧ = vᵧᵧ[1];
    let $vₓ = vₓ[1];
    let $vᵧ = vᵧ[1];
    let $v = v[1];
    let _vₓₓₓ = abs($vₓₓₓ);
    let _vₓₓᵧ = abs($vₓₓᵧ);
    let _vₓᵧᵧ = abs($vₓᵧᵧ);
    let _vᵧᵧᵧ = abs($vᵧᵧᵧ);
    let $c0c0 = c0 * c0;
    let $c0c1 = c0 * c1;
    let $c0c2 = c0 * c2;
    let $c0d0 = c0 * d0;
    let $c0d1 = c0 * d1;
    let $c0d2 = c0 * d2;
    let $c1c1 = c1 * c1;
    let $c1c2 = c1 * c2;
    let $c1d0 = c1 * d0;
    let $c1d1 = c1 * d1;
    let $c1d2 = c1 * d2;
    let $c2d1 = c2 * d1;
    let $c2c2 = c2 * c2;
    let $c2d0 = c2 * d0;
    let $c2d2 = c2 * d2;
    let $d0d0 = d0 * d0;
    let $d0d1 = d0 * d1;
    let $d0d2 = d0 * d2;
    let $d1d1 = d1 * d1;
    let $d1d2 = d1 * d2;
    let $d2d2 = d2 * d2;
    let c0c0 = tp(c0, c0);
    let c0c1 = tp(c0, c1);
    let c0c2 = tp(c0, c2);
    let c0d0 = tp(c0, d0);
    let c0d1 = tp(c0, d1);
    let c0d2 = tp(c0, d2);
    let c1c1 = tp(c1, c1);
    let c1c2 = tp(c1, c2);
    let c1d0 = tp(c1, d0);
    let c1d1 = tp(c1, d1);
    let c1d2 = tp(c1, d2);
    let c2d1 = tp(c2, d1);
    let c2c2 = tp(c2, c2);
    let c2d0 = tp(c2, d0);
    let c2d2 = tp(c2, d2);
    let d0d0 = tp(d0, d0);
    let d0d1 = tp(d0, d1);
    let d0d2 = tp(d0, d2);
    let d1d1 = tp(d1, d1);
    let d1d2 = tp(d1, d2);
    let d2d2 = tp(d2, d2);
    let _c0c0 = abs($c0c0);
    let _c0c1 = abs($c0c1);
    let _c0d0 = abs($c0d0);
    let _c0d1 = abs($c0d1);
    let _c1c2 = abs($c1c2);
    let _c2c2 = abs($c2c2);
    let _c2d2 = abs($c2d2);
    let _c1d0 = abs($c1d0);
    let _d0d0 = abs($d0d0);
    let _d0d1 = abs($d0d1);
    let _d1d2 = abs($d1d2);
    let _d2d2 = abs($d2d2);
    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _c2 = abs(c2);
    let _d0 = abs(d0);
    let _d1 = abs(d1);
    let _d2 = abs(d2);
    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //let v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    let e1 = qmd(c2, vₓₓₓ);
    let $e1 = c2 * $vₓₓₓ;
    let e1_ = _c2 * vₓₓₓ_ + abs($e1);
    let e2 = qmd(c2, vₓᵧᵧ);
    let $e2 = c2 * $vₓᵧᵧ;
    let e2_ = _c2 * vₓᵧᵧ_ + abs($e2);
    let e3 = qmd(d2, vₓₓᵧ);
    let $e3 = d2 * $vₓₓᵧ;
    let e3_ = _d2 * vₓₓᵧ_ + abs($e3);
    let e4 = qmd(d2, vᵧᵧᵧ);
    let $e4 = d2 * $vᵧᵧᵧ;
    let e4_ = _d2 * vᵧᵧᵧ_ + abs($e4);
    let $e5 = $e1 + $e3;
    let e5 = qaq(e1, e3);
    let _e5 = abs($e5);
    let e5_ = e1_ + e3_ + _e5;
    let $e6 = $e2 + $e4;
    let e6 = qaq(e2, e4);
    let _e6 = abs($e6);
    let e6_ = e2_ + e4_ + _e6;
    let $e7 = $c2c2 * $e5;
    let e7 = qmq(c2c2, e5);
    let e7_ = _c2c2 * e5_ + 2 * abs($e7);
    let $e8 = $d2d2 * $e6;
    let e8 = qmq(d2d2, e6);
    let e8_ = _d2d2 * e6_ + 2 * abs($e8);
    let $v6 = $e7 + $e8;
    let v6 = qaq(e7, e8);
    let v6_ = e7_ + e8_ + abs($v6);
    let $z1 = $c0c2 + $c1c1;
    let z1 = qaq(c0c2, c1c1); // 48-bit aligned => error free
    let $z2 = $d0d2 + $d1d1;
    let z2 = qaq(d0d2, d1d1); // 48-bit aligned => error free
    let $z3 = 2 * $c0c2 + $c1c1;
    let z3 = qaq(qm2(c0c2), c1c1); // 48-bit aligned => error free
    let $z4 = 2 * $d0d2 + $d1d1;
    let z4 = qaq(qm2(d0d2), d1d1); // 48-bit aligned => error free
    let $z5 = 2 * $c1d1 + $c2d0;
    let z5 = qaq(qm2(c1d1), c2d0); // 48-bit aligned => error free
    let $z6 = 2 * $c1d1 + $c0d2;
    let z6 = qaq(qm2(c1d1), c0d2); // 48-bit aligned => error free
    let $z7 = 2 * $c2d0 + $c1d1;
    let z7 = qaq(qm2(c2d0), c1d1); // 48-bit aligned => error free
    let $z8 = 6 * $c0c2 + $c1c1;
    let z8 = qaq(qmd(6, c0c2), c1c1); // 47-bit aligned => error free
    let $z9 = 6 * $d0d2 + $d1d1;
    let z9 = qaq(qmd(6, d0d2), d1d1); // 47-bit aligned => error free
    let $za = $c1d2 + $c2d1;
    let za = qaq(c1d2, c2d1); // 48-bit aligned => error free
    let $zb = $c0d2 + $c2d0;
    let zb = qaq(c0d2, c2d0); // 48-bit aligned => error free
    let $zc = 2 * $c1d0 + $c0d1;
    let zc = qaq(qm2(c1d0), c0d1); // 48-bit aligned => error free
    let $zd = 2 * $c0d1 + $c1d0;
    let zd = qaq(qm2(c0d1), c1d0); // 48-bit aligned => error free
    let $zf = $c0d2 + $c1d1;
    let zf = qaq(c0d2, c1d1); // 48-bit aligned => error free
    let $ze = $zf + $c2d0;
    let ze = qaq(zf, c2d0); // 48-bit aligned => error free
    let _z3 = abs($z3);
    let _z4 = abs($z4);
    let _z5 = abs($z5);
    let _za = abs($za);
    let _ze = abs($ze);
    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //let v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    let $s0 = 3 * $c2c2;
    let s0 = qmd(3, c2c2); // 48-bit aligned => error free
    let _s0 = abs($s0);
    let $t1 = 3 * $d2d2;
    let t1 = qmd(3, d2d2); // 48-bit aligned => error free
    let _t1 = abs($t1);
    let $s1 = $s0 * $vₓₓₓ;
    let s1 = qmq(s0, vₓₓₓ);
    let s1_ = _s0 * vₓₓₓ_ + 2 * abs($s1);
    let $s2 = $c2c2 * $vₓₓᵧ;
    let s2 = qmq(c2c2, vₓₓᵧ);
    let s2_ = _c2c2 * vₓₓᵧ_ + 2 * abs($s2);
    let $s3 = 2 * $c2d2 * $vₓₓᵧ;
    let s3 = qm2(qmq(c2d2, vₓₓᵧ));
    let s3_ = 2 * (_c2d2 * vₓₓᵧ_ + abs($s3));
    let $s4 = 2 * $c2d2 * $vₓᵧᵧ;
    let s4 = qm2(qmq(c2d2, vₓᵧᵧ));
    let s4_ = 2 * (_c2d2 * vₓᵧᵧ_ + abs($s4));
    let $s5 = $d2d2 * $vₓᵧᵧ;
    let s5 = qmq(d2d2, vₓᵧᵧ);
    let s5_ = _d2d2 * vₓᵧᵧ_ + 2 * abs($s5);
    let $s6 = $t1 * $vᵧᵧᵧ;
    let s6 = qmq(t1, vᵧᵧᵧ);
    let s6_ = _t1 * vᵧᵧᵧ_ + 2 * abs($s6);
    let $s7 = $s1 + $s3;
    let s7 = qaq(s1, s3);
    let s7_ = s1_ + s3_ + abs($s7);
    let $s8 = $s2 + $s4;
    let s8 = qaq(s2, s4);
    let s8_ = s2_ + s4_ + abs($s8);
    let $s9 = $s7 + $s5;
    let s9 = qaq(s7, s5);
    let s9_ = s7_ + s5_ + abs($s9);
    let $sa = $s8 + $s6;
    let sa = qaq(s8, s6);
    let sa_ = s8_ + s6_ + abs($sa);
    let $sb = c1 * $s9;
    let sb = qmd(c1, s9);
    let sb_ = _c1 * s9_ + abs($sb);
    let $sc = d1 * $sa;
    let sc = qmd(d1, sa);
    let sc_ = _d1 * sa_ + abs($sc);
    let $v5 = $sb + $sc;
    let v5 = qaq(sb, sc);
    let v5_ = sb_ + sc_ + abs($v5);
    // 3*a0*a2**2*v_xxx + 2*a0*a2*b2*v_xxy + a0*b2**2*v_xyy + 
    // 3*a1**2*a2*v_xxx + a1**2*b2*v_xxy + 2*a1*a2*b1*v_xxy + 
    // 2*a1*b1*b2*v_xyy + a2**2*b0*v_xxy + a2**2*v_xx + 
    // 2*a2*b0*b2*v_xyy + a2*b1**2*v_xyy + a2*b2*v_xy + 
    // 3*b0*b2**2*v_yyy + 3*b1**2*b2*v_yyy + b2**2*v_yy
    //let v4 =
    //    3*c2*(c0c2 + c1c1)*vₓₓₓ + 
    //    3*d2*(d0d2 + d1d1)*vᵧᵧᵧ + 
    //    (d2*(2*c0c2 + c1c1) + c2*(2*c1d1 + c2d0))*vₓₓᵧ +
    //    (d2*(2*c1d1 + c0d2) + c2*(2*d0d2 + d1d1))*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    //let v4 =
    //    (3*c2)*z1*vₓₓₓ + 
    //    (3*d2)*z2*vᵧᵧᵧ + 
    //    (d2*z3 + c2*z5)*vₓₓᵧ +
    //    (d2*z6 + c2*z4)*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    let $sd = d2 * $z3;
    let sd = qmd(d2, z3);
    let sd_ = abs($sd);
    let $se = d2 * $z6;
    let se = qmd(d2, z6);
    let se_ = abs($se);
    let $sf = c2 * $z5;
    let sf = qmd(c2, z5);
    let sf_ = abs($sf);
    let $sg = c2 * $z4;
    let sg = qmd(c2, z4);
    let sg_ = abs($sg);
    let $sh = (3 * c2) * $z1;
    let sh = qmd(3 * c2, z1); // 3*c2: 47-bit aligned => error free
    //let _sh = sh_;
    let sh_ = abs($sh);
    let $si = (3 * d2) * $z2;
    let si = qmd(3 * d2, z2); // 3*d2: 47-bit aligned => error free
    //let _si = si_;
    let si_ = abs($si);
    let $sj = $sd + $sf;
    let sj = qaq(sd, sf);
    let _sj = abs($sj);
    let sj_ = sd_ + sf_ + _sj;
    let $sk = $se + $sg;
    let sk = qaq(se, sg);
    let _sk = abs($sk);
    let sk_ = se_ + sg_ + _sk;
    let $sl = $sh * $vₓₓₓ;
    let sl = qmq(sh, vₓₓₓ);
    let sl_ = sh_ * (_vₓₓₓ + vₓₓₓ_) + 2 * abs($sl);
    let $sm = $si * $vᵧᵧᵧ;
    let sm = qmq(si, vᵧᵧᵧ);
    let sm_ = si_ * (_vᵧᵧᵧ + vᵧᵧᵧ_) + 2 * abs($sm);
    let $sn = $sj * $vₓₓᵧ;
    let sn = qmq(sj, vₓₓᵧ);
    let sn_ = sj_ * _vₓₓᵧ + _sj * vₓₓᵧ_ + 2 * abs($sn);
    let $so = $sk * $vₓᵧᵧ;
    let so = qmq(sk, vₓᵧᵧ);
    let so_ = sk_ * _vₓᵧᵧ + _sk * vₓᵧᵧ_ + 2 * abs($so);
    let $sp = $sl + $sm;
    let sp = qaq(sl, sm);
    let sp_ = sl_ + sm_ + abs($sp);
    let $sq = $sn + $so;
    let sq = qaq(sn, so);
    let sq_ = sn_ + so_ + abs($sq);
    let $sr = $c2c2 * $vₓₓ;
    let sr = qmq(c2c2, vₓₓ);
    let sr_ = _c2c2 * vₓₓ_ + 2 * abs($sr);
    let $ss = $d2d2 * $vᵧᵧ;
    let ss = qmq(d2d2, vᵧᵧ);
    let ss_ = _d2d2 * vᵧᵧ_ + 2 * abs($ss);
    let $st = $c2d2 * $vₓᵧ;
    let st = qmq(c2d2, vₓᵧ);
    let st_ = _c2d2 * vₓᵧ_ + 2 * abs($st);
    let $su = $sr + $ss;
    let su = qaq(sr, ss);
    let su_ = sr_ + ss_ + abs($su);
    let $sv = $sp + $sq;
    let sv = qaq(sp, sq);
    let sv_ = sp_ + sq_ + abs($sv);
    let $sw = $su + $st;
    let sw = qaq(su, st);
    let sw_ = su_ + st_ + abs($sw);
    let $v4 = $sv + $sw;
    let v4 = qaq(sv, sw);
    let v4_ = sv_ + sw_ + abs($v4);
    // 6*a0*a1*a2*v_xxx + 2*a0*a1*b2*v_xxy + 2*a0*a2*b1*v_xxy + 
    // 2*a0*b1*b2*v_xyy + a1**3*v_xxx + a1**2*b1*v_xxy + 
    // 2*a1*a2*b0*v_xxy + 2*a1*a2*v_xx + 2*a1*b0*b2*v_xyy + 
    // a1*b1**2*v_xyy + a1*b2*v_xy + 2*a2*b0*b1*v_xyy + 
    // a2*b1*v_xy + 6*b0*b1*b2*v_yyy + b1**3*v_yyy + 
    // 2*b1*b2*v_yy
    //let v3 =
    //    c1*(6*c0c2 + c1c1)*vₓₓₓ +
    //    d1*(6*d0d2 + d1d1)*vᵧᵧᵧ +        
    //    (2*c0*(c1d2 + c2d1) + c1*(c1d1 + 2*c2d0))*vₓₓᵧ +
    //    (2*d1*(c0d2 + c2d0) + c1*(d1d1 + 2*d0d2))*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    c1d2*vₓᵧ + c2d1*vₓᵧ;
    //let v3 =
    //    c1*z8*vₓₓₓ +
    //    d1*z9*vᵧᵧᵧ +        
    //    (2*c0*za + c1*z7)*vₓₓᵧ +
    //    (2*d1*zb + c1*z4)*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    za*vₓᵧ;
    let $sx = c1 * $z8;
    let sx = qmd(c1, z8);
    //let _sx = abs($sx);
    let sx_ = abs($sx);
    let $sy = d1 * $z9;
    let sy = qmd(d1, z9);
    //let _sy = abs($sy);
    let sy_ = abs($sy);
    let $sz = 2 * c0 * $za;
    let sz = qmd(2 * c0, za);
    let sz_ = abs($sz);
    let $o1 = 2 * d1 * $zb;
    let o1 = qmd(2 * d1, zb);
    let o1_ = abs($o1);
    let $o2 = c1 * $z7;
    let o2 = qmd(c1, z7);
    let o2_ = abs($o2);
    let $o3 = c1 * $z4;
    let o3 = qmd(c1, z4);
    let o3_ = abs($o3);
    let $o4 = $sz + $o2;
    let o4 = qaq(sz, o2);
    let _o4 = abs($o4);
    let o4_ = sz_ + o2_ + _o4;
    let $o5 = $o1 + $o3;
    let o5 = qaq(o1, o3);
    let _o5 = abs($o5);
    let o5_ = o1_ + o3_ + _o5;
    let $o6 = $d1d2 * $vᵧᵧ;
    let o6 = qmq(d1d2, vᵧᵧ);
    let o6_ = _d1d2 * vᵧᵧ_ + 2 * abs($o6);
    let $o7 = $c1c2 * $vₓₓ;
    let o7 = qmq(c1c2, vₓₓ);
    let o7_ = _c1c2 * vₓₓ_ + 2 * abs($o7);
    let $o8 = $za * $vₓᵧ;
    let o8 = qmq(za, vₓᵧ);
    let o8_ = _za * vₓᵧ_ + 2 * abs($o8);
    let $o9 = $o6 + $o7;
    let o9 = qaq(o6, o7);
    let o9_ = o6_ + o7_ + abs($o9);
    let $oa = $sx * $vₓₓₓ;
    let oa = qmq(sx, vₓₓₓ);
    let oa_ = sx_ * (_vₓₓₓ + vₓₓₓ_) + 2 * abs($oa);
    let $ob = $o4 * $vₓₓᵧ;
    let ob = qmq(o4, vₓₓᵧ);
    let ob_ = o4_ * _vₓₓᵧ + _o4 * vₓₓᵧ_ + 2 * abs($ob);
    let $oc = $sy * $vᵧᵧᵧ;
    let oc = qmq(sy, vᵧᵧᵧ);
    let oc_ = sy_ * (_vᵧᵧᵧ + vᵧᵧᵧ_) + 2 * abs($oc);
    let $od = $o5 * $vₓᵧᵧ;
    let od = qmq(o5, vₓᵧᵧ);
    let od_ = o5_ * _vₓᵧᵧ + _o5 * vₓᵧᵧ_ + 2 * abs($od);
    let $oe = $oa + $oc;
    let oe = qaq(oa, oc);
    let oe_ = oa_ + oc_ + abs($oe);
    let $og = $ob + $od;
    let og = qaq(ob, od);
    let og_ = ob_ + od_ + abs($og);
    let $oh = $oe + $og;
    let oh = qaq(oe, og);
    let oh_ = oe_ + og_ + abs($oh);
    let $oi = 2 * $o9 + $o8;
    let oi = qaq(qm2(o9), o8);
    let oi_ = 2 * o9_ + o8_ + abs($oi);
    let $v3 = $oh + $oi;
    let v3 = qaq(oh, oi);
    let v3_ = oh_ + oi_ + abs($v3);
    // 3*a0**2*a2*v_xxx + a0**2*b2*v_xxy + 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + 2*a0*a2*b0*v_xxy + 
    // 2*a0*a2*v_xx + 2*a0*b0*b2*v_xyy + a0*b1**2*v_xyy + a0*b2*v_xy + a1**2*b0*v_xxy + a1**2*v_xx + 
    // 2*a1*b0*b1*v_xyy + a1*b1*v_xy + a2*b0**2*v_xyy + a2*b0*v_xy + a2*v_x + 3*b0**2*b2*v_yyy + 
    // 3*b0*b1**2*v_yyy + 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //let v2 =
    //    (3*c0*(c0c2 + c1c1))*vₓₓₓ +
    //    (3*d0*(d0d2 + d1d1))*vᵧᵧᵧ +
    //    (c0*(2*c1d1 + c0d2) + d0*(2*c0c2 + c1c1))*vₓₓᵧ +
    //    (c0*(2*d0d2 + d1d1) + d0*(2*c1d1 + c2d0))*vₓᵧᵧ +
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    //let v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    let $oj = (3 * c0) * $z1;
    let oj = qmd(3 * c0, z1);
    //let _oj = abs(oj);
    let oj_ = abs($oj);
    let $ok = (3 * d0) * $z2;
    let ok = qmd(3 * d0, z2);
    //let _ok = abs(ok);
    let ok_ = abs($ok);
    let $ol = c0 * $z6;
    let ol = qmd(c0, z6);
    let ol_ = abs($ol);
    let $om = c0 * $z4;
    let om = qmd(c0, z4);
    let om_ = abs($om);
    let $on = d0 * $z3;
    let on = qmd(d0, z3);
    let on_ = abs($on);
    let $oo = d0 * $z5;
    let oo = qmd(d0, z5);
    let oo_ = abs($oo);
    let $op = $ol + $on;
    let op = qaq(ol, on);
    let _op = abs($op);
    let op_ = ol_ + on_ + _op;
    let $oq = $om + $oo;
    let oq = qaq(om, oo);
    let _oq = abs($oq);
    let oq_ = om_ + oo_ + _oq;
    let $or = $oj * $vₓₓₓ;
    let or = qmq(oj, vₓₓₓ);
    let or_ = oj_ * (_vₓₓₓ + vₓₓₓ_) + 2 * abs($or);
    let $os = $ok * $vᵧᵧᵧ;
    let os = qmq(ok, vᵧᵧᵧ);
    let os_ = ok_ * (_vᵧᵧᵧ + vᵧᵧᵧ_) + 2 * abs($os);
    let $ot = $op * $vₓₓᵧ;
    let ot = qmq(op, vₓₓᵧ);
    let ot_ = op_ * _vₓₓᵧ + _op * vₓₓᵧ_ + 2 * abs($ot);
    let $ou = $oq * $vₓᵧᵧ;
    let ou = qmq(oq, vₓᵧᵧ);
    let ou_ = oq_ * _vₓᵧᵧ + _oq * vₓᵧᵧ_ + 2 * abs($ou);
    let $ov = $z3 * $vₓₓ;
    let ov = qmq(z3, vₓₓ);
    let ov_ = _z3 * vₓₓ_ + 2 * abs($ov);
    let $ow = $z4 * $vᵧᵧ;
    let ow = qmq(z4, vᵧᵧ);
    let ow_ = _z4 * vᵧᵧ_ + 2 * abs($ow);
    let $ox = $ze * $vₓᵧ;
    let ox = qmq(ze, vₓᵧ);
    let ox_ = _ze * vₓᵧ_ + 2 * abs($ox);
    let $oy = c2 * $vₓ;
    let oy = qmd(c2, vₓ);
    let oy_ = _c2 * vₓ_ + abs($oy);
    let $oz = d2 * $vᵧ;
    let oz = qmd(d2, vᵧ);
    let oz_ = _d2 * vᵧ_ + abs($oz);
    let $p1 = $or + $os;
    let p1 = qaq(or, os);
    let p1_ = or_ + os_ + abs($p1);
    let $p2 = $ot + $ou;
    let p2 = qaq(ot, ou);
    let p2_ = ot_ + ou_ + abs($p2);
    let $p3 = $ov + $ow;
    let p3 = qaq(ov, ow);
    let p3_ = ov_ + ow_ + abs($p3);
    let $p4 = $p1 + $p2;
    let p4 = qaq(p1, p2);
    let p4_ = p1_ + p2_ + abs($p4);
    let $p5 = $p3 + $ox;
    let p5 = qaq(p3, ox);
    let p5_ = p3_ + ox_ + abs($p5);
    let $p6 = $oy + $oz;
    let p6 = qaq(oy, oz);
    let p6_ = oy_ + oz_ + abs($p6);
    let $p7 = $p4 + $p5;
    let p7 = qaq(p4, p5);
    let p7_ = p4_ + p5_ + abs($p7);
    let $v2 = $p7 + $p6;
    let v2 = qaq(p7, p6);
    let v2_ = p7_ + p6_ + abs($v2);
    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + 
    // a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*(c0d1 + 2*c1d0)*vₓₓᵧ +
    //    d0*(c1d0 + 2*c0d1)*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    //let v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*zc*vₓₓᵧ +
    //    d0*zd*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    let $p8 = (3 * c0) * $c0c1;
    let p8 = qmd(3 * c0, c0c1);
    //let _p8 = abs(p8);
    let p8_ = abs($p8);
    let $p9 = (3 * d0) * $d0d1;
    let p9 = qmd(3 * d0, d0d1);
    //let _p9 = abs(p9);
    let p9_ = abs($p9);
    let $pa = c0 * $zc;
    let pa = qmd(c0, zc);
    //let _pa = abs($pa);
    let pa_ = abs($pa);
    let $pb = d0 * $zd;
    let pb = qmd(d0, zd);
    //let _pb = abs($pb);
    let pb_ = abs($pb);
    let $pc = $c0c1 * $vₓₓ;
    let pc = qmq(c0c1, vₓₓ);
    let pc_ = _c0c1 * vₓₓ_ + 2 * abs($pc);
    let $pd = $d0d1 * $vᵧᵧ;
    let pd = qmq(d0d1, vᵧᵧ);
    let pd_ = _d0d1 * vᵧᵧ_ + 2 * abs($pd);
    let $pe = $c0d1 * $vₓᵧ;
    let pe = qmq(c0d1, vₓᵧ);
    let pe_ = _c0d1 * vₓᵧ_ + 2 * abs($pe);
    let $pf = $c1d0 * $vₓᵧ;
    let pf = qmq(c1d0, vₓᵧ);
    let pf_ = _c1d0 * vₓᵧ_ + 2 * abs($pf);
    let $pg = 2 * ($pc + $pd);
    let pg = qm2(qaq(pc, pd));
    let pg_ = 2 * (pc_ + pd_) + abs($pg);
    let $ph = $pe + $pf;
    let ph = qaq(pe, pf);
    let ph_ = pe_ + pf_ + abs($ph);
    let $pi = c1 * $vₓ;
    let pi = qmd(c1, vₓ);
    let pi_ = _c1 * vₓ_ + abs($pi);
    let $pj = d1 * $vᵧ;
    let pj = qmd(d1, vᵧ);
    let pj_ = _d1 * vᵧ_ + abs($pj);
    let $pk = $p8 * $vₓₓₓ;
    let pk = qmq(p8, vₓₓₓ);
    let pk_ = p8_ * (_vₓₓₓ + vₓₓₓ_) + 2 * abs($pk);
    let $pl = $p9 * $vᵧᵧᵧ;
    let pl = qmq(p9, vᵧᵧᵧ);
    let pl_ = p9_ * (_vᵧᵧᵧ + vᵧᵧᵧ_) + 2 * abs($pl);
    let $pm = $pa * $vₓₓᵧ;
    let pm = qmq(pa, vₓₓᵧ);
    let pm_ = pa_ * (_vₓₓᵧ + vₓₓᵧ_) + 2 * abs($pm);
    let $pn = $pb * $vₓᵧᵧ;
    let pn = qmq(pb, vₓᵧᵧ);
    let pn_ = pb_ * (_vₓᵧᵧ + vₓᵧᵧ_) + 2 * abs($pn);
    let $po = $pk + $pl;
    let po = qaq(pk, pl);
    let po_ = pk_ + pl_ + abs($po);
    let $pp = $pm + $pn;
    let pp = qaq(pm, pn);
    let pp_ = pm_ + pn_ + abs($pp);
    let $pq = $po + $pp;
    let pq = qaq(po, pp);
    let pq_ = po_ + pp_ + abs($pq);
    let $pr = $pg + $ph;
    let pr = qaq(pg, ph);
    let pr_ = pg_ + ph_ + abs($pr);
    let $ps = $pi + $pj;
    let ps = qaq(pi, pj);
    let ps_ = pi_ + pj_ + abs($ps);
    let $pt = $pq + $pr;
    let pt = qaq(pq, pr);
    let pt_ = pq_ + pr_ + abs($pt);
    let $v1 = $pt + $ps;
    let v1 = qaq(pt, ps);
    let v1_ = pt_ + ps_ + abs($v1);
    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    let $pu = c0 * $vₓₓₓ;
    let pu = qmd(c0, vₓₓₓ);
    let pu_ = _c0 * vₓₓₓ_ + abs($pu);
    let $pv = c0 * $vₓᵧᵧ;
    let pv = qmd(c0, vₓᵧᵧ);
    let pv_ = _c0 * vₓᵧᵧ_ + abs($pv);
    let $pw = d0 * $vₓₓᵧ;
    let pw = qmd(d0, vₓₓᵧ);
    let pw_ = _d0 * vₓₓᵧ_ + abs($pw);
    let $px = d0 * $vᵧᵧᵧ;
    let px = qmd(d0, vᵧᵧᵧ);
    let px_ = _d0 * vᵧᵧᵧ_ + abs($px);
    let $py = $pu + $pw;
    let py = qaq(pu, pw);
    let py_ = pu_ + pw_ + abs($py);
    let $pz = $pv + $px;
    let pz = qaq(pv, px);
    let pz_ = pv_ + px_ + abs($pz);
    let $u1 = $py + $vₓₓ;
    let u1 = qaq(py, vₓₓ);
    let _u1 = abs($u1);
    let u1_ = py_ + vₓₓ_ + _u1;
    let $u2 = $pz + $vᵧᵧ;
    let u2 = qaq(pz, vᵧᵧ);
    let _u2 = abs($u2);
    let u2_ = pz_ + vᵧᵧ_ + _u2;
    let $u3 = $c0c0 * $u1;
    let u3 = qmq(c0c0, u1);
    let u3_ = _c0c0 * u1_ + 2 * abs($u3);
    let $u4 = $d0d0 * $u2;
    let u4 = qmq(d0d0, u2);
    let u4_ = _d0d0 * u2_ + 2 * abs($u4);
    let $u5 = $c0d0 * $vₓᵧ;
    let u5 = qmq(c0d0, vₓᵧ);
    let u5_ = _c0d0 * vₓᵧ_ + 2 * abs($u5);
    let $u6 = c0 * $vₓ;
    let u6 = qmd(c0, vₓ);
    let u6_ = _c0 * vₓ_ + abs($u6);
    let $u7 = d0 * $vᵧ;
    let u7 = qmd(d0, vᵧ);
    let u7_ = _d0 * vᵧ_ + abs($u7);
    let $u8 = $u3 + $u4;
    let u8 = qaq(u3, u4);
    let u8_ = u3_ + u4_ + abs($u8);
    let $u9 = $u8 + $u5;
    let u9 = qaq(u8, u5);
    let u9_ = u8_ + u5_ + abs($u9);
    let $ua = $u6 + $u7;
    let ua = qaq(u6, u7);
    let ua_ = u6_ + u7_ + abs($ua);
    let $ub = $u9 + $ua;
    let ub = qaq(u9, ua);
    let ub_ = u9_ + ua_ + abs($ub);
    let $v0 = $ub + $v;
    let v0 = qaq(ub, v);
    let v0_ = ub_ + v_ + abs($v0);
    return {
        coeffs: [v6, v5, v4, v3, v2, v1, v0],
        errBound: [γγ3 * v6_, γγ3 * v5_, γγ3 * v4_, γγ3 * v3_, γγ3 * v2_, γγ3 * v1_, γγ3 * v0_]
    };
}
exports.getCoeffs3x2Quad = getCoeffs3x2Quad;
//# sourceMappingURL=get-coefficients-3x2.js.map