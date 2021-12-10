/* TODO
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { getDxy1ErrorCounters, getDxy2ErrorCounters, getDxy3ErrorCounters } from '../../../src/index.js';

use(nearly);

describe('aaa', function() {
	it('it should ...',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = aaa(ps);
			const expected = [];
			expect(r).to.be.nearly(2**8, expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = aaa(ps_);
			expect(r_).to.be.nearly(2**8, r);
		}
		{
			const ps = getRandomQuad(0);
			const r = aaa(ps);
			const expected = [];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomLine(0);
			const r = aaa(ps);
			const expected = [];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = aaa(ps);
			expect(r).to.be.undefined
		}
	});
});
*/