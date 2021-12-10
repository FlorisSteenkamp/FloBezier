/* TODO
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { splitByCurvatureAndLength } from '../../../src/index.js';

use(nearly);

describe('splitByCurvatureAndLength', function() {
	it('it should ',
	function() {
		const tolerance = 1.01;
		const minTSpan = 2**-20;
		const maxLength = 100;

		{
			const ps = getRandomCubic(0);
			const r = splitByCurvatureAndLength(ps, tolerance, maxLength, minTSpan);
			const expected = [0,0.25,0.375,0.5,0.5625,0.625,0.6875,0.75,0.875,1];
			expect(r).to.be.eql(expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByCurvatureAndLength(ps_, tolerance, minTSpan);
			expect(r_).to.be.eql(r);
		}
		{
			// test cusp

			// [[1,1],[1,4],[5,3],[-3,2]]
			const ps = generateCuspAtHalf3([1,1], [2,3], [-3,2000001]);
			const r1 = splitByCurvatureAndLength(ps, tolerance, 2**-10);
			const r2 = splitByCurvatureAndLength(ps, tolerance, 2**-5);

			expect(r1).to.eql([ 
				0,
				0.125,
				0.15625,
				0.1640625,
				0.166015625,
				0.1669921875,
				0.16796875,
				0.171875,
				0.1875,
				0.25,
				0.5,
				1 
			]);

			expect(r2).to.eql([
				0, 
				0.125, 
				0.15625, 
				0.1875, 
				0.25, 
				0.5, 
				1 
			]);
		}
		{
			const ps = getRandomQuad(0);
			const r = splitByCurvatureAndLength(ps, tolerance, minTSpan);
			const expected = [0,0.25,0.5,1];
			expect(r).to.be.eql(expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByCurvatureAndLength(ps_, tolerance, minTSpan);
			expect(r_).to.be.eql(r);
		}
		{
			const ps = getRandomLine(0);
			const r = splitByCurvatureAndLength(ps, tolerance, minTSpan);
			expect(r).to.be.eql([0,1]);
		}
		{
			const ps = getRandomPoint(0);
			const r = splitByCurvatureAndLength(ps, tolerance, minTSpan);
			expect(r).to.be.eql([0,1]);
		}
	});
});
*/