
import { getImplicitForm3 } from "../../../implicit-form/naive/get-implicit-form3";
import { γ } from "../../../error-analysis/error-analysis";
import { getXY } from "../../../to-power-basis/get-xy";


let abs = Math.abs;
const γ1 = γ(1);


function getCoeffs3x1(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_: vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm3(ps1);

    let [[c1,c0],[d1,d0]] = getXY(ps2);

    let _vₓᵧ = abs(vₓᵧ);

    let _c0 = abs(c0);
    let _c1 = abs(c1);
    let _d0 = abs(d0);
    let _d1 = abs(d1);

    let c0c0 = c0*c0;
    let c0c1 = c0*c1;
    let c0d0 = c0*d0;
    let c0d1 = c0*d1;
    let c1c1 = c1*c1;
    let c1d0 = c1*d0;
    let c1d1 = c1*d1;
    let d0d0 = d0*d0;
    let d0d1 = d0*d1;
    let d1d1 = d1*d1;

    let _c0c0 = abs(c0c0);
    let _c0c1 = abs(c0c1);
    let _c0d0 = abs(c0d0);
    let _d0d0 = abs(d0d0);
    let _d0d1 = abs(d0d1);
    let _c0d1 = abs(c0d1);
    let _c1d0 = abs(c1d0);
    let _c1c1 = abs(c1c1);
    let _c1d1 = abs(c1d1);
    let _d1d1 = abs(d1d1);

    let z1 = c0*vₓₓₓ;
    let z1_ = _c0*vₓₓₓ_ + abs(z1);
    let z7 = (3*c0)*vₓₓₓ;
    let z7_ = 3*_c0*vₓₓₓ_ + abs(z7);
    let z2 = c0*vₓₓᵧ;
    let z2_ = _c0*vₓₓᵧ_ + abs(z2);
    let z3 = d0*vₓₓᵧ;
    let z3_ = _d0*vₓₓᵧ_ + abs(z3);
    let z4 = c0*vₓᵧᵧ;
    let z4_ = _c0*vₓᵧᵧ_ + abs(z4);
    let z5 = d0*vₓᵧᵧ;
    let z5_ = _d0*vₓᵧᵧ_ + abs(z5);
    let z6 = d0*vᵧᵧᵧ;
    let z6_ = _d0*vᵧᵧᵧ_ + abs(z6);
    let z8 = (3*d0)*vᵧᵧᵧ;
    let z8_ = 3*_d0*vᵧᵧᵧ_ + abs(z8);


    // a1**3*v_xxx + a1**2*b1*v_xxy + a1*b1**2*v_xyy + b1**3*v_yyy
    //let v3 =
    //    c1c1*(c1*vₓₓₓ + d1*vₓₓᵧ) +
    //    d1d1*(c1*vₓᵧᵧ + d1*vᵧᵧᵧ);
    let u1 = c1*vₓₓₓ;
    let u1_ = _c1*vₓₓₓ_ + abs(u1);
    let u2 = c1*vₓᵧᵧ;
    let u2_ = _c1*vₓᵧᵧ_ + abs(u2);
    let u3 = d1*vₓₓᵧ;
    let u3_ = _d1*vₓₓᵧ_ + abs(u3);
    let u4 = d1*vᵧᵧᵧ;
    let u4_ = _d1*vᵧᵧᵧ_ + abs(u4);
    let u5 = u1 + u3;
    let _u5 = abs(u5);
    let u5_ = u1_ + u3_ + _u5;
    let u6 = u2 + u4;
    let _u6 = abs(u6);
    let u6_ = u2_ + u4_ + _u6;
    let u7 = c1c1*u5;
    let u7_ = _c1c1*(_u5 + u5_) + abs(u7);
    let u8 = d1d1*u6;
    let u8_ = _d1d1*(_u6 + u6_) + abs(u8);
    let v3 = u7 + u8;
    let v3_ = u7_ + u8_ + abs(v3);


    // 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + a0*b1**2*v_xyy + a1**2*b0*v_xxy + a1**2*v_xx + 2*a1*b0*b1*v_xyy + a1*b1*v_xy + 3*b0*b1**2*v_yyy + b1**2*v_yy
    //let v2 =
    //    c1c1*(3*c0*vₓₓₓ +   d0*vₓₓᵧ + vₓₓ) +
    //    c1d1*(2*c0*vₓₓᵧ + 2*d0*vₓᵧᵧ + vₓᵧ) +
    //    d1d1*(  c0*vₓᵧᵧ + 3*d0*vᵧᵧᵧ + vᵧᵧ);
    //let v2 =
    //    c1c1*(3*z1 +   z3 + vₓₓ) +
    //    c1d1*(2*z2 + 2*z5 + vₓᵧ) +
    //    d1d1*(  z4 + 3*z6 + vᵧᵧ);
    let u9 = z7 + z3;
    let u9_ = z7_ + z3_ + abs(u9);
    let ua = 2*(z2 + z5);
    let ua_ = 2*(z2_ + z5_) + abs(ua);
    let ub = z4 + z8;
    let ub_ = z4_ + z8_ + abs(ub);
    let uc = u9 + vₓₓ;
    let _uc = abs(uc);
    let uc_ = u9_ + vₓₓ_ + _uc;
    let ud = ua + vₓᵧ;
    let _ud = abs(ud);
    let ud_ = ua_ + vₓᵧ_ + _ud;
    let ue = ub + vᵧᵧ;
    let _ue = abs(ue);
    let ue_ = ub_ + vᵧᵧ_ + _ue;
    let uf = c1c1*uc;
    let uf_ = _c1c1*(_uc + uc_) + abs(uf);
    let ug = c1d1*ud;
    let ug_ = _c1d1*(_ud + ud_) + abs(ug);
    let uh = d1d1*ue;
    let uh_ = _d1d1*(_ue + ue_) + abs(uh);
    let ui = uf + ug;
    let ui_ = uf_ + ug_ + abs(ui);
    let v2 = ui + uh;
    let v2_ = ui_ + uh_ + abs(v2);


    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    c0c1*(3*c0*vₓₓₓ + 2*(d0*vₓₓᵧ + vₓₓ)) +
    //    d0d1*(3*d0*vᵧᵧᵧ + 2*(c0*vₓᵧᵧ + vᵧᵧ)) +
    //    c0d1*(c0*vₓₓᵧ + vₓᵧ) +
    //    c1d0*(d0*vₓᵧᵧ + vₓᵧ) +
    //    vₓ*c1 +
    //    vᵧ*d1;
    let uj = 2*(z3 + vₓₓ);
    let uj_ = 2*(z3_ + vₓₓ_) + abs(uj);
    let uk = 2*(z4 + vᵧᵧ);
    let uk_ = 2*(z4_ + vᵧᵧ_) + abs(uk);
    let un = z7 + uj;
    let _un = abs(un);
    let un_ = z7_ + uj_ + _un;
    let uo = z8 + uk;
    let _uo = abs(uo);
    let uo_ = z8_ + uk_ + _uo;
    let up = z2 + vₓᵧ;
    let _up = abs(up);
    let up_ = z2_ + vₓᵧ_ + _up;
    let uq = z5 + vₓᵧ;
    let _uq = abs(uq);
    let uq_ = z5_ + vₓᵧ_ + _uq;
    let ur = c0c1*un;
    let ur_ = _c0c1*(_un + un_) + abs(ur);
    let us = d0d1*uo;
    let us_ = _d0d1*(_uo + uo_) + abs(us);
    let ut = c0d1*up;
    let ut_ = _c0d1*(_up + up_) + abs(ut);
    let uu = c1d0*uq;
    let uu_ = _c1d0*(_uq + uq_) + abs(uu);
    let uv = c1*vₓ;
    let uv_ = _c1*vₓ_ + abs(uv);
    let uw = d1*vᵧ;
    let uw_ = _d1*vᵧ_ + abs(uw);
    let ux = ur + us;
    let ux_ = ur_ + us_ + abs(ux);
    let uy = ut + uu;
    let uy_ = ut_ + uu_ + abs(uy);
    let uz = ux + uy;
    let uz_ = ux_ + uy_ + abs(uz);
    let u0 = uv + uw;
    let u0_ = uv_ + uw_ + abs(u0);
    let v1 = uz + u0;
    let v1_ = uz_ + u0_ + abs(v1);


    // a0**3*v_xxx + a0**2*b0*v_xxy + a0**2*v_xx + a0*b0**2*v_xyy + a0*b0*v_xy + a0*v_x + b0**3*v_yyy + b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(d0*vᵧᵧᵧ + c0*vₓᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    //let v0 =
    //    c0c0*(z1 + z3 + vₓₓ) +
    //    d0d0*(z6 + z4 + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ    +
    //    d0*vᵧ    +
    //    v;
    let f1 = z1 + z3;
    let f1_ = z1_ + z3_ + abs(f1);
    let f2 = z6 + z4;
    let f2_ = z6_ + z4_ + abs(f2);
    let f3 = f1 + vₓₓ;
    let _f3 = abs(f3);
    let f3_ = f1_ + vₓₓ_ + _f3;
    let f4 = f2 + vᵧᵧ;
    let _f4 = abs(f4);
    let f4_ = f2_ + vᵧᵧ_ + _f4;
    let f5 = c0c0*f3;
    let f5_ = _c0c0*(_f3 + f3_) + abs(f5);
    let f6 = d0d0*f4;
    let f6_ = _d0d0*(_f4 + f4_) + abs(f6);
    let f7 = c0d0*vₓᵧ;
    let f7_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(f7);
    let f8 = f5 + f6;
    let f8_ = f5_ + f6_ + abs(f8);
    let f9 = f8 + f7;
    let f9_ = f8_ + f7_ + abs(f9);
    let fa = c0*vₓ;
    let fa_ = _c0*vₓ_ + abs(fa);
    let fb = d0*vᵧ;
    let fb_ = _d0*vᵧ_ + abs(fb);
    let fc = fa + fb;
    let fc_ = fa_ + fb_ + abs(fc);
    let fd = f9 + fc;
    let fd_ = f9_ + fc_ + abs(fd);
    let v0 = fd + v;
    let v0_ = fd_ + v_ + abs(v0);


    return {
        coeffs:   [v3, v2, v1, v0],
        errBound: [v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffs3x1 }
