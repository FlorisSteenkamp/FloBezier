import { describe, expect, it } from '@jest/globals';
import { Horner, differentiate, roots, toCasStr } from 'flo-poly';
import { distanceBetween, scale as scaleVec, translate } from 'flo-vector2d';
import { getMedialPointCoeffsBez3_SameCurve } from '../../src/get-medial-points/get-medial-point-coeffs-bez3-same-curve.js';
import { getMedialPointCoeffsBez3 } from '../../src/get-medial-points/get-medial-point-coeffs-bez3.js';
import { normal as getNormal } from '../../src/local-properties-at-t/normal/double/normal.js';
import { evalDeCasteljauDd } from '../../src/local-properties-at-t/evaluate/double-double/eval-de-casteljau-dd.js';


const { abs } = Math;
const δ = 2**-32;  // Note: this gives us a good idea of the accuracy to expect


describe('getMedialPointCoeffsBez3_SameCurve', function() {
    it('should satisfy same-curve degeneracies at the given parameter t', function() {
        const ps = [[-2.1, 1.3], [0.25, 4.2], [3.8, -0.7], [6.4, 2.1]];
        const t = 0.37;
        const normal = getNormal(ps, t);
        const p = evalDeCasteljauDd(ps, [0,t]).map(c => c[0] + c[1]);

        const pSame = getMedialPointCoeffsBez3_SameCurve(t, normal, ps);
        const pGeneral = getMedialPointCoeffsBez3(p, normal, ps);

        const { H: HH } = pGeneral;

        const { A, B, C, D, H } = pSame;
        const AFull = fullAFromReduced(A, t);
        const BFull = fullBFromReduced(B, t);
        const CFull = fullCFromReduced(C, t);
        const DFull = fullDFromReduced(D, t);

        H.length;//?
        HH.length;//?
        toCasStr(pSame.H.map(c => c*2**-12));//?

        expect(A).toBeNearly(2**8, [-264.0852,201.666438]);
        expect(B).toBeNearly(2**8, [244.8725,-559.67435,352.22293575,-31.088640515000023,70.09300475472497]);
        expect(C).toBeNearly(2**8, [396.1278,-250.5222]);
        expect(D).toBeNearly(2**8, [-734.6175,1580.391525,-1015.06513575,176.955447,-75.84440325]);
        expect(H).toBeNearly(2**12, [97000.8047055,-246566.84233293022,215809.73112276098,-71031.5448346055,-6120.494892165145]);

        const rsSame = roots(H)!;
        const rsGenral = roots(HH)!;

        const At = Horner(AFull, t);
        const Bt = Horner(BFull, t);
        const Ct = Horner(CFull, t);
        const Dt = Horner(DFull, t);
        const Ht = Horner(HH, t);

        const dBt = Horner(differentiate(BFull), t);
        const dHt = Horner(differentiate(HH), t);

        const At_ = abs(At);
        const Bt_ = abs(Bt);
        const Ct_ = abs(Ct);
        const Dt_ = abs(Dt);
        const Ht_ = abs(Ht);
        const dBt_ = abs(dBt);
        const dHt_ = abs(dHt);

        expect(At_).toBeLessThan(δ);
        expect(Bt_).toBeLessThan(δ);
        expect(Ct_).toBeLessThan(δ);
        expect(Dt_).toBeLessThan(δ);
        expect(Ht_).toBeLessThan(δ);
        expect(dBt_).toBeLessThan(δ);
        expect(dHt_).toBeLessThan(δ);

        const ss = roots(H)!.map(s => s.t);//?
        const ssGen = roots(HH)!.map(s => s.t);//?

        for (const s of ss) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const t1 = -BS/AS;
            
            const vt = translate(p, scaleVec(normal,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);//?
            const d2 = distanceBetween(vt,P);//?

            expect(d1).toBeNearly(2**6, d2);
        }

        for (const s of ssGen) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const t1 = -BS/AS;
            
            const vt = translate(p, scaleVec(normal,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);//?
            const d2 = distanceBetween(vt,P);//?

            expect(d1).toBeNearly(2**6, d2);
        }
    });
});


function fullAFromReduced(A: number[], t: number): number[] {
    const [r1, r0] = A;

    // (s - t)^2*(r1*s + r0), descending in s.
    const a3 = r1;
    const a2 = r0 - 2*t*r1;
    const a1 = -2*t*r0 + t*t*r1;
    const a0 = t*t*r0;

    return [a3, a2, a1, a0];
}


function fullBFromReduced(B: number[], t: number): number[] {
    const [r4, r3, r2, r1, r0] = B;

    // (s - t)^2*(r4*s^4 + r3*s^3 + r2*s^2 + r1*s + r0), descending in s.
    const b6 = r4;
    const b5 = r3 - 2*t*r4;
    const b4 = r2 - 2*t*r3 + t*t*r4;
    const b3 = r1 - 2*t*r2 + t*t*r3;
    const b2 = r0 - 2*t*r1 + t*t*r2;
    const b1 = -2*t*r0 + t*t*r1;
    const b0 = t*t*r0;

    return [b6, b5, b4, b3, b2, b1, b0];
}


function fullCFromReduced(C: number[], t: number): number[] {
    const [r1, r0] = C;

    // (s - t)*(r1*s + r0), descending in s.
    const c2 = r1;
    const c1 = r0 - t*r1;
    const c0 = -t*r0;

    return [c2, c1, c0];
}


function fullDFromReduced(D: number[], t: number): number[] {
    const [r4, r3, r2, r1, r0] = D;

    // (s - t)*(r4*s^4 + r3*s^3 + r2*s^2 + r1*s + r0), descending in s.
    const d5 = r4;
    const d4 = r3 - t*r4;
    const d3 = r2 - t*r3;
    const d2 = r1 - t*r2;
    const d1 = r0 - t*r1;
    const d0 = -t*r0;

    return [d5, d4, d3, d2, d1, d0];
}
