import { describe, expect, it } from '@jest/globals';
import { bezierSelfIntersection, generateSelfIntersecting } from '../../src/index.js';


describe('generateSelfIntersecting', function() {
    it('it should generate some self-intersection cubic bezier under some given constraints',
    function() {
        const ps = generateSelfIntersecting([0,0],[1,1],[3,1], [0.2,0.8]);

        const ts = bezierSelfIntersection(ps);
        expect(ts[0]).toBeNearly(2**4, 0.2);
        expect(ts[1]).toBeNearly(2**4, 0.8);
    });
});
