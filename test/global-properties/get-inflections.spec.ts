import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getInflections } from '../../src/index.js';
import { getRandomCubic } from '../helpers/get-random-bezier.js';
import { nearly } from '../helpers/chai-extend-nearly.js';


use(nearly);


describe('getInflections', function() {
    it('it should return the correct inflection points for some cubic bezier curves', 
	function() {
		const ps = getRandomCubic(2);
		const inflections = getInflections(ps);
		expect(inflections).to.be.nearly(2**4, [0.4957343512220287]);
	});
});
