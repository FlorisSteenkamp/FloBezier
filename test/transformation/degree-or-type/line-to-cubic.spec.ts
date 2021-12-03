import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { lineToCubic } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomLine } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';


use(nearly);

describe('lineToCubic', function() {
	it('it should convert some lines to cubic bezier curves (with evenly spaced control points)',
	function() {
		{
			let ps = getRandomLine(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = lineToCubic(ps);
			expect(r).to.be.nearly(2**1, [
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
	});
});
