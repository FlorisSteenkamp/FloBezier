import { describe, expect, it } from '@jest/globals';
import { bSign } from '../../../src/intersection/get-endpoint-intersections/b-sign.js';


describe('bSign', function() {
    it('it should ensure the bigint sign helper function return correct results',
    function() {
        expect(bSign(2n)).toEqual(1n);
        expect(bSign(-2n)).toEqual(-1n);
        expect(bSign(-0n)).toEqual(0n);
        expect(bSign(0n)).toEqual(0n);
    });
});
