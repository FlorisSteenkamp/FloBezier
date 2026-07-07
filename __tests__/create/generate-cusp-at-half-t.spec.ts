import { describe, expect, it } from '@jest/globals';
import { generateCuspAtHalf3 } from '../../src/index.js';


describe('generateCuspAtHalf3', function() {
    it('it should generate the correct cubic curve with a cusp at `t === 0.5`', 
    function() {
        expect(generateCuspAtHalf3([0,0], [2,2], [3,0])).toBeNearly(2**4,
            [
                [0,0],
                [3.6666666666666666, 2.6666666666666666],
                [0.6666666666666666, 2.6666666666666666],
                [3,0]
            ]
        );
    });
});
