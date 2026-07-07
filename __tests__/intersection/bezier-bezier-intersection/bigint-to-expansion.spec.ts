import { describe, expect, it } from '@jest/globals';
import { bigintToExpansion } from '../../../src/intersection/get-endpoint-intersections/bigint-to-expansion.js';


describe('bigintToExpansion', function() {
    it('it should ensure the bigint to Shewchuk expansion helper function return correct results',
    function() {
        {
            expect(bigintToExpansion(1n)).toEqual([1]);
            expect(bigintToExpansion(-0n)).toEqual([0]);
        }
    });
});
