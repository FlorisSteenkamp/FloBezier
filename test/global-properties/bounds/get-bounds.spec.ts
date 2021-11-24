/// <reference path="../../chai-extensions.d.ts" />
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getBounds } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine } from '../../helpers/get-random-bezier.js';


use(nearly);


describe('getBounds', function() {
	it('it should find correct bounds for some lines', 
	function() {
		const ps = getRandomLine(0); //?

		expect(getBounds(ps)).to.be.nearly(2**4, { 
			ts:[[1,0],[0,1]],
			box: [[-2.9911163754275094,-105.98771762335389],[88.6401864794642,-46.119759242543864]]
		});
	});

    it('it should find correct bounds for some cubic bezier curves', 
	function() {
		const ps = getRandomCubic(0);

		expect(getBounds(ps)).to.be.nearly(2**4, { 
			ts: [[0.5301097005963162, 0 ], [1, 1]],
			box: [ 
				[-1.050171764954616, -105.98771762335389],
			   	[119.30512273109173, 88.9937301783342] 
			] 
		});
	});
});
