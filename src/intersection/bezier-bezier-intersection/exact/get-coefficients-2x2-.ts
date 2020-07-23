
import { getImplicitForm2Exact_ } from "../../../implicit-form/exact/get-implicit-form2-";
import { twoProduct, scaleExpansion2, expansionProduct, fastExpansionSum, eMultBy2 } from "big-float-ts";
import { ddAddDd, ddMultBy2 } from 'double-double';
import { getXY } from "../../../to-power-basis/get-xy";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const qaq = ddAddDd;
const qm2 = ddMultBy2;
const sce = scaleExpansion2;
const epr = expansionProduct;
const fes = fastExpansionSum;
const em2 = eMultBy2;
const tp = twoProduct;


function getCoeffs2x2Exact_(ps1: number[][], ps2: number[][]) {
    let { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = getImplicitForm2Exact_(ps1);

    let [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);


    let c0c0 = tp(c0,c0);
    let c0c1 = tp(c0,c1);
    let c0c2 = tp(c0,c2);
    let c0d0 = tp(c0,d0);
    let c0d1 = tp(c0,d1);
    let c0d2 = tp(c0,d2);
    let c1c1 = tp(c1,c1);
    let c1c2 = tp(c1,c2);
    let c1d0 = tp(c1,d0);
    let c1d1 = tp(c1,d1);
    let c1d2 = tp(c1,d2);
    let c2d1 = tp(c2,d1);
    let c2c2 = tp(c2,c2);    
    let c2d0 = tp(c2,d0);
    let c2d2 = tp(c2,d2);
    let d0d0 = tp(d0,d0);
    let d0d1 = tp(d0,d1);
    let d0d2 = tp(d0,d2);
    let d1d1 = tp(d1,d1);
    let d1d2 = tp(d1,d2);
    let d2d2 = tp(d2,d2);


    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    //let v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    let p1 = epr(c2c2,vₓₓ);
    let p2 = epr(c2d2,vₓᵧ);
    let p3 = epr(d2d2,vᵧᵧ);
    let p4 = fes(p1,p2);
    let v4 = fes(p4,p3);

        
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    //let v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    let p5 = epr(c1c2,vₓₓ);
    let p6 = epr(d1d2,vᵧᵧ);
    let p7 = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    let p8 = epr(p7,vₓᵧ);
    let p9 = em2(fes(p5,p6));
    let v3 = fes(p9,p8);
        
    
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //let v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    let pa = qaq(qm2(c0c2),c1c1);  // 48-bit aligned => error free
    let pb = qaq(qm2(d0d2),d1d1);  // 48-bit aligned => error free
    let pc = qaq(c0d2,c1d1);  // 48-bit aligned => error free
    let pd = qaq(pc,c2d0);  // 48-bit aligned => error free
    let pe = epr(pa,vₓₓ);
    let pf = epr(pb,vᵧᵧ);
    let pg = epr(pd,vₓᵧ);
    let ph = sce(c2,vₓ);
    let pi = sce(d2,vᵧ);
    let pj = fes(pe,pf);
    let pk = fes(pj,pg);
    let pl = fes(ph,pi);
    let v2 = fes(pk,pl);


    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    let pm = epr(c0c1,vₓₓ);
    let pn = epr(d0d1,vᵧᵧ);
    let po = qaq(c0d1,c1d0);  // 48-bit aligned => error free
    let pp = epr(po,vₓᵧ);
    let pq = em2(fes(pm,pn));
    let pr = sce(c1,vₓ);
    let ps = sce(d1,vᵧ);
    let pt = fes(pq,pp);
    let pu = fes(pr,ps);
    let v1 = fes(pt,pu);

    
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    let pv = epr(c0c0,vₓₓ);
    let pw = epr(c0d0,vₓᵧ);
    let px = epr(d0d0,vᵧᵧ);
    let py = sce(c0,vₓ);
    let pz = sce(d0,vᵧ);
    let q1 = fes(pv,pw);
    let q2 = fes(q1,px);
    let q3 = fes(py,pz);
    let q4 = fes(q2,q3);
    let v0 = fes(q4,v);

    return [v4, v3, v2, v1, v0];
}


export { getCoeffs2x2Exact_ }
