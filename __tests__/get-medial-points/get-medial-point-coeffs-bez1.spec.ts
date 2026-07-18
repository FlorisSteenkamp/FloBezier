import { describe, expect, it } from '@jest/globals';
import { Horner, roots } from 'flo-poly';
import { distanceBetween, scale as scaleVec, translate } from 'flo-vector2d';
import { getMedialPointCoeffsBez1 } from '../../src/get-medial-points/get-medial-point-coeffs-bez1.js';
import { evalDeCasteljauDd } from '../../src/local-properties-at-t/evaluate/double-double/eval-de-casteljau-dd.js';


describe('getMedialPointCoeffsBez1', function() {
    it('should compute order-1 coefficient polynomials correctly', function() {
        const p = [0.25, -0.8];
        const v = [1.2, -0.35];
        const ps = [[-1.1, 2.3], [3.7, -0.9]];

        const coeffs = getMedialPointCoeffsBez1(p, v, ps);
        const { A, B, C, D, H } = coeffs;

        const ss = roots(H, 0, 1)!.map(s => s.t);

        for (const s of ss) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const CS = Horner(C, s);
            const DS = Horner(D, s);

            const t1 = -BS/AS;
            const t2 = -DS/CS;

            expect(t1).toBeNearly(8, t2);
            
            const vt = translate(p, scaleVec(v,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);
            const d2 = distanceBetween(vt,P);

            expect(d1).toBeNearly(8, d2);
        }
    });
});
