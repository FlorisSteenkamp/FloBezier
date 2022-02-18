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
			let ps = getRandomLine(0);
			const r = toCubic(ps);
			expect(r).to.be.nearly(2**6, [
				[-108.49686506776892, -13.011161175008596],
  				[-76.66354177089015, -11.005005728531998],
  				[-44.83021847401138, -8.9988502820554],
  				[-12.996895177132615, -6.992694835578803]
			]);

			const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = r;

			expect((y3 - y0)/3).to.be.nearly(2**2, y3 - y2);
			expect((y3 - y0)/3).to.be.nearly(2**2, y2 - y1);
			expect((y3 - y0)/3).to.be.nearly(2**2, y1 - y0);

			expect((x3 - x0)/3).to.be.nearly(2**2, x3 - x2);
			expect((x3 - x0)/3).to.be.nearly(2**2, x2 - x1);
			expect((x3 - x0)/3).to.be.nearly(2**2, x1 - x0);
		}

		{
			let ps = getRandomQuad(0);
			const r = toCubic(ps);
			expect(r).to.be.nearly(2**6, [
				[-108.49686506776892, -13.011161175008596],
				[-44.83021847401138, -8.9988502820554],
				[-15.200918356492588, 12.780703862446293],
				[-19.608964715212537, 52.32750125849648]
			]);

			const ps_ = toQuadraticFromCubic(r);

			expect(ps).to.be.nearly(2**2,ps_);
		}


		{
			let ps = getRandomCubic(0);
			const r = toCubic(ps);
			expect(r).to.be.eql(ps);
		}
		{
			let ps = getRandomQuad(0);
			const r = toCubic(ps);
			expect(ps).to.be.nearly(2**2, toQuadraticFromCubic(r));
		}
		{
			let ps = getRandomLine(0);
			const r = toCubic(ps);
			expect(ps).to.be.nearly(2**1, [r[0],r[3]]);
		}
		{
			let ps = getRandomPoint(0);
			const r = toCubic(ps);
			const p = ps[0];
			expect(r).to.be.eql([p,p,p,p]);
		}
	});
});
