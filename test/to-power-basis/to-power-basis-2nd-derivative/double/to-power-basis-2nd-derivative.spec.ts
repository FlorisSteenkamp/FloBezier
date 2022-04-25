import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../../helpers/random-rotate-and-translate.js';
import { toPowerBasis_2ndDerivative } from '../../../../src/index.js';

use(nearly);

describe('toPowerBasis_2ndDerivative', function() {
	it('it should get the 2nd derivative of the power basis representation of some bezier curves (in double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasis_2ndDerivative(ps);
			const expected = [
				[1518.5815863227895, -612.6722365722974],
  				[-1662.8818047630489, 319.81037852787296]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomQuad(0);
			const r = toPowerBasis_2ndDerivative(ps);
			const expected = [[-204.22407885743246],[106.60345950929099]];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomLine(0);
			const r = toPowerBasis_2ndDerivative(ps);
			const expected = [[0],[0]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = toPowerBasis_2ndDerivative(ps);
			const expected = [[0],[0]];
			expect(r).to.eql(expected);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasis_2ndDerivative(ps)).to.throw();
		}
	});
});
