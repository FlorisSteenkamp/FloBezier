import { describe, expect, it } from '@jest/globals';
import { cubicThroughPointGiven013 } from '../../src/create/cubic-through-point-given013.js';


describe('cubicThroughPointGiven013', function() {
    it('should create the correct cubic though a given point given control points 0, 1 and 3 at time `t`', 
    function() {
        expect(cubicThroughPointGiven013(
            [[1,1], [10.53125,4.8125], [18,0.5]], 
            [14.6875,3.34375], 
            0.75
        // @ts-ignore
        )).toBeNearly(2**4,
            [[1, 1], [10.53125, 4.8125], [13.26736111111111, 5.784722222222222], [18, 0.5]]
        );
    });

    it('should throw if `t` is 0 or 1 (previously `NaN` control points were returned)', 
    function() {
        const ps = [[1,1], [10.53125,4.8125], [18,0.5]];
        const p = [14.6875,3.34375];
        expect(() => cubicThroughPointGiven013(ps, p, 0)).toThrow();
        expect(() => cubicThroughPointGiven013(ps, p, 1)).toThrow();
    });
});
