
import { getImplicitForm2_bitlength45_double } from "../../../../implicit-form/inp-bitlength45/double/get-implicit-form2-bitlength45-double";
import { γ } from "../../../../error-analysis/error-analysis";
import { getXY } from "../../../../to-power-basis/get-xy";


let abs = Math.abs;
const γ1 = γ(1);


function getCoeffs2x3(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicitForm2_bitlength45_double(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    let _c0 = abs(c0);
    let _d0 = abs(d0);
    let _c1 = abs(c1);
    let _d1 = abs(d1);
    let _c2 = abs(c2);
    let _d2 = abs(d2);
    let _c3 = abs(c3);
    let _d3 = abs(d3);

    let _vₓₓ = abs(vₓₓ);
    let _vₓᵧ = abs(vₓᵧ);
    let _vᵧᵧ = abs(vᵧᵧ);

    let c0c0 = c0*c0;
    let c0c1 = c0*c1;
    let c0c2 = c0*c2;
    let c0c3 = c0*c3;
    let c0d0 = c0*d0;
    let c0d1 = c0*d1;
    let c0d2 = c0*d2;
    let c0d3 = c0*d3;
    let c1c1 = c1*c1;
    let c1c2 = c1*c2;
    let c1c3 = c1*c3;
    let c1d0 = c1*d0;
    let c1d1 = c1*d1;
    let c1d2 = c1*d2;
    let c1d3 = c1*d3;
    let c2c2 = c2*c2;
    let c2c3 = c2*c3;
    let c2d0 = c2*d0;
    let c2d1 = c2*d1;
    let c2d2 = c2*d2;
    let c2d3 = c2*d3;
    let c3c3 = c3*c3;
    let c3d0 = c3*d0;
    let c3d1 = c3*d1;
    let c3d2 = c3*d2;
    let c3d3 = c3*d3;
    let d0d0 = d0*d0;
    let d0d1 = d0*d1;    
    let d0d2 = d0*d2;
    let d0d3 = d0*d3;
    let d1d1 = d1*d1;
    let d1d2 = d1*d2;
    let d1d3 = d1*d3;
    let d2d2 = d2*d2;
    let d2d3 = d2*d3;
    let d3d3 = d3*d3;

    let _c1c3 = abs(c1c3);
    let _c1d3 = abs(c1d3);
    let _c2c2 = abs(c2c2);
    let _c2c3 = abs(c2c3);
    let _c2d2 = abs(c2d2);
    let _c2d3 = abs(c2d3);
    let _c3c3 = abs(c3c3);
    let _c3d1 = abs(c3d1);
    let _c3d2 = abs(c3d2);
    let _c3d3 = abs(c3d3);
    let _d1d3 = abs(d1d3);
    let _d2d2 = abs(d2d2);
    let _d2d3 = abs(d2d3);
    let _d3d3 = abs(d3d3);
    let _c0c3 = abs(c0c3);
    let _c1c2 = abs(c1c2);
    let _d0d3 = abs(d0d3);
    let _d1d2 = abs(d1d2);
    let _c0d3 = abs(c0d3);
    let _c1d2 = abs(c1d2);
    let _c2d1 = abs(c2d1);
    let _c3d0 = abs(c3d0);
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


    // c3**2*vₓₓ + c3*d3*vₓᵧ + d3**2*vᵧᵧ
    //let v6 =
    //    c3c3*vₓₓ +
    //    c3d3*vₓᵧ +
    //    d3d3*vᵧᵧ;
    let p1 = c3c3*vₓₓ;
    let p1_ = _c3c3*(_vₓₓ + vₓₓ_) + abs(p1);
    let p2 = c3d3*vₓᵧ;
    let p2_ = _c3d3*(_vₓᵧ + vₓᵧ_) + abs(p2);
    let p3 = d3d3*vᵧᵧ;
    let p3_ = _d3d3*(_vᵧᵧ + vᵧᵧ_) + abs(p3);
    let p4 = p1 + p2;
    let p4_ = p1_ + p2_ + abs(p4);
    let v6 = p4 + p3;
    let v6_ = p4_ + p3_ + abs(v6);


    // 2*a2*a3*vₓₓ + a2*b3*vₓᵧ + a3*b2*vₓᵧ + 2*b2*b3*vᵧᵧ
    //let v5 =
    //    2*(c2c3*vₓₓ + d2d3*vᵧᵧ) +
    //    (c2d3 + c3d2)*vₓᵧ;
    let p5 = c2c3*vₓₓ;
    let p5_ = _c2c3*(_vₓₓ + vₓₓ_) + abs(p5);
    let p6 = d2d3*vᵧᵧ;
    let p6_ = _d2d3*(_vᵧᵧ + vᵧᵧ_) + abs(p6);
    let p7 = p5 + p6;
    let p7_ = p5_ + p6_ + abs(p7);
    let p8 = c2d3 + c3d2;
    let _p8 = abs(p8);
    let p8_ = _c2d3 + _c3d2 + _p8;
    let p9 = p8*vₓᵧ;
    let p9_ = p8_*_vₓᵧ + _p8*vₓᵧ_ + abs(p9);
    let v5 = 2*p7 + p9;
    let v5_ = 2*p7_ + p9_ + abs(v5);


    // 2*a1*a3*vₓₓ + a1*b3*vₓᵧ + a2**2*vₓₓ + a2*b2*vₓᵧ + a3*b1*vₓᵧ + 2*b1*b3*vᵧᵧ + b2**2*vᵧᵧ
    //let v4 =
    //    (2*c1c3 + c2c2)*vₓₓ +
    //    (2*d1d3 + d2d2)*vᵧᵧ +
    //    (c1d3 + c2d2 + c3d1)*vₓᵧ;
    let pa = 2*c1c3 + c2c2;
    let _pa = abs(pa);
    let pa_ = 2*_c1c3 + _c2c2 + _pa;
    let pb = 2*d1d3 + d2d2;
    let _pb = abs(pb);
    let pb_ = 2*_d1d3 + _d2d2 + _pb;
    let pc = c1d3 + c2d2;
    let pc_ = _c1d3 + _c2d2 + abs(pc);
    let pd = pc + c3d1;
    let _pd = abs(pd);
    let pd_ = pc_ + _c3d1 + _pd;
    let pe = pa*vₓₓ;
    let pe_ = pa_*vₓₓ_ + _pa*vₓₓ_ + abs(pe);
    let pf = pb*vᵧᵧ;
    let pf_ = pb_*vᵧᵧ_ + _pb*vᵧᵧ_ + abs(pf);
    let pg = pe + pf;
    let pg_ = pe_ + pf_ + abs(pg);
    let rp = pd*vₓᵧ;
    let rp_ = pd_*_vₓᵧ + _pd*vₓᵧ_ + abs(rp);
    let v4 = pg + rp;
    let v4_ = pg_ + rp_ + abs(v4);


    // 2*a0*a3*vₓₓ + a0*b3*vₓᵧ + 2*a1*a2*vₓₓ + 
    // a1*b2*vₓᵧ + a2*b1*vₓᵧ + a3*b0*vₓᵧ + 
    // a3*v_x + 2*b0*b3*vᵧᵧ + 2*b1*b2*vᵧᵧ + b3*v_y
    //let v3 =
    //    2*((c0c3 + c1c2)*vₓₓ + (d0d3 + d1d2)*vᵧᵧ) +
    //    (c0d3 + c1d2 + c2d1 + c3d0)*vₓᵧ +
    //    c3*vₓ +
    //    d3*vᵧ;
    let ph = c0c3 + c1c2;
    let _ph = abs(ph);
    let ph_ = _c0c3 + _c1c2 + _ph;
    let pi = d0d3 + d1d2;
    let _pi = abs(pi);
    let pi_ = _d0d3 + _d1d2 + _pi;
    let pj = c0d3 + c1d2;
    let pj_ = _c0d3 + _c1d2 + abs(pj);
    let pk = c2d1 + c3d0;
    let pk_ = _c2d1 + _c3d0 + abs(pk);
    let pl = pj + pk;
    let _pl = abs(pl);
    let pl_ = pj_ + pk_ + _pl;
    let pm = ph*vₓₓ;
    let pm_ = ph_*_vₓₓ + _ph*vₓₓ_ + abs(pm);
    let pn = pi*vᵧᵧ;
    let pn_ = pi_*_vᵧᵧ + _pi*vᵧᵧ_ + abs(pn);
    let po = 2*(pm + pn);
    let po_ = 2*(pm_ + pn_) + abs(po);
    let pp = pl*vₓᵧ;
    let pp_ = pl_*_vₓᵧ + _pl*vₓᵧ_ + abs(pp);
    let rn = c3*vₓ;
    let rn_ = _c3*vₓ_ + abs(rn);
    let ro = d3*vᵧ;
    let ro_ = _d3*vᵧ_ + abs(ro);
    let pq = rn + ro;
    let pq_ = rn_ + ro_ + abs(pq);
    let pr = po + pp;
    let pr_ = po_ + pp_ + abs(pr);
    let v3 = pr + pq;
    let v3_ = pr_ + pq_ + abs(v3);

    
    // 2*a0*a2*vₓₓ + a0*b2*vₓᵧ + a1**2*vₓₓ + 
    // a1*b1*vₓᵧ + a2*b0*vₓᵧ + a2*v_x + 
    // 2*b0*b2*vᵧᵧ + b1**2*vᵧᵧ + b2*v_y
    //let v2 =
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ +
    //    d2*vᵧ;
    let ps = 2*c0c2 + c1c1;
    let _ps = abs(ps);
    let ps_ = 2*_c0c2 + _c1c1 + _ps;
    let pt = 2*d0d2 + d1d1;
    let _pt = abs(pt);
    let pt_ = 2*_d0d2 + _d1d1 + _pt;
    let pu = c0d2 + c1d1;
    let pu_ = _c0d2 + _c1d1 + abs(pu);
    let pv = pu + c2d0;
    let _pv = abs(pv);
    let pv_ = pu_ + _c2d0 + _pv;
    let pw = ps*vₓₓ;
    let pw_ = ps_*_vₓₓ + _ps*vₓₓ_ + abs(pw);
    let px = pt*vᵧᵧ;
    let px_ = pt_*_vᵧᵧ + _pt*vᵧᵧ_ + abs(px);
    let py = pv*vₓᵧ;
    let py_ = pv_*_vₓᵧ + _pv*vₓᵧ_ + abs(py);
    let pz = pw + px;
    let pz_ = pw_ + px_ + abs(pz);
    let r1 = pz + py;
    let r1_ = pz_ + py_ + abs(r1);
    let r2 = c2*vₓ;
    let r2_ = _c2*vₓ_ + abs(r2);
    let r3 = d2*vᵧ;
    let r3_ = _d2*vᵧ_ + abs(r3);
    let r4 = r2 + r3;
    let r4_ = r2_ + r3_ + abs(r4);
    let v2 = r1 + r4;
    let v2_ = r1_ + r4_ + abs(v2);


    // 2*a0*a1*vₓₓ + a0*b1*vₓᵧ + a1*b0*vₓᵧ + a1*v_x + 2*b0*b1*vᵧᵧ + b1*v_y
    //let v1 =
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    (c0d1 + c1d0)*vₓᵧ +
    //    c1*vₓ +
    //    d1*vᵧ;
    let r5 = c0c1*vₓₓ;
    let r5_ = _c0c1*(_vₓₓ + vₓₓ_) + abs(r5);
    let r6 = d0d1*vᵧᵧ;
    let r6_ = _d0d1*(_vᵧᵧ + vᵧᵧ_) + abs(r6);
    let r7 = c0d1 + c1d0;
    let _r7 = abs(r7);
    let r7_ = _c0d1 + _c1d0 + _r7;
    let r8 = r7*vₓᵧ;
    let r8_ = r7_*_vₓᵧ + _r7*vₓᵧ_ + abs(r8);
    let r9 = 2*(r5 + r6);
    let r9_ = 2*(r5_ + r6_) + abs(r9);
    let ra = r9 + r8;
    let ra_ = r9_ + r8_ + abs(ra);
    let rb = c1*vₓ;
    let rb_ = _c1*vₓ_ + abs(rb);
    let rc = d1*vᵧ;
    let rc_ = _d1*vᵧ_ + abs(rc);
    let rd = rb + rc;
    let rd_ = rb_ + rc_ + abs(rd);
    let v1 = ra + rd;
    let v1_ = ra_ + rd_ + abs(v1);
    
    

    // a0**2*vₓₓ + a0*b0*vₓᵧ + a0*v_x + b0**2*vᵧᵧ + b0*v_y + v_0
    //let v0 =
    //    c0c0*vₓₓ +
    //    c0d0*vₓᵧ +
    //    d0d0*vᵧᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    let re = c0c0*vₓₓ;
    let re_ = _c0c0*(_vₓₓ + vₓₓ_) + abs(re);
    let rf = c0d0*vₓᵧ;
    let rf_ = _c0d0*(_vₓᵧ + vₓᵧ_) + abs(rf);
    let rg = d0d0*vᵧᵧ;
    let rg_ = _d0d0*(_vᵧᵧ + vᵧᵧ_) + abs(rg);
    let rh = c0*vₓ;
    let rh_ = _c0*vₓ_ + abs(rh);
    let ri = d0*vᵧ;
    let ri_ = _d0*vᵧ_ + abs(ri);
    let rj = re + rf;
    let rj_ = re_ + rf_ + abs(rj);
    let rk = rj + rg;
    let rk_ = rj_ + rg_ + abs(rk);
    let rl = rh + ri;
    let rl_ = rh_ + ri_ + abs(rl);
    let rm = rk + rl;
    let rm_ = rk_ + rl_ + abs(rm);
    let v0 = rm + v;
    let v0_ = rm_ + v_ + abs(v0);


    return {
        coeffs:   [v6, v5, v4, v3, v2, v1, v0],
        errBound: [v6_, v5_, v4_, v3_, v2_, v1_, v0_].map(c => γ1*c)
    };
}


export { getCoeffs2x3 }
