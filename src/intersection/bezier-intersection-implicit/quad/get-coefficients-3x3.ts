
import { twoProduct, qMultDouble2, qMultBy2, qMultQuad, qAddQuad } from 'flo-numerical';
import { getImplicitForm3Quad } from "../../../implicit-form/quad/get-implicit-form3";
import { γγ3 } from "../../../error-analysis/error-analysis";
import { getXY } from "../../../to-power-basis/get-xy";


let abs = Math.abs;
const tp  = twoProduct;
const qm2 = qMultBy2;
const qmd = qMultDouble2;
const qmq = qMultQuad;
const qaq = qAddQuad;


// TODO - better docs
/**
 * * the returned errors still need to be multiplied by 3*γ1*γ1
 * * precondition: 53-4-2 === 47-bit bit-aligned coefficient bitlength (this is
 * to improve speed considerably due to simpler error bound calculations)
 * @param ps1 
 * @param ps2 
 */
function getCoeffs3x3Quad(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3Quad(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    let $vₓₓₓ = vₓₓₓ[1];
    let $vₓₓᵧ = vₓₓᵧ[1];
    let $vₓᵧᵧ = vₓᵧᵧ[1];
    let $vᵧᵧᵧ = vᵧᵧᵧ[1];
    let $vₓₓ  = vₓₓ [1];
    let $vₓᵧ  = vₓᵧ [1];
    let $vᵧᵧ  = vᵧᵧ [1];
    let $vₓ  =  vₓ  [1];
    let $vᵧ  =  vᵧ  [1];
    let $v  =   v   [1];

    let _vₓₓₓ = abs($vₓₓₓ);
    let _vₓₓᵧ = abs($vₓₓᵧ);
    let _vₓᵧᵧ = abs($vₓᵧᵧ);
    let _vᵧᵧᵧ = abs($vᵧᵧᵧ);

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

    let _c0c0 = abs($c0c0);
    let _c0c1 = abs($c0c1);
    let _c2c3 = abs($c2c3);
    let _c3c3 = abs($c3c3);
    let _c3d3 = abs($c3d3);
    let _c0d0 = abs($c0d0);

    let _d0d0 = abs($d0d0);
    let _d0d1 = abs($d0d1);
    let _d2d3 = abs($d2d3);
    let _d3d3 = abs($d3d3);
   
    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _c2 = abs(c2);
    let _c3 = abs(c3);
    let _d0 = abs(d0);
    let _d1 = abs(d1);
    let _d2 = abs(d2);
    let _d3 = abs(d3);

    //let v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    let $g1 = c3*$c3c3;
    let g1 = qmd(c3,c3c3);
    let _g1 = _c3*_c3c3;
    let $g2 = c3*$d3d3;
    let g2 = qmd(c3,d3d3);
    let _g2 = _c3*_d3d3;
    let $g3 = d3*$c3c3;
    let g3 = qmd(d3,c3c3);
    let _g3 = _d3*_c3c3;
    let $g4 = d3*$d3d3;
    let g4 = qmd(d3,d3d3);
    let _g4 = _d3*_d3d3;
    let $g5 = $g1*$vₓₓₓ;
    let g5 = qmq(g1,vₓₓₓ);
    let g5_ = _g1*(_vₓₓₓ + vₓₓₓ_) + 2*abs($g5);
    let $g6 = $g2*$vₓᵧᵧ;
    let g6 = qmq(g2,vₓᵧᵧ);
    let g6_ = _g2*(_vₓᵧᵧ + vₓᵧᵧ_) + 2*abs($g2);
    let $g7 = $g3*$vₓₓᵧ;
    let g7 = qmq(g3,vₓₓᵧ);
    let g7_ = _g3*(_vₓₓᵧ + vₓₓᵧ_) + 2*abs($g3);
    let $g8 = $g4*$vᵧᵧᵧ;
    let g8 = qmq(g4,vᵧᵧᵧ);
    let g8_ = _g4*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($g4);
    let $g9 = $g5 + $g6;
    let g9 = qaq(g5,g6);
    let g9_ = g5_ + g6_ + abs($g9);
    let $ga = $g7 + $g8;
    let ga = qaq(g7,g8);
    let ga_ = g7_ + g8_ + abs($ga);
    let $v9 = $g9 + $ga;
    let v9 = qaq(g9,ga);
    let v9_ = g9_ + ga_ + abs($v9);


    //let v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    let $w1 = 2*$c2d3 + $c3d2;    
    let w1 = qaq(qm2(c2d3),c3d2);  // 47-bit aligned => error free
    let $w2 = 2*$c3d2 + $c2d3;        
    let w2 = qaq(qm2(c3d2),c2d3);  // 47-bit aligned => error free
    let $w3 = c3*$w1;
    let w3 = qmd(c3,w1);
    //let _w3 = abs($w3);
    let w3_ = abs($w3);
    let $w4 = d3*$w2;
    let w4 = qmd(d3,w2);
    //let _w4 = abs($w4);
    let w4_ = abs($w4);
    let $w5 = c2*$c3c3;
    let w5 = qmd(c2,c3c3);
    //let _w5 = abs($w5);
    let w5_ = abs($w5);
    let $w6 = d2*$d3d3;
    let w6 = qmd(d2,d3d3);
    //let _w6 = abs($w6);
    let w6_ = abs($w6);
    let $w7 = $vₓₓₓ*$w5;
    let w7 = qmq(vₓₓₓ,w5);
    let w7_ = w5_*(vₓₓₓ_ + _vₓₓₓ) + 2*abs($w7);
    let $u1 = $vᵧᵧᵧ*$w6;
    let u1 = qmq(vᵧᵧᵧ,w6);
    let u1_ = w6_*(vᵧᵧᵧ_ + _vᵧᵧᵧ) + 2*abs($u1);
    let $u2 = $vₓₓᵧ*$w3;
    let u2 = qmq(vₓₓᵧ,w3);
    let u2_ = w3_*(vₓₓᵧ_ + _vₓₓᵧ) + 2*abs($u2);
    let $u3 = $vₓᵧᵧ*$w4;
    let u3 = qmq(vₓᵧᵧ,w4);
    let u3_ = w4_*(vₓᵧᵧ_ + _vₓᵧᵧ) + 2*abs($u3);
    let $u4 = $u2 + $u3;
    let u4 = qaq(u2,u3);
    let u4_ = u2_ + u3_ + abs($u4);
    let $u5 = 3*($w7 + $u1);
    let u5 = qmd(3,qaq(w7,u1));
    let u5_ = 3*(w7_ + u1_) + 2*abs($u5);
    let $v8 = $u4 + $u5;
    let v8 = qaq(u4,u5);
    let v8_ = u4_ + u5_ + abs($v8);


    //let v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    let $o1 = c1*$c3d3;
    let o1 = qmd(c1,c3d3);
    let o1_ = abs($o1);
    let $o2 = d1*$c3c3;
    let o2 = qmd(d1,c3c3);
    let o2_ = abs($o2);
    let $o3 = c2*$d2d3;
    let o3 = qmd(c2,d2d3);
    let o3_ = abs($o3);
    let $o4 = c1*$d3d3;
    let o4 = qmd(c1,d3d3);
    let o4_ = abs($o4);
    let $o5 = c2*$c3d2;
    let o5 = qmd(c2,c3d2);
    let o5_ = abs($o5);
    let $o6 = d3*$c2c2;
    let o6 = qmd(d3,c2c2);
    let o6_ = abs($o6);
    let $o7 = c3*$d1d3;
    let o7 = qmd(c3,d1d3);
    let o7_ = abs($o7);
    let $o8 = d2*$c3d2;
    let o8 = qmd(d2,c3d2);
    let o8_ = abs($o8);
    let $w8 = $o1 + $o5;
    let w8 = qaq(o1,o5);
    let w8_ = o1_ + o5_ + abs($w8);
    let $w9 = $o2 + $o6;
    let w9 = qaq(o2,o6);
    let w9_ = o2_ + o6_ + abs($w9);
    let $wa = $o3 + $o7;
    let wa = qaq(o3,o7);
    let wa_ = o3_ + o7_ + abs($wa);
    let $wb = $o4 + $o8;
    let wb = qaq(o4,o8);
    let wb_ = o4_ + o8_ + abs($wb);
    let $wc = $c1c3 + $c2c2;
    let wc = qaq(c1c3,c2c2);  // 48-bit aligned => error free
    let $wd = $d1d3 + $d2d2;
    let wd = qaq(d1d3,d2d2);  // 48-bit aligned => error free
    let $we = 2*$w8 + $w9;
    let we = qaq(qm2(w8),w9);
    let _we = abs($we);
    let we_ = 2*w8_ + w9_ + _we;
    let $wf = 2*$wa + $wb;
    let wf = qaq(qm2(wa),wb);
    let _wf = abs($wf);
    let wf_ = 2*wa_ + wb_ + _wf;
    let $wg = $vₓₓᵧ*$we;
    let wg = qmq(vₓₓᵧ,we);
    let wg_ = vₓₓᵧ_*_we + _vₓₓᵧ*we_ + 2*abs($wg);
    let $wh = $vₓᵧᵧ*$wf;
    let wh = qmq(vₓᵧᵧ,wf);
    let wh_ = vₓᵧᵧ_*_wf + _vₓᵧᵧ*wf_ + 2*abs($wh);
    let $wi = c3*$wc;
    let wi = qmd(c3,wc);
    let _wi = abs($wi);
    let wi_ = _wi;
    let $wj = d3*$wd;
    let wj = qmd(d3,wd);
    let _wj = abs($wj);
    let wj_ = _wj;
    let $wk = $vₓₓₓ*$wi;
    let wk = qmq(vₓₓₓ,wi);
    let wk_ = vₓₓₓ_*_wi + _vₓₓₓ*wi_ + 2*abs($wk);
    let $wl = $vᵧᵧᵧ*$wj;
    let wl = qmq(vᵧᵧᵧ,wj);
    let wl_ = vᵧᵧᵧ_*_wj + _vᵧᵧᵧ*wj_ + 2*abs($wl);
    let $wm = $wg + $wh;
    let wm = qaq(wg,wh);
    let wm_ = wg_ + wh_ + abs($wm);
    let $wn = 3*($wk + $wl);
    let wn = qmd(3,qaq(wk,wl));
    let wn_ = 3*(wk_ + wl_) + 2*abs($wn);
    let $v7 = $wm + $wn;
    let v7 = qaq(wm,wn);
    let v7_ = wm_ + wn_ + abs($v7);


    //let v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    let $wo = $c2d3 + $c3d2; 
    let wo = qaq(c2d3,c3d2);  // 48-bit aligned => error free
    let _wo = abs($wo);
    let $zc = d2*$c2c2;
    let zc = qmd(d2,c2c2);
    let zc_ = abs($zc);
    let $zd = 2*c1*$wo;
    let zd = qm2(qmd(c1,wo));
    let zd_ = 2*abs($zd);
    let $wp = $zc + $zd;
    let wp = qaq(zc,zd);
    let wp_ = zc_ + zd_ + abs($wp);
    let $wq = 2*($c0d3 + $c2d1);  
    let wq = qm2(qaq(c0d3,c2d1));  // 48-bit aligned => error free
    let $wr = $wq + $c3d0; 
    let wr = qaq(wq,c3d0);  // 47-bit aligned => error free
    let $ze = c3*$wr;
    let ze = qmd(c3,wr);
    let ze_ = abs($ze)
    let $ws = $wp + $ze;
    let ws = qaq(wp,ze);
    let _ws = abs($ws);
    let ws_ = wp_ + ze_ + _ws;
    let $zf = c2*$d2d2;
    let zf = qmd(c2,d2d2);
    let zf_ = abs($zf);
    let $zg = 2*d1*$wo;
    let zg = qm2(qmd(d1,wo));
    let zg_ = 2*abs($zg);
    let $wt = $zf + $zg;
    let wt = qaq(zf,zg);
    let wt_ = zf_ + zg_ + abs($wt); 
    let $wu = 2*($c1d2 + $c3d0); 
    let wu = qm2(qaq(c1d2,c3d0));  // 48-bit aligned => error free
    let $wv = $wu + $c0d3;
    let wv = qaq(wu,c0d3);  // 47-bit aligned => error free
    let $zh = d3*$wv;
    let zh = qmd(d3,wv);
    let zh_ = abs($zh)
    let $ww = $wt + $zh;
    let ww = qaq(wt,zh);
    let _ww = abs($ww);
    let ww_ = wt_ + zh_ + _ww;
    let $wx = c2*$c2c2;
    let wx = qmd(c2,c2c2);
    let wx_ = abs($wx);
    let $wy = 2*$c1c2 + $c0c3;
    let wy = qaq(qm2(c1c2),c0c3);  // 48-bit aligned => error free
    let $wz = (3*c3)*$wy;
    let wz = qmd(3*c3,wy); // 3*c3: 47-bit aligned => error free
    let wz_ = abs($wz);
    let $z1 = $wx + $wz;
    let z1 = qaq(wx,wz);
    let _z1 = abs($z1);
    let z1_ = wx_ + wz_ + _z1;
    let $z2 = d2*$d2d2;
    let z2 = qmd(d2,d2d2);
    let z2_ = abs($z2);
    let $z3 = 2*$d1d2 + $d0d3;
    let z3 = qaq(qm2(d1d2),d0d3);  // 47-bit aligned => error free
    let $z4 = (3*d3)*$z3; 
    let z4 = qmd(3*d3,z3); // 3*d3: 47-bit aligned => error free
    let z4_ = abs($z4);
    let $z5 = $z2 + $z4;
    let z5 = qaq(z2,z4);
    let _z5 = abs($z5);
    let z5_ = z2_ + z4_ + _z5;
    let $zi = $vₓₓᵧ*$ws;
    let zi = qmq(vₓₓᵧ,ws);
    let zi_ = vₓₓᵧ_*_ws + _vₓₓᵧ*ws_ + 2*abs($zi);
    let $zj = $vₓᵧᵧ*$ww;
    let zj = qmq(vₓᵧᵧ,ww);
    let zj_ = vₓᵧᵧ_*_ww + _vₓᵧᵧ*ww_ + 2*abs($zj);
    let $z6 = $zi + $zj;
    let z6 = qaq(zi,zj);
    let z6_ = zi_ + zj_ + abs($z6);
    let $zk = $vₓₓₓ*$z1;
    let zk = qmq(vₓₓₓ,z1);
    let zk_ = vₓₓₓ_*_z1 + _vₓₓₓ*z1_ + 2*abs($zk);
    let $zl = $vᵧᵧᵧ*$z5;
    let zl = qmq(vᵧᵧᵧ,z5);
    let zl_ = vᵧᵧᵧ_*_z5 + _vᵧᵧᵧ*z5_ + 2*abs($zl);
    let $z7 = $zk + $zl;
    let z7 = qaq(zk,zl);
    let z7_ = zk_ + zl_ + abs($z7);
    let $zm = $vₓₓ*$c3c3;
    let zm = qmq(c3c3,vₓₓ);
    let zm_ = _c3c3*vₓₓ_ + 2*abs($zm);
    let $zn = $vᵧᵧ*$d3d3;
    let zn = qmq(d3d3,vᵧᵧ);
    let zn_ = _d3d3*vᵧᵧ_ + 2*abs($zn);
    let $z8 = $zm + $zn;
    let z8 = qaq(zm,zn);
    let z8_ = zm_ + zn_ + abs($z8);
    let $z9 = $vₓᵧ*$c3d3;
    let z9 = qmq(c3d3,vₓᵧ);
    let z9_ = _c3d3*vₓᵧ_ + 2*abs($z9);
    let $za = $z6 + $z7;
    let za = qaq(z6,z7);
    let za_ = z6_ + z7_ + abs($za);
    let $zb = $z8 + $z9;
    let zb = qaq(z8,z9);
    let zb_ = z8_ + z9_ + abs($zb);
    let $v6 = $za + $zb;
    let v6 = qaq(za,zb);
    let v6_ = za_ + zb_ + abs($v6);


    //let r4 = c2d2 + c3d1;
    //let r5 = c1d3 + c2d2;
    //let v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    let $r4 = $c2d2 + $c3d1;  
    let r4 = qaq(c2d2,c3d1);  // 48-bit aligned => error free
    let $r5 = $c1d3 + $c2d2;  
    let r5 = qaq(c1d3,c2d2);  // 48-bit aligned => error free
    let $k1 = c0*$wo; 
    let k1 = qmd(c0,wo);  // wo: 48-bit aligned => error free
    let k1_ = abs($k1);
    let $k2 = d0*$wo;
    let k2 = qmd(d0,wo);
    let k2_ = abs($k2);
    let $k3 = c1*$r4;
    let k3 = qmd(c1,r4);
    let k3_ = abs($k3);
    let $k4 = d1*$r5;
    let k4 = qmd(d1,r5);
    let k4_ = abs($k4);
    let $k5 = 2*$c3d0 + $c2d1;
    let k5 = qaq(qm2(c3d0),c2d1);  // 48-bit aligned => error free
    let $k6 = 2*$c0d3 + $c1d2;
    let k6 = qaq(qm2(c0d3),c1d2);  // 48-bit aligned => error free
    let $k7 = d3*$c1c1;
    let k7 = qmd(d3,c1c1);
    let k7_ = abs($k7);
    let $k8 = c3*$d1d1;
    let k8 = qmd(c3,d1d1);
    let k8_ = abs($k8);
    let $k9 = c2*$k5;
    let k9 = qmd(c2,k5);
    let k9_ = abs($k9);
    let $ka = d2*$k6;
    let ka = qmd(d2,k6);
    let ka_ = abs($ka);
    let $kb = 2*($k1 + $k3);
    let kb = qm2(qaq(k1,k3));
    let kb_ = 2*(k1_ + k3_) + abs($kb);
    let $kc = 2*($k2 + $k4);
    let kc = qm2(qaq(k2,k4));
    let kc_ = 2*(k2_ + k4_) + abs($kc);
    let $kd = 2*c0*$c2c3;
    let kd = qm2(qmd(c0,c2c3));
    let kd_ = abs($kd);
    let $ke = 2*d0*$d2d3;
    let ke = qm2(qmd(d0,d2d3));
    let ke_ = abs($ke);
    let $kf = c1*$wc;
    let kf = qmd(c1,wc);
    let kf_ = abs($kf);
    let $kg = d1*$wd;
    let kg = qmd(d1,wd);
    let kg_ = abs($kg);
    let $kh = $vₓₓ*$c2c3;
    let kh = qmq(c2c3,vₓₓ);
    let kh_ = _c2c3*vₓₓ_ + 2*abs($kh);
    let $ki = $vᵧᵧ*$d2d3;
    let ki = qmq(d2d3,vᵧᵧ);
    let ki_ = _d2d3*vᵧᵧ_ + 2*abs($ki);
    let $kj = $kb + $k7;
    let kj = qaq(kb,k7);
    let _kj = abs($kj);
    let kj_ = kb_ + k7_ + _kj;
    let $kk = $kc + $k8;
    let kk = qaq(kc,k8);
    let _kk = abs($kk);
    let kk_ = kc_ + k8_ + _kk;
    let $kl = $kj + $k9;
    let kl = qaq(kj,k9);
    let _kl = abs($kl)
    let kl_ = kj_ + k9_ + _kl;
    let $km = $kk + $ka;
    let km = qaq(kk,ka);
    let _km = abs($km)
    let km_ = kk_ + ka_ + _km;
    let $kn = $kd + $kf;
    let kn = qaq(kd,kf);
    let _kn = abs($kn)
    let kn_ = kd_ + kf_ + _kn;
    let $ko = $ke + $kg;
    let ko = qaq(ke,kg);
    let _ko = abs($ko)
    let ko_ = ke_ + kg_ + _ko;
    let $kp = 2*($kh + $ki);
    let kp = qm2(qaq(kh,ki));
    let kp_ = 2*(kh_ + ki_) + abs($kp); 
    let $kq = $vₓₓᵧ*$kl;
    let kq = qmq(vₓₓᵧ,kl);
    let kq_ = vₓₓᵧ_*_kl + _vₓₓᵧ*kl_ + 2*abs($kq);
    let $kr = $vₓᵧᵧ*$km;
    let kr = qmq(vₓᵧᵧ,km);
    let kr_ = vₓᵧᵧ_*_km + _vₓᵧᵧ*km_ + 2*abs($kr);
    let $ks = $vₓₓₓ*$kn;
    let ks = qmq(vₓₓₓ,kn);
    let ks_ = vₓₓₓ_*_kn + _vₓₓₓ*kn_ + 2*abs($ks);
    let $kt = $vᵧᵧᵧ*$ko;
    let kt = qmq(vᵧᵧᵧ,ko);
    let kt_ = vᵧᵧᵧ_*_ko + _vᵧᵧᵧ*ko_ + 2*abs($kt);
    let $ku = $kq + $kr;
    let ku = qaq(kq,kr);
    let ku_ = kq_ + kr_ + abs($ku);
    let $kv = 3*($ks + $kt);
    let kv = qmd(3,qaq(ks,kt));
    let kv_ = 3*(ks_ + kt_) + 2*abs($kv);
    let $kw = $vₓᵧ*$wo;
    let kw = qmq(vₓᵧ,wo);
    let kw_ = vₓᵧ_*_wo + 2*abs($kw);
    let $kx = $ku + $kv;
    let kx = qaq(ku,kv);
    let kx_ = ku_ + kv_ + abs($kx);
    let $ky = $kw + $kp;
    let ky = qaq(kw,kp);
    let ky_ = kw_ + kp_ + abs($ky);
    let $v5 = $kx + $ky;
    let v5 = qaq(kx,ky);
    let v5_ = kx_ + ky_ + abs($v5);
    
    
    //let r1 = c1d3 + r4;
    //let r2 = 2*c1c3 + c2c2;
    //let r3 = 2*d1d3 + d2d2;
    //let v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    let $r1 = $c1d3 + $r4;
    let r1 = qaq(c1d3,r4);  // 48-bit aligned => error free
    let _r1 = abs($r1);
    let $r2 = 2*$c1c3 + $c2c2;
    let r2 = qaq(qm2(c1c3),c2c2);  // 48-bit aligned => error free
    let _r2 = abs($r2);
    let $r3 = 2*$d1d3 + $d2d2;
    let r3 = qaq(qm2(d1d3),d2d2);  // 48-bit aligned => error free
    let _r3 = abs($r3);
    let $s1 = (2*c0)*$r1;
    let s1 = qmd((2*c0),r1);
    let s1_ = abs($s1);
    let $s2 = (2*d0)*$r1;
    let s2 = qmd((2*d0),r1);
    let s2_ = abs($s2);
    let $s5 = $c1d2 + 2*$c2d1;
    let s5 = qaq(c1d2,qm2(c2d1));  // 48-bit aligned => error free
    let $s6 = $c2d1 + 2*$c1d2;
    let s6 = qaq(c2d1,qm2(c1d2));  // 48-bit aligned => error free
    let $s3 = d0*$r2;
    let s3 = qmd(d0,r2);
    let s3_ = abs($s3);
    let $s4 = c0*$r3;
    let s4 = qmd(c0,r3);
    let s4_ = abs($s4);
    let $s7 = c1*$s5;
    let s7 = qmd(c1,s5);
    let s7_ = abs($s7);
    let $s8 = d1*$s6;
    let s8 = qmd(d1,s6);
    let s8_ = abs($s8);
    let $s9 = c0*$r2;
    let s9 = qmd(c0,r2);
    let s9_ = abs($s9);
    let $sa = d0*$r3;
    let sa = qmd(d0,r3);
    let sa_ = abs($sa);
    let $sb = c2*$c1c1;
    let sb = qmd(c2,c1c1);
    let sb_ = abs($sb);
    let $sc = d2*$d1d1;
    let sc = qmd(d2,d1d1);
    let sc_ = abs($sc);
    let $sd = $s1 + $s3;
    let sd = qaq(s1,s3);
    let sd_ = s1_ + s3_ + abs($sd);
    let $se = $s2 + $s4;
    let se = qaq(s2,s4);
    let se_ = s2_ + s4_ + abs($se);
    let $sf = $sd + $s7;
    let sf = qaq(sd,s7);
    let _sf = abs($sf);
    let sf_ = sd_ + s7_ + _sf;
    let $sg = $se + $s8;
    let sg = qaq(se,s8);
    let _sg = abs($sg);
    let sg_ = se_ + s8_ + _sg;
    let $sh = $s9 + $sb;
    let sh = qaq(s9,sb);
    let _sh = abs($sh);
    let sh_ = s9_ + sb_ + _sh;
    let $si = $sa + $sc;
    let si = qaq(sa,sc);
    let _si = abs($si);
    let si_ = sa_ + sc_ + _si;
    let $sj = $vₓₓᵧ*$sf;
    let sj = qmq(vₓₓᵧ,sf);
    let sj_ = vₓₓᵧ_*_sf + _vₓₓᵧ*sf_ + 2*abs($sj);
    let $sk = $vₓᵧᵧ*$sg;
    let sk = qmq(vₓᵧᵧ,sg);
    let sk_ = vₓᵧᵧ_*_sg + _vₓᵧᵧ*sg_ + 2*abs($sk);
    let $sl = $vₓₓₓ*$sh;
    let sl = qmq(vₓₓₓ,sh);
    let sl_ = vₓₓₓ_*_sh + _vₓₓₓ*sh_ + 2*abs($sl);
    let $sm = $vᵧᵧᵧ*$si;
    let sm = qmq(vᵧᵧᵧ,si);
    let sm_ = vᵧᵧᵧ_*_si + _vᵧᵧᵧ*si_ + 2*abs($sm);
    let $sn = $sl + $sm;
    let _sn = abs($sn);
    let sn = qaq(sl,sm);
    let sn_ = sl_ + sm_ + _sn;
    let $so = $sj + $sk;
    let so = qaq(sj,sk);
    let so_ = sj_ + sk_ + abs($so);
    let $sp = $so + 3*$sn;
    let sp = qaq(so,qmd(3,sn));
    let sp_ = so_ + 3*(sn_ + _sn) + abs($sp);
    let $ss = $vₓᵧ*$r1;
    let ss = qmq(vₓᵧ,r1);
    let ss_ = vₓᵧ_*_r1 + 2*abs($ss);
    let $st = $vₓₓ*$r2;
    let st = qmq(vₓₓ,r2);
    let st_ = vₓₓ_*_r2 + 2*abs($st);
    let $sq = $ss + $st;
    let sq = qaq(ss,st);
    let sq_ = ss_ + st_ + abs($sq);
    let $su = $vᵧᵧ*$r3;
    let su = qmq(vᵧᵧ,r3);
    let su_ = vᵧᵧ_*_r3 + 2*abs($su);
    let $sr = $sq + $su;
    let sr = qaq(sq,su);
    let sr_ = sq_ + su_ + abs($sr);
    let $v4 = $sp + $sr;
    let v4 = qaq(sp,sr);
    let v4_ = sp_ + sr_ + abs($v4);


    //let r6 = c1d2 + c2d1;
    //let r7 = c3d0 + c0d3;
    //let r8 = c1c2 + c0c3;
    //let r9 = d1d2 + d0d3;
    //let v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
    // 48-bit aligned => error free
    let $r6 = $c1d2 + $c2d1;
    let r6 = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    let $r7 = $c3d0 + $c0d3;
    let r7 = qaq(c3d0,c0d3);  // 48-bit aligned => error free
    let $r8 = $c1c2 + $c0c3;
    let r8 = qaq(c1c2,c0c3);  // 48-bit aligned => error free
    let _r8 = abs($r8);
    let $r9 = $d1d2 + $d0d3;
    let r9 = qaq(d1d2,d0d3);  // 48-bit aligned => error free
    let _r9 = abs($r9);
    let $m1 = 2*$r6 + $c3d0;
    let m1 = qaq(qm2(r6),c3d0);  // 47-bit aligned => error free
    let $m2 = 2*$r6 + $c0d3;
    let m2 = qaq(qm2(r6),c0d3);  // 47-bit aligned => error free
    let $m3 = 2*$c2d0 + $c1d1;
    let m3 = qaq(qm2(c2d0),c1d1);  // 48-bit aligned => error free
    let $m4 = 2*$c0d2 + $c1d1;
    let m4 = qaq(qm2(c0d2),c1d1);  // 48-bit aligned => error free
    let $m5 = $r8 + $c1c2;
    let m5 = qaq(r8,c1c2);  // 48-bit aligned => error free
    let $m6 = $r9 + $d1d2;
    let m6 = qaq(r9,d1d2);  // 48-bit aligned => error free
    let $m7 = (3*c0)*$m5;
    let m7 = qmd(3*c0,m5);  // 3*c0: 47-bit aligned => error free
    let m7_ = abs($m7);
    let $m8 = (3*d0)*$m6;  
    let m8 = qmd(3*d0,m6);  // 3*c0: 47-bit aligned => error free
    let m8_ = abs($m8);
    let $m9 = c1*$c1c1;
    let m9 = qmd(c1,c1c1);
    let m9_ = abs($m9);
    let $ma = d1*$d1d1;
    let ma = qmd(d1,d1d1);
    let ma_ = abs($ma);
    let $mb = $vₓₓ*$r8;
    let mb = qmq(vₓₓ,r8);
    let mb_ = vₓₓ_*_r8 + abs($mb);
    let $mc = $vᵧᵧ*$r9;
    let mc = qmq(vᵧᵧ,r9);
    let mc_ = vᵧᵧ_*_r9 + abs($mc);
    let $md = $m1 + $r7;
    let md = qaq(m1,r7);
    let md_ = abs($md);
    let $me = $m2 + $r7;
    let me = qaq(m2,r7);
    let me_ = abs($me);
    let $mf = c0*$md;
    let mf = qmd(c0,md);
    let mf_ = _c0*md_ + abs($mf);
    let $mg = d0*$me;
    let mg = qmd(d0,me);
    let mg_ = _d0*me_ + abs($mg);
    let $mh = c1*$m3;
    let mh = qmd(c1,m3);
    let mh_ = abs($mh);
    let $mi = d1*$m4;
    let mi = qmd(d1,m4);
    let mi_ = abs($mi);
    let $mj = c3*$vₓ;
    let mj = qmd(c3,vₓ);
    let mj_ = _c3*vₓ_ + abs($mj);
    let $mk = d3*$vᵧ;
    let mk = qmd(d3,vᵧ);
    let mk_ = _d3*vᵧ_ + abs($mk);
    let $ml = $mf + $mh;
    let ml = qaq(mf,mh);
    let _ml = abs($ml);
    let ml_ = mf_ + mh_ + _ml;
    let $mm = $mg + $mi;
    let mm = qaq(mg,mi);
    let _mm = abs($mm);
    let mm_ = mg_ + mi_ + _mm;
    let $mn = $m7 + $m9;
    let mn = qaq(m7,m9);
    let _mn = abs($mn);
    let mn_ = m7_ + m9_ + _mn;
    let $mo = $m8 + $ma;
    let mo = qaq(m8,ma);
    let _mo = abs($mo);
    let mo_ = m8_ + ma_ + _mo;
    let $mp = $r7 + $r6; 
    let mp = qaq(r7,r6);  // 47-bit aligned => error free
    let _mp = abs($mp);
    let $mq = 2*($mb + $mc);
    let mq = qm2(qaq(mb,mc));
    let mq_ = 2*(mb_ + mc_) + abs($mq);
    let $mr = $vₓₓᵧ*$ml;
    let mr = qmq(vₓₓᵧ,ml);
    let mr_ = vₓₓᵧ_*_ml + _vₓₓᵧ*ml_ + 2*abs($mr);
    let $ms = $vₓᵧᵧ*$mm;
    let ms = qmq(vₓᵧᵧ,mm);
    let ms_ = vₓᵧᵧ_*_mm + _vₓᵧᵧ*mm_ + 2*abs($ms);
    let $mt = $vₓₓₓ*$mn;
    let mt = qmq(vₓₓₓ,mn);
    let mt_ = vₓₓₓ_*_mn + _vₓₓₓ*mn_ + 2*abs($mt);
    let $mu = $vᵧᵧᵧ*$mo;
    let mu = qmq(vᵧᵧᵧ,mo);
    let mu_ = vᵧᵧᵧ_*_mo + _vᵧᵧᵧ*mo_ + 2*abs($mu);
    let $mv = $vₓᵧ*$mp;
    let mv = qmq(vₓᵧ,mp);
    let mv_ = vₓᵧ_*_mp + abs($mv);
    let $mw = $mr + $ms;
    let mw = qaq(mr,ms);
    let mw_ = mr_ + ms_ + abs($mw);
    let $mx = $mt + $mu;
    let mx = qaq(mt,mu);
    let mx_ = mt_ + mu_ + abs($mx);
    let $my = $mv + $mq;
    let my = qaq(mv,mq);
    let my_ = mv_ + mq_ + abs($my);
    let $mz = $mj + $mk;
    let mz = qaq(mj,mk);
    let mz_ = mj_ + mk_ + abs($mz);
    let $n1 = $mw + $mx;
    let n1 = qaq(mw,mx);
    let n1_ = mw_ + mx_ + abs($n1);
    let $n2 = $my + $mz;
    let n2 = qaq(my,mz);
    let n2_ = my_ + mz_ + abs($n2);
    let $v3 = $n1 + $n2;
    let v3 = qaq(n1,n2);
    let v3_ = n1_ + n2_ + abs($v3);


    //let ra = c1d1 + c2d0;
    //let rb = c1d1 + c0d2;
    //let v2 =
    //    vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
    //    vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
    //    3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
    //    3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
    //    vₓᵧ*(ra + c0d2) +
    //    vₓₓ*(2*c0c2 + c1c1) + 
    //    vᵧᵧ*(2*d0d2 + d1d1) +
    //    c2*vₓ + d2*vᵧ;
    let $ra = $c1d1 + $c2d0;
    let ra = qaq(c1d1,c2d0);  // 48-bit aligned => error free
    let $rb = $c1d1 + $c0d2;
    let rb = qaq(c1d1,c0d2);  // 48-bit aligned => error free
    let $l1 = 2*$ra + $c0d2;
    let l1 = qaq(qm2(ra),c0d2);  // 47-bit aligned => error free
    let $l2 = 2*$rb + $c2d0;
    let l2 = qaq(qm2(rb),c2d0);  // 47-bit aligned => error free
    let $l3 = c0*$l1;
    let l3 = qmd(c0,l1);
    let l3_ = abs($l3);
    let $l4 = d0*$c1c1;
    let l4 = qmd(d0,c1c1);
    let l4_ = abs($l4);
    let $l5 = d0*$l2;
    let l5 = qmd(d0,l2);
    let l5_ = abs($l5);
    let $l6 = c0*$d1d1;
    let l6 = qmd(c0,d1d1);
    let l6_ = abs($l6);
    let $l7 = c0*$c1c1;
    let l7 = qmd(c0,c1c1);
    let l7_ = abs($l7);
    let $l8 = c2*$c0c0;
    let l8 = qmd(c2,c0c0);
    let l8_ = abs($l8);
    let $l9 = d0*$d1d1;
    let l9 = qmd(d0,d1d1);
    let l9_ = abs($l9);
    let $la = d2*$d0d0;
    let la = qmd(d2,d0d0);
    let la_ = abs($la);
    let $lb = $l3 + $l4;
    let lb = qaq(l3,l4);
    let _lb = abs($lb);
    let lb_ = l3_ + l4_ + _lb;
    let $lc = $l5 + $l6;
    let lc = qaq(l5,l6);
    let _lc = abs($lc);
    let lc_ = l5_ + l6_ + _lc;
    let $ld = $l7 + $l8;
    let ld = qaq(l7,l8);
    let _ld = abs($ld);
    let ld_ = l7_ + l8_ + _ld;
    let $le = $l9 + $la;
    let le = qaq(l9,la);
    let _le = abs($le);
    let le_ = l9_ + la_ + _le;
    let $lf = $vₓₓₓ*$ld;
    let lf = qmq(vₓₓₓ,ld);
    let lf_ = vₓₓₓ_*_ld + _vₓₓₓ*ld_ + 2*abs($lf);
    let $lg = $vᵧᵧᵧ*$le;
    let lg = qmq(vᵧᵧᵧ,le);
    let lg_ = vᵧᵧᵧ_*_le + _vᵧᵧᵧ*le_ + 2*abs($lg);
    let $lh = 3*($lf + $lg);
    let lh = qmd(3,qaq(lf,lg));
    let lh_ = 3*(lf_ + lg_) + 2*abs($lh);
    let $li = $ra + $c0d2; 
    let li = qaq(ra,c0d2);  // 48-bit aligned => error free
    let _li = abs($li);
    let $lj = 2*$c0c2 + $c1c1;
    let lj = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    let _lj = abs($lj);
    let $lk = 2*$d0d2 + $d1d1;
    let lk = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    let _lk = abs($lk);
    let $ll = $vₓₓᵧ*$lb;
    let ll = qmq(vₓₓᵧ,lb);
    let ll_ = vₓₓᵧ_*_lb + _vₓₓᵧ*lb_ + 2*abs($ll);
    let $lm = $vₓᵧᵧ*$lc;
    let lm = qmq(vₓᵧᵧ,lc);
    let lm_ = vₓᵧᵧ_*_lc + _vₓᵧᵧ*lc_ + 2*abs($lm);
    let $ln = $vₓᵧ*$li;
    let ln = qmq(vₓᵧ,li);
    let ln_ = vₓᵧ_*_li + 2*abs($ln);
    let $lo = $vₓₓ*$lj;
    let lo = qmq(vₓₓ,lj);
    let lo_ = vₓₓ_*_lj + 2*abs($lo);
    let $lp = $vᵧᵧ*$lk;
    let lp = qmq(vᵧᵧ,lk);
    let lp_ = vᵧᵧ_*_lk + 2*abs($lp);
    let $lq = c2*$vₓ;
    let lq = qmd(c2,vₓ);
    let lq_ = _c2*vₓ_ + abs($lq);
    let $lr = d2*$vᵧ;
    let lr = qmd(d2,vᵧ);
    let lr_ = _d2*vᵧ_ + abs($lr);
    let $ls = $lq + $lr;
    let ls = qaq(lq,lr);
    let ls_ = lq_ + lr_ + abs($ls);
    let $lt = $ll + $lm;
    let lt = qaq(ll,lm);
    let lt_ = ll_ + lm_ + abs($lt);
    let $lu = $lh + $ln;
    let lu = qaq(lh,ln);
    let lu_ = lh_ + ln_ + abs($lu);
    let $lv = $lo + $lp;
    let lv = qaq(lo,lp);
    let lv_ = lo_ + lp_ + abs($lv);
    let $lw = $lt + $lu;
    let lw = qaq(lt,lu);
    let lw_ = lt_ + lu_ + abs($lw);
    let $lx = $lv + $ls;
    let lx = qaq(lv,ls);
    let lx_ = lv_ + ls_ + abs($lx);
    let $v2 = $lw + $lx;
    let v2 = qaq(lw,lx);
    let v2_ = lw_ + lx_ + abs($v2);


    //let rc = c1d0 + c0d1;
    //let v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    let $rc = $c1d0 + $c0d1;
    let rc = qaq(c1d0,c0d1);  // 48-bit aligned => error free
    let _rc = abs($rc);
    let $rd = c0*$vₓₓᵧ;
    let rd = qmd(c0,vₓₓᵧ);
    let _rd = abs($rd);
    let rd_ = _c0*vₓₓᵧ_ + _rd;
    let $re = d0*$vₓᵧᵧ;
    let re = qmd(d0,vₓᵧᵧ);
    let _re = abs($re);
    let re_ = _d0*vₓᵧᵧ_ + _re;
    let $rf = $rc + $c1d0;
    let rf = qaq(rc,c1d0);  // 48-bit aligned => error free
    let _rf = abs($rf);
    let $rg = $rc + $c0d1;  
    let rg = qaq(rc,c0d1);  // 48-bit aligned => error free
    let _rg = abs($rg);
    let $rx = c1*$c0c0;
    let rx = qmd(c1,c0c0);
    let rx_ = abs($rx);
    let $rh = $rx*$vₓₓₓ;
    let rh = qmq(rx,vₓₓₓ);
    let rh_ = rx_*(_vₓₓₓ + vₓₓₓ_) + 2*abs($rh);
    let $ry = d1*$d0d0;
    let ry = qmd(d1,d0d0);
    let ry_ = abs($ry);
    let $ri = $ry*$vᵧᵧᵧ;
    let ri = qmq(ry,vᵧᵧᵧ);
    let ri_ = ry_*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($ri);
    let $rj = $vₓᵧ*$rc;
    let rj = qmq(vₓᵧ,rc);
    let rj_ = vₓᵧ_*_rc + 2*abs($rj);
    let $rk = $c0c1*$vₓₓ;
    let rk = qmq(c0c1,vₓₓ);
    let rk_ = _c0c1*vₓₓ_ + 2*abs($rk);
    let $rl = $d0d1*$vᵧᵧ;
    let rl = qmq(d0d1,vᵧᵧ);
    let rl_ = _d0d1*vᵧᵧ_ + 2*abs($rl);
    let $rm = $rk + $rl;
    let rm = qaq(rk,rl);
    let rm_ = rk_ + rl_ + abs($rm);
    let $rn = c1*$vₓ;
    let rn = qmd(c1,vₓ);
    let rn_ = _c1*vₓ_ + abs($rn);
    let $ro = d1*$vᵧ;
    let ro = qmd(d1,vᵧ);
    let ro_ = _d1*vᵧ_ + abs($ro);
    let $rp = $rn + $ro;
    let rp = qaq(rn,ro);
    let rp_ = rn_ + ro_ + abs($rp);
    let $rq = $rd*$rf;
    let rq = qmq(rd,rf);
    let rq_ = rd_*_rf + 2*abs($rq);
    let $rr = $re*$rg;
    let rr = qmq(re,rg);
    let rr_ = re_*_rg + 2*abs($rr);
    let $rs = $rq + $rr;
    let rs = qaq(rq,rr);
    let rs_ = rq_ + rr_ + abs($rs);
    let $rt = 3*($rh + $ri);
    let rt = qmd(3,qaq(rh,ri));
    let rt_ = 3*(rh_ + ri_) + 2*abs($rt);
    let $ru = $rj + 2*$rm;
    let ru = qaq(rj,qm2(rm));
    let ru_ = rj_ + 2*rm_ + abs($ru);
    let $rv = $rs + $rt;
    let rv = qaq(rs,rt);
    let rv_ = rs_ + rt_ + abs($rv);
    let $rw = $ru + $rp;
    let rw = qaq(ru,rp);
    let rw_ = ru_ + rp_ + abs($rw);
    let $v1 = $rv + $rw;
    let v1 = qaq(rv,rw);
    let v1_ = rv_ + rw_ + abs($v1);


    // v0
    let $t1 = c0*$vₓₓₓ;
    let t1 = qmd(c0,vₓₓₓ);
    let t1_ = _c0*vₓₓₓ_ + abs($t1);
    let $t2 = d0*$vₓₓᵧ;
    let t2 = qmd(d0,vₓₓᵧ);
    let t2_ = _d0*vₓₓᵧ_ + abs($t2);
    let $p4 = $t1 + $t2;
    let p4 = qaq(t1,t2);
    let p4_ = t1_ + t2_ + abs($p4);
    let $t3 = c0*$vₓᵧᵧ;
    let t3 = qmd(c0,vₓᵧᵧ);
    let t3_ = _c0*vₓᵧᵧ_ + abs($t3);
    let $t4 = d0*$vᵧᵧᵧ;
    let t4 = qmd(d0,vᵧᵧᵧ);
    let t4_ = _d0*vᵧᵧᵧ_ + abs($t4);
    let $p5 = $t3 + $t4;
    let p5 = qaq(t3,t4);
    let p5_ = t3_ + t4_ + abs($p5);
    let $p7 = $p4 + $vₓₓ;
    let p7 = qaq(p4,vₓₓ);
    let _p7 = abs($p7);
    let p7_ = p4_ + vₓₓ_ + _p7;
    let $p8 = $p5 + $vᵧᵧ;
    let p8 = qaq(p5,vᵧᵧ);
    let _p8 = abs($p8);
    let p8_ = p5_ + vᵧᵧ_ + _p8;
    let $pc = $c0c0*$p7;
    let pc = qmq(c0c0,p7);
    let pc_ = _c0c0*p7_ + 2*abs($pc);
    let $pd = $d0d0*$p8;
    let pd = qmq(d0d0,p8);
    let pd_ = _d0d0*p8_ + 2*abs($pd);
    let $p6 = $pc + $pd;
    let p6 = qaq(pc,pd);
    let p6_ = pc_ + pd_ + abs($p6);
    let $pe = $c0d0*$vₓᵧ;
    let pe = qmq(c0d0,vₓᵧ);
    let pe_ = _c0d0*vₓᵧ_ + abs($pe);
    let $p9 = $p6 + $pe;
    let p9 = qaq(p6,pe);
    let p9_ = p6_ + pe_ + abs($p9);
    let $pf = c0*$vₓ;
    let pf = qmd(c0,vₓ);
    let pf_ = _c0*vₓ_ + abs($pf);
    let $pg = d0*$vᵧ;
    let pg = qmd(d0,vᵧ);
    let pg_ = _d0*vᵧ_ + abs($pg);
    let $pa = $pf + $pg;
    let pa = qaq(pf,pg);
    let pa_ = pf_ + pg_ + abs($pa);
    let $pb = $p9 + $pa;
    let pb = qaq(p9,pa);
    let pb_ = p9_ + pa_ + abs($pb);
    let $v0 = $pb + $v;
    let v0 = qaq(pb,v);
    let v0_ = pb_ + v_ + abs($v0);


    return {
        coeffs:   [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0],
        errBound: [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γγ3*c)
    };
}


export { getCoeffs3x3Quad }
