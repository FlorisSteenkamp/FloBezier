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
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toCubic(ps);
			expect(r).to.be.nearly(2**6, [
				[88.6401864794642, -105.98771762335389],
				[58.09641886116697, -86.03173149641721],
				[27.55265124286973, -66.07574536948053],
				[-2.9911163754275094, -46.119759242543864]
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
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toCubic(ps);

			expect(r).to.be.nearly(2**6, [
				[88.6401864794642, -105.98771762335389],
				[27.55265124286973, -66.07574536948053],
				[-24.687322552786362, -13.359518839052424],
				[-68.07973490750408, 52.16096196793046]
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
