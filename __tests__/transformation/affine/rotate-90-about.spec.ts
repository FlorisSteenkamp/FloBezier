
import { describe, expect, it } from '@jest/globals';
import { rotate90About } from '../../../src/transformation/affine/rotate-90-about.js';
import { rotateNeg90About } from '../../../src/transformation/affine/rotate-neg-90-about.js';
import { rotateAbout } from '../../../src/transformation/affine/rotate-about.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const { PI: π } = Math;


describe('rotate90About', function() {
    it('it should nearly equal a rotation by π/2 about the center',
    function() {
        const center = [12, -7];
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                // eps-mode (absolute) tolerance: rotateAbout uses cos(π/2) ~ 6e-17 (not 0)
                expect(rotate90About(ps, center)).toBeNearly([2**9], rotateAbout(ps, π/2, center));
            }
        }
    });

    it('it should leave a control point that coincides with the center fixed (exactly)',
    function() {
        const center = [5, 9];
        const ps = [center, [1,2], [3,4], [7,8]];
        expect(rotate90About(ps, center)[0]).toEqual(center);
    });

    it('it should be the exact identity after four applications',
    function() {
        const center = [12, -7];
        const ps = [[2,3], [4,5], [6,7], [8,9]];
        const r = rotate90About(rotate90About(rotate90About(rotate90About(ps, center), center), center), center);
        expect(r).toEqual(ps);
    });

    it('it should be the exact inverse of rotateNeg90About',
    function() {
        const center = [12, -7];
        const ps = [[2,3], [4,5], [6,7], [8,9]];
        expect(rotateNeg90About(rotate90About(ps, center), center)).toEqual(ps);
        expect(rotate90About(rotateNeg90About(ps, center), center)).toEqual(ps);
    });
});
