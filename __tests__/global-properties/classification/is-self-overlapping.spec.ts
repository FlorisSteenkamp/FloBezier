import { describe, expect, it } from '@jest/globals';
import { isSelfOverlapping } from '../../../src/index.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';


describe('isSelfOverlapping', function() {
    it('it should check correctly for self-overlapping curves', 
    function() {
        for (let i=0; i<10; i++) {
            const ps = getRandomCubic(i);

            expect(isSelfOverlapping(ps)).toEqual(false);
        }

        expect(isSelfOverlapping([[0,0],[1,1],[2,2]])).toEqual(false);
        expect(isSelfOverlapping([[0,0],[1,1],[0.1,0.1]])).toEqual(true);
        expect(isSelfOverlapping([[2,2],[1,1],[0,0]])).toEqual(false);
    });
});
