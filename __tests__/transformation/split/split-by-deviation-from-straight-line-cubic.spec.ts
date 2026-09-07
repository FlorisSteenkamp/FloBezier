import { describe, expect, it } from '@jest/globals';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { evalDeCasteljau } from '../../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { fromTo } from '../../../src/transformation/split/from-to.js';
import { getDistanceToLineFunction } from '../../../src/utils/get-distance-to-line-function.js';
import { splitByDeviationFromStraighLine_Cubic } from '../../../src/transformation/split/split-by-deviation-from-straight-line-cubic.js';

const { abs, max } = Math;


/** Actual max deviation of the cubic piece `ps` from the chord through its endpoints. */
function measureDeviation(ps: number[][]): number {
    const dF = getDistanceToLineFunction(ps[0], ps[3]);
    let d = 0;
    for (let i = 0; i <= 100; i++) {
        d = max(d, abs(dF(evalDeCasteljau(ps, i/100))));
    }
    return d;
}


describe('splitByDeviationFromStraighLine_Cubic', function() {
    it('should not split a straight-line cubic', function() {
        const ps = [[0,0],[1,1],[2,2],[3,3]];
        expect(splitByDeviationFromStraighLine_Cubic(ps, 0.01)).toEqual([0,1]);
    });

    it('should return a strictly increasing sequence from 0 to 1', function() {
        for (let seed = 0; seed < 20; seed++) {
            const ps = getRandomCubic(seed);
            const ts = splitByDeviationFromStraighLine_Cubic(ps, 1);
            expect(ts[0]).toBe(0);
            expect(ts[ts.length - 1]).toBe(1);
            for (let i = 1; i < ts.length; i++) {
                expect(ts[i]).toBeGreaterThan(ts[i - 1]);
            }
        }
    });

    it('should produce pieces that each deviate at most `maxD` from their chord', function() {
        for (const maxD of [10, 1, 0.1, 0.01]) {
            for (let seed = 0; seed < 20; seed++) {
                const ps = getRandomCubic(seed);
                const ts = splitByDeviationFromStraighLine_Cubic(ps, maxD);
                for (let i = 1; i < ts.length; i++) {
                    const piece = fromTo(ps, ts[i - 1], ts[i]);
                    expect(measureDeviation(piece)).toBeLessThanOrEqual(maxD);
                }
            }
        }
    });

    it('should be invariant under rotation and translation', function() {
        const maxD = 0.5;
        for (let seed = 0; seed < 20; seed++) {
            const ps = getRandomCubic(seed);
            const ts = splitByDeviationFromStraighLine_Cubic(ps, maxD);
            const psT = randomRotateAndTranslate(seed)(ps);
            const tsT = splitByDeviationFromStraighLine_Cubic(psT, maxD);
            expect(tsT).toEqual(ts);
        }
    });

    it('should not split into fewer pieces as `maxD` decreases', function() {
        for (let seed = 0; seed < 20; seed++) {
            const ps = getRandomCubic(seed);
            const coarse = splitByDeviationFromStraighLine_Cubic(ps, 1).length;
            const fine = splitByDeviationFromStraighLine_Cubic(ps, 0.01).length;
            expect(fine).toBeGreaterThanOrEqual(coarse);
        }
    });
});
