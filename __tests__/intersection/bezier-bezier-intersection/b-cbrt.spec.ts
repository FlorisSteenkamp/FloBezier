import { describe, expect, it } from '@jest/globals';
import { bCbrt } from '../../../src/intersection/get-endpoint-intersections/b-cbrt.js';


describe('bCbrt', function() {
    it('it should ensure the bigint cube root helper function return correct results',
    function() {
        {
            const a = 10n**100n - 1238972352348781232353532498239072359872359082358907532039482390230942332453245345555592341987234789234n;
            for (let i=0n+a; i<3n+a; i++) {
                const c = bCbrt(-(i**3n));
                expect(c).toEqual(-i);
            }
        }
        {
            const a = 111113n;
            for (let i=0n+a; i<3n+a; i++) {
                const c = bCbrt(i**3n);
                expect(c).toEqual(i);
            }
        }
        {
            expect(bCbrt(11113n**3n)).toEqual(11113n);
            const c = 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111n;
            expect(bCbrt(c**3n)).toEqual(c);
        }
    });
});
