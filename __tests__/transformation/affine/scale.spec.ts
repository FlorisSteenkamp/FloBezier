
import { describe, expect, it } from '@jest/globals';
import { scale } from '../../../src/transformation/affine/scale.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';




describe('scale', function() {
    it('it should scale every control point about the origin by the given factor',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                const c = 2.5;
                const r = scale(ps, c);

                const expected = ps.map(([x,y]) => [x*c, y*c]);
                expect(r).toBeNearly(2**2, expected);
            }
        }
    });

    it('it should be the identity when scaling by 1',
    function() {
        const ps = getRandomBezier(128,53)(3)(5);
        expect(scale(ps, 1)).toEqual(ps);
    });

    it('it should return to the original when scaled by the reciprocal',
    function() {
        const ps = getRandomBezier(128,53)(3)(7);
        const c = 8;  // a power of 2 => exact
        expect(scale(scale(ps, c), 1/c)).toBeNearly(2**2, ps);
    });
});
