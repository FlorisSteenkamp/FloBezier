import { describe, expect, it } from '@jest/globals';
import { bSqrt } from '../../../src/intersection/get-endpoint-intersections/b-sqrt.js';


describe('bSqrt', function() {
    it('it should ensure the bigint square root helper function return correct results',
    function() {
        {
            const a = 10n**100n + 1238972352348781232353532498239072359872359082358907532039482390230942332453245345555592341987234789234n;
            for (let i=0n+a; i<3n+a; i++) {
                const c = bSqrt(i**2n);
                expect(c).toEqual(i);
            }
        }
        {
            expect(bSqrt(11113n**2n)).toEqual(11113n);
            const c = 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111n;
            expect(bSqrt(c**2n)).toEqual(c);
        }
        {
            expect(() =>bSqrt(-11113n)).toThrow();
        }
    });
});
