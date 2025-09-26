import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getInflections } from '../../src/index.js';
import { getRandomCubic, getRandomQuad } from '../helpers/get-random-bezier.js';
import { nearly } from '../helpers/chai-extend-nearly.js';


use(nearly);


describe('getInflections', function() {
    it('it should return the correct inflection points for some cubic bezier curves', 
	function() {
		{
			const ps = getRandomCubic(0);
			const inflections = getInflections(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(inflections).to.be.nearly(2**4, [0.23238451795441775]);
		}

		{
			const ps = getRandomQuad(0);
			const inflections = getInflections(ps);
			expect(inflections).to.eql([]);
		}
	});
});
