import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { objOrArrToDouble } from '../../../helpers/obj-or-arr-to-double.js';
import { getXY, getXYDd } from '../../../../src/index.js';

use(nearly);


describe('getXYDd', function() {
	it('it should get the power basis representation of some bezier curves (in double-double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getXYDd(ps);
			const rd = getXY(ps);
			const expected = [
				[ 
					[0, 225.9307918478574],
					[0, 79.62805296844519],
					[-2.842170943040401e-14, -274.89390856467503],
					[0, 88.6401864794642]
				],
		  		[ 
					[0, -99.86071582973487],
					[0, 115.23828848899304],
					[-1.4210854715202004e-14, 179.60387514242996],
					[0, -105.98771762335387] 
				] 
			];
			expect(r).to.be.nearly(2**8, expected);
			expect(objOrArrToDouble(r)).to.be.nearly(2**8, rd);

			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = getXYDd(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomQuad(i);
				const r = getXYDd(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomLine(i);
				const r = getXYDd(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomPoint(i);
				const r = getXYDd(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
	});
});
