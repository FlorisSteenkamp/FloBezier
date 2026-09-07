
import { describe, expect, it } from '@jest/globals';
import { translate } from '../../../src/transformation/affine/translate.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';




describe('translate', function() {
    it('it should move every control point by the given vector',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                const v = [3, -2];
                const r = translate(ps, v);

                const expected = ps.map(([x,y]) => [x + v[0], y + v[1]]);
                expect(r).toBeNearly(2**2, expected);
            }
        }
    });

    it('it should be the identity when translating by the zero vector',
    function() {
        const ps = getRandomBezier(128,53)(3)(5);
        expect(translate(ps, [0,0])).toEqual(ps);
    });

    it('it should return to the original when translated back',
    function() {
        const ps = getRandomBezier(128,53)(3)(7);
        const v = [12.5, -4.25];
        expect(translate(translate(ps, v), [-v[0], -v[1]])).toBeNearly(2**2, ps);
    });
});
