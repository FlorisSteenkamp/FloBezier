import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis_3rdDerivative, toPowerBasis_3rdDerivativeExact } from '../../../../src/index.js';
import { eEstimate } from 'big-float-ts';

use(nearly);


describe('toPowerBasis_3rdDerivativeExact', function() {
	it('it should get the exact 3rd derivative of the power basis representation of some bezier curves',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasis_3rdDerivativeExact(ps);
			const expected = [[
				[1518.5815863227895]
			], [
  				[-1.1368683772161603e-13, -1662.8818047630489]
			]];
			expect(r).to.eql(expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = toPowerBasis_3rdDerivativeExact(ps);
				const rd = toPowerBasis_3rdDerivative(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(r => r.map(eEstimate))).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomQuad(0);
			const r = toPowerBasis_3rdDerivativeExact(ps);
			const expected = [[[0]],[[0]]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomLine(0);
			const r = toPowerBasis_3rdDerivativeExact(ps);
			const expected = [[[0]],[[0]]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = toPowerBasis_3rdDerivativeExact(ps);
			const expected = [[[0]],[[0]]];
			expect(r).to.eql(expected);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasis_3rdDerivativeExact(ps)).to.throw();
		}
	});
});
