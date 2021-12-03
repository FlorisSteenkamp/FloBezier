import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { toQuadraticFromCubic, toCubic } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';

use(nearly);

describe('toCubic', function() {
	it('it should ',
	function() {
		{
			let ps = getRandomCubic(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toCubic(ps);
			expect(r).to.be.eql(ps);
		}
		{
			let ps = getRandomQuad(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toCubic(ps);
			expect(ps).to.be.nearly(2**2, toQuadraticFromCubic(r));
		}
		{
			let ps = getRandomLine(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toCubic(ps);
			expect(ps).to.be.nearly(2**1, [r[0],r[3]]);
		}
		{
			let ps = getRandomPoint(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toCubic(ps);
			const p = ps[0];
			expect(r).to.be.eql([p,p,p,p]);
		}
	});
});
