import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { lineToQuadratic } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomLine } from '../../helpers/get-random-bezier.js';

use(nearly);


describe('lineToQuadratic', function() {
	it('it should correctly convert some lines to quadratic bezier curves',
	function() {
		{
			let ps = getRandomLine(0);
			const r = lineToQuadratic(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**6, [
				[-108.49686506776892, -13.011161175008596],
                [-60.74688012245077,-10.0019280052937],
  				[-12.996895177132615, -6.992694835578803]
			]);

			const [[x0,y0],[x1,y1],[x2,y2]] = r;

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect((y2 - y0)/2).to.be.nearly(2**2, y2 - y1);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect((y2 - y0)/2).to.be.nearly(2**2, y1 - y0);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect((x2 - x0)/2).to.be.nearly(2**2, x2 - x1);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect((x2 - x0)/2).to.be.nearly(2**2, x1 - x0);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p];
			expect(lineToQuadratic(ps)).eql([p,p,p]);
		}
	});
});
