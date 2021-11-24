import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { isCollinear, isHorizontal, isVertical } from '../../../src/index.js';
import { getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';


function getCollinearQuad(seed: number) {
	const ps = getRandomQuad(seed);  
	ps[1][0] = (ps[0][0] + ps[2][0]) / 2;
	ps[1][1] = (ps[0][1] + ps[2][1]) / 2;

	return ps;
}


describe('isCollinear', function() {
    it('it should correctly check that some beziers have all control points collinear', 
	function() {
		// actual lines
		for (let i=0; i<100; i++) {
			const ps = getRandomLine(i);
			expect(isCollinear(ps)).to.be.true;
		}

		// points
		for (let i=0; i<100; i++) {
			const ps = getRandomLine(i);
			expect(isCollinear([ps[0]])).to.be.true;
		}

		// quadratic curves
		for (let i=0; i<100; i++) {
			const ps = getCollinearQuad(i);
			expect(isCollinear(ps)).to.be.true;
		}
		
		expect(isCollinear([[0,0],[1,1],[100,100]])).to.be.true;
	});
});


describe('isVertical', function() {
    it('it should...', 
	function() {
		expect(isVertical([[1,0],[1,20]])).to.be.true;
		expect(isVertical([[1,0],[1.0000000001,20]])).to.be.false;

		expect(isVertical([[1,0],[1,1],[1,20]])).to.be.true;
	});
});


describe('isHorizontal', function() {
    it('it should...', 
	function() {
		expect(isHorizontal([[0,1],[20,1]])).to.be.true;
		expect(isHorizontal([[0,1],[20,1.00001]])).to.be.false;

		expect(isHorizontal([[0,1],[1,1],[20,1]])).to.be.true;
	});
});