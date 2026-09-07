
import { describe, expect, it } from '@jest/globals';
import { transform } from '../../../src/transformation/affine/transform.js';
import { translate } from '../../../src/transformation/affine/translate.js';
import { rotate } from '../../../src/transformation/affine/rotate.js';
import { scale } from '../../../src/transformation/affine/scale.js';

import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const { sin, cos } = Math;


describe('transform', function() {
    it('it should be the identity for the identity matrix',
    function() {
        const ps = getRandomBezier(128,53)(3)(5);
        expect(transform(ps, [[1,0,0], [0,1,0]])).toBeNearly(2**2, ps);
    });

    it('it should match `translate` for a pure translation matrix',
    function() {
        const ps = getRandomBezier(128,53)(3)(6);
        const [tx, ty] = [4, -3];
        expect(transform(ps, [[1,0,tx], [0,1,ty]])).toBeNearly(2**2, translate(ps, [tx,ty]));
    });

    it('it should match `scale` for a pure scaling matrix',
    function() {
        const ps = getRandomBezier(128,53)(3)(7);
        const c = 2.5;
        expect(transform(ps, [[c,0,0], [0,c,0]])).toBeNearly(2**2, scale(ps, c));
    });

    it('it should match `rotate` for a pure rotation matrix',
    function() {
        const ps = getRandomBezier(128,53)(3)(8);
        const θ = 0.6;
        const s = sin(θ);
        const c = cos(θ);
        expect(transform(ps, [[c,-s,0], [s,c,0]])).toBeNearly(2**4, rotate(ps, θ));
    });
});
