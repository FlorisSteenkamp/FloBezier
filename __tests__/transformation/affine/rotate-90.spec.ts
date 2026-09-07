
import { describe, expect, it } from '@jest/globals';
import { rotate90 } from '../../../src/transformation/affine/rotate-90.js';
import { rotateNeg90 } from '../../../src/transformation/affine/rotate-neg-90.js';
import { rotate } from '../../../src/transformation/affine/rotate.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const { PI: π } = Math;


describe('rotate90', function() {
    it('it should nearly equal a rotation by π/2',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                // eps-mode (absolute) tolerance: rotate uses cos(π/2) ~ 6e-17 (not 0)
                expect(rotate90(ps)).toBeNearly([2**9], rotate(ps, π/2));
            }
        }
    });

    it('it should map [x,y] to [-y,x] exactly',
    function() {
        expect(rotate90([[2,3], [-5,7]])).toEqual([[-3,2], [-7,-5]]);
    });

    it('it should be the exact identity after four applications',
    function() {
        const ps = [[2,3], [4,5], [6,7], [8,9]];
        expect(rotate90(rotate90(rotate90(rotate90(ps))))).toEqual(ps);
    });

    it('it should be the exact inverse of rotateNeg90',
    function() {
        const ps = [[2,3], [4,5], [6,7], [8,9]];
        expect(rotateNeg90(rotate90(ps))).toEqual(ps);
        expect(rotate90(rotateNeg90(ps))).toEqual(ps);
    });
});
