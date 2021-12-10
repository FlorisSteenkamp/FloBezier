import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../../helpers/random-rotate-and-translate.js';
import { getDdxy } from '../../../../src/index.js';

use(nearly);

describe('getDdxy', function() {
	it('it should get the 2nd derivative of the power basis representation of some bezier curves (in double precision)',
	function() {
		{
			const ps = getRandomCubic(0);
			const r = getDdxy(ps);
			const expected = [
				[1355.5847510871445, 159.25610593689038],
				[-599.1642949784093, 230.47657697798607]
			];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomQuad(0);
			const r = getDdxy(ps);
			const expected = [[53.085368645630126], [76.82552565932869]];
			expect(r).to.be.nearly(2**8, expected);
		}
		{
			const ps = getRandomLine(0);
			const r = getDdxy(ps);
			const expected = [[0],[0]];
			expect(r).to.eql(expected);
		}
		{
			const ps = getRandomPoint(0);
			const r = getDdxy(ps);
			const expected = [[0],[0]];
			expect(r).to.eql(expected);
		}
	});
});
