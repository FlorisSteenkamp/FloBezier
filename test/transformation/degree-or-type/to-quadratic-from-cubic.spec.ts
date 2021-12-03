import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { area, toCubic, toQuadraticFromCubic } from '../../../src/index.js';
import { getAbsAreaBetween } from '../../../src/fit/get-abs-area-between.js';

use(nearly);

describe('toQuadraticFromCubic', function() {
	it('it should approximate some cubic bezier curves with a quadratic bezier curve',
	function() {
		{
			let ps = getRandomCubic(0);
			const r1 = toQuadraticFromCubic(ps,false);
			const r2 = toQuadraticFromCubic(ps,true);

			expect(r1).to.be.nearly(2**8, [
				[88.6401864794642, -105.98771762335389],
  				[-105.28946576483767, 8.779398905294869],
  				[119.30512273109173, 88.9937301783342]
			]);

			expect(r2).to.be.nearly(2**8, [
				[88.6401864794642, -105.98771762335389],
				[-133.67963343478092, 39.26650567338128],
				[119.30512273109173, 88.9937301783342]
			]);

			// check which one is the best area-wise approximation
			const e1 = getAbsAreaBetween(ps,r1);
			const e2 = getAbsAreaBetween(ps,r2);

			ps = randomRotateAndTranslate(0)(ps);
			const r1_ = toQuadraticFromCubic(ps,false);
			const r2_ = toQuadraticFromCubic(ps,true);

			const e1_ = getAbsAreaBetween(ps,r1_);
			const e2_ = getAbsAreaBetween(ps,r2_);

			expect(e1).to.be.nearly(2**6, e1_);
			expect(e2).to.be.nearly(2**6, e2_);
		}

		{
			for (let i=0; i<10; i++) {
				let ps = getRandomCubic(i);
				const r1 = toQuadraticFromCubic(ps,false);
				const r2 = toQuadraticFromCubic(ps,true);

				// check which one is the best area-wise approximation
				const e1 = getAbsAreaBetween(ps,r1);
				const e2 = getAbsAreaBetween(ps,r2);

				if (e1 >= e2) { /*console.log(ps);*/ }

				ps = randomRotateAndTranslate(0)(ps);
				const r1_ = toQuadraticFromCubic(ps,false);
				const r2_ = toQuadraticFromCubic(ps,true);

				const e1_ = getAbsAreaBetween(ps,r1_);
				const e2_ = getAbsAreaBetween(ps,r2_);

				expect(e1).to.be.nearly(2**12, e1_);
				expect(e2).to.be.nearly(2**12, e2_);
			}
		}
	});
});
