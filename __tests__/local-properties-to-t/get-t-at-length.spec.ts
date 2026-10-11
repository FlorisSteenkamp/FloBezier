import { describe, expect, it } from '@jest/globals';
import { getTAtLength } from '../../src/local-properties-to-t/get-t-at-length.js';
import { length } from '../../src/global-properties/length/length.js';
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

    it('it should handle order 0 curves and out-of-range lengths',
    function() {
        {
            // a point - previously a meaningless value was returned
            expect(getTAtLength([[1,2]], 0)).toEqual(0);
            expect(getTAtLength([[1,2]], 1)).toEqual(0);
        }
        {
            // negative length - clipped to `t === 0`
            const ps = getRandomCubic(0);
            expect(getTAtLength(ps, -1)).toEqual(0);
        }
        {
            // length larger than the curve length up to `t === 1.125` - 
            // clipped to `t === 1.125`
            const ps = getRandomCubic(0);
            const s = length([0,1.125], ps)*(1 + 2**-30);
            expect(getTAtLength(ps, s)).toEqual(1.125);
        }
        {
            // the full length should give `t === 1`
            const ps = getRandomCubic(0);
            const s = length([0,1], ps);
            expect(getTAtLength(ps, s)).toBeNearly(2**10, 1);
        }
    });
});
