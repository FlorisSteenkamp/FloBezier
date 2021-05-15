import { γγ } from "../../../../error-analysis/error-analysis";
import { getXYDdAnyBitlength1 } from "../../../../to-power-basis/any-bitlength/double-double/get-xy-dd-any-bitlength";
import { getImplicitForm3DdAnyBitlength } from "../../../../implicit-form/double-double/get-implicit-form3-dd-any-bitlength";
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
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line).
 * 
 * The returned polynomial degree will be 3
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
function getCoeffsBez3Bez1DdAnyBitlength(ps1: number[][], ps2: number[][]) {
    const { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3DdAnyBitlength(ps1);

    const [[c1,c0],[d1,d0]] = getXYDdAnyBitlength1(ps2);

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

    const $c1 = c1[1];
    const $d1 = d1[1];

    const _c0 = abs(c0);
    const _c1 = abs($c1);
    const _d0 = abs(d0);
    const _d1 = abs($d1);

    const $c0c0 = c0*c0;
    const $c0c1 = c0*$c1;
    const $c0d0 = c0*d0;
    const $c0d1 = c0*$d1;
    const $c1c1 = $c1*$c1;
    const $c1d0 = $c1*d0;
    const $c1d1 = $c1*$d1;
    const $d0d0 = d0*d0;
    const $d0d1 = d0*$d1;
    const $d1d1 = $d1*$d1;

    const c0c0 = tp(c0,c0);  // error free
    const c0c1 = qmd(c0,c1);
    const c0c1_ = abs($c0c1);
    const c0d0 = tp(c0,d0);  // error free
    const c0d1 = qmd(c0,d1);
    const c0d1_ = abs($c0d1);
    const c1c1 = qmq(c1,c1);
    const c1c1_ = 2*abs($c1c1);
    const c1d0 = qmd(d0,c1);
    const c1d0_ = abs($c1d0);
    const c1d1 = qmq(c1,d1);
    const c1d1_ = 2*abs($c1d1);
    const d0d0 = tp(d0,d0);  // error free
    const d0d1 = qmd(d0,d1);
    const d0d1_ = abs($d0d1);
    const d1d1 = qmq(d1,d1);
    const d1d1_ = 2*abs($d1d1);
    
    const _c0c0 = abs($c0c0);
    const _c0c1 = abs($c0c1);
    const _c0d0 = abs($c0d0);    
    const _c0d1 = abs($c0d1);
    const _c1c1 = abs($c1c1);
    const _c1d0 = abs($c1d0);
    const _c1d1 = abs($c1d1);
    const _d0d0 = abs($d0d0);
    const _d0d1 = abs($d0d1);
    const _d1d1 = abs($d1d1);
   

    const $z1 = c0*$vₓₓₓ;
    const z1 = qmd(c0,vₓₓₓ);
    const z1_ = _c0*vₓₓₓ_ + abs($z1);
    const $z7 = (3*c0)*$vₓₓₓ;
    const z7 = qmd(3*c0,vₓₓₓ);  // 3*c0: 47-bit aligned => error free 
    const z7_ = 3*_c0*vₓₓₓ_ + abs($z7);
    const $z2 = c0*$vₓₓᵧ;
    const z2 = qmd(c0,vₓₓᵧ);
    const z2_ = _c0*vₓₓᵧ_ + abs($z2);
    const $z3 = d0*$vₓₓᵧ;
    const z3 = qmd(d0,vₓₓᵧ);
    const z3_ = _d0*vₓₓᵧ_ + abs($z3);
    const $z4 = c0*$vₓᵧᵧ;
    const z4 = qmd(c0,vₓᵧᵧ);
    const z4_ = _c0*vₓᵧᵧ_ + abs($z4);
    const $z5 = d0*$vₓᵧᵧ;
    const z5 = qmd(d0,vₓᵧᵧ);
    const z5_ = _d0*vₓᵧᵧ_ + abs($z5);
    const $z6 = d0*$vᵧᵧᵧ;
    const z6 = qmd(d0,vᵧᵧᵧ);
    const z6_ = _d0*vᵧᵧᵧ_ + abs($z6);
    const $z8 = (3*d0)*$vᵧᵧᵧ;
    const z8 = qmd(3*d0,vᵧᵧᵧ);
    const z8_ = 3*_d0*vᵧᵧᵧ_ + abs($z8);


    // a1**3*v_xxx + a1**2*b1*v_xxy + a1*b1**2*v_xyy + b1**3*v_yyy
    //const v3 =
    //    c1c1*(c1*vₓₓₓ + d1*vₓₓᵧ) +
    //    d1d1*(c1*vₓᵧᵧ + d1*vᵧᵧᵧ);
    const $u1 = $c1*$vₓₓₓ;
    const u1 = qmq(c1,vₓₓₓ);
    const u1_ = _c1*vₓₓₓ_ + 2*abs($u1);
    const $u2 = $c1*$vₓᵧᵧ;
    const u2 = qmq(c1,vₓᵧᵧ);
    const u2_ = _c1*vₓᵧᵧ_ + 2*abs($u2);
    const $u3 = $d1*$vₓₓᵧ;
    const u3 = qmq(d1,vₓₓᵧ);
    const u3_ = _d1*vₓₓᵧ_ + 2*abs($u3);
    const $u4 = $d1*$vᵧᵧᵧ;
    const u4 = qmq(d1,vᵧᵧᵧ);
    const u4_ = _d1*vᵧᵧᵧ_ + 2*abs($u4);
    const $u5 = $u1 + $u3;
    const u5 = qaq(u1,u3);
    const _u5 = abs($u5);
    const u5_ = u1_ + u3_ + _u5;
    const $u6 = $u2 + $u4;
    const u6 = qaq(u2,u4);
    const _u6 = abs($u6);
    const u6_ = u2_ + u4_ + _u6;
    const $u7 = $c1c1*$u5;
    const u7 = qmq(c1c1,u5);
    const u7_ = c1c1_*_u5 + _c1c1*u5_ + 2*abs($u7);
    const $u8 = $d1d1*$u6;
    const u8 = qmq(d1d1,u6);
    const u8_ = d1d1_*_u6 + _d1d1*u6_ + 2*abs($u8);
    const $v3 = $u7 + $u8;
    const v3 = qaq(u7,u8);
    const v3_ = u7_ + u8_ + abs($v3);


    // 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + a0*b1**2*v_xyy + a1**2*b0*v_xxy + a1**2*v_xx + 2*a1*b0*b1*v_xyy + a1*b1*v_xy + 3*b0*b1**2*v_yyy + b1**2*v_yy
    //const v2 =
    //    c1c1*(3*c0*vₓₓₓ +   d0*vₓₓᵧ + vₓₓ) +
    //    c1d1*(2*c0*vₓₓᵧ + 2*d0*vₓᵧᵧ + vₓᵧ) +
    //    d1d1*(  c0*vₓᵧᵧ + 3*d0*vᵧᵧᵧ + vᵧᵧ);
    //const v2 =
    //    c1c1*(3*z1 +   z3 + vₓₓ) +
    //    c1d1*(2*z2 + 2*z5 + vₓᵧ) +
    //    d1d1*(  z4 + 3*z6 + vᵧᵧ);
    const $u9 = $z7 + $z3;
    const u9 = qaq(z7,z3);
    const u9_ = z7_ + z3_ + abs($u9);
    const $ua = 2*($z2 + $z5);
    const ua = qm2(qaq(z2,z5));
    const ua_ = 2*(z2_ + z5_) + abs($ua);
    const $ub = $z4 + $z8;
    const ub = qaq(z4,z8);
    const ub_ = z4_ + z8_ + abs($ub);
    const $uc = $u9 + $vₓₓ;
    const uc = qaq(u9,vₓₓ);
    const _uc = abs($uc);
    const uc_ = u9_ + vₓₓ_ + _uc;
    const $ud = $ua + $vₓᵧ;
    const ud = qaq(ua,vₓᵧ);
    const _ud = abs($ud);
    const ud_ = ua_ + vₓᵧ_ + _ud;
    const $ue = $ub + $vᵧᵧ;
    const ue = qaq(ub,vᵧᵧ);
    const _ue = abs($ue);
    const ue_ = ub_ + vᵧᵧ_ + _ue;
    const $uf = $c1c1*$uc;
    const uf = qmq(c1c1,uc);
    const uf_ = c1c1_*_uc + _c1c1*uc_ + 2*abs($uf);
    const $ug = $c1d1*$ud;
    const ug = qmq(c1d1,ud);
    const ug_ = c1d1_*_ud + _c1d1*ud_ + 2*abs($ug);
    const $uh = $d1d1*$ue;
    const uh = qmq(d1d1,ue);
    const uh_ = d1d1_*_ue + _d1d1*ue_ + 2*abs($uh);
    const $ui = $uf + $ug;
    const ui = qaq(uf,ug);
    const ui_ = uf_ + ug_ + abs($ui);
    const $v2 = $ui + $uh;
    const v2 = qaq(ui,uh);
    const v2_ = ui_ + uh_ + abs($v2);


    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //const v1 =
    //    c0c1*(3*c0*vₓₓₓ + 2*(d0*vₓₓᵧ + vₓₓ)) +
    //    d0d1*(3*d0*vᵧᵧᵧ + 2*(c0*vₓᵧᵧ + vᵧᵧ)) +
    //    c0d1*(c0*vₓₓᵧ + vₓᵧ) +
    //    c1d0*(d0*vₓᵧᵧ + vₓᵧ) +
    //    vₓ*c1 +
    //    vᵧ*d1;
    const $uj = 2*($z3 + $vₓₓ);
    const uj = qm2(qaq(z3,vₓₓ));
    const uj_ = 2*(z3_ + vₓₓ_) + abs($uj);
    const $uk = 2*($z4 + $vᵧᵧ);
    const uk = qm2(qaq(z4,vᵧᵧ));
    const uk_ = 2*(z4_ + vᵧᵧ_) + abs($uk);
    const $un = $z7 + $uj;
    const un = qaq(z7,uj);
    const _un = abs($un);
    const un_ = z7_ + uj_ + _un;
    const $uo = $z8 + $uk;
    const uo = qaq(z8,uk);
    const _uo = abs($uo);
    const uo_ = z8_ + uk_ + _uo;
    const $up = $z2 + $vₓᵧ;
    const up = qaq(z2,vₓᵧ);
    const _up = abs($up);
    const up_ = z2_ + vₓᵧ_ + _up;
    const $uq = $z5 + $vₓᵧ;
    const uq = qaq(z5,vₓᵧ);
    const _uq = abs($uq);
    const uq_ = z5_ + vₓᵧ_ + _uq;
    const $ur = $c0c1*$un;
    const ur = qmq(c0c1,un);
    const ur_ = c0c1_*_un + _c0c1*un_ + 2*abs($ur);
    const $us = $d0d1*$uo;
    const us = qmq(d0d1,uo);
    const us_ = d0d1_*_uo + _d0d1*uo_ + 2*abs($us);
    const $ut = $c0d1*$up;
    const ut = qmq(c0d1,up);
    const ut_ = c0d1_*_up + _c0d1*up_ + 2*abs($ut);
    const $uu = $c1d0*$uq;
    const uu = qmq(c1d0,uq);
    const uu_ = c1d0_*_uq + _c1d0*uq_ + 2*abs($uu);
    const $uv = $c1*$vₓ;
    const uv = qmq(c1,vₓ);
    const uv_ = _c1*vₓ_ + 2*abs($uv);
    const $uw = $d1*$vᵧ;
    const uw = qmq(d1,vᵧ);
    const uw_ = _d1*vᵧ_ + 2*abs($uw);
    const $ux = $ur + $us;
    const ux = qaq(ur,us);
    const ux_ = ur_ + us_ + abs($ux);
    const $uy = $ut + $uu;
    const uy = qaq(ut,uu);
    const uy_ = ut_ + uu_ + abs($uy);
    const $uz = $ux + $uy;
    const uz = qaq(ux,uy);
    const uz_ = ux_ + uy_ + abs($uz);
    const $u0 = $uv + $uw;
    const u0 = qaq(uv,uw);
    const u0_ = uv_ + uw_ + abs($u0);
    const $v1 = $uz + $u0;
    const v1 = qaq(uz,u0);
    const v1_ = uz_ + u0_ + abs($v1);


    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(d0*vᵧᵧᵧ + c0*vₓᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    //const v0 =
    //    c0c0*(z1 + z3 + vₓₓ) +
    //    d0d0*(z6 + z4 + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    const $f1 = $z1 + $z3;
    const f1 = qaq(z1,z3);
    const f1_ = z1_ + z3_ + abs($f1);
    const $f2 = $z6 + $z4;
    const f2 = qaq(z6,z4);
    const f2_ = z6_ + z4_ + abs($f2);
    const $f3 = $f1 + $vₓₓ;
    const f3 = qaq(f1,vₓₓ);
    const _f3 = abs($f3);
    const f3_ = f1_ + vₓₓ_ + _f3;
    const $f4 = $f2 + $vᵧᵧ;
    const f4 = qaq(f2,vᵧᵧ);
    const _f4 = abs($f4);
    const f4_ = f2_ + vᵧᵧ_ + _f4;
    const $f5 = $c0c0*$f3;
    const f5 = qmq(c0c0,f3);
    const f5_ = _c0c0*f3_ + 2*abs($f5);
    const $f6 = $d0d0*$f4;
    const f6 = qmq(d0d0,f4);
    const f6_ = _d0d0*f4_ + 2*abs($f6);
    const $f7 = $c0d0*$vₓᵧ;
    const f7 = qmq(c0d0,vₓᵧ);
    const f7_ = _c0d0*vₓᵧ_ + 2*abs($f7);
    const $f8 = $f5 + $f6;
    const f8 = qaq(f5,f6);
    const f8_ = f5_ + f6_ + abs($f8);
    const $f9 = $f8 + $f7;
    const f9 = qaq(f8,f7);
    const f9_ = f8_ + f7_ + abs($f9);
    const $fa = c0*$vₓ;
    const fa = qmd(c0,vₓ);
    const fa_ = _c0*vₓ_ + abs($fa);
    const $fb = d0*$vᵧ;
    const fb = qmd(d0,vᵧ);
    const fb_ = _d0*vᵧ_ + abs($fb);
    const $fc = $fa + $fb;
    const fc = qaq(fa,fb);
    const fc_ = fa_ + fb_ + abs($fc);
    const $fd = $f9 + $fc;
    const fd = qaq(f9,fc);
    const fd_ = f9_ + fc_ + abs($fd);
    const $v0 = $fd + $v;
    const v0 = qaq(fd,v);
    const v0_ = fd_ + v_ + abs($v0);


    return {
        coeffs:   [v3, v2, v1, v0],
        errBound: [γγ3*v3_, γγ3*v2_, γγ3*v1_, γγ3*v0_]
    };
}


export { getCoeffsBez3Bez1DdAnyBitlength }
