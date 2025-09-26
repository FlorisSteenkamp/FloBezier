import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { classify, generateCuspAtHalf3, tangent } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';

use(nearly);


describe('tangent', function() {
	it('it should accurately calculate the tangent of some bezier curves at some `t` values', 
	function() {
		{
			const ps = getRandomLine(0);
			let ts = [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1];
			
			for (let t of ts) {
				let r = tangent(ps, t);
				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r).to.be.nearly(2**2, [95.49996989063631,6.018466339429793]);
			}
		}

		{
			const ps = getRandomQuad(0);
			const t = 0.5;
			let r = tangent(ps, t);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**2, [88.88790035255639,65.33866243350508]);
		}

		{
			const ps = getRandomCubic(0);
			const t = 0.5;
			let r = tangent(ps, t);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**2, [169.98648967610893,-29.899637313155253]);
		}

		{
			const ps = generateCuspAtHalf3([0,0], [6,2], [3,0]);
			const t = 0.5;
			let r = tangent(ps, t);
			// at cusp the tangent vanishes
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**2, [0,0]);
		}
	});
});
