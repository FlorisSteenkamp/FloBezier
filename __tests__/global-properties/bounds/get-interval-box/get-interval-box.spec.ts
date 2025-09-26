import { eAdd, eDiff, eSign } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { evaluateExact, getIntervalBox } from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';

use(nearly)

const eps = Number.EPSILON;


describe('interval box', function() {
	it('it should get a reasonable interval box for some lines', 
	function() {
		{
			const ps = [[3.3,-1.3],[2.3,-1.2]];
			const delta = eps * 2**8;
			const tS = 1/3;
			const tE = 1/3 + delta;
			const i = [tS,tE];
			const box = getIntervalBox(ps, i);

			const pS = evaluateExact(ps, tS);
			const pE = evaluateExact(ps, tE);
			expect(isPointInBoxE(pS, box)).to.be.true;
			expect(isPointInBoxE(pE, box)).to.be.true;
			
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box).to.be.nearly(2**2, [
				[2.9666666666666077,-1.2666666666666673],
				[2.966666666666668,-1.2666666666666604]
			]);

			const box2 = getIntervalBox(ps, [tS,tS]);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box2).to.be.nearly(2**2, [
				[2.966666666666665, -1.266666666666667],
  				[2.9666666666666677, -1.2666666666666662]
			]);
			expect(isPointInBoxE(pS, box2)).to.be.true;
		}
	});

	it('it should get a reasonable interval box for some quadratic bezier curves', 
	function() {
		{
			const ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3]];
			const delta = eps * 2**1;
			const tS = 1/3;
			const tE = 1/3 + delta;
			const i = [tS,tE];
			const box = getIntervalBox(ps, i);

			const pS = evaluateExact(ps, tS);
			const pE = evaluateExact(ps, tE);
			expect(isPointInBoxE(pS, box)).to.be.true;
			expect(isPointInBoxE(pE, box)).to.be.true;

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box).to.be.nearly(2**4, [
				[2.6333333333333293, -1.0111111111111122],
  				[2.6333333333333355, -1.011111111111109]
			]);

			const box2 = getIntervalBox(ps, [tS,tS]);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box2).to.be.nearly(2**2, [
				[2.6333333333333284,-1.011111111111113],
				[2.6333333333333373,-1.011111111111109]
			]);
			expect(isPointInBoxE(pS, box2)).to.be.true;
		}
	});

	it('it should get a reasonable interval box for some cubic bezier curves', 
	function() {
		{
			const ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			const delta = eps * 2**1;
			const tS = 1/3;
			const tE = 1/3 + delta;
			const i = [tS,tE];
			const box = getIntervalBox(ps, i);
			
			const pS = evaluateExact(ps, tS);
			const pE = evaluateExact(ps, tE);
			expect(isPointInBoxE(pS, box)).to.be.true;
			expect(isPointInBoxE(pE, box)).to.be.true;
			const pS_ = pS.slice();
			pS_[0] = eDiff(pS[0], [2**-40]);
			expect(isPointInBoxE(pS_, box)).to.be.false;

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box).to.be.nearly(2**6, [
				[2.2925925925925874, -0.6703703703703716],
				[2.2925925925925954, -0.670370370370367]
			]);

			const box2 = getIntervalBox(ps, [tS,tS]);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box2).to.be.nearly(2**2, [
				[2.292592592592581, -0.6703703703703757],
				[2.2925925925926034,-0.6703703703703651]
			]);
			expect(isPointInBoxE(pS, box2)).to.be.true;
		}
	});

	it('it should get a reasonable interval box in double-double precision for special cases',
	function() {
		{
			// point
			const ps = [[3.3,-1.3]];
			const tS = 0.125;
			const tE = 0.125;
			const i = [tS, tE];
			const boxDd = getIntervalBox(ps, i);
			
			expect(boxDd).to.be.eql([
				[3.3,-1.3], 
				[3.3,-1.3]
			]);			
		}

		{
			// error
			const ps: number[][] = [];
			const tS = 0.125;
			const tE = 0.125;
			const i = [tS, tE];
			expect(() => getIntervalBox(ps, i)).to.throw();
		}
	});
});



/**
 * Returns `true` if the given point is within the given closed axis-aligned box,
 * `false` otherwise.
 * 
 * @param p 
 * @param box 
 */
function isPointInBoxE(p: number[][], box: number[][]) {
	return (
		eSign(eDiff(p[0], [box[0][0]])) >= 0 &&
		eSign(eDiff([box[1][0]], p[0])) >= 0 &&
		eSign(eDiff(p[1], [box[0][1]])) >= 0 &&
		eSign(eDiff([box[1][1]], p[1])) >= 0
	);
}
