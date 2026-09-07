
import { describe, expect, it } from '@jest/globals';
import { flipHorizontally } from '../../../src/transformation/affine/flip-horizontally.js';
import { transform } from '../../../src/transformation/affine/transform.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';


describe('flipHorizontally', function() {
    it('it should match the reflection matrix about the y-axis',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                expect(flipHorizontally(ps)).toBeNearly(2**2, transform(ps, [[-1,0,0], [0,1,0]]));
            }
        }
    });

    it('it should map [x,y] to [-x,y]',
    function() {
        expect(flipHorizontally([[2,3], [-5,7]])).toEqual([[-2,3], [5,7]]);
    });

    it('it should be the identity when applied twice',
    function() {
        const ps = [[2,3], [4,5], [6,7], [8,9]];
        expect(flipHorizontally(flipHorizontally(ps))).toEqual(ps);
    });
});
