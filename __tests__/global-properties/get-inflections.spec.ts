import { describe, expect, it } from '@jest/globals';
import { getInflections } from '../../src/index.js';
import { getRandomCubic, getRandomQuad } from '../helpers/get-random-bezier.js';


describe('getInflections', function() {
    it('it should return the correct inflection points for some cubic bezier curves', 
    function() {
        {
            const ps = getRandomCubic(0);
            const inflections = getInflections(ps);
            expect(inflections).toBeNearly(2**4, [0.23238451795441775]);
        }

        {
            const ps = getRandomQuad(0);
            const inflections = getInflections(ps);
            expect(inflections).toEqual([]);
        }
    });
});
