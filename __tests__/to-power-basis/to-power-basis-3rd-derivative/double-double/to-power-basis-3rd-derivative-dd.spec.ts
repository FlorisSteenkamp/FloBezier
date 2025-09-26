import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis_3rdDerivative, toPowerBasis_3rdDerivativeDd } from '../../../../src/index.js';
import { eEstimate } from 'big-float-ts';

use(nearly);


describe('toPowerBasis_3rdDerivativeDd', function() {
	it('it should get the 3rd derivative of the power basis representation of some bezier curves (in double-double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasis_3rdDerivativeDd(ps);
			const expected = [[
				[0, 1518.5815863227895],
			], [
				[-1.1368683772161603e-13, -1662.8818047630489]
			]];
			expect(r).to.eql(expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = toPowerBasis_3rdDerivativeDd(ps);
				const rd = toPowerBasis_3rdDerivative(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(r => r.map(eEstimate))).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomQuad(0);
			const r = toPowerBasis_3rdDerivativeDd(ps);
			const expected = [[[0,0]],[[0,0]]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomLine(0);
			const r = toPowerBasis_3rdDerivativeDd(ps);
			const expected = [[[0,0]],[[0,0]]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = toPowerBasis_3rdDerivativeDd(ps);
			const expected = [[[0,0]],[[0,0]]];
			expect(r).to.eql(expected);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasis_3rdDerivativeDd(ps)).to.throw();
		}
	});
});
