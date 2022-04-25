import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis, toPowerBasisDd } from '../../../../src/index.js';
import { eEstimate } from 'big-float-ts';

use(nearly);


describe('toPowerBasisDd', function() {
	it('it should get the power basis representation of some bezier curves (in double-double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasisDd(ps);
			const rd = toPowerBasis(ps);
			const expected = [
				[ 	
					[0, 253.09693105379824],
    				[0, -306.3361182861487],
					[-1.4210854715202004e-14, 286.49990967190894],
					[0, -108.49686506776892]
				],
				[
					[0, -277.14696746050817],
					[0, 159.90518926393648],
					[0, 18.05539901828938],
					[0, -13.011161175008596] 
				]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**8, rd);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = toPowerBasisDd(ps);
				const rd = toPowerBasis(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**6, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomQuad(i);
				const r = toPowerBasisDd(ps);
				const rd = toPowerBasis(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**6, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomLine(i);
				const r = toPowerBasisDd(ps);
				const rd = toPowerBasis(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomPoint(i);
				const r = toPowerBasisDd(ps);
				const rd = toPowerBasis(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**0, rd);
			}
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasisDd(ps)).to.throw();
		}
	});
});
