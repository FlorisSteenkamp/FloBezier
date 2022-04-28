import { getImplicitForm3 } from "../../../../src/index.js";
import { toPowerBasis2 } from "../../../../src/to-power-basis/to-power-basis/double/to-power-basis.js";


/**
 * Returns a polynomial in 1 variable (including coefficientwise error bound)
 * whose roots are the parameter values of the intersection points of an order 
 * 3 and 2 bezier curve (i.e. a cubic bezier curve and a quadratic bezier curve).
 * 
 * The returned polynomial degree will be 6
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
function getCoeffsBez3Bez2(
        ps1: number[][], 
        ps2: number[][]) {

    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v }
        = getImplicitForm3(ps1);

    const [[c2,c1,c0],[d2,d1,d0]] = toPowerBasis2(ps2);

    const c0c0 = c0*c0;
    const c0c1 = c0*c1;
    const c0c2 = c0*c2;
    const c0d0 = c0*d0;
    const c0d1 = c0*d1;
    const c0d2 = c0*d2;
    const c1c1 = c1*c1;
    const c1c2 = c1*c2;
    const c1d0 = c1*d0;
    const c1d1 = c1*d1;
    const c1d2 = c1*d2;
    const c2c2 = c2*c2;
    const c2d0 = c2*d0;
    const c2d1 = c2*d1;
    const c2d2 = c2*d2;
    const d0d0 = d0*d0;
    const d0d1 = d0*d1;
    const d0d2 = d0*d2;
    const d1d1 = d1*d1;
    const d1d2 = d1*d2;
    const d2d2 = d2*d2;

   

    //const v6 =
    //    c2c2*(c2*vₓₓₓ + d2*vₓₓᵧ) +
    //    d2d2*(c2*vₓᵧᵧ + d2*vᵧᵧᵧ);
    const e1 = c2*vₓₓₓ;
    const e2 = c2*vₓᵧᵧ;
    const e3 = d2*vₓₓᵧ;
    const e4 = d2*vᵧᵧᵧ;
    const e5 = e1 + e3;
    const e6 = e2 + e4;
    const e7 = c2c2*e5;
    const e8 = d2d2*e6;
    const v6 = e7 + e8;


    const z1 = c0c2 + c1c1;
    const z2 = d0d2 + d1d1;
    const z3 = 2*c0c2 + c1c1;
    const z4 = 2*d0d2 + d1d1;
    const z5 = 2*c1d1 + c2d0;
    const z6 = 2*c1d1 + c0d2;
    const z7 = 2*c2d0 + c1d1;
    const z8 = 6*c0c2 + c1c1;
    const z9 = 6*d0d2 + d1d1;
    const za = c1d2 + c2d1;
    const zb = c0d2 + c2d0;
    const zc = 2*c1d0 + c0d1;
    const zd = 2*c0d1 + c1d0;
    const zf = c0d2 + c1d1;
    const ze = zf + c2d0;


    //const v5 =
    //    c1*(3*c2c2*vₓₓₓ + 2*c2d2*vₓₓᵧ +   d2d2*vₓᵧᵧ) +
    //    d1*(  c2c2*vₓₓᵧ + 2*c2d2*vₓᵧᵧ + 3*d2d2*vᵧᵧᵧ);
    const s0 = 3*c2c2;
    const t1 = 3*d2d2;
    const s1 = s0*vₓₓₓ;
    const s2 = c2c2*vₓₓᵧ;
    const s3 = 2*c2d2*vₓₓᵧ;
    const s4 = 2*c2d2*vₓᵧᵧ;
    const s5 = d2d2*vₓᵧᵧ;
    const s6 = t1*vᵧᵧᵧ;
    const s7 = s1 + s3;
    const s8 = s2 + s4;
    const s9 = s7 + s5;
    const sa = s8 + s6;
    const sb = c1*s9;
    const sc = d1*sa;
    const v5 = sb + sc;


    //const v4 =
    //    3*c2*(c0c2 + c1c1)*vₓₓₓ + 
    //    3*d2*(d0d2 + d1d1)*vᵧᵧᵧ + 
    //    (d2*(2*c0c2 + c1c1) + c2*(2*c1d1 + c2d0))*vₓₓᵧ +
    //    (d2*(2*c1d1 + c0d2) + c2*(2*d0d2 + d1d1))*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    //const v4 =
    //    (3*c2)*z1*vₓₓₓ + 
    //    (3*d2)*z2*vᵧᵧᵧ + 
    //    (d2*z3 + c2*z5)*vₓₓᵧ +
    //    (d2*z6 + c2*z4)*vₓᵧᵧ +
    //    vₓₓ*c2c2 +
    //    vᵧᵧ*d2d2 +
    //    vₓᵧ*c2d2;
    const sd = d2*z3;
    const se = d2*z6;
    const sf = c2*z5;
    const sg = c2*z4;
    const sh = (3*c2)*z1;
    const si = (3*d2)*z2;
    const sj = sd + sf;
    const sk = se + sg;
    const sl = sh*vₓₓₓ;
    const sm = si*vᵧᵧᵧ;
    const sn = sj*vₓₓᵧ;
    const so = sk*vₓᵧᵧ;
    const sp = sl + sm;
    const sq = sn + so;
    const sr = c2c2*vₓₓ;
    const ss = d2d2*vᵧᵧ;
    const st = c2d2*vₓᵧ;
    const su = sr + ss;
    const sv = sp + sq;
    const sw = su + st;
    const v4 = sv + sw;


    //const v3 =
    //    c1*(6*c0c2 + c1c1)*vₓₓₓ +
    //    d1*(6*d0d2 + d1d1)*vᵧᵧᵧ +        
    //    (2*c0*(c1d2 + c2d1) + c1*(c1d1 + 2*c2d0))*vₓₓᵧ +
    //    (2*d1*(c0d2 + c2d0) + c1*(d1d1 + 2*d0d2))*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    c1d2*vₓᵧ + c2d1*vₓᵧ;
    //const v3 =
    //    c1*z8*vₓₓₓ +
    //    d1*z9*vᵧᵧᵧ +        
    //    (2*c0*za + c1*z7)*vₓₓᵧ +
    //    (2*d1*zb + c1*z4)*vₓᵧᵧ +
    //    2*(d1d2*vᵧᵧ + c1c2*vₓₓ) +
    //    za*vₓᵧ;
    const sx = c1*z8;
    const sy = d1*z9;
    const sz = 2*c0*za;
    const o1 = 2*d1*zb;
    const o2 = c1*z7;
    const o3 = c1*z4;
    const o4 = sz + o2;
    const o5 = o1 + o3;
    const o6 = d1d2*vᵧᵧ;
    const o7 = c1c2*vₓₓ;
    const o8 = za*vₓᵧ;
    const o9 = o6 + o7;
    const oa = sx*vₓₓₓ;
    const ob = o4*vₓₓᵧ;
    const oc = sy*vᵧᵧᵧ;
    const od = o5*vₓᵧᵧ;
    const oe = oa + oc;
    const og = ob + od;
    const oh = oe + og;
    const oi = 2*o9 + o8;
    const v3 = oh + oi;


    //const v2 =
    //    (3*c0*(c0c2 + c1c1))*vₓₓₓ +
    //    (3*d0*(d0d2 + d1d1))*vᵧᵧᵧ +
    //    (c0*(2*c1d1 + c0d2) + d0*(2*c0c2 + c1c1))*vₓₓᵧ +
    //    (c0*(2*d0d2 + d1d1) + d0*(2*c1d1 + c2d0))*vₓᵧᵧ +
    //    (2*c0c2 + c1c1)*vₓₓ +
    //    (2*d0d2 + d1d1)*vᵧᵧ +
    //    (c0d2 + c1d1 + c2d0)*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    //const v2 =
    //    (3*c0*z1)*vₓₓₓ +
    //    (3*d0*z2)*vᵧᵧᵧ +
    //    (c0*z6 + d0*z3)*vₓₓᵧ +
    //    (c0*z4 + d0*z5)*vₓᵧᵧ +
    //    z3*vₓₓ +
    //    z4*vᵧᵧ +
    //    ze*vₓᵧ +
    //    c2*vₓ    +
    //    d2*vᵧ;
    const oj = (3*c0)*z1;
    const ok = (3*d0)*z2;
    const ol = c0*z6;
    const om = c0*z4;
    const on = d0*z3;
    const oo = d0*z5;
    const op = ol + on;
    const oq = om + oo;
    const or = oj*vₓₓₓ;
    const os = ok*vᵧᵧᵧ;
    const ot = op*vₓₓᵧ;
    const ou = oq*vₓᵧᵧ;
    const ov = z3*vₓₓ;
    const ow = z4*vᵧᵧ;
    const ox = ze*vₓᵧ;
    const oy = c2*vₓ;
    const oz = d2*vᵧ;
    const p1 = or + os;
    const p2 = ot + ou;
    const p3 = ov + ow;
    const p4 = p1 + p2;
    const p5 = p3 + ox;
    const p6 = oy + oz;
    const p7 = p4 + p5;
    const v2 = p7 + p6;


    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*(c0d1 + 2*c1d0)*vₓₓᵧ +
    //    d0*(c1d0 + 2*c0d1)*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    //const v1 =
    //    3*((c0*c0c1)*vₓₓₓ + (d0*d0d1)*vᵧᵧᵧ) +
    //    c0*zc*vₓₓᵧ +
    //    d0*zd*vₓᵧᵧ +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c0d1*vₓᵧ + c1d0*vₓᵧ +
    //    c1*vₓ + d1*vᵧ;
    const p8 = (3*c0)*c0c1;
    const p9 = (3*d0)*d0d1;
    const pa = c0*zc;
    const pb = d0*zd;
    const pc = c0c1*vₓₓ;
    const pd = d0d1*vᵧᵧ;
    const pe = c0d1*vₓᵧ;
    const pf = c1d0*vₓᵧ;
    const pg = 2*(pc + pd);
    const ph = pe + pf;
    const pi = c1*vₓ;
    const pj = d1*vᵧ;
    const pk = p8*vₓₓₓ;
    const pl = p9*vᵧᵧᵧ;
    const pm = pa*vₓₓᵧ;
    const pn = pb*vₓᵧᵧ;
    const po = pk + pl;
    const pp = pm + pn;
    const pq = po + pp;
    const pr = pg + ph;
    const ps = pi + pj;
    const pt = pq + pr;
    const v1 = pt + ps;


    //const v0 =
    //    c0c0*(c0*vₓₓₓ + d0*vₓₓᵧ + vₓₓ) +
    //    d0d0*(c0*vₓᵧᵧ + d0*vᵧᵧᵧ + vᵧᵧ) +
    //    c0d0*vₓᵧ +
    //    c0*vₓ +
    //    d0*vᵧ +
    //    v;
    const pu = c0*vₓₓₓ;
    const pv = c0*vₓᵧᵧ;
    const pw = d0*vₓₓᵧ;
    const px = d0*vᵧᵧᵧ;
    const py = pu + pw;
    const pz = pv + px;
    const u1 = py + vₓₓ;
    const u2 = pz + vᵧᵧ;
    const u3 = c0c0*u1;
    const u4 = d0d0*u2;
    const u5 = c0d0*vₓᵧ;
    const u6 = c0*vₓ;
    const u7 = d0*vᵧ;
    const u8 = u3 + u4;
    const u9 = u8 + u5;
    const ua = u6 + u7;
    const ub = u9 + ua;
    const v0 = ub + v;


    return [v6, v5, v4, v3, v2, v1, v0];
}


export { getCoeffsBez3Bez2 }
