
import { 
    twoProduct, scaleExpansion2, expansionProduct, fastExpansionSum, 
    eMultBy2 } from "big-float-ts";
import { getImplicitForm3Exact } from "../../../../implicit-form/exact/get-implicit-form3-exact";
import { getXY } from "../../../../to-power-basis/get-xy";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const tp = twoProduct;


/**
 * Returns an error-free polynomial in 1 variable
 * whose roots are the parameter values of the intersection points of an order 
 * 3 and 1 bezier curve (i.e. a cubic bezier curve and a line).
 * 
 * The returned polynomial degree will be 3
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * Shewchuk floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * the returned polynomial coefficients are exact (i.e. error-free)
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez3Bez1Exact(ps1: number[][], ps2: number[][]) {
    let { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = 
        getImplicitForm3Exact(ps1);

    let [[c1,c0],[d1,d0]] = getXY(ps2);


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
    
    let z1 = sce(c0,vₓₓₓ);
    let z7 = sce(3*c0,vₓₓₓ);  // 3*c0: 47-bit aligned => error free 
    let z2 = sce(c0,vₓₓᵧ);
    let z3 = sce(d0,vₓₓᵧ);
    let z4 = sce(c0,vₓᵧᵧ);
    let z5 = sce(d0,vₓᵧᵧ);
    let z6 = sce(d0,vᵧᵧᵧ);
    let z8 = sce(3*d0,vᵧᵧᵧ);


    // a1**3*v_xxx + a1**2*b1*v_xxy + a1*b1**2*v_xyy + b1**3*v_yyy
    //let v3 =
    //    c1c1*(c1*vₓₓₓ + d1*vₓₓᵧ) +
    //    d1d1*(c1*vₓᵧᵧ + d1*vᵧᵧᵧ);
    let u1 = sce(c1,vₓₓₓ);
    let u2 = sce(c1,vₓᵧᵧ);
    let u3 = sce(d1,vₓₓᵧ);
    let u4 = sce(d1,vᵧᵧᵧ);
    let u5 = fes(u1,u3);
    let u6 = fes(u2,u4);
    let u7 = epr(c1c1,u5);
    let u8 = epr(d1d1,u6);
    let v3 = fes(u7,u8);


    // 3*a0*a1**2*v_xxx + 2*a0*a1*b1*v_xxy + a0*b1**2*v_xyy + a1**2*b0*v_xxy + a1**2*v_xx + 2*a1*b0*b1*v_xyy + a1*b1*v_xy + 3*b0*b1**2*v_yyy + b1**2*v_yy
    //let v2 =
    //    c1c1*(3*c0*vₓₓₓ +   d0*vₓₓᵧ + vₓₓ) +
    //    c1d1*(2*c0*vₓₓᵧ + 2*d0*vₓᵧᵧ + vₓᵧ) +
    //    d1d1*(  c0*vₓᵧᵧ + 3*d0*vᵧᵧᵧ + vᵧᵧ);
    //let v2 =
    //    c1c1*(3*z1 +   z3 + vₓₓ) +
    //    c1d1*(2*z2 + 2*z5 + vₓᵧ) +
    //    d1d1*(  z4 + 3*z6 + vᵧᵧ);
    let u9 = fes(z7,z3);
    let ua = em2(fes(z2,z5));
    let ub = fes(z4,z8);
    let uc = fes(u9,vₓₓ);
    let ud = fes(ua,vₓᵧ);
    let ue = fes(ub,vᵧᵧ);
    let uf = epr(c1c1,uc);
    let ug = epr(c1d1,ud);
    let uh = epr(d1d1,ue);
    let ui = fes(uf,ug);
    let v2 = fes(ui,uh);


    // 3*a0**2*a1*v_xxx + a0**2*b1*v_xxy + 2*a0*a1*b0*v_xxy + 2*a0*a1*v_xx + 2*a0*b0*b1*v_xyy + a0*b1*v_xy + a1*b0**2*v_xyy + a1*b0*v_xy + a1*v_x + 3*b0**2*b1*v_yyy + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    c0c1*(3*c0*vₓₓₓ + 2*(d0*vₓₓᵧ + vₓₓ)) +
    //    d0d1*(3*d0*vᵧᵧᵧ + 2*(c0*vₓᵧᵧ + vᵧᵧ)) +
    //    c0d1*(c0*vₓₓᵧ + vₓᵧ) +
    //    c1d0*(d0*vₓᵧᵧ + vₓᵧ) +
    //    vₓ*c1 +
    //    vᵧ*d1;
    let uj = em2(fes(z3,vₓₓ));
    let uk = em2(fes(z4,vᵧᵧ));
    let un = fes(z7,uj);
    let uo = fes(z8,uk);
    let up = fes(z2,vₓᵧ);
    let uq = fes(z5,vₓᵧ);
    let ur = epr(c0c1,un);
    let us = epr(d0d1,uo);
    let ut = epr(c0d1,up);
    let uu = epr(c1d0,uq);
    let uv = sce(c1,vₓ);
    let uw = sce(d1,vᵧ);
    let ux = fes(ur,us);
    let uy = fes(ut,uu);
    let uz = fes(ux,uy);
    let u0 = fes(uv,uw);
    let v1 = fes(uz,u0);


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
    let f1 = fes(z1,z3);
    let f2 = fes(z6,z4);
    let f3 = fes(f1,vₓₓ);
    let f4 = fes(f2,vᵧᵧ);
    let f5 = epr(c0c0,f3);
    let f6 = epr(d0d0,f4);
    let f7 = epr(c0d0,vₓᵧ);
    let f8 = fes(f5,f6);
    let f9 = fes(f8,f7);
    let fa = sce(c0,vₓ);
    let fb = sce(d0,vᵧ);
    let fc = fes(fa,fb);
    let fd = fes(f9,fc);
    let v0 = fes(fd,v);

    return [v3, v2, v1, v0];
}


export { getCoeffsBez3Bez1Exact }
