import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { toQuadraticFromCubic, quadraticToCubic } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';

use(nearly);

describe('quadraticToCubic', function() {
	it('it should convert some quadratic bezier curves to cubic bezier curves',
	function() {
		{
			let ps = getRandomQuad(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = quadraticToCubic(ps);

			expect(r).to.be.nearly(2**1, [
				[ 88.6401864794642, -105.98771762335389 ],
				[ 27.55265124286973, -66.07574536948053 ],
				[ -24.687322552786362, -13.359518839052424 ],
				[ -68.07973490750408, 52.16096196793046 ]
			]);

			const ps_ = toQuadraticFromCubic(r);

			expect(ps).to.be.nearly(2**2,ps_);
		}
	});
});
