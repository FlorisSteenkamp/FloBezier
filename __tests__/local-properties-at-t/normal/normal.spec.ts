import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { generateCuspAtHalf3, normal, tangent } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';

use(nearly);


describe('normal', function() {
	it('it should accurately calculate the normal of some bezier curves at some `t` values', 
	function() {
		for (let i=0; i<10; i++) {
			for (let order=1; order<=3; order++) {
				const ps = getRandomBezier(128,53)(order as 0|1|2|3)(i);
				let ts = [0, 0.3, 0.9, 1];
			
				for (let t of ts) {
					let r = normal(ps, t);
					let s = tangent(ps, t);

					// @ts-ignore - otherwise TypeScript gives an error on nearly
					expect(r).to.be.nearly(2**2, [-s[1],s[0]]);
				}
			}
		}

		{
			const ps = [[0,0], [3,0]];
			const t = 0.5;
			let r = normal(ps, t);
			// for lines there should still be a normal defined
			expect(r).to.eql([-0,3]);
		}

		{
			const ps = generateCuspAtHalf3([0,0], [6,2], [3,0]);
			const t = 0.5;
			let r = normal(ps, t);
			// at cusp the normal vanishes
			expect(r).to.eql([-0,0]);
		}
	});
});
