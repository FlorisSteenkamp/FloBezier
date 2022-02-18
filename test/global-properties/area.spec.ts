import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { area } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

describe('area', function() {
	it('it should calculate the correct area for some bezier curves',
	function() {
		{
			// let ps = getRandomQuad(0);
            let ps = [[0,0],[1,1],[2,0]];
			ps = randomRotateAndTranslate(0)(ps);
            const l = [ps[ps.length-1],ps[0]];
            const al = area(l);
			const ac = area(ps);
            const a = ac + al;
			expect(a).to.be.nearly(2**6, -2/3);
		}
	});
});
