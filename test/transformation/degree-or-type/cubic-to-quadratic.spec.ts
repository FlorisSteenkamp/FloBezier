import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { area, toCubic, cubicToQuadratic } from '../../../src/index.js';
import { getAbsAreaBetween } from '../../../src/fit/get-abs-area-between.js';

use(nearly);

describe('cubicToQuadratic', function() {
	it('it should approximate some cubic bezier curves with a quadratic bezier curve',
	function() {
		{
			let ps = getRandomCubic(0);
			const r1 = cubicToQuadratic(ps,false)!;
			const r2 = cubicToQuadratic(ps,true)!;

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r1).to.be.nearly(2**8, [
				[-108.49686506776892, -13.011161175008596],
  				[-28.52114299526402, 65.30328019926313],
  				[124.76385737178956, -112.1975403532909]
			]);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r2).to.be.nearly(2**8, [
				[-108.49686506776892, -13.011161175008596],
  				[30.063939847922256, -4.278974753333571],
  				[124.76385737178956, -112.1975403532909]
			]);

			// check which one is the best area-wise approximation
			const e1 = getAbsAreaBetween(ps,r1);
			const e2 = getAbsAreaBetween(ps,r2);

			ps = randomRotateAndTranslate(0)(ps);
			const r1_ = cubicToQuadratic(ps,false)!;
			const r2_ = cubicToQuadratic(ps,true)!;

			const e1_ = getAbsAreaBetween(ps,r1_);
			const e2_ = getAbsAreaBetween(ps,r2_);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(e1).to.be.nearly(2**8, e1_);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(e2).to.be.nearly(2**8, e2_);
		}

		{
			for (let i=0; i<10; i++) {
				let ps = getRandomCubic(i);
				const r1 = cubicToQuadratic(ps,false)!;
				const r2 = cubicToQuadratic(ps,true)!;

				// check which one is the best area-wise approximation
				const e1 = getAbsAreaBetween(ps,r1);
				const e2 = getAbsAreaBetween(ps,r2);

				if (e1 >= e2) { /*console.log(ps);*/ }

				ps = randomRotateAndTranslate(0)(ps);
				const r1_ = cubicToQuadratic(ps,false)!;
				const r2_ = cubicToQuadratic(ps,true)!;

				const e1_ = getAbsAreaBetween(ps,r1_);
				const e2_ = getAbsAreaBetween(ps,r2_);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(e1).to.be.nearly(2**12, e1_);
				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(e2).to.be.nearly(2**12, e2_);
			}
		}

		// some edge cases
		{
			const ps = [[1,1],[2,2],[3,3],[4,4]];
			const r = cubicToQuadratic(ps,true);
			expect(r).to.be.undefined;
		}
		{
			const ps = [[1,1],[1,1],[1,1],[1,1]];
			const r = cubicToQuadratic(ps,true);
			expect(r).to.be.undefined;
		}
	});
});
