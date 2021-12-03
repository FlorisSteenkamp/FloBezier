// `cubicToQuadratic` is deprecated, rather use `toQuadraticFromCubic`

/*
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { cubicToQuadratic } from '../../src/index.js';
import { getRandomCubic } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

describe('cubicToQuadratic', function() {
	it('it should approximate the given cubic bezier curve as close as possible by a quadratic bezier',
	function() {
		{
			let ps = getRandomCubic(0);
			//[ [88.6401864794642, -105.98771762335389],
			//	[-2.9911163754275094, -46.119759242543864],
			//	[-68.07973490750408, 52.16096196793046],
			//	[119.30512273109173, 88.9937301783342] ]
			// ps = randomRotateAndTranslate(0)(ps);
			const expected = [
				[99.93672607185705,-110.98075341484063],
				[-105.28946576483767,8.779398905294869],
				[108.00858313869887,93.98676596982094]
			];
			const r = cubicToQuadratic(ps);
			expect(r).to.be.nearly(2**8, expected);

			expect(cubicToQuadratic(randomRotateAndTranslate(2)(ps))).to.be.nearly(2**8, 
				randomRotateAndTranslate(2)(expected)
			);
		}
	});
});
*/