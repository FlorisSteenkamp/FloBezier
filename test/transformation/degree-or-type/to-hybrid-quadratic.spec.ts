import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
import { evalDeCasteljau, toHybridQuadratic } from '../../../src/index.js';

use(nearly);

describe('toHybridQuadratic', function() {
	it('it should ',
	function() {
		{
			let ps = getRandomCubic(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = toHybridQuadratic(ps);
			expect(r).to.be.nearly(2**8, [
				[88.6401864794642, -105.98771762335389],
				[
					[-48.80676780287337, -16.185780052138853],
					[-161.77216372680198, 33.74457786272859] 
				],
				[119.30512273109173, 88.9937301783342]
			]);

			// also test some evaluation points
			const ts = [0,0.1,0.2,0.999,1];

			const ps1 = ts.map(t => evalDeCasteljau(ps, t));
			const ps2 = ts.map(t => evalDeCasteljau([
				r[0],
				evalDeCasteljau(r[1], t),
				r[2]
			], t));

			expect(ps1).to.be.nearly(2**4, ps2);
		}
	});
});
