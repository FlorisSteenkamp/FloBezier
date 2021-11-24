import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { getControlPointBox } from '../../../src/index.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';


describe('getControlPointBox', function() {
    it('it should get the correct control point bounding box for some cubic beziers', 
	function() {
		const ps0 = getRandomCubic(0);
		const box = getControlPointBox(ps0);
		expect(box).to.be.eql([ 
			[-68.07973490750408, -105.98771762335389],
			[119.30512273109173, 88.9937301783342]
		]);
	});
});
