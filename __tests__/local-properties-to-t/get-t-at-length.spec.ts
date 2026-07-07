import { describe, expect, it } from '@jest/globals';
import { getTAtLength, length } from '../../src/index.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';


describe('getTAtLength', function() {
    it('it should return an accurate `t` value for the given length for some bezier curves',
    function() {
        {
            // test zero length
            const s = 0;
            const ps = getRandomCubic(0);
            const r = getTAtLength(ps,s);
            expect(r).toEqual(0);
        }
        {
            // test length is larger than bezier's length
            const s = 1000;
            const ps = getRandomCubic(0);
            const r = getTAtLength(ps,s);
            const tUpperLimit = 1.125;
            expect(r).toEqual(tUpperLimit);
        }
        {
            const ps = getRandomCubic(0);
            const s = 0.30001;
            const t = getTAtLength(ps,s);
            const expectedT = 0.0010462085105340864;
            expect(t).toBeNearly(2**8, expectedT);

            const ps_ = randomRotateAndTranslate(0)(ps);
            const t_ = getTAtLength(ps_,s);
            expect(t_).toBeNearly(2**10,t);

            const sReal = length([0,expectedT],ps);
            expect(sReal).toBeNearly(2**10,s)
        }
        {
            const ps = getRandomQuad(0);
            const s = 0.30001;
            const t = getTAtLength(ps,s);
            const expectedT = 0.001568890925324345;
            expect(t).toBeNearly(2**8, expectedT);

            const ps_ = randomRotateAndTranslate(0)(ps);
            const t_ = getTAtLength(ps_,s);
            expect(t_).toBeNearly(2**10,t);

            const sReal = length([0,expectedT],ps);
            expect(sReal).toBeNearly(2**10,s)
        }
        {
            const ps = getRandomLine(0);
            const s = 0.30001;
            const t = getTAtLength(ps,s);
            const expectedT = 0.0031352471590330943;
            expect(t).toBeNearly(2**8, expectedT);

            const ps_ = randomRotateAndTranslate(0)(ps);
            const t_ = getTAtLength(ps_,s);
            expect(t_).toBeNearly(2**10,t);

            const sReal = length([0,expectedT],ps);
            expect(sReal).toBeNearly(2**10,s)
        }
    });
});
