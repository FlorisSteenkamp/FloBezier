import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { aaa } from '../../../src/index.js';

use(nearly);

describe('aaa', function() {
	it('it should ',
	function() {
		{
			let ps = getRandomCubic(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = aaa(ps, t);
			expect(r).to.be.nearly(2**8, []);
		}
		{
			let ps = getRandomQuad(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = aaa(ps, t);
			expect(r).to.be.nearly(2**8, []);
		}
		{
			let ps = getRandomLine(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = aaa(ps, t);
			expect(r).to.be.nearly(2**8, []);
		}
		{
			let ps = getRandomPoint(0);//?
			// ps = randomRotateAndTranslate(0)(ps);
			const r = aaa(ps, t);
			expect(r).to.be.nearly(2**8, []);
		}
	});
});

fromTTo1