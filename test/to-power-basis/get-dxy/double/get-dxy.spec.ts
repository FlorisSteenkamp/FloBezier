import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { getDxy } from '../../../../src/index.js';

use(nearly);


describe('getDxy', function() {
	it('it should get the derivative of the power basis representation of some bezier curves (in double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getDxy(ps);
			const expected = [
				[677.7923755435722, 159.25610593689038, -274.89390856467503],
				[-299.58214748920466, 230.47657697798607, 179.60387514242996]
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomQuad(0);
			const r = getDxy(ps);
			const expected = [
				[53.085368645630126, -183.26260570978337],
				[76.82552565932869, 119.73591676161996]
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomLine(0);
			const r = getDxy(ps);
			const expected = [
				[-91.63130285489169], 
				[59.86795838080998]
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = getDxy(ps);
			const expected = [[0],[0]];
			expect(r).to.eql(expected);
		}
	});
});
