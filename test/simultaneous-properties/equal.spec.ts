import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { equal } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

const getRandomBezier_ = getRandomBezier(200, 37);


describe('equal', function() {
	it('it should ...',
	function() {
		for (let order=0;order<=3;order++) {
			for (let i=0;i<=3;i++) {
				const ps1 = getRandomBezier_(order as 0|1|2|3)(i);
				const ps2 = getRandomBezier_(order as 0|1|2|3)(i);
				const ps3 = getRandomBezier_(order as 0|1|2|3)(i+1);

				expect(ps1).to.eql(ps2);
				expect(equal(ps1,ps2)).to.be.true;

				expect(ps1).not.to.eql(ps3);
				expect(equal(ps1,ps3)).to.be.false;
			}
		}
	});
});
