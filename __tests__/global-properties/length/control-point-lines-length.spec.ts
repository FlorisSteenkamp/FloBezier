import { describe, expect, it } from '@jest/globals';
import { distanceBetween } from 'flo-vector2d';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { length, totalLength, controlPointLinesLength } from '../../../src/index.js';

const { sqrt } = Math;


describe('controlPointLinesLength', function() {
    it('it should return the sum of the approximate length between control points for some bezier curves', 
    function() {
        {
            const ps = [[1,2]];
            const r = controlPointLinesLength(ps);
            expect(r).toEqual(0);
        }

        {
            const ps = [[1,1],[1,1]];
            const r = controlPointLinesLength(ps);
            expect(r).toEqual(0);
        }

        {
            const ps = [[1,1],[2,2],[3,3],[10,3]];
            const r = controlPointLinesLength(ps);
            expect(r).toBeNearly(2**1, 2*sqrt(2) + 7);
        }
    });

    it('it should get a reasonable upper bound for the length squared of some cubic bezier curves', 
    function() {
        const getRandomBezier_ = getRandomBezier(128,53);
        for (let order=0; order<=3; order++) {
            for (let i=0; i<10; i++) {
                const ps = getRandomBezier_(order as 0|1|2|3)(i);
                const lUpperBound = controlPointLinesLength(ps);
                const l = totalLength(ps);

                if (order === 0) {
                    expect(lUpperBound).toEqual(0);
                }

                expect(lUpperBound).toBeGreaterThanOrEqual(l);
                expect(lUpperBound/4).toBeLessThanOrEqual(l);
            }
        }
    });
});
