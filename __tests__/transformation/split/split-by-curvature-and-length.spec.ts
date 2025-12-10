import { expect } from 'chai';
import { describe } from 'mocha';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { fromTo, generateCuspAtHalf3, splitByCurvatureAndLength } from '../../../src/index.js';


describe('splitByCurvatureAndLength', function() {
	it('it should correctly split some bezier curves according to maximum curviness and length',
	function() {
		{
			const maxCurviness = 0.4;
			const maxLength = 100;
			const minTSpan = 2**-16;

			const ps = getRandomCubic(0);
			const r = splitByCurvatureAndLength(ps, maxCurviness, maxLength);
			const expected = [0,0.25,0.375,0.5,0.625,0.75,0.875,1];
			expect(r).to.be.eql(expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByCurvatureAndLength(ps_, maxCurviness, maxLength);
			expect(r_).to.be.eql(r);
		}
		{
			// test cusp

			const maxCurviness = 0.4;
			const maxLength = 0.9;

			// [[1,1],[1,4],[5,3],[-3,2]]
			const _ps = generateCuspAtHalf3([1,1], [2,3], [-3,2]);  //=> cusp at t === 0.5
			const ps = fromTo(_ps,0,0.75);  //=> cusp at t === 2/3 ( [[1,1],[1,3.25],[3.25,3.25],[1,2.6875]] )

			const r = splitByCurvatureAndLength(ps, maxCurviness, maxLength, 2**-10);

			expect(r).to.eql([ 
				0,
				0.125,
				0.25,
				0.375,
				0.5,
				0.625,
				0.65625,
				0.6640625,
				0.666015625,
				0.6669921875,
				0.66796875,
				0.671875,
				0.6875,
				0.75,
				0.875,
				1
			]);
		}
		{
			const maxCurviness = 0.4;
			const maxLength = 100;
			const minTSpan = 2**-16;

			const ps = getRandomQuad(0);
			const r = splitByCurvatureAndLength(ps, maxCurviness, maxLength, minTSpan);
			const expected = [0,0.25,0.5,0.625,0.75,0.875,1];
			expect(r).to.be.eql(expected);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByCurvatureAndLength(ps_, maxCurviness, maxLength, minTSpan);
			expect(r_).to.be.eql(r);
		}
		{
			const maxCurviness = 0.4;
			const maxLength = 50;
			const minTSpan = 2**-16;

			const ps = getRandomLine(0);
			const r = splitByCurvatureAndLength(ps, maxCurviness, maxLength, minTSpan);
			expect(r).to.be.eql([0,0.5,1]);
		}
		{
			const maxCurviness = 0.4;
			const maxLength = 1;
			const minTSpan = 2**-16;

			const ps = getRandomPoint(0);
			const r = splitByCurvatureAndLength(ps, maxCurviness, maxLength, minTSpan);
			expect(r).to.be.eql([0,1]);
		}
	});
});
