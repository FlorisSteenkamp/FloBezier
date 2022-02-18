import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { clone } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../helpers/get-random-bezier.js';

use(nearly);

describe('clone', function() {
	it('should deep clone some bezier curves, i.e. create an identical bezier but with a different reference',
	function() {
		{
			let ps = getRandomCubic(0);
			const r = clone(ps);
			assert(r !== ps);
			expect(r).to.be.eql(ps);
		}
	});
});
