import { describe, expect, it } from '@jest/globals';
import { ensureRange } from '../../../src/intersection/get-endpoint-intersections/ensure-range.js';


describe('ensureRange', function() {
    it('it should ensure the `ensureRange` helper function return correct results',
    function() {
        expect(ensureRange(1,-1)).toEqual(0.9999999999999999);
        expect(ensureRange(1.0001,-1)).toEqual(0.9999999999999999);
        expect(ensureRange(1.0001,1)).toEqual(1.0001);
        expect(ensureRange(0.9999999999999,1)).toEqual(1.0000000000000002);
        expect(ensureRange(0.9999999999999,0)).toEqual(1);
        expect(ensureRange(1.0000000000000002,0)).toEqual(1);
    });
});
