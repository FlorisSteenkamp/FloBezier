
import { describe, expect, it } from '@jest/globals';

import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { toExpansion } from '../../src/transformation/to-expansion.js';




describe('toExpansion', function() {
    it('it should convert some given bezier curves so their control point coordinates are Shewchuk expansions',
    function() {
        {
            let ps = getRandomCubic(0);
            ps = randomRotateAndTranslate(0)(ps);
            const r = toExpansion(ps);
            expect(r).toEqual(ps.map(p => p.map(c => [c])));
        }
    });
});
