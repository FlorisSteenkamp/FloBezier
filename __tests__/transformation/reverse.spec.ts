import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { reverse } from '../../src/index.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';


describe('reverse', function() {
	it('it should reverse some bezier curves',
	function() {
		{
			let ps = getRandomCubic(0);
			ps = randomRotateAndTranslate(0)(ps);
			const r = reverse(ps);
			expect(r).to.be.eql(ps.slice().reverse());
		}
		{
			let ps = getRandomQuad(0);
			ps = randomRotateAndTranslate(0)(ps);
			const r = reverse(ps);
			expect(r).to.be.eql(ps.slice().reverse());
		}
		{
			let ps = getRandomLine(0);
			ps = randomRotateAndTranslate(0)(ps);
			const r = reverse(ps);
			expect(r).to.be.eql(ps.slice().reverse());
		}
		{
			let ps = getRandomPoint(0);
			ps = randomRotateAndTranslate(0)(ps);
			const r = reverse(ps);
			expect(r).to.be.eql(ps);
		}
	});
});
