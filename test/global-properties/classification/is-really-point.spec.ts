import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { isReallyPoint } from '../../../src/index.js';


describe('isReallyPoint', function() {
    it('it should check correctly if a line is really a point in disguise', 
	function() {
		{
			const ps = [[0,0],[1,1]];
			expect(isReallyPoint(ps)).to.be.false;
		}

		{
			const ps = [[0,0],[0,0.000000000000000000000000000000000000000001]];
			expect(isReallyPoint(ps)).to.be.false;
		}

		{
			const ps = [[2,2],[2,2]];
			expect(isReallyPoint(ps)).to.be.true;
		}
	});
});
