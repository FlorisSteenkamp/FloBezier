import { getImplicitForm3 } from "../../../../implicit-form/double/get-implicit-form3";
import { γ } from '../../../../error-analysis/error-analysis';
import { getXY } from "../../../../to-power-basis/get-xy";


const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of 2 order 
 * 3 bezier curves (i.e. 2 cubic bezier curves).
 * 
 * The returned polynomial degree will be 9
 * (see [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 * 
 * The returned polynomial coefficients are given densely as an array of double
 * precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`.
 * 
 * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * intermediate calculations are done in double precision and this is
 * reflected in the output error bound (which is approximately equal to
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and 
 * depends on the specific calculation)
 * * the error bound returned need **not** be scaled before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc mdx
 */
function getCoeffsBez3Bez3(ps1: number[][], ps2: number[][]) {

    const { 
        vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v 
    } = getImplicitForm3(ps1);

    const [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2); // Assume exact -> max bitlength = 47

    const c0c0 = c0*c0;
    const c0c1 = c0*c1;
    const c0c2 = c0*c2;
    const c0c3 = c0*c3;
    const c0d0 = c0*d0;
    const c0d1 = c0*d1;
    const c0d2 = c0*d2;
    const c0d3 = c0*d3;
    const c1c1 = c1*c1;
    const c1c2 = c1*c2;
    const c1c3 = c1*c3;
    const c1d0 = c1*d0;
    const c1d1 = c1*d1;
    const c1d2 = c1*d2;
    const c1d3 = c1*d3;
    const c2d1 = c2*d1;
    const c2c2 = c2*c2;    
    const c2c3 = c2*c3;
    const c2d0 = c2*d0;
    const c2d2 = c2*d2;
    const c2d3 = c2*d3;
    const c3c3 = c3*c3;
    const c3d0 = c3*d0;
    const c3d1 = c3*d1;
    const c3d2 = c3*d2;
    const c3d3 = c3*d3;
    
    const d0d0 = d0*d0;
    const d0d1 = d0*d1;
    const d0d2 = d0*d2;
    const d0d3 = d0*d3;
    const d1d1 = d1*d1;
    const d1d2 = d1*d2;
    const d3d3 = d3*d3;
    const d2d2 = d2*d2;
    const d2d3 = d2*d3;
    const d1d3 = d1*d3;
    
    //const v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    const g1 = c3*c3c3;
    const g2 = c3*d3d3;
    const g3 = d3*c3c3;
    const g4 = d3*d3d3;
    const g5 = g1*vₓₓₓ;
    const g6 = g2*vₓᵧᵧ;
    const g7 = g3*vₓₓᵧ;
    const g8 = g4*vᵧᵧᵧ;
    const g9 = g5 + g6;
    const ga = g7 + g8;
    const v9 = g9 + ga;

    //const v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    const w1 = 2*c2d3 + c3d2;
    const w2 = 2*c3d2 + c2d3;
    const w3 = c3*w1;
    const w4 = d3*w2;
    const w5 = c2*c3c3;
    const w6 = d2*d3d3;
    const w7 = vₓₓₓ*w5;
    const u1 = vᵧᵧᵧ*w6;
    const u2 = vₓₓᵧ*w3;
    const u3 = vₓᵧᵧ*w4;
    const u4 = u2 + u3;
    const u5 = 3*(w7 + u1);
    const v8 = u4 + u5;

    //const w1 = c2*vₓₓᵧ + d2*vₓᵧᵧ;
    //const w2 = d2*vₓₓᵧ + 3*c2*vₓₓₓ;
    //const w3 = c2*vₓᵧᵧ + 3*d2*vᵧᵧᵧ;
    //const w5 = c3c3*w2;
    //const w6 = d3d3*w3;
    //const w4 = w5 + w6;
    //const w7 = 2*c3d3*w1;
    //const v8 = w7 + w4;


    //const v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    const o1 = c1*c3d3;
    const o2 = d1*c3c3;
    const o3 = c2*d2d3;
    const o4 = c1*d3d3;
    const o5 = c2*c3d2;
    const o6 = d3*c2c2;
    const o7 = c3*d1d3;
    const o8 = d2*c3d2;
    const w8 = o1 + o5;
    const w9 = o2 + o6;
    const wa = o3 + o7;
    const wb = o4 + o8;
    const wc = c1c3 + c2c2;
    const wd = d1d3 + d2d2;
    const we = 2*w8 + w9;
    const wf = 2*wa + wb;
    const wg = vₓₓᵧ*we;
    const wh = vₓᵧᵧ*wf;
    const wi = c3*wc;
    const wj = d3*wd;
    const wk = vₓₓₓ*wi;
    const wl = vᵧᵧᵧ*wj;
    const wm = wg + wh;
    const wn = 3*(wk + wl);
    const v7 = wm + wn;

    //const v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    const wo = c2d3 + c3d2;
    const zc = d2*c2c2;
    const zd = 2*c1*wo;
    const wp = zc + zd;
    const wq = 2*(c0d3 + c2d1);
    const wr = wq + c3d0;
    const ze = c3*wr;
    const ws = wp + ze;
    const zf = c2*d2d2;
    const zg = 2*d1*wo;
    const wt = zf + zg;
    const wu = 2*(c1d2 + c3d0);
    const wv = wu + c0d3;
    const zh = d3*wv;
    const ww = wt + zh;
    const wx = c2*c2c2;
    const wy = 2*c1c2 + c0c3;
    const wz = 3*(c3*wy);
    const z1 = wx + wz;
    const z2 = d2*d2d2;
    const z3 = 2*d1d2 + d0d3;
    const z4 = 3*(d3*z3);
    const z5 = z2 + z4;
    const zi = vₓₓᵧ*ws;
    const zj = vₓᵧᵧ*ww;
    const z6 = zi + zj;
    const zk = vₓₓₓ*z1;
    const zl = vᵧᵧᵧ*z5;
    const z7 = zk + zl;
    const zm = vₓₓ*c3c3;
    const zn = vᵧᵧ*d3d3;
    const z8 = zm + zn;
    const z9 = vₓᵧ*c3d3;
    const za = z6 + z7;
    const zb = z8 + z9;
    const v6 = za + zb;


    //const r4 = c2d2 + c3d1;
    //const r5 = c1d3 + c2d2;
    //const v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    const r4 = c2d2 + c3d1;
    const r5 = c1d3 + c2d2;
    const k1 = c0*wo;
    const k2 = d0*wo;
    const k3 = c1*r4;
    const k4 = d1*r5;
    const k5 = 2*c3d0 + c2d1;
    const k6 = 2*c0d3 + c1d2;
    const k7 = d3*c1c1;
    const k8 = c3*d1d1;
    const k9 = c2*k5;
    const ka = d2*k6;
    const kb = 2*(k1 + k3);
    const kc = 2*(k2 + k4);
    const kd = 2*c0*c2c3;
    const ke = 2*d0*d2d3;
    const kf = c1*wc;
    const kg = d1*wd;
    const kh = vₓₓ*c2c3;
    const ki = vᵧᵧ*d2d3;
    const kj = kb + k7;
    const kk = kc + k8;
    const kl = kj + k9;
    const km = kk + ka;
    const kn = kd + kf;
    const ko = ke + kg;
    const kp = 2*(kh + ki);
    const kq = vₓₓᵧ*kl;
    const kr = vₓᵧᵧ*km;
    const ks = vₓₓₓ*kn;
    const kt = vᵧᵧᵧ*ko;
    const ku = kq + kr;
    const kv = 3*(ks + kt);
    const kw = vₓᵧ*wo;
    const kx = ku + kv;
    const ky = kw + kp;
    const v5 = kx + ky;
    

    //const r1 = c1d3 + r4;
    //const r2 = 2*c1c3 + c2c2;
    //const r3 = 2*d1d3 + d2d2;
    //const v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    const r1 = c1d3 + r4;
    const r2 = 2*c1c3 + c2c2;
    const r3 = 2*d1d3 + d2d2;
    const s1 = 2*c0*r1;
    const s2 = 2*d0*r1;
    const s5 = c1d2 + 2*c2d1;
    const s6 = c2d1 + 2*c1d2;
    const s3 = d0*r2;
    const s4 = c0*r3;
    const s7 = c1*s5;
    const s8 = d1*s6;
    const s9 = c0*r2;
    const sa = d0*r3;
    const sb = c2*c1c1;
    const sc = d2*d1d1;
    const sd = s1 + s3;
    const se = s2 + s4;
    const sf = sd + s7;
    const sg = se + s8;
    const sh = s9 + sb;
    const si = sa + sc;
    const sj = vₓₓᵧ*sf;
    const sk = vₓᵧᵧ*sg;
    const sl = vₓₓₓ*sh;
    const sm = vᵧᵧᵧ*si;
    const sn = sl + sm;
    const so = sj + sk;
    const sp = so + 3*sn;
    const ss = vₓᵧ*r1;
    const st = vₓₓ*r2;
    const sq = ss + st;
    const su = vᵧᵧ*r3;
    const sr = sq + su;
    const v4 = sp + sr;


    //const r6 = c1d2 + c2d1;
    //const r7 = c3d0 + c0d3;
    //const r8 = c1c2 + c0c3;
    //const r9 = d1d2 + d0d3;
    //const v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
    const r6 = c1d2 + c2d1;
    const r7 = c3d0 + c0d3;
    const r8 = c1c2 + c0c3;
    const r9 = d1d2 + d0d3;
    const m1 = 2*r6 + c3d0;
    const m2 = 2*r6 + c0d3;
    const m3 = 2*c2d0 + c1d1;
    const m4 = 2*c0d2 + c1d1;
    const m5 = r8 + c1c2;
    const m6 = r9 + d1d2;
    const m7 = 3*c0*m5;
    const m8 = 3*d0*m6;
    const m9 = c1*c1c1;
    const ma = d1*d1d1;
    const mb = vₓₓ*r8;
    const mc = vᵧᵧ*r9;
    const md = m1 + r7;
    const me = m2 + r7;
    const mf = c0*md;
    const mg = d0*me;
    const mh = c1*m3;
    const mi = d1*m4;
    const mj = c3*vₓ;
    const mk = d3*vᵧ;
    const ml = mf + mh;
    const mm = mg + mi;
    const mn = m7 + m9;
    const mo = m8 + ma;
    const mp = r7 + r6;
    const mq = 2*(mb + mc);
    const mr = vₓₓᵧ*ml;
    const ms = vₓᵧᵧ*mm;
    const mt = vₓₓₓ*mn;
    const mu = vᵧᵧᵧ*mo;
    const mv = vₓᵧ *mp;
    const mw = mr + ms;
    const mx = mt + mu;
    const my = mv + mq;
    const mz = mj + mk;
    const n1 = mw + mx;
    const n2 = my + mz;
    const v3 = n1 + n2;


//    const ra = c1d1 + c2d0;
//    const rb = c1d1 + c0d2;
//    const v2 =
//        vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
//        vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
//        3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
//        3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
//        vₓᵧ*(ra + c0d2) +
//        vₓₓ*(2*c0c2 + c1c1) + 
//        vᵧᵧ*(2*d0d2 + d1d1) +
//        c2*vₓ + d2*vᵧ;
    const ra = c1d1 + c2d0;
    const rb = c1d1 + c0d2;
    const l1 = 2*ra + c0d2;
    const l2 = 2*rb + c2d0;
    const l3 = c0*l1;
    const l4 = d0*c1c1;
    const l5 = d0*l2;
    const l6 = c0*d1d1;
    const l7 = c0*c1c1;
    const l8 = c2*c0c0;
    const l9 = d0*d1d1;
    const la = d2*d0d0;
    const lb = l3 + l4;
    const lc = l5 + l6;
    const ld = l7 + l8;
    const le = l9 + la;
    const lf = vₓₓₓ*ld;
    const lg = vᵧᵧᵧ*le;
    const lh = 3*(lf + lg);
    const li = ra + c0d2;
    const lj = 2*c0c2 + c1c1;
    const lk = 2*d0d2 + d1d1;
    const ll = vₓₓᵧ*lb;
    const lm = vₓᵧᵧ*lc;
    const ln = vₓᵧ*li;
    const lo = vₓₓ*lj;
    const lp = vᵧᵧ*lk;
    const lq = c2*vₓ; 
    const lr = d2*vᵧ;
    const ls = lq + lr;
    const lt = ll + lm;
    const lu = lh + ln;
    const lv = lo + lp;
    const lw = lt + lu;
    const lx = lv + ls;
    const v2 = lw + lx;


    //const rc = c1d0 + c0d1;
    //const v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    const rc = c1d0 + c0d1;
    const rd = c0*vₓₓᵧ;
    const re = d0*vₓᵧᵧ;
    const rf = rc + c1d0;
    const rg = rc + c0d1;
    const rx = c1*c0c0;
    const rh = rx*vₓₓₓ;
    const ry = d1*d0d0;
    const ri = ry*vᵧᵧᵧ;
    const rj = vₓᵧ*rc;
    const rk = c0c1*vₓₓ;
    const rl = d0d1*vᵧᵧ;
    const rm = rk + rl;
    const rn = c1*vₓ;
    const ro = d1*vᵧ;
    const rp = rn + ro;
    const rq = rd*rf;
    const rr = re*rg;
    const rs = rq + rr;
    const rt = 3*(rh + ri);
    const ru = rj + 2*rm;
    const rv = rs + rt;
    const rw = ru + rp; 
    const v1 = rv + rw;


    // v0
    const t1 = c0*vₓₓₓ;
    const t2 = d0*vₓₓᵧ;
    const p4 = t1 + t2;
    const t3 = c0*vₓᵧᵧ;
    const t4 = d0*vᵧᵧᵧ;
    const p5 = t3 + t4;
    const p7 = p4 + vₓₓ;
    const p8 = p5 + vᵧᵧ;
    const pc = c0c0*p7;
    const pd = d0d0*p8;
    const p6 = pc + pd;
    const pe = c0d0*vₓᵧ;
    const p9 = p6 + pe;
    const pf = c0*vₓ;
    const pg = d0*vᵧ;
    const pa = pf + pg;
    const pb = p9 + pa;
    const v0 = pb + v;

    return [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez3Bez3 }
