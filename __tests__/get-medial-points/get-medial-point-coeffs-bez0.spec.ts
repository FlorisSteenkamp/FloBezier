import { describe, expect, it } from '@jest/globals';
import { getMedialPointCoeffsBez0 } from '../../src/get-medial-points/get-medial-point-coeffs-bez0.js';
import { distanceBetween, scale as scaleVec, translate } from 'flo-vector2d';


describe('getMedialPointCoeffsBez0', function() {
    it('should compute order-0 coefficients correctly', function() {
        const p = [2.5, -1.25];
        const v = [1.75, 0.6];
        const P = [-0.4, 3.2];

        const { a0, b0 } = getMedialPointCoeffsBez0(p, v, P);

        const t = -b0/a0;
        const vt = translate(p, scaleVec(v,t));

        const d1 = distanceBetween(p,vt);
        const d2 = distanceBetween(vt,P);

        expect(d1).toBeNearly(8, 10.850961538461538);
        expect(d1).toBeNearly(8, d2);
    });
});
