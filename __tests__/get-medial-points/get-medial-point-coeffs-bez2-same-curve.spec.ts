import { describe, expect, it } from '@jest/globals';
import { distanceBetween, scale as scaleVec, translate } from 'flo-vector2d';
import { Horner, RootInterval, differentiate, roots, toCasStr } from 'flo-poly';
import { getMedialPointCoeffsBez2_SameCurve } from '../../src/get-medial-points/get-medial-point-coeffs-bez2-same-curve.js';
import { normal as getNormal } from '../../src/local-properties-at-t/normal/double/normal.js';
import { getMedialPointCoeffsBez2 } from '../../src/get-medial-points/get-medial-point-coeffs-bez2.js';
import { evalDeCasteljauDd } from '../../src/local-properties-at-t/evaluate/double-double/eval-de-casteljau-dd.js';

const { abs } = Math;

const δ = 2**-38;


describe('getMedialPointCoeffsBez2_SameCurve', function() {
    it('should satisfy same-curve degeneracies at the given parameter t', function() {
        const ps = [[-2.1, 1.3], [0.25, 4.2], [3.8, -0.7]];
        const t = 0.37;
        const normal = getNormal(ps, t);
        const p = evalDeCasteljauDd(ps, [0,t]).map(c => c[0] + c[1]);

        const pSame = getMedialPointCoeffsBez2_SameCurve(t, normal, ps);
        const { H: HH } = getMedialPointCoeffsBez2(p, normal, ps);

        const { A, B, H } = pSame;
        const AFull = fullAFromReduced(A, t);
        const BFull = fullBFromReduced(B, t);

        const At = Horner(AFull, t);
        const Bt = Horner(BFull, t);
        const Ht = Horner(HH, t);

        expect(A).toBeNearly(8, [87.24]);
        expect(B).toBeNearly(8, [62.28, -33.1128, 34.952132]);
        expect(H).toBeNearly(8, [-5433.3072, 1444.380336]);

        const dBt = Horner(differentiate(BFull), t);
        const dHt = Horner(differentiate(HH), t);

        const At_ = abs(At);
        const Bt_ = abs(Bt);
        const Ht_ = abs(Ht);
        const dBt_ = abs(dBt);
        const dHt_ = abs(dHt);

        expect(At_).toBeLessThan(δ);
        expect(Bt_).toBeLessThan(δ);
        expect(Ht_).toBeLessThan(δ);
        expect(dBt_).toBeLessThan(δ);
        expect(dHt_).toBeLessThan(δ);


        const ss = roots(H)!.map(s => s.t);
        const ssGen = roots(HH)!.map(s => s.t);

        for (const s of ss) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const t1 = -BS/AS;
            
            const vt = translate(p, scaleVec(normal,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);
            const d2 = distanceBetween(vt,P);

            expect(d1).toBeNearly(8, d2);
        }

        for (const s of ssGen) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const t1 = -BS/AS;
            
            const vt = translate(p, scaleVec(normal,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);
            const d2 = distanceBetween(vt,P);

            expect(d1).toBeNearly(8, d2);
        }
    });
});



function fullAFromReduced(A: number[], t: number): number[] {
    const [r0] = A;

    // (s - t)^2*r0, descending in s.
    const a2 = r0;
    const a1 = -2*t*r0;
    const a0 = t*t*r0;

    return [a2, a1, a0];
}


function fullBFromReduced(B: number[], t: number): number[] {
    const [r2, r1, r0] = B;

    // (s - t)^2*(r2*s^2 + r1*s + r0), descending in s.
    const b4 = r2;
    const b3 = r1 - 2*t*r2;
    const b2 = r0 - 2*t*r1 + t*t*r2;
    const b1 = -2*t*r0 + t*t*r1;
    const b0 = t*t*r0;

    return [b4, b3, b2, b1, b0];
}


// FUTURE - create in flo-poly
/**
 * * Set `multiplicity` to zero if number of roots doesn't matter.
 * 
 * @param t 
 * @param multiplicity 
 * @param roots 
 */
function isThereRootAt(
        t: number,
        multiplicity: number,
        roots: RootInterval[]) {

    for (let r of roots) {
        if (
            r.tS <= t && 
            r.tE >= t && 
            r.tE - r.tS <= 4 * Number.EPSILON &&
            (multiplicity === 0 || r.multiplicity%2 === multiplicity%2)) {

            return true;
        }
    }

    return false;
}

