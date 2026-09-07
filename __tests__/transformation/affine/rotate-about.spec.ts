
import { describe, expect, it } from '@jest/globals';
import { rotateAbout } from '../../../src/transformation/affine/rotate-about.js';
import { rotate } from '../../../src/transformation/affine/rotate.js';
import { translate } from '../../../src/transformation/affine/translate.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const { PI: π } = Math;


describe('rotateAbout', function() {
    it('it should equal translate-to-origin, rotate, then translate-back',
    function() {
        for (let i=0; i<10; i++) {
            for (let order=1; order<=3; order++) {
                const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
                const center = [12, -7];
                const θ = 1.1;

                const r = rotateAbout(ps, θ, center);
                const viaCompose = translate(
                    rotate(translate(ps, [-center[0], -center[1]]), θ),
                    center
                );

                expect(r).toBeNearly(2**4, viaCompose);
            }
        }
    });

    it('it should leave a control point that coincides with the center fixed',
    function() {
        const center = [5, 9];
        const ps = [center, [1,2], [3,4], [7,8]];
        const r = rotateAbout(ps, 0.9, center);
        expect(r[0]).toBeNearly(2**4, center);
    });

    it('it should be (nearly) the identity after a full turn',
    function() {
        const ps = getRandomBezier(128,53)(3)(4);
        expect(rotateAbout(ps, 2*π, [3,3])).toBeNearly(2**8, ps);
    });
});
