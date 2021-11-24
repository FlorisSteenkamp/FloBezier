import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { controlPointLinesLength, totalLength } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic } from '../../helpers/get-random-bezier.js';

use(nearly);

describe('controlPointLinesLength', function() {
    it('it should get a reasonable upper bound for the length squared of some cubic bezier curves', 
	function() {
		const getRandomBezier_ = getRandomBezier(128,53);
		for (let order=0; order<=3; order++) {
			for (let i=0; i<10; i++) {
				const ps = getRandomBezier_(order as 0|1|2|3)(i);
				const lUpperBound = controlPointLinesLength(ps);
				const l = totalLength(ps);

				if (order === 0) {
					expect(lUpperBound).to.be.eql(0);
				}

				expect(lUpperBound).to.be.greaterThanOrEqual(l);
				expect(lUpperBound/4).to.be.lessThanOrEqual(l);
			}
		}
	});
});
