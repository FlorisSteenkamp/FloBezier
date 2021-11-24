import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { flatness } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';


use(nearly);


describe('flatness', function() {
    it('it should...', 
	function() {
		{
			const ps = [[0,0],[1,1],[2,2],[3,3]];
			expect(flatness(ps)).to.be.nearly(2**4, 1);
		}

		{
			const ps = [[0,0],[1.0001,1.001],[2.00001,2.00001],[3,3]];
			const flatness_ = flatness(ps);
			expect(flatness_).to.be.nearly(2**30, 1.00000025317783);
		}

		{
			const ps = [[0,0],[2.0001,1.001],[-2.00001,25],[3,3]];
			const flatness_ = flatness(ps);
			expect(flatness_).to.be.nearly(2**4, 2.841466807692195);
		}
	});
});
