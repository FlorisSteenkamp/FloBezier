import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { getXY } from '../../../../src/index.js';

use(nearly);

describe('getXY', function() {
	it('it should get the the power basis representation of some bezier curves (in double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getXY(ps);
			const expected = [ 
				[225.9307918478574, 79.62805296844519, -274.89390856467503, 88.6401864794642],
			  	[-99.86071582973489, 115.23828848899304, 179.60387514242996, -105.98771762335387]
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomQuad(0);
			const r = getXY(ps);
			const expected = [ 
				[26.542684322815063, -183.26260570978337, 88.6401864794642],
				[38.412762829664345, 119.73591676161996, -105.98771762335387] 
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomLine(0);
			const r = getXY(ps);
			const expected = [
				[-91.63130285489169, 88.6401864794642],
				[59.86795838080998, -105.98771762335387]
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = getXY(ps);
			const expected = [[88.6401864794642],[-105.98771762335387]];
			expect(r).to.be.nearly(2**8, expected);
		}
	});
});
