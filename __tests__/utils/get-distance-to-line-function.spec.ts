import { describe, expect, it } from '@jest/globals';
import { getDistanceToLineFunction } from '../../src/utils/get-distance-to-line-function.js';


describe('getDistanceToLineFunction', function() {
    it('should return the signed distance from a point to a line',
    function() {
        // horizontal line from (0,0) to (10,0)
        const f = getDistanceToLineFunction([0,0], [10,0]);
        expect(f([3,0])).toEqual(0);     // on the line
        expect(f([3,4])).toEqual(4);     // left of the line direction
        expect(f([3,-4])).toEqual(-4);   // right of the line direction
        expect(f([-100,4])).toEqual(4);  // the line is infinite

        // the sign flips if the line direction is reversed
        const g = getDistanceToLineFunction([10,0], [0,0]);
        expect(g([3,4])).toEqual(-4);

        // a diagonal line - distance from (0,1) to the line y = x is 1/√2
        const h = getDistanceToLineFunction([0,0], [1,1]);
        expect(h([0,1])).toBeNearly(2**2, Math.SQRT1_2);
        expect(h([1,0])).toBeNearly(2**2, -Math.SQRT1_2);
    });

    it('should return the distance to the point if both given points coincide',
    function() {
        // (this was the case in the old Quokka test that lived in the source file)
        const f = getDistanceToLineFunction([6,2], [6,2]);
        expect(f([10,1])).toBeNearly(2**2, Math.sqrt(17));
        expect(f([6,2])).toEqual(0);
    });
});
