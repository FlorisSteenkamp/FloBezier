import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getHodograph } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { randomTranslate } from '../helpers/random-translate.js';

use(nearly);

describe('getHodograph', function() {
	it('it should return the correct hodographs of some bezier curves',
	function() {
		{
			const ps = getRandomBezier(128,50)(3)(0);
			const r = getHodograph(ps);
			const expected = [
				[286.4999096719089, 18.055399018289336],
  				[-19.83620861423981, 177.9605882822259],
  				[433.11846626100623, -493.5751248353622]
			];
			expect(r).to.be.nearly(2**3, expected);

			const ps_ = randomTranslate(0)(ps);
			const r_ = getHodograph(ps_);
			expect(r_).to.be.nearly(2**3, r);
		}
		{
			let ps = getRandomQuad(0);
			const r = getHodograph(ps);
			const expected = [
				[190.99993978127262, 12.036932678859586],
  				[-13.224139076159844, 118.64039218815057]
			];
			expect(r).to.be.nearly(2**3, expected);

			const ps_ = randomTranslate(0)(ps);
			const r_ = getHodograph(ps_);
			expect(r_).to.be.nearly(2**3,r);
		}
		{
			let ps = getRandomLine(0);
			const r = getHodograph(ps);
			const expected = [[95.49996989063631,6.018466339429793]];
			expect(r).to.be.nearly(2**3, expected);

			const ps_ = randomTranslate(0)(ps);
			const r_ = getHodograph(ps_);
			expect(r_).to.be.nearly(2**3,r);
		}
		{
			let ps = getRandomPoint(0);
			const r = getHodograph(ps);
			expect(r).to.be.undefined
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];

			expect(() => getHodograph(ps)).to.throw();
		}
	});
});
