import { describe, expect, it } from '@jest/globals';
import { Horner, roots } from 'flo-poly';
import { distanceBetween, scale as scaleVec, translate } from 'flo-vector2d';
import { getMedialPointCoeffsBez2 } from '../../src/get-medial-points/get-medial-point-coeffs-bez2.js';
import { evalDeCasteljauDd } from '../../src/local-properties-at-t/evaluate/double-double/eval-de-casteljau-dd.js';


describe('getMedialPointCoeffsBez2', function() {
    it('should compute order-2 coefficient polynomials correctly', function() {
        const p = [0.75, 1.1];
        const v = [-0.65, 1.3];
        const ps = [[-2, 1.2], [0.4, 3.9], [4.1, -1.3]];

        const coeffs = getMedialPointCoeffsBez2(p, v, ps);

        const { A, B, C, D, H } = coeffs;

        const ss = roots(H, 0, 1)!.map(s => s.t);
        expect(ss).toBeNearly(2**8, [ 0.49886841224674106, 0.7377523400627479 ]);

        for (const s of ss) {
            const AS = Horner(A, s);
            const BS = Horner(B, s);
            const CS = Horner(C, s);
            const DS = Horner(D, s);

            const t1 = -BS/AS;
            const t2 = -DS/CS;

            expect(t1).toBeNearly(2**6, t2);
            
            const vt = translate(p, scaleVec(v,t1));
            const P = evalDeCasteljauDd(ps, [0,s]).map(c => c[0] + c[1]);

            const d1 = distanceBetween(p,vt);//?
            const d2 = distanceBetween(vt,P);//?

            expect(d1).toBeNearly(2**6, d2);
        }
    });
});
