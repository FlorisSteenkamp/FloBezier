import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { toExpansion } from '../../src/transformation/to-expansion.js';

use(nearly);


describe('toExpansion', function() {
	it('it should convert some given bezier curves so their control point coordinates are Shewchuk expansions',
	function() {
		{
			let ps = getRandomCubic(0);
			ps = randomRotateAndTranslate(0)(ps);
			const r = toExpansion(ps);
			expect(r).to.be.eql(ps.map(p => p.map(c => [c])));
		}
	});
});
