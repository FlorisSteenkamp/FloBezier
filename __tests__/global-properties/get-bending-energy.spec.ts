import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { area, classify, generateCuspAtHalf3, isCubicReallyQuad, isSelfOverlapping, quadraticToCubic } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { getBendingEnergy } from '../../src/global-properties/get-bending-energy.js';

use(nearly);

describe('getBendingEnergy', function() {
	it('it should calculate an accurate bending for some bezier curves',
	function() {
		{
			const ps = getRandomCubic(0);
			const E = getBendingEnergy(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(E).to.be.nearly(2**4, 0.011797062321182999);
		}

		{
			const ps = generateCuspAtHalf3([9,3], [3,6], [-6,-6]);
			// classify(ps).nodeType; //? cusp
			const E = getBendingEnergy(ps);
			expect(E).to.eql(Number.POSITIVE_INFINITY);
		}

		{
			const ps = [[1,1], [2,2], [3,3], [-6,-6]];
			// isSelfOverlapping(ps); // true
			const E = getBendingEnergy(ps);
			expect(E).to.eql(Number.POSITIVE_INFINITY);
		}

		{
			const ps = [[1,1], [2,2], [3,3], [6,6]];
			// isSelfOverlapping(ps); // false
			const E = getBendingEnergy(ps);
			expect(E).to.eql(0);
		}

		{
			const ps = getRandomQuad(0);
			const E = getBendingEnergy(ps);
			expect(E).to.eql(0.0269249201054867);
		}

		{
			const ps = [[1,1], [-2,-2], [3,3]];
			// isSelfOverlapping(ps); // true
			const E = getBendingEnergy(ps);
			expect(E).to.eql(Number.POSITIVE_INFINITY);
		}

		{
			const ps = [[-1,-1], [-2,-2], [-3,-3]];
			// isSelfOverlapping(ps); // false
			const E = getBendingEnergy(ps);
			expect(E).to.eql(0);
		}

		{
			const psQ = [
				[-108.49686506776892, -13.011161175008596],
  				[-12.996895177132615, -6.992694835578803],
  				[-19.608964715212537, 52.32750125849648]
			];

			const psC = quadraticToCubic(psQ);

			// isCubicReallyQuad(psC);  // false

			const EQ = getBendingEnergy(psQ);
			const EC = getBendingEnergy(psC);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(EQ).to.be.nearly(2**4, 0.0269249201054867);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(EC).to.be.nearly(2**4, 0.0269249201054867);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(EQ).to.be.nearly(2**4, EC);
		}

        {
			const ps = getRandomLine(0);
			const E = getBendingEnergy(ps);
			expect(E).to.eql(0);
		}

        {
			const ps = getRandomPoint(0);
			const E = getBendingEnergy(ps);
			expect(E).to.eql(0);
		}
	});
});
