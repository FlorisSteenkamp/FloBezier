
import { describe, expect, it } from '@jest/globals';

import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { splitByLength } from '../../../src/index.js';



describe('splitByLength', function() {
    it('it should ',
    function() {
        const maxLength = 100;

        {
            const ps = getRandomCubic(0);
            const r = splitByLength(ps, maxLength);
            expect(r.length).toEqual(6);
            expect(r).toEqual([0,0.25,0.5,0.75,0.875,1]);

            const ps_ = randomRotateAndTranslate(0)(ps);
            const r_ = splitByLength(ps_, maxLength);
            expect(r_).toEqual(r);
        }
        {
            const ps = getRandomQuad(5);
            const r = splitByLength(ps, maxLength);
            expect(r).toEqual([0, 0.25, 0.5, 0.75, 1]);
        }
        {
            const ps = getRandomLine(5);
            const r = splitByLength(ps, maxLength);
            expect(r).toEqual([0, 0.5, 1]);
        }
        {
            const ps = getRandomPoint(5);
            const r = splitByLength(ps, maxLength);
            expect(r).toEqual([0,1]);
        }
    });
});
