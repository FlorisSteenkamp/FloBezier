import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { ddAddDouble } from 'double-double';
import { getIntervalBox, getIntervalBoxDd, getXYExact } from '../../../../src/index.js';
import { eCompress, eDiff, eEstimate, eSign } from 'big-float-ts';
import { eeHorner } from 'flo-poly';
import { nearly } from '../../../helpers/chai-extend-nearly.js';

use(nearly)


const eps = Number.EPSILON;

//console.log(ddDivDouble([0,1],10));
// closer to 0.1 than [0,0.1]
let one_over_10 = [-5.551115123125783e-18,0.1]; 

//console.log(ddDivDouble([0,1],3));
// closer to 1/3 than [0,0.3333333333333333]
let one_over_3  = [ 1.850371707708594e-17, 0.3333333333333333 ] 


describe('getIntervalBoxDd', function() {
	it('it should get a reasonable interval box in double-double precision for some lines',
	function() {
		{
			const ps = [[3.3,-1.3],[2.3,-1.3]];
			const delta = eps*2**-20;
			const tS = one_over_3;
			const tE = ddAddDouble(one_over_3,delta);
			const i = [tS, tE];
			const box = getIntervalBox(ps, i.map(eEstimate));
			const boxDd = getIntervalBoxDd(ps, i);
			
			const pS = evaluateExactE(ps, tS);
			const pE = evaluateExactE(ps, tE);
			expect(isPointInBoxE(pS, boxDd)).to.be.true;
			expect(isPointInBoxE(pE, boxDd)).to.be.true;
			const pS_ = pS.slice();
			pS_[0] = eDiff(pS[0], [2**-40]);
			expect(isPointInBoxE(pS_, boxDd)).to.be.false;

			const box_ = boxDd.map(p => p.map(eEstimate));
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box).to.be.nearly(2**2,box_);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd).to.be.nearly(2**6, [
				[
					[6.291242630385551e-17, 2.966666666666664],
					[9.992007221626413e-17, -1.3000000000000012]
				],
				[
					[-2.1094258643701665e-16, 2.966666666666669],
					[-9.992007221626413e-17, -1.299999999999999]
				]
			]);

			const boxDd2 = getIntervalBoxDd(ps, [tS,tS]);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd2).to.be.nearly(2**2, [
				[
					[1.4802973661668677e-16, 2.9666666666666663],
					[-3.204747427460361e-31, -1.3]
				],
				[
					[1.480297366166883e-16, 2.9666666666666663],
					[3.204747427460361e-31, -1.3]
				]
			]);
			expect(isPointInBoxE(pS, boxDd2)).to.be.true;
		}
	});
	it('it should get a reasonable interval box in double-double precision for some quadratic beziers',
	function() {
		{
			const ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3]];
			const delta = eps*2**-20;
			const tS = one_over_3;
			const tE = ddAddDouble(one_over_3,delta);
			const i = [tS, tE];
			const box = getIntervalBox(ps, i.map(eEstimate));
			const boxDd = getIntervalBoxDd(ps, i);
			
			const pS = evaluateExactE(ps, tS);
			const pE = evaluateExactE(ps, tE);
			expect(isPointInBoxE(pS, boxDd)).to.be.true;
			expect(isPointInBoxE(pE, boxDd)).to.be.true;
			const pS_ = pS.slice();
			pS_[0] = eDiff(pS[0], [2**-40]);
			expect(isPointInBoxE(pS_, boxDd)).to.be.false;

			const box_ = boxDd.map(p => p.map(eEstimate));
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box).to.be.nearly(2**4,box_);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd).to.be.nearly(2**6, [
				[
					[ -1.233585373637137e-16, 2.6333333333333333 ],
					[ -7.401486830834389e-17, -1.011111111111111 ]
				],
				[
					[ -1.233581138472394e-16, 2.6333333333333333 ],
					[ -7.401450126073308e-17, -1.011111111111111 ]
				]
			]);

			const boxDd2 = getIntervalBoxDd(ps, [tS,tS]);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd2).to.be.nearly(2**2, [
				[
					[-1.233581138472426e-16, 2.6333333333333333],
					[-7.401486830834511e-17, -1.011111111111111]
				],
				[
					[-1.2335811384723664e-16, 2.6333333333333333],
					[-7.401486830834245e-17, -1.011111111111111]
				]
			]);
			expect(isPointInBoxE(pS, boxDd2)).to.be.true;
		}
	});

	it('it should get a reasonable interval box in double-double precision for some cubic beziers',
	function() {
		{
			const ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			const delta = eps*2**-20;
			const tS = one_over_3;
			const tE = ddAddDouble(one_over_3,delta);
			const i = [tS, tE];
			const box = getIntervalBox(ps, i.map(eEstimate));
			const boxDd = getIntervalBoxDd(ps, i);
			
			const pS = evaluateExactE(ps, tS);
			const pE = evaluateExactE(ps, tE);
			expect(isPointInBoxE(pS, boxDd)).to.be.true;
			expect(isPointInBoxE(pE, boxDd)).to.be.true;
			const pS_ = pS.slice();
			pS_[0] = eDiff(pS[0], [2**-40]);
			expect(isPointInBoxE(pS_, boxDd)).to.be.false;

			const box_ = boxDd.map(p => p.map(eEstimate));
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(box).to.be.nearly(2**6,box_);

			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd).to.be.nearly(2**6, [
				[
					[1.778406314045103e-16, 2.2925925925925923],
    				[1.0279842820601583e-18, -0.6703703703703704]
				],
  				[
					[1.7784128079643746e-16, 2.2925925925925923],
    				[1.0286336739867386e-18, -0.6703703703703704]
				]
			]);

			const boxDd2 = getIntervalBoxDd(ps, [tS,tS]);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd2).to.be.nearly(2**2, [
				[
					[1.7784128079642974e-16, 2.2925925925925923],
    				[1.0279842820568002e-18, -0.6703703703703704]
				],
  				[
					[1.7784128079644453e-16, 2.2925925925925923],
    				[1.0279842820638692e-18, -0.6703703703703704]
				]
			]);
			expect(isPointInBoxE(pS, boxDd2)).to.be.true;
		}
	});

	it('it should get a reasonable interval box in double-double precision for special cases',
	function() {
		{
			// ts = [0,0]
			const ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			const tS = [0,0];
			const tE = [0,0];
			const i = [tS, tE];
			const boxDd = getIntervalBoxDd(ps, i);
			
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd).to.be.nearly([2**0], [
				[[0,ps[0][0]],[0,ps[0][1]]],
  				[[0,ps[0][0]],[0,ps[0][1]]]
			]);
		}

		{
			// ts = [1,1]
			const ps = [[3.3,-1.3],[2.3,-1.3],[1.3,1.3],[0.1,0.1]];
			const tS = [0,1];
			const tE = [0,1];
			const i = [tS, tE];
			const boxDd = getIntervalBoxDd(ps, i);
			
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(boxDd).to.be.nearly([2**0], [
				[[0,ps[3][0]],[0,ps[3][1]]],
  				[[0,ps[3][0]],[0,ps[3][1]]]
			]);
		}

		{
			// point
			const ps = [[3.3,-1.3]];
			const tS = [0,0.125];
			const tE = [0,0.125];
			const i = [tS, tE];
			const boxDd = getIntervalBoxDd(ps, i);
			
			expect(boxDd).to.be.eql([
				[[0,3.3],[0,-1.3]], 
				[[0,3.3],[0,-1.3]]
			]);			
		}

		{
			// error
			const ps: number[][] = [];
			const tS = [0,0.125];
			const tE = [0,0.125];
			const i = [tS, tE];
			expect(() => getIntervalBoxDd(ps, i)).to.throw();
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
 function isPointInBoxE(p: number[][], box: number[][][]) {
	return (
		eSign(eDiff(p[0], box[0][0])) >= 0 &&
		eSign(eDiff(box[1][0], p[0])) >= 0 &&
		eSign(eDiff(p[1], box[0][1])) >= 0 &&
		eSign(eDiff(box[1][1], p[1])) >= 0
	);
}


function evaluateExactE(
		ps: number[][], t: number[]): number[][] {

	const [X,Y] = getXYExact(ps);

	return [
		eeHorner(X,t),
		eeHorner(Y,t)
	];
}
