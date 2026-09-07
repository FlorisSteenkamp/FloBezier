
import { describe, expect, it } from '@jest/globals';
import { rotate } from '../../../src/transformation/affine/rotate.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const { sqrt, PI: π } = Math;

function dist(p: number[]): number { return sqrt(p[0]*p[0] + p[1]*p[1]); }


describe('rotate', function() {
    it('it should preserve each control point\'s distance from the origin',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                const r = rotate(ps, 0.7);

                for (let j=0; j<ps.length; j++) {
                    expect(dist(r[j])).toBeNearly(2**4, dist(ps[j]));
                }
            }
        }
    });

    it('it should rotate the x-axis unit vector by a quarter turn to the y-axis',
    function() {
        // eps-mode (absolute) tolerance: cos(π/2) is ~6e-17, not exactly 0
        expect(rotate([[1,0]], π/2)).toBeNearly([4], [[0,1]]);
    });

    it('it should be (nearly) the identity after a full turn',
    function() {
        const ps = getRandomBezier(128,53)(3)(3);
        expect(rotate(ps, 2*π)).toBeNearly(2**8, ps);
    });
});
