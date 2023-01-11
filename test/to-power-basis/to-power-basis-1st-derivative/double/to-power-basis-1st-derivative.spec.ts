import { expect, assert, use } from 'chai';
import { describe, it } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis_1stDerivative } from '../../../../src/index.js';

use(nearly);


describe('toPowerBasis_1stDerivative', function() {
	it('it should get the derivative of the power basis representation of some bezier curves (in double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasis_1stDerivative(ps);
			const expected = [
				[759.2907931613947, -612.6722365722974, 286.49990967190894],
  				[-831.4409023815244, 319.81037852787296, 18.05539901828938]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomQuad(0);
			const r = toPowerBasis_1stDerivative(ps);
			const expected = [
				[-204.22407885743246, 190.99993978127262],
  				[106.60345950929099, 12.036932678859586]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomLine(0);
			const r = toPowerBasis_1stDerivative(ps);
			const expected = [
				[95.49996989063631],
				[6.018466339429793]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = toPowerBasis_1stDerivative(ps);
			const expected = [[0],[0]];
			expect(r).to.eql(expected);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasis_1stDerivative(ps)).to.throw();
		}
	});
});
