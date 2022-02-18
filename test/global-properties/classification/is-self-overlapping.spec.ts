import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { isSelfOverlapping } from '../../../src/index.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';


describe('isSelfOverlapping', function() {
    it('it should check correctly for self-overlapping curves', 
	function() {
		for (let i=0; i<10; i++) {
			const ps = getRandomCubic(i);

			expect(isSelfOverlapping(ps)).to.be.false;
		}

		expect(isSelfOverlapping([[0,0],[1,1],[2,2]])).to.be.false;
		expect(isSelfOverlapping([[0,0],[1,1],[0.1,0.1]])).to.be.true;
		expect(isSelfOverlapping([[2,2],[1,1],[0,0]])).to.be.false;
	});
});
