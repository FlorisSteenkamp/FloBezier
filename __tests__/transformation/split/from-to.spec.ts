

import { describe, expect, it } from '@jest/globals';

import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { fromTo } from '../../../src/index.js';




describe('fromTo', function() {
    it('it should return new bezier curves by limiting the `t` domain of some bezier curves',
    function() {
        {
            const tS = 0.31;
            const tE = 0.77;
            const ps = getRandomCubic(0);
            const r = fromTo(ps, tS, tE);
            expect(r).toBeNearly(2**8, [
                [-41.580783363752346, -0.303584098690596],
                [-15.584747924965303, 5.415004899912785],
                [5.406526260110335, 4.2325074370596525],
                [46.02848207252704, -30.827453711986024]
            ]);

            const r0 = fromTo(ps, 0, tE);
            const ra0 = fromTo(ps, 2**-50, tE);
            expect(r0).toBeNearly(2**8,ra0);

            const r1 = fromTo(ps, tS, 1);
            const ra1 = fromTo(ps, tS, 1 - 2**-50);
            expect(r1).toBeNearly(2**8,ra1);

            const r01 = fromTo(ps, 0, 1);
            const ra01 = fromTo(ps, 2**-50, 1 - 2**-50);
            expect(r01).toBeNearly(2**8,ra01);
        }
        {
            const tS = 0.31;
            const tE = 0.77;
            const ps = getRandomQuad(0);
            // ps = randomRotateAndTranslate(0)(ps);
            const r = fromTo(ps, tS, tE);
            expect(r).toBeNearly(2**8, [ 
                [-59.09985072467404, -4.157415815140692],
                [-29.73104139751626, 6.211905364009461],
                [-21.96913961347485, 27.859872559242596]
            ]);

            const r0 = fromTo(ps, 0, tE);
            const ra0 = fromTo(ps, 2**-50, tE);
            expect(r0).toBeNearly(2**8,ra0);

            const r1 = fromTo(ps, tS, 1);
            const ra1 = fromTo(ps, tS, 1 - 2**-50);
            expect(r1).toBeNearly(2**8,ra1);

            const r01 = fromTo(ps, 0, 1);
            const ra01 = fromTo(ps, 2**-50, 1 - 2**-50);
            expect(r01).toBeNearly(2**8,ra01);
        }
        {
            const tS = 0.31;
            const tE = 0.77;
            const ps = getRandomLine(0);
            const r = fromTo(ps, tS, tE);
            expect(r).toBeNearly(2**8, [
                [-78.89187440167167,-11.14543660978536],
                [-34.96188825197896,-8.376942093647655] 
            ]);

            const r0 = fromTo(ps, 0, tE);
            const ra0 = fromTo(ps, 2**-50, tE);
            expect(r0).toBeNearly(2**8,ra0);

            const r1 = fromTo(ps, tS, 1);
            const ra1 = fromTo(ps, tS, 1 - 2**-50);
            expect(r1).toBeNearly(2**8,ra1);

            const r01 = fromTo(ps, 0, 1);
            const ra01 = fromTo(ps, 2**-50, 1 - 2**-50);
            expect(r01).toBeNearly(2**8,ra01);
        }
        {
            const tS = 0.31;
            const tE = 0.77;
            const ps = getRandomPoint(0);
            const r = fromTo(ps, tS, tE);
            expect(r).toEqual(ps);
        }

        // some edge cases
        {
            const p = [1,1];
            const ps = [p,p,p,p,p];
            expect(() => fromTo(ps,1,2)).toThrow();
        }
    });
});
