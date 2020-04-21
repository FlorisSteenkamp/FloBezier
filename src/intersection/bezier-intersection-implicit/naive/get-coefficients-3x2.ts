
import { getImplicitForm3 } from "../../../implicit-form/naive/get-implicit-form3";
import { γ1 } from "../../../error-analysis/error-analysis";
import { getXY } from "../../../to-power-basis/get-xy";


let abs = Math.abs;


function getCoeffs3x2(
        ps1: number[][], 
        ps2: number[][]) {

    let { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3(ps1);

    let [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    let _vₓₓₓ  = abs(vₓₓₓ);
    let _vₓₓᵧ  = abs(vₓₓᵧ);
    let _vₓᵧᵧ  = abs(vₓᵧᵧ);
    let _vᵧᵧᵧ  = abs(vᵧᵧᵧ);
    let _vₓₓ   = abs(vₓₓ);
    let _vₓᵧ   = abs(vₓᵧ);
    let _vᵧᵧ   = abs(vᵧᵧ);

    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _c2 = abs(c2);
    let _d0 = abs(d0);
    let _d1 = abs(d1);
    let _d2 = abs(d2);

    let c0c0 = c0*c0;
    let c0c1 = c0*c1;
    let c0c2 = c0*c2;
    let c0d0 = c0*d0;
    let c0d1 = c0*d1;
    let c0d2 = c0*d2;
    let c1c1 = c1*c1;
    let c1c2 = c1*c2;
    let c1d0 = c1*d0;
    let c1d1 = c1*d1;
    let c1d2 = c1*d2;
    let c2c2 = c2*c2;
    let c2d0 = c2*d0;
    let c2d1 = c2*d1;
    let c2d2 = c2*d2;
    let d0d0 = d0*d0;
    let d0d1 = d0*d1;
    let d0d2 = d0*d2;
    let d1d1 = d1*d1;
    let d1d2 = d1*d2;
    let d2d2 = d2*d2;

    let _c0c0 = abs(c0c0);
    let _c0c1 = abs(c0c1);
    let _c0c2 = abs(c0c2);
    let _c0d0 = abs(c0d0);
    let _c0d1 = abs(c0d1);
    let _c0d2 = abs(c0d2);
    let _c1c1 = abs(c1c1);
    let _c1c2 = abs(c1c2);
    let _c1d0 = abs(c1d0);
    let _c1d1 = abs(c1d1);
    let _c1d2 = abs(c1d2);
    let _c2c2 = abs(c2c2);
    let _c2d0 = abs(c2d0);
    let _c2d1 = abs(c2d1);
    let _c2d2 = abs(c2d2);
    let _d0d0 = abs(d0d0);
    let _d0d1 = abs(d0d1);
    let _d0d2 = abs(d0d2);
    let _d1d1 = abs(d1d1);
    let _d1d2 = abs(d1d2);
    let _d2d2 = abs(d2d2);
   

    // a2**3*v_xxx + a2**2*b2*v_xxy + a2*b2**2*v_xyy + b2**3*v_yyy
    //let v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    let e1 = c2*vₓₓₓ;
    let e1_ = _c2*vₓₓₓ_ + abs(e1);
    let e2 = c2*vₓᵧᵧ;
    let e2_ = _c2*vₓᵧᵧ_ + abs(e2);
    let e3 = d2*vₓₓᵧ;
    let e3_ = _d2*vₓₓᵧ_ + abs(e3);
    let e4 = d2*vᵧᵧᵧ;
    let e4_ = _d2*vᵧᵧᵧ_ + abs(e4);
    let e5 = e1 + e3;
    let _e5 = abs(e5);
    let e5_ = e1_ + e3_ + _e5;
    let e6 = e2 + e4;
    let _e6 = abs(e6);
    let e6_ = e2_ + e4_ + _e6;
    let e7 = c2c2*e5;
    let e7_ = _c2c2*(_e5 + e5_) + abs(e7);
    let e8 = d2d2*e6;
    let e8_ = _d2d2*(_e6 + e6_) + abs(e8);
    let v6 = e7 + e8;
    let v6_ = e7_ + e8_ + abs(v6);


    let z1 = c0c2 + c1c1;
    let z1_ = _c0c2 + _c1c1 + abs(z1);
    let z2 = d0d2 + d1d1;
    let z2_ = _d0d2 + _d1d1 + abs(z2);
    let z3 = 2*c0c2 + c1c1;
    let _z3 = abs(z3);
    let z3_ = 2*_c0c2 + _c1c1 + _z3;
    let z4 = 2*d0d2 + d1d1;
    let _z4 = abs(z4);
    let z4_ = 2*_d0d2 + _d1d1 + _z4;
    let z5 = 2*c1d1 + c2d0;
    let _z5 = abs(z5);
    let z5_ = 2*_c1d1 + _c2d0 + _z5;
    let z6 = 2*c1d1 + c0d2;
    let z6_ = 2*_c1d1 + _c0d2 + abs(z6);
    let z7 = 2*c2d0 + c1d1;
    let z7_ = 2*_c2d0 + _c1d1 + abs(z7);
    let z8 = 6*c0c2 + c1c1;
    let z8_ = 12*_c0c2 + _c1c1 + abs(z8);
    let z9 = 6*d0d2 + d1d1;
    let z9_ = 12*_d0d2 + _d1d1 + abs(z9);
    let za = c1d2 + c2d1;
    let _za = abs(za);
    let za_ = _c1d2 + _c2d1 + _za;
    let zb = c0d2 + c2d0;
    let zb_ = _c0d2 + _c2d0 + abs(zb);
    let zc = 2*c1d0 + c0d1;
    let zc_ = 2*_c1d0 + _c0d1 + abs(zc);
    let zd = 2*c0d1 + c1d0;
    let zd_ = 2*_c0d1 + _c1d0 + abs(zd);
    let zf = c0d2 + c1d1;
    let zf_ = _c0d2 + _c1d1 + abs(zf);
    let ze = zf + c2d0;
    let _ze = abs(ze);
    let ze_ = zf_ + _c2d0 + _ze;


    // 3*a1*a2**2*v_xxx + 2*a1*a2*b2*v_xxy + a1*b2**2*v_xyy + 
    // a2**2*b1*v_xxy + 2*a2*b1*b2*v_xyy + 3*b1*b2**2*v_yyy
    //let v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    let s0 = 3*c2c2;
    let _s0 = abs(s0);
    let s0_ = 3*_c2c2 + _s0;
    let t1 = 3*d2d2;
    let _t1 = abs(t1);
    let t1_ = 3*_d2d2 + _t1;
    let s1 = s0*vₓₓₓ;
    let s1_ = s0_*_vₓₓₓ + _s0*vₓₓₓ_ + abs(s1);
    let s2 = c2c2*vₓₓᵧ;
    let s2_ = _c2c2*(_vₓₓᵧ + vₓₓᵧ_) + abs(s2);
    let s3 = 2*c2d2*vₓₓᵧ;
    let s3_ = 2*(_c2d2*(_vₓₓᵧ + vₓₓᵧ_)) + abs(s3);
    let s4 = 2*c2d2*vₓᵧᵧ;
    let s4_ = 2*(_c2d2*(_vₓᵧᵧ + vₓᵧᵧ_)) + abs(s4);
    let s5 = d2d2*vₓᵧᵧ;
    let s5_ = _d2d2*(_vₓᵧᵧ + vₓᵧᵧ_) + abs(s5);
    let s6 = t1*vᵧᵧᵧ;
    let s6_ = t1_*_vᵧᵧᵧ + _t1*vᵧᵧᵧ_ + abs(s6);
    let s7 = s1 + s3;
    let s7_ = s1_ + s3_ + abs(s7);
    let s8 = s2 + s4;
    let s8_ = s2_ + s4_ + abs(s8);
    let s9 = s7 + s5;
    let s9_ = s7_ + s5_ + abs(s9);
    let sa = s8 + s6;
    let sa_ = s8_ + s6_ + abs(sa);
    let sb = c1*s9;
    let sb_ = _c1*s9_ + abs(sb);
    let sc = d1*sa;
    let sc_ = _d1*sa_ + abs(sc);
    let v5 = sb + sc;
    let v5_ = sb_ + sc_ + abs(v5);


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
    let sd = d2*z3;
    let sd_ = _d2*z3_ + abs(sd);
    let se = d2*z6;
    let se_ = _d2*z6_ + abs(se);
    let sf = c2*z5;
    let sf_ = _c2*z5_ + abs(sf);
    let sg = c2*z4;
    let sg_ = _c2*z4_ + abs(sg);
    let sh = (3*c2)*z1;
    let _sh = abs(sh);
    let sh_ = (3*_c2)*z1_ + _sh;  // 3*c2: 47-bit aligned => error free
    let si = (3*d2)*z2;
    let _si = abs(si);
    let si_ = (3*_d2)*z2_ + _si;  // 3*d2: 47-bit aligned => error free
    let sj = sd + sf;
    let _sj = abs(sj);
    let sj_ = sd_ + sf_ + _sj;
    let sk = se + sg;
    let _sk = abs(sk);
    let sk_ = se_ + sg_ + _sk;
    let sl = sh*vₓₓₓ;
    let sl_ = sh_*_vₓₓₓ + _sh*vₓₓₓ_ + abs(sl);
    let sm = si*vᵧᵧᵧ;
    let sm_ = si_*_vᵧᵧᵧ + _si*vᵧᵧᵧ_ + abs(sm);
    let sn = sj*vₓₓᵧ;
    let sn_ = sj_*_vₓₓᵧ + _sj*vₓₓᵧ_ + abs(sn);
    let so = sk*vₓᵧᵧ;
    let so_ = sk_*_vₓᵧᵧ + _sk*vₓᵧᵧ_ + abs(so);
    let sp = sl + sm;
    let sp_ = sl_ + sm_ + abs(sp);
    let sq = sn + so;
    let sq_ = sn_ + so_ + abs(sq);
    let sr = c2c2*vₓₓ;
    let sr_ = _c2c2*(vₓₓ_ + _vₓₓ) + abs(sr);
    let ss = d2d2*vᵧᵧ;
    let ss_ = _d2d2*(vᵧᵧ_ + _vᵧᵧ) + abs(ss);
    let st = c2d2*vₓᵧ;
    let st_ = _c2d2*(vₓᵧ_ + _vₓᵧ) + abs(st);
    let su = sr + ss;
    let su_ = sr_ + ss_ + abs(su);
    let sv = sp + sq;
    let sv_ = sp_ + sq_ + abs(sv);
    let sw = su + st;
    let sw_ = su_ + st_ + abs(sw);
    let v4 = sv + sw;
    let v4_ = sv_ + sw_ + abs(v4);


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
    let sx = c1*z8;
    let _sx = abs(sx);
    let sx_ = _c1*z8_ + _sx;
    let sy = d1*z9;
    let _sy = abs(sy);
    let sy_ = _d1*z9_ + _sy;
    let sz = 2*c0*za;
    let sz_ = 2*(_c0*za_) + abs(sz);
    let o1 = 2*d1*zb;
    let o1_ = 2*(_d1*zb_) + abs(o1);
    let o2 = c1*z7;
    let o2_ = _c1*z7_ + abs(o2);
    let o3 = c1*z4;
    let o3_ = _c1*z4_ + abs(o3);
    let o4 = sz + o2;
    let _o4 = abs(o4);
    let o4_ = sz_ + o2_ + _o4;
    let o5 = o1 + o3;
    let _o5 = abs(o5);
    let o5_ = o1_ + o3_ + _o5;
    let o6 = d1d2*vᵧᵧ;
    let o6_ = _d1d2*(_vᵧᵧ + vᵧᵧ_) + abs(o6);
    let o7 = c1c2*vₓₓ;
    let o7_ = _c1c2*(_vₓₓ + vₓₓ_) + abs(o7);
    let o8 = za*vₓᵧ;
    let o8_ = za_*_vₓᵧ + _za*vₓᵧ_ + abs(o8);
    let o9 = o6 + o7;
    let o9_ = o6_ + o7_ + abs(o9);
    let oa = sx*vₓₓₓ;
    let oa_ = sx_*_vₓₓₓ + _sx*vₓₓₓ_ + abs(oa);
    let ob = o4*vₓₓᵧ;
    let ob_ = o4_*_vₓₓᵧ + _o4*vₓₓᵧ_ + abs(ob);
    let oc = sy*vᵧᵧᵧ;
    let oc_ = sy_*_vᵧᵧᵧ + _sy*vᵧᵧᵧ_ + abs(oc);
    let od = o5*vₓᵧᵧ;
    let od_ = o5_*_vₓᵧᵧ + _o5*vₓᵧᵧ_ + abs(od);
    let oe = oa + oc;
    let oe_ = oa_ + oc_ + abs(oe);
    let og = ob + od;
    let og_ = ob_ + od_ + abs(og);
    let oh = oe + og;
    let oh_ = oe_ + og_ + abs(oh);
    let oi = 2*o9 + o8;
    let oi_ = 2*o9_ + o8_ + abs(oi);
    let v3 = oh + oi;
    let v3_ = oh_ + oi_ + abs(v3);


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
    let oj = (3*c0)*z1;
    let _oj = abs(oj);
    let oj_ = (3*_c0)*z1_ + _oj;
    let ok = (3*d0)*z2;
    let _ok = abs(ok);
    let ok_ = (3*_d0)*z2_ + _ok;
    let ol = c0*z6;
    let ol_ = _c0*z6_ + abs(ol);
    let om = c0*z4;
    let om_ = _c0*z4_ + abs(om);
    let on = d0*z3;
    let on_ = _d0*z3_ + abs(on);
    let oo = d0*z5;
    let oo_ = _d0*z5_ + abs(oo);
    let op = ol + on;
    let _op = abs(op);
    let op_ = ol_ + on_ + _op;
    let oq = om + oo;
    let _oq = abs(oq);
    let oq_ = om_ + oo_ + _oq;
    let or = oj*vₓₓₓ;
    let or_ = oj_*_vₓₓₓ + _oj*vₓₓₓ_ + abs(or);
    let os = ok*vᵧᵧᵧ;
    let os_ = ok_*_vᵧᵧᵧ + _ok*vᵧᵧᵧ_ + abs(os);
    let ot = op*vₓₓᵧ;
    let ot_ = op_*_vₓₓᵧ + _op*vₓₓᵧ_ + abs(ot);
    let ou = oq*vₓᵧᵧ;
    let ou_ = oq_*_vₓᵧᵧ + _oq*vₓᵧᵧ_ + abs(ou);
    let ov = z3*vₓₓ;
    let ov_ = z3_*_vₓₓ + _z3*vₓₓ_ + abs(ov);
    let ow = z4*vᵧᵧ;
    let ow_ = z4_*_vᵧᵧ + _z4*vᵧᵧ_ + abs(ow);
    let ox = ze*vₓᵧ;
    let ox_ = ze_*_vₓᵧ + _ze*vₓᵧ_ + abs(ox);
    let oy = c2*vₓ;
    let oy_ = _c2*vₓ_ + abs(oy);
    let oz = d2*vᵧ;
    let oz_ = _d2*vᵧ_ + abs(oz);
    let p1 = or + os;
    let p1_ = or_ + os_ + abs(p1);
    let p2 = ot + ou;
    let p2_ = ot_ + ou_ + abs(p2);
    let p3 = ov + ow;
    let p3_ = ov_ + ow_ + abs(p3);
    let p4 = p1 + p2;
    let p4_ = p1_ + p2_ + abs(p4);
    let p5 = p3 + ox;
    let p5_ = p3_ + ox_ + abs(p5);
    let p6 = oy + oz;
    let p6_ = oy_ + oz_ + abs(p6);
    let p7 = p4 + p5;
    let p7_ = p4_ + p5_ + abs(p7);
    let v2 = p7 + p6;
    let v2_ = p7_ + p6_ + abs(v2);


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
    let p8 = (3*c0)*c0c1;
    let _p8 = abs(p8);
    let p8_ = (3*_c0)*_c0c1 + _p8;
    let p9 = (3*d0)*d0d1;
    let _p9 = abs(p9);
    let p9_ = (3*_d0)*_d0d1 + _p9;
    let pa = c0*zc;
    let _pa = abs(pa);
    let pa_ = _c0*zc_ + _pa;
    let pb = d0*zd;
    let _pb = abs(pb);
    let pb_ = _d0*zd_ + _pb;
    let pc = c0c1*vₓₓ;
    let pc_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(pc);
    let pd = d0d1*vᵧᵧ;
    let pd_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(pd);
    let pe = c0d1*vₓᵧ;
    let pe_ = _c0d1*(_vₓᵧ + vₓᵧ_) + abs(pe);
    let pf = c1d0*vₓᵧ;
    let pf_ = _c1d0*(_vₓᵧ + vₓᵧ_) + abs(pf);
    let pg = 2*(pc + pd);
    let pg_ = 2*(pc_ + pd_) + abs(pg);
    let ph = pe + pf;
    let ph_ = pe_ + pf_ + abs(ph);
    let pi = c1*vₓ;
    let pi_ = _c1*vₓ_ + abs(pi);
    let pj = d1*vᵧ;
    let pj_ = _d1*vᵧ_ + abs(pj);
    let pk = p8*vₓₓₓ;
    let pk_ = p8_*_vₓₓₓ + _p8*vₓₓₓ_ + abs(pk);
    let pl = p9*vᵧᵧᵧ;
    let pl_ = p9_*_vᵧᵧᵧ + _p9*vᵧᵧᵧ_ + abs(pl);
    let pm = pa*vₓₓᵧ;
    let pm_ = pa_*_vₓₓᵧ + _pa*vₓₓᵧ_ + abs(pm);
    let pn = pb*vₓᵧᵧ;
    let pn_ = pb_*_vₓᵧᵧ + _pb*vₓᵧᵧ_ + abs(pn);
    let po = pk + pl;
    let po_ = pk_ + pl_ + abs(po);
    let pp = pm + pn;
    let pp_ = pm_ + pn_ + abs(pp);
    let pq = po + pp;
    let pq_ = po_ + pp_ + abs(pq);
    let pr = pg + ph;
    let pr_ = pg_ + ph_ + abs(pr);
    let ps = pi + pj;
    let ps_ = pi_ + pj_ + abs(ps);
    let pt = pq + pr;
    let pt_ = pq_ + pr_ + abs(pt);
    let v1 = pt + ps;
    let v1_ = pt_ + ps_ + abs(v1);


    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + 
    // b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    let pu = c0*vₓₓₓ;
    let pu_ = _c0*vₓₓₓ_ + abs(pu);
    let pv = c0*vₓᵧᵧ;
    let pv_ = _c0*vₓᵧᵧ_ + abs(pv);
    let pw = d0*vₓₓᵧ;
    let pw_ = _d0*vₓₓᵧ_ + abs(pw);
    let px = d0*vᵧᵧᵧ;
    let px_ = _d0*vᵧᵧᵧ_ + abs(px);
    let py = pu + pw;
    let py_ = pu_ + pw_ + abs(py);
    let pz = pv + px;
    let pz_ = pv_ + px_ + abs(pz);
    let u1 = py + vₓₓ;
    let _u1 = abs(u1);
    let u1_ = py_ + vₓₓ_ + _u1;
    let u2 = pz + vᵧᵧ;
    let _u2 = abs(u2);
    let u2_ = pz_ + vᵧᵧ_ + _u2;
    let u3 = c0c0*u1;
    let u3_ = _c0c0*(_u1 + u1_) + abs(u3);
    let u4 = d0d0*u2;
    let u4_ = _d0d0*(_u2 + u2_) + abs(u4);
    let u5 = c0d0*vₓᵧ;
    let u5_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(u5);
    let u6 = c0*vₓ;
    let u6_ = _c0*vₓ_ + abs(u6);
    let u7 = d0*vᵧ;
    let u7_ = _d0*vᵧ_ + abs(u7);
    let u8 = u3 + u4;
    let u8_ = u3_ + u4_ + abs(u8);
    let u9 = u8 + u5;
    let u9_ = u8_ + u5_ + abs(u9);
    let ua = u6 + u7;
    let ua_ = u6_ + u7_ + abs(ua);
    let ub = u9 + ua;
    let ub_ = u9_ + ua_ + abs(ub);
    let v0 = ub + v;
    let v0_ = ub_ + v_ + abs(v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffs3x2 }
