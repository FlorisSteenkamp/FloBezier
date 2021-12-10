import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { getDdxy, getDdxyDd } from '../../../../src/index.js';
import { objOrArrToDouble } from '../../../helpers/obj-or-arr-to-double.js';

use(nearly);


describe('getDdxyDd', function() {
	it('it should get the 2nd derivative of the power basis representation of some bezier curves (in double-double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getDdxyDd(ps);
			const expected = [ 
				[
					[-1.1368683772161603e-13, 1355.5847510871445],
					[0, 159.25610593689038]
				],
		  		[
					[-2.842170943040401e-14, -599.1642949784092],
					[0, 230.47657697798607]
				] 
			];
			expect(r).to.eql(expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = getDdxyDd(ps);
				const rd = getDdxy(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomQuad(i);
				const r = getDdxyDd(ps);
				const rd = getDdxy(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomLine(0);
			const r = getDdxyDd(ps);
			const expected = [[[0]],[[0]]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = getDdxyDd(ps);
			const expected = [[[0]],[[0]]];
			expect(r).to.eql(expected);
		}
	});
});
