import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { curviness, fromTo, generateCuspAtHalf3, getCurvatureExtrema, length, splitByCurvature } from '../../../src/index.js';

use(nearly);


describe('splitByCurvature', function() {
	it('it should correctly split some bezier curves according to maximum curviness',
	function() {
		const minTSpan = 2**-20;
		{
			const maxCurviness = 0.4;
			const ps = getRandomCubic(5);
			const r = splitByCurvature(ps, maxCurviness, minTSpan);
			const expected = [0, 0.125, 0.25, 0.28125, 0.3125, 0.34375, 0.359375, 0.375, 0.390625, 0.40625, 0.4375, 0.46875, 0.5, 0.5625, 0.625, 0.6875, 0.75, 0.875, 1];
			expect(r).to.be.eql(expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByCurvature(ps_, maxCurviness, minTSpan);
			expect(r_).to.be.eql(r);
		}
		{
			// test cusp at t === 0.5

			// [[1,1],[1,4],[5,3],[-3,2]]
			const maxCurviness = 0.4;
			const ps = generateCuspAtHalf3([1,1], [2,3], [-3,2]);
			const r = splitByCurvature(ps, maxCurviness, 2**-10);

			expect(r).to.eql([ 
				0,
				0.125,
				0.25,
				0.375,
				0.5,
				1 
			]);
		}
		{
			// test cusp at t === 0.5

			// [[1,1],[1,4],[5,3],[-3,2]]
			const maxCurviness = 0.4;
			const _ps = generateCuspAtHalf3([1,1], [2,3], [-3,2]);  //=> cusp at t === 0.5
			const ps = fromTo(_ps,0,0.75);  //=> cusp at t === 2/3 ( [[1,1],[1,3.25],[3.25,3.25],[1,2.6875]] )
			const r = splitByCurvature(ps, maxCurviness, 2**-3);
			
			expect(r).to.eql([ 
				0,
				0.125,
				0.25,
				0.375,
				0.5,
				0.625,
				0.75,
				1
			]);

			const c = curviness(fromTo(ps, 0.625, 0.75));
			const l = length([0.625,0.75],ps);
			expect(c <= maxCurviness || l <= 2**-3).to.be.true;
			
		}
		{
			// test almost cusp

			// [[1,1],[1,4],[5,3],[-3,2]]
			const maxCurviness = 0.4;
			const ps = generateCuspAtHalf3([1,1], [2,3], [-3,2000001]);  //=> almost a cusp but not
			const r1 = splitByCurvature(ps, maxCurviness, 2**-10);
			const r2 = splitByCurvature(ps, maxCurviness, 2**-5);

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
			const maxCurviness = 0.2;
			const ps = getRandomQuad(0);
			const r = splitByCurvature(ps, maxCurviness, minTSpan);
			const expected = [0, 0.125, 0.25, 0.375, 0.4375, 0.5, 0.5625, 0.625, 0.6875, 0.75, 0.8125, 0.875, 0.9375, 1];
			expect(r).to.be.eql(expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByCurvature(ps_, maxCurviness, minTSpan);
			expect(r_).to.be.eql(r);
		}
		{
			const maxCurviness = 0.4;
			const ps = getRandomLine(0);
			const r = splitByCurvature(ps, maxCurviness, minTSpan);
			expect(r).to.be.eql([0,1]);
		}
		{
			const maxCurviness = 0.4;
			const ps = getRandomPoint(0);
			const r = splitByCurvature(ps, maxCurviness, minTSpan);
			expect(r).to.be.eql([0,1]);
		}
	});
});
