
import { getImplicitForm2_bitlength45_double } from "../../../../implicit-form/inp-bitlength45/double/get-implicit-form2-bitlength45-double";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


let abs = Math.abs;
const γ1 = γ(1);


function getCoeffs2x2(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2_bitlength45_double(ps1);

    let _vₓₓ = abs(vₓₓ);
    let _vₓᵧ = abs(vₓᵧ);
    let _vᵧᵧ = abs(vᵧᵧ);

    let [[c2,c1,c0],[d2,d1,d0]] = getXY(ps2);

    let _c0 = abs(c0);
    let _d0 = abs(d0);
    let _c1 = abs(c1);
    let _d1 = abs(d1);
    let _c2 = abs(c2);
    let _d2 = abs(d2);

    let c0c0 = c0*c0;
    let c0d0 = c0*d0;
    let d0d0 = d0*d0;
    let c0c1 = c0*c1;
    let c0d1 = c0*d1;
    let c1c2 = c1*c2;    
    let c1d2 = c1*d2;
    let c1d0 = c1*d0;    
    let c2c2 = c2*c2;
    let c2d1 = c2*d1;
    let c2d2 = c2*d2;
    let d0d1 = d0*d1;
    let d1d2 = d1*d2;    
    let d2d2 = d2*d2;    
    let c0c2 = c0*c2;
    let c1c1 = c1*c1;
    let d0d2 = d0*d2;
    let d1d1 = d1*d1;
    let c0d2 = c0*d2;
    let c1d1 = c1*d1;
    let c2d0 = c2*d0;

    let _c2c2 = abs(c2c2);
    let _c2d2 = abs(c2d2);
    let _d2d2 = abs(d2d2);
    let _c1c2 = abs(c1c2);
    let _d1d2 = abs(d1d2);
    let _c1d2 = abs(c1d2);
    let _c2d1 = abs(c2d1);
    let _c0c2 = abs(c0c2);
    let _c1c1 = abs(c1c1);
    let _d0d2 = abs(d0d2);
    let _d1d1 = abs(d1d1);
    let _c0d2 = abs(c0d2);
    let _c1d1 = abs(c1d1);
    let _c2d0 = abs(c2d0);
    let _c0c1 = abs(c0c1);
    let _d0d1 = abs(d0d1);
    let _c0d1 = abs(c0d1);
    let _c1d0 = abs(c1d0);
    let _c0c0 = abs(c0c0);
    let _c0d0 = abs(c0d0);
    let _d0d0 = abs(d0d0);
    
    
    // a2**2*v_xx + a2*b2*v_xy + b2**2*v_yy
    //let v4 = 
    //    (c2*c2)*vₓₓ +
    //    (c2*d2)*vₓᵧ +
    //    (d2*d2)*vᵧᵧ;
    let p1 = c2c2*vₓₓ;
    let p1_ = _c2c2*(_vₓₓ + vₓₓ_) + abs(p1);
    let p2 = c2d2*vₓᵧ;
    let p2_ = _c2d2*(_vₓᵧ + vₓᵧ_) + abs(p2);
    let p3 = d2d2*vᵧᵧ;
    let p3_ = _d2d2*(_vᵧᵧ + vᵧᵧ_) + abs(p3);
    let p4 = p1 + p2;
    let p4_ = p1_ + p2_ + abs(p4);
    let v4 = p4 + p3;
    let v4_ = p4_ + p3_ + abs(v4);

        
    // 2*a1*a2*v_xx + a1*b2*v_xy + a2*b1*v_xy + 2*b1*b2*v_yy
    //let v3 =
    //    2*((c1*c2)*vₓₓ + (d1*d2)*vᵧᵧ) +
    //    ((c1*d2) + (c2*d1))*vₓᵧ;
    let p5 = c1c2*vₓₓ;
    let p5_ = _c1c2*(_vₓₓ + vₓₓ_) + abs(p5);
    let p6 = d1d2*vᵧᵧ;
    let p6_ = _d1d2*(_vᵧᵧ + vᵧᵧ_) + abs(p6);
    let p7 = c1d2 + c2d1;
    let _p7 = abs(p7);
    let p7_ = _c1d2 + _c2d1 + _p7;
    let p8 = p7*vₓᵧ;
    let p8_ = p7_*_vₓᵧ + _p7*vₓᵧ_ + abs(p8);
    let p9 = 2*(p5 + p6);
    let p9_ = 2*(p5_ + p6_) + abs(p9);
    let v3 = p9 + p8;
    let v3_ = p9_ + p8_ + abs(v3);
        
    
    // 2*a0*a2*v_xx + a0*b2*v_xy + a1**2*v_xx + 
    // a1*b1*v_xy + a2*b0*v_xy + a2*v_x + 
    // 2*b0*b2*v_yy + b1**2*v_yy + b2*v_y
    //let v2 = 
    //    (2*(c0*c2) + (c1*c1))*vₓₓ +
    //    (2*(d0*d2) + (d1*d1))*vᵧᵧ +          
    //    ((c0*d2) + (c1*d1) + (c2*d0))*vₓᵧ +
    //    c2*vₓ  +          
    //    d2*vᵧ;
    let pa = 2*c0c2 + c1c1;
    let _pa = abs(pa);
    let pa_ = 2*_c0c2 + _c1c1 + _pa;
    let pb = 2*d0d2 + d1d1;
    let _pb = abs(pb);
    let pb_ = 2*_d0d2 + _d1d1 + _pb;
    let pc = c0d2 + c1d1;
    let _pc = abs(pc);
    let pc_ = _c0d2 + _c1d1 + _pc;
    let pd = pc + c2d0;
    let _pd = abs(pd);
    let pd_ = pc_ + _c2d0 + _pd;
    let pe = pa*vₓₓ;
    let pe_ = pa_*_vₓₓ + _pa*vₓₓ_ + abs(pe);
    let pf = pb*vᵧᵧ;
    let pf_ = pb_*_vᵧᵧ + _pb*vᵧᵧ_ + abs(pf);
    let pg = pd*vₓᵧ;
    let pg_ = pd_*_vₓᵧ + _pd*vₓᵧ_ + abs(pg);
    let ph = c2*vₓ;
    let ph_ = _c2*vₓ_ + abs(ph);
    let pi = d2*vᵧ;
    let pi_ = _d2*vᵧ_ + abs(pi);
    let pj = pe + pf;
    let pj_ = pe_ + pf_ + abs(pj);
    let pk = pj + pg;
    let pk_ = pj_ + pg_ + abs(pk);
    let pl = ph + pi;
    let pl_ = ph_ + pi_ + abs(pl);
    let v2 = pk + pl;
    let v2_ = pk_ + pl_ + abs(v2);


    // 2*a0*a1*v_xx + a0*b1*v_xy + a1*b0*v_xy + 
    // a1*v_x + 2*b0*b1*v_yy + b1*v_y
    //let v1 =
    //    2*((c0*c1)*vₓₓ + (d0*d1)*vᵧᵧ) +
    //    ((c0*d1) + (c1*d0))*vₓᵧ +
    //    c1*vₓ  +
    //    d1*vᵧ;
    let pm = c0c1*vₓₓ;
    let pm_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(pm);
    let pn = d0d1*vᵧᵧ;
    let pn_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(pn);
    let po = c0d1 + c1d0;
    let _po = abs(po);
    let po_ = _c0d1 + _c1d0 + _po;
    let pp = po*vₓᵧ;
    let pp_ = po_*_vₓᵧ + _po*vₓᵧ_ + abs(pp);
    let pq = 2*(pm + pn);
    let pq_ = 2*(pm_ + pn_) + abs(pq);
    let pr = c1*vₓ;
    let pr_ = _c1*vₓ_ + abs(pr);
    let ps = d1*vᵧ;
    let ps_ = _d1*vᵧ_ + abs(ps);
    let pt = pq + pp;
    let pt_ = pq_ + pp_ + abs(pt);
    let pu = pr + ps;
    let pu_ = pr_ + ps_ + abs(pu);
    let v1 = pt + pu;
    let v1_ = pt_ + pu_ + abs(v1);

    
    // a0**2*v_xx + a0*b0*v_xy + a0*v_x + 
    // b0**2*v_yy + b0*v_y + v_0
    //let v0 =
    //    (c0*c0)*vₓₓ + 
    //    (c0*d0)*vₓᵧ + 
    //    (d0*d0)*vᵧᵧ + 
    //    c0*vₓ  +         
    //    d0*vᵧ  +
    //    v;
    let pv = c0c0*vₓₓ;
    let pv_ = _c0c0*(_vₓₓ + vₓₓ_) + abs(pv);
    let pw = c0d0*vₓᵧ;
    let pw_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(pw);
    let px = d0d0*vᵧᵧ;
    let px_ = _d0d0*(_vᵧᵧ + vᵧᵧ_) + abs(px);
    let py = c0*vₓ;
    let py_ = _c0*vₓ_ + abs(py);
    let pz = d0*vᵧ;
    let pz_ = _d0*vᵧ_ + abs(pz);
    let q1 = pv + pw;
    let q1_ = pv_ + pw_ + abs(q1);
    let q2 = q1 + px;
    let q2_ = q1_ + px_ + abs(q2);
    let q3 = py + pz;
    let q3_ = py_ + pz_ + abs(q3);
    let q4 = q2 + q3;
    let q4_ = q2_ + q3_ + abs(q4);
    let v0 = q4 + v;
    let v0_ = q4_ + v_ + abs(v0);


    return {
        coeffs:   [v4, v3, v2, v1, v0],
        errBound: [v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffs2x2 }
