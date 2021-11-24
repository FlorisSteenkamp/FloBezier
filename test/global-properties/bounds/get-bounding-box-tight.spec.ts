/// <reference path="../../chai-extensions.d.ts" />
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getBoundingBoxTight } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomLine, getRandomQuad, getRandomCubic } from '../../helpers/get-random-bezier.js';


use(nearly);


describe('getBoundingBoxTight', function() {
	it('it should find a correct tight bounding box for some quadratic beziers', 
	function() {
		{
			const ps = [ 
				[0, 0],
				[1, 1],
				[2, 0]
			];
			expect(getBoundingBoxTight(ps)).to.be.nearly(2**4, [ 
				[0, 0],
				[2, 0],
				[2, 0.5],
				[0, 0.5]
			]);
		}
	});

    it('it should find a correct tight bounding box for some cubic beziers', 
	function() {
		{
			const ps = getRandomCubic(0);
			expect(getBoundingBoxTight(ps)).to.be.nearly(2**4, [ 
				[88.6401864794642, -105.98771762335389],
				[119.30512273109173, 88.9937301783342],
				[13.852175534447667, 105.57842549057887],
				[-16.812760717179856, -89.40302231110923]
			]);
		}


		{
			const ps = [ 
				[-94.81526242914038, -85.23564826446488],
				[-99.10150372309181, 6.600052566872932],
				[80.17857884247292, -101.65036486965846],
				[-95.539309056601269, -84.89133452900955] 
			];
			expect(getBoundingBoxTight(ps)).to.be.nearly(2**4, [
				[-85.35872924595627, -107.86648402656408],
				[-15.361552595332611, -76.84984827029443],
				[-35.31172088253128, -31.827059055431313],
				[-105.30889753315493, -62.84369481170097]
			]);
		}


		//for (let i=0; i<10; i++) {
		//	const ps = getRandomBezier_(i);
		//	
		//}
	});
});
