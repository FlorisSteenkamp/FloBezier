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
			expect(r).to.be.eql([ 
				[88.6401864794642, -105.98771762335389],
				[-2.9911163754275094, -46.119759242543864],
				[-68.07973490750408, 52.16096196793046],
				[119.30512273109173, 88.9937301783342]
			]);
		}
	});
});
