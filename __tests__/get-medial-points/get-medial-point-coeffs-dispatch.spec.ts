import { describe, expect, it } from '@jest/globals';
import { getMedialPointCoeffs } from '../../src/get-medial-points/get-medial-point-coeffs.js';
import { getMedialPointCoeffsBez0 } from '../../src/get-medial-points/get-medial-point-coeffs-bez0.js';
import { getMedialPointCoeffsBez1 } from '../../src/get-medial-points/get-medial-point-coeffs-bez1.js';
import { getMedialPointCoeffsBez2 } from '../../src/get-medial-points/get-medial-point-coeffs-bez2.js';
import { getMedialPointCoeffsBez3 } from '../../src/get-medial-points/get-medial-point-coeffs-bez3.js';


describe('getMedialPointCoeffs dispatch', function() {
    it('should dispatch to the correct specialized implementation', function() {
        const p = [0.4, -0.3];
        const v = [1.1, 0.2];

        {
            const ps = [[2.2, -1.7]];
            expect(getMedialPointCoeffs(p, v, ps)).toEqual({
                A: [getMedialPointCoeffsBez0(p, v, ps[0]).a0],
                B: [getMedialPointCoeffsBez0(p, v, ps[0]).b0],
                C: [],
                D: [],
                H: []
            });
        }

        {
            const ps = [[-1, 0.5], [3.3, -2.1]];
            expect(getMedialPointCoeffs(p, v, ps)).toEqual(getMedialPointCoeffsBez1(p, v, ps));
        }

        {
            const ps = [[-1, 0.5], [3.3, -2.1], [2.4, 1.8]];
            expect(getMedialPointCoeffs(p, v, ps)).toEqual(getMedialPointCoeffsBez2(p, v, ps));
        }

        {
            const ps = [[-1, 0.5], [3.3, -2.1], [2.4, 1.8], [0.1, -0.7]];
            expect(getMedialPointCoeffs(p, v, ps)).toEqual(getMedialPointCoeffsBez3(p, v, ps));
        }
    });
});
