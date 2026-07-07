import { describe, expect, it } from '@jest/globals';
import { isQuadObtuse } from '../../../src/index.js';
import { getRandomQuad } from '../../helpers/get-random-bezier.js';


describe('isQuadObtuse', function() {
    it('it should correctly determined if the given quadratic bezier curve is obtuse or acute', 
    function() {
        expect(isQuadObtuse([[0,0],[1,1],[2,3]])).toEqual(false);

        const expecteds = [false, false, false, false, true, false, false, true, true, true];
        for (let i=0; i<10; i++) {
            const ps = getRandomQuad(i);
            if (expecteds[i]) {
                expect(isQuadObtuse(ps)).toEqual(true);
            } else {
                expect(isQuadObtuse(ps)).toEqual(false);
            }
        }
    });
});
