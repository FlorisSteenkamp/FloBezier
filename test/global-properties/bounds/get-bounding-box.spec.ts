/// <reference path="../../chai-extensions.d.ts" />
import { expect, assert } from 'chai';
import { use } from 'chai';
import { describe } from 'mocha';
import { getBoundingBox } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';


use(nearly);


describe('getBoundingBox', function() {
    const getRandomBezier_ = getRandomBezier(128, 50)(3);

    it('it should find a correct bounding box for some beziers', 
	function() {
		{
			const ps = getRandomBezier_(0);
			expect(getBoundingBox(ps)).to.be.nearly(2**4, [ 
				[-1.0501717649547098,-105.98771762335389],
				[119.30512273109173,88.9937301783342]
			]);
		}
		{
			const ps = [ 
				[-94.81526242914038, -85.23564826446488],
				[-99.10150372309181, 6.600052566872932],
				[80.17857884247292, -101.65036486965846],
				[-95.539309056601269, -84.89133452900955] 
			];
			expect(getBoundingBox(ps)).to.be.nearly(2**4, [ 
				[-95.53930905660127, -86.68993123068452],
				[-18.202031865992296, -47.82119616147928]
			]);
		}


		//for (let i=0; i<10; i++) {
		//	const ps = getRandomBezier_(i);
		//	
		//}
	});
});