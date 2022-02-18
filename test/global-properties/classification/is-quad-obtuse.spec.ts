import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { isQuadObtuse } from '../../../src/index.js';
import { getRandomQuad } from '../../helpers/get-random-bezier.js';


describe('isQuadObtuse', function() {
    it('it should correctly determined if the given quadratic bezier curve is obtuse or acute', 
	function() {
		expect(isQuadObtuse([[0,0],[1,1],[2,3]])).to.be.false;

		const expecteds = [false, false, false, false, true, false, false, true, true, true];
		for (let i=0; i<10; i++) {
			const ps = getRandomQuad(i);
			if (expecteds[i]) {
				expect(isQuadObtuse(ps)).to.be.true;
			} else {
				expect(isQuadObtuse(ps)).to.be.false;
			}
		}
	});
});
