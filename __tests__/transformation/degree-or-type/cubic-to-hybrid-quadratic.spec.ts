import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
import { evalDeCasteljau, cubicToHybridQuadratic } from '../../../src/index.js';

use(nearly);

describe('cubicToHybridQuadratic', function() {
	it('it should correctly convert some cubic bezier curves to hybrid quadratic bezier curves',
	function() {
		{
			let ps = getRandomCubic(0);
			const r = cubicToHybridQuadratic(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, [
				[-108.49686506776892, -13.011161175008596],
  				[
					[34.75308976818554, -3.9834616658639064],
    				[-91.79537575871359, 134.59002206439018] 
				],
  				[124.76385737178956, -112.1975403532909]
			]);

			// also test some evaluation points
			const ts = [0,0.1,0.2,0.999,1];

			const ps1 = ts.map(t => evalDeCasteljau(ps, t));
			const ps2 = ts.map(t => evalDeCasteljau([
				r[0],
				evalDeCasteljau(r[1], t),
				r[2]
			], t));

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(ps1).to.be.nearly(2**4, ps2);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => cubicToHybridQuadratic(ps)).to.throw();
		}
	});
});
