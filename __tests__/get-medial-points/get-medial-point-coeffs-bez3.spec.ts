import { describe, expect, it } from '@jest/globals';
import { getMedialPointCoeffsBez3 } from '../../src/get-medial-points/get-medial-point-coeffs-bez3.js';
import { Horner, roots } from 'flo-poly';
import { distanceBetween, scale as scaleVec, translate } from 'flo-vector2d';
import { evalDeCasteljauDd } from '../../src/local-properties-at-t/evaluate/double-double/eval-de-casteljau-dd.js';


describe('getMedialPointCoeffsBez3', function() {
    it('should compute order-3 coefficient polynomials correctly', function() {
        const p = [1.2, -0.45];
        const v = [0.35, 1.4];
        const ps = [[-1.5, 2.2], [0.3, -3.1], [4.4, 1.8], [2.7, -0.6]];

        const coeffs = getMedialPointCoeffsBez3(p, v, ps);

        const { A, B, C, D, H } = coeffs;

        const ss = roots(H, 0, 1)!.map(s => s.t);

        for (const s of ss) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const CS = Horner(C, s);
            const DS = Horner(D, s);

            const t1 = -BS/AS;
            const t2 = -DS/CS;

            expect(t1).toBeNearly(2**20, t2);
            
            const vt = translate(p, scaleVec(v,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);//?
            const d2 = distanceBetween(vt,P);//?

            expect(d1).toBeNearly(2**14, d2);
        }
    });
});
