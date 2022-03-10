import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';
import { splitByLength } from '../../../src/index.js';

use(nearly);

describe('splitByLength', function() {
	it('it should ',
	function() {
		const maxLength = 100;

		{
			const ps = getRandomCubic(0);
			const r = splitByLength(ps, maxLength);
			expect(r.length).to.eql(6);
			expect(r).to.be.eql([0,0.25,0.5,0.75,0.875,1]);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = splitByLength(ps_, maxLength);
			expect(r_).to.be.eql(r);
		}
		{
			const ps = getRandomQuad(5);
			const r = splitByLength(ps, maxLength);
			expect(r).to.be.eql([0, 0.25, 0.5, 0.75, 1]);
		}
		{
			const ps = getRandomLine(5);
			const r = splitByLength(ps, maxLength);
			expect(r).to.be.eql([0, 0.5, 1]);
		}
		{
			const ps = getRandomPoint(5);
			const r = splitByLength(ps, maxLength);
			expect(r).to.be.eql([0,1]);
		}
	});
});
