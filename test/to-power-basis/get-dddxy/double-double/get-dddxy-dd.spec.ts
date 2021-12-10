import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { getDddxy, getDddxyDd } from '../../../../src/index.js';
import { objOrArrToDouble } from '../../../helpers/obj-or-arr-to-double.js';

use(nearly);


describe('getDddxyDd', function() {
	it('it should get the 3rd derivative of the power basis representation of some bezier curves (in double-double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getDddxyDd(ps);
			const expected = [
				[-1.1368683772161603e-13, 1355.5847510871445],
				[-2.842170943040401e-14, -599.1642949784092]
			];
			expect(r).to.eql(expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = getDddxyDd(ps);
				const rd = getDddxy(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomQuad(0);
			const r = getDddxyDd(ps);
			const expected = [[0,0],[0,0]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomLine(0);
			const r = getDddxyDd(ps);
			const expected = [[0,0],[0,0]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = getDddxyDd(ps);
			const expected = [[0,0],[0,0]];
			expect(r).to.eql(expected);
		}
	});
});
