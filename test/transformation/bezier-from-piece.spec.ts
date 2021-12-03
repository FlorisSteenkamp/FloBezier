import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { bezierFromPiece } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

describe('bezierFromPiece', function() {
	it('it should return a bezier curve from the given bezier piece for some given bezier curves',
	function() {
		{
			let ps = getRandomCubic(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = bezierFromPiece({ ps, ts: [0.001,0.999] });
			expect(r).to.be.nearly(2**8, [
				[88.36537242488329,-105.80799860978368],
				[-3.02946314746004,-45.98320393212167],
				[-67.76265099113856,52.00139450252804],
				[118.74372535267368,88.88304762970472]
			]);
		}
		{
			let ps = getRandomQuad(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = bezierFromPiece({ ps, ts: [0.001,0.999] });
			expect(r).to.be.nearly(2**8, [
				[88.45695041643876, -105.86794329382944],
  				[-2.9646002337890187, -46.08138489247703],
  				[-67.94953112775559, 51.964438938272345]
			]);
		}
		{
			let ps = getRandomLine(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = bezierFromPiece({ ps, ts: [0.001,0.999] });
			expect(r).to.be.nearly(2**8, [
				[88.54855517660931, -105.92784966497308],
				[-2.89948507257262, -46.17962720092467]
			]);
		}
		{
			let ps = getRandomPoint(0);//?
			// ps = randomRotateAndTranslate(0)(ps);
			const r = bezierFromPiece({ ps, ts: [0.001,0.999] });
			expect(r).to.be.eql(ps);
		}
	});
});
