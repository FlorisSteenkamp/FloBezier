import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { getXY, getXYExact } from '../../../../src/index.js';
import { objOrArrToDouble } from '../../../helpers/obj-or-arr-to-double.js';

use(nearly);


describe('getXYExact', function() {
	it('it should get the exact power basis representation of some bezier curves',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getXYExact(ps);
			const expected = [ 
				[ 
					[225.9307918478574],
					[79.62805296844519],
					[-2.842170943040401e-14, -274.89390856467503],
					[88.6401864794642]
				],
		  		[ 
					[1.4210854715202004e-14, -99.86071582973489],
					[115.23828848899304],
					[-1.4210854715202004e-14, 179.60387514242996],
					[-105.98771762335387]
				] 
			];
			expect(r).to.eql(expected);


			for (let i=0; i<10; i++) {
				const ps = getRandomCubic(i);
				const r = getXYExact(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomQuad(i);
				const r = getXYExact(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomLine(i);
				const r = getXYExact(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
		{
			for (let i=0; i<10; i++) {
				const ps = getRandomPoint(i);
				const r = getXYExact(ps);
				const rd = getXY(ps);

				expect(objOrArrToDouble(r)).to.be.nearly(2**0, rd);
			}
		}
	});
});
