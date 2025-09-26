import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis_1stDerivative, toPowerBasis_1stDerivativeDd } from '../../../../src/index.js';
import { eEstimate } from 'big-float-ts';

use(nearly);


describe('toPowerBasis_1stDerivativeDd', function() {
	it('it should get the derivative of the power basis representation of some bezier curves (in double-double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = toPowerBasis_1stDerivativeDd(ps);
			const expected = [
				[ 
					[0, 759.2907931613947],
    				[0, -612.6722365722974],
    				[-1.4210854715202004e-14, 286.49990967190894] 
				],
  				[ 
					[-5.684341886080802e-14, -831.4409023815244],
    				[0, 319.81037852787296],
    				[0, 18.05539901828938]
				]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = toPowerBasis_1stDerivativeDd(ps);
				const rd = toPowerBasis_1stDerivative(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**6, rd);
			}
		}
		{
			const ps = getRandomQuad(0);
			const r = toPowerBasis_1stDerivativeDd(ps);
			const expected = [
				[
					[0, -204.22407885743246], 
					[0, 190.99993978127262]
				],
				[
					[0, 106.60345950929099], 
					[0, 12.036932678859586]
				]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomQuad(i);
				const r = toPowerBasis_1stDerivativeDd(ps);
				const rd = toPowerBasis_1stDerivative(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**6, rd);
			}
		}
		{
			const ps = getRandomLine(0);
			const r = toPowerBasis_1stDerivativeDd(ps);
			const expected = [
				[[0, 95.49996989063631]], 
				[[0, 6.018466339429793]]
			];
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomLine(i);
				const r = toPowerBasis_1stDerivativeDd(ps);
				const rd = toPowerBasis_1stDerivative(ps);

				// @ts-ignore - otherwise TypeScript gives an error on nearly
				expect(r.map(v => v.map(eEstimate))).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomPoint(0);
			const r = toPowerBasis_1stDerivativeDd(ps);
			const expected = [[[0,0]],[[0,0]]];
			expect(r).to.eql(expected);
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => toPowerBasis_1stDerivativeDd(ps)).to.throw();
		}
	});
});
