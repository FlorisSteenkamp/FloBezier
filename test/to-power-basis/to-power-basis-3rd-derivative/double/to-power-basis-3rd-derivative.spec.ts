import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis_3rdDerivative } from '../../../../src/index.js';

use(nearly);


describe('toPowerBasis_3rdDerivative', function() {
	it('it should get the 3rd derivative of the power basis representation of some bezier curves (in double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasis_3rdDerivative(ps);
			const expected = [1518.5815863227895,-1662.8818047630489];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomQuad(0);
			const r = toPowerBasis_3rdDerivative(ps);
			const expected = [0,0];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomLine(0);
			const r = toPowerBasis_3rdDerivative(ps);
			const expected = [0,0];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = toPowerBasis_3rdDerivative(ps);
			const expected = [0,0];
			expect(r).to.eql(expected);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasis_3rdDerivative(ps)).to.throw();
		}
	});
});
