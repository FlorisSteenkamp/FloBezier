import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getHodograph } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { randomTranslate } from '../helpers/random-translate.js';

use(nearly);

describe('getHodograph', function() {
	it('it should return the correct hodographs of some bezier curves',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getHodograph(ps);
			const expected = [
				[-274.89390856467514, 179.60387514243007],
	  			[-195.2658555962297, 294.842163631423],
  				[562.1545729157874, 110.49830463121123]
			];
			expect(r).to.be.nearly(2**1, expected);

			const ps_ = randomTranslate(0)(ps);
			const r_ = getHodograph(ps_);
			expect(r_).to.be.eql(r);
		}
		{
			let ps = getRandomQuad(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = getHodograph(ps);
			const expected = [
				[-183.26260570978343, 119.73591676162005],
  				[-130.17723706415313, 196.56144242094865]
			];
			expect(r).to.be.nearly(2**8, expected);

			const ps_ = randomTranslate(0)(ps);
			const r_ = getHodograph(ps_);
			expect(r_).to.be.eql(r);
		}
		{
			let ps = getRandomLine(0);
			const r = getHodograph(ps);
			const expected = [[-91.63130285489171,59.86795838081002]];
			expect(r).to.be.nearly(2**8, expected);

			const ps_ = randomTranslate(0)(ps);
			const r_ = getHodograph(ps_);
			expect(r_).to.be.eql(r);
		}
		{
			let ps = getRandomPoint(0);
			const r = getHodograph(ps);
			expect(r).to.be.undefined
		}
	});
});
