// TODO - finish
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { areBeziersInSameKFamily, fromTo, getHodograph, getXY } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

// get a random bezier curve with low number of significand bits to make it
// easier to get points *exactly* on the curve.
const getRandomBezier_ = getRandomBezier(1000_000, 47);


describe('areBeziersInSameKFamily', function() {
	it('it should ...',
	function() {
		/*
		for (let order=0; order<=3; order++) {
			for (let seed=0; seed<25; seed++) {
				const ps = getRandomBezier_(order as 0|1|2|3)(seed);
				// the same beziers should be in the same k-family
				expect(areBeziersInSameKFamily(ps,ps)).to.be.true;

				//// rotations are in-exact so they should not be in the same k-famliy anymore (except by blind luck)
				//const ps_ = randomRotateAndTranslate(0)(ps);
				//const r_ = areBeziersInSameKFamily(ps_);
				//expect(r_).to.be.eql(r);
			}
		}
		*/

		{
			// get a self-overlapping cubic
			const c0 = [[0,0],[1,1],[2,2],[0,0]];
			let c1 = fromTo(c0, -0.25, -0.5625).ps;
			// expect(areBeziersInSameKFamily(c0,c1)).to.be.true;

			let c2 = [[0,0],[1999,1999],[11113,11113],[11099,11099]];
			// expect(areBeziersInSameKFamily(c0,c2)).to.be.false;
		}

		{
			// get a self-overlapping cubic
			const c0 = [[0,0],[1,0],[0,0]];
			let c1 = [[3,0],[4,0],[13,0]];
			// expect(areBeziersInSameKFamily(c0,c1)).to.be.false;
		}

		{
			// get a *low bitlength* cubic
			const c0 = getRandomBezier(1000_000, 40)(3)(0);
			let c1 = fromTo(c0, -0.25, -0.5625).ps;
			// expect(areBeziersInSameKFamily(c0,c1)).to.be.true;

			//const c0h = getHodograph(c0);//?
			//const c1h = getHodograph(c1);//?
			//areBeziersInSameKFamily(c0h,c1h)//?
			// throw new Error('a');
		}
		{
			// get a *low bitlength* quadratic
			const q0 = getRandomBezier(1000_000, 40)(2)(0);
			let q1 = fromTo(q0, -0.25, -0.5625).ps;
			// expect(areBeziersInSameKFamily(q0,q1)).to.be.true;
		}
		{
			// get a *low bitlength* line
			const l0 = getRandomBezier(1000_000, 47)(1)(0);
			let l1 = fromTo(l0, 0.25, 0.5234375).ps;
			// expect(areBeziersInSameKFamily(l0,l1)).to.be.true;
		}
		{
			//const r = areBeziersInSameKFamily(ps);
			//const expected = [];
			//expect(r).to.be.nearly(2**8, expected);
			//const ps_ = randomRotateAndTranslate(0)(ps);
			//const r_ = areBeziersInSameKFamily(ps_);
			//expect(r_).to.be.eql(r);
		}
		/*
		{
			let ps = getRandomPoint(0);
			const r = areBeziersInSameKFamily(ps);
			const expected = [];
			expect(r).to.be.nearly(2**8, expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = areBeziersInSameKFamily(ps_);
			expect(r_).to.be.eql(r);
		}
		*/
	});
});
