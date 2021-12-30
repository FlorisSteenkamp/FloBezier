import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../../helpers/random-rotate-and-translate.js';
import { getDxy, getDxyExact } from '../../../../src/index.js';
import { objOrArrToDouble } from '../../../helpers/obj-or-arr-to-double.js';

use(nearly);

describe('getDxyExact', function() {
	it('it should get the exact derivative of the power basis representation of some bezier curves',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getDxyExact(ps);
			const expected = [
				[
					[-5.684341886080802e-14, 677.7923755435722],
					[159.25610593689038],
					[-2.842170943040401e-14, -274.89390856467503]
				],
		  		[
					[-1.4210854715202004e-14, -299.5821474892046],
					[230.47657697798607],
					[-1.4210854715202004e-14, 179.60387514242996] 
				]
			];
			expect(r).to.be.nearly(2**8, expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = getDxyExact(ps);
				const rd = getDxy(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomQuad(0);
			const r = getDxyExact(ps);
			const expected = [
				[
					[53.085368645630126], 
					[0,-183.26260570978337]
				],
				[
					[76.82552565932869], 
					[0,119.73591676161996]
				]
			];
			expect(r).to.be.nearly(2**8, expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomQuad(i);
				const r = getDxyExact(ps);
				const rd = getDxy(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomLine(0);
			const r = getDxyExact(ps);
			const expected = [[[0, -91.63130285489169]], [[0, 59.86795838080998]]];
			expect(r).to.be.nearly(2**8, expected);

			for (let i=0; i<10; i++) {
				const ps = getRandomLine(i);
				const r = getDxyExact(ps);
				const rd = getDxy(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			const ps = getRandomPoint(0);
			const r = getDxyExact(ps);
			const expected = [[[0]],[[0]]];
			expect(r).to.eql(expected);
		}
	});
});
