import { describe, expect, it } from '@jest/globals';
import { area } from '../../src/index.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';


describe('area', function() {
    it('it should calculate the correct area for some bezier curves',
    function() {
        {
            // let ps = getRandomQuad(0);
            let ps = [[0,0],[1,1],[2,0]];
            ps = randomRotateAndTranslate(0)(ps);
            const l = [ps[ps.length-1],ps[0]];
            const al = area(l);
            const ac = area(ps);
            const a = ac + al;
            expect(a).toBeNearly(2**6, -2/3);
        }
    });
});
