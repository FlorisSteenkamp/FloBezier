
import { describe, expect, it } from '@jest/globals';
import { flipAbout } from '../../../src/transformation/affine/flip-about.js';
import { flipHorizontally } from '../../../src/transformation/affine/flip-horizontally.js';
import { flipVertically } from '../../../src/transformation/affine/flip-vertically.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';


describe('flipAbout', function() {
    it('it should match flipVertically when reflecting about the x-axis',
    function() {
        const ps = getRandomBezier(128,53)(3)(1);
        expect(flipAbout(ps, [0,0], [1,0])).toBeNearly(2**2, flipVertically(ps));
    });

    it('it should match flipHorizontally when reflecting about the y-axis',
    function() {
        const ps = getRandomBezier(128,53)(3)(2);
        expect(flipAbout(ps, [0,0], [0,1])).toBeNearly(2**2, flipHorizontally(ps));
    });

    it('it should leave points on the axis (nearly) fixed',
    function() {
        // the line y = x
        const p1 = [1,1];
        const p2 = [3,3];
        const onAxis = [[2,2], [5,5], [-4,-4]];
        expect(flipAbout(onAxis, p1, p2)).toBeNearly(2**4, onAxis);
    });

    it('it should be the (near) identity when applied twice',
    function() {
        const p1 = [1,-2];
        const p2 = [4,5];
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                expect(flipAbout(flipAbout(ps, p1, p2), p1, p2)).toBeNearly(2**4, ps);
            }
        }
    });
});
