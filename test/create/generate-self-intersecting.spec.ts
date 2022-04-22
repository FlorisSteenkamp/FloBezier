import { assert, expect, use } from 'chai';
import { describe } from 'mocha';
import { bezierSelfIntersection, generateSelfIntersecting } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';

use(nearly);


describe('generateSelfIntersecting', function() {
    it('it should generate some self-intersection cubic bezier under some given constraints',
	function() {
        const ps = generateSelfIntersecting([0,0],[1,1],[3,1], [0.2,0.8]);

        const ts = bezierSelfIntersection(ps);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(ts[0]).to.be.nearly(2**4, 0.2);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(ts[1]).to.be.nearly(2**4, 0.8);
    });
});
