import { describe, expect, it } from '@jest/globals';
import { getEndpointTs } from '../../../src/intersection/get-endpoint-intersections/get-endpoint-ts.js';


describe('getEndpointTs', function() {
    it('should derive the parameter values of `B` at the endpoints of `A` from those of `A` at the endpoints of `B`', 
    function() {
        // `tA = c*tB + d` with `d = tA_B0 = -1/2` and `c = tA_B1 - tA_B0 = 7/8`,
        // so `tB_A0 = 4/7` and `tB_A1 = 12/7` (rationals given as `[N,D]` 
        // expansions)
        const [tA_B0, tA_B1, tB_A0, tB_A1] = getEndpointTs([[-1],[2]], [[3],[8]]);
        expect(tA_B0).toEqual(-0.5);
        expect(tA_B1).toEqual(0.375);
        expect(tB_A0).toBeCloseTo(4/7, 15);
        expect(tB_A1).toBeCloseTo(12/7, 15);

        // reversed orientation: `c < 0`
        const ts = getEndpointTs([[3],[2]], [[1],[2]]);  // tA_B0 = 3/2, tA_B1 = 1/2, c = -1
        expect(ts).toEqual([1.5, 0.5, 1.5, 0.5]);
    });

    it('should return exactly `0` or `1` for parameter values that are exactly `0` or `1`', function() {
        // `B` runs from `A`'s end to beyond `A`'s start...: tA_B0 = 1, tA_B1 = 0
        expect(getEndpointTs([[3],[3]], [[0],[5]])).toEqual([1, 0, 1, 0]);
        // shared start points: tA_B0 = 0, tA_B1 = 1/3 => tB_A0 = 0, tB_A1 = 3
        const [a0, , b0, b1] = getEndpointTs([[0],[1]], [[1],[3]]);
        expect(a0 === 0 && b0 === 0).toBe(true);
        expect(b1).toBeCloseTo(3, 15);
    });

    it('should place values that are near but not exactly `1` on the correct side of `1`', function() {
        // tA_B0 = 1 + 2^-80 (just above 1), tA_B1 = 2
        const [tA_B0, , tB_A0] = getEndpointTs([[2**-80, 1],[1]], [[2],[1]]);
        expect(tA_B0).toBeGreaterThan(1);
        // tB_A0 = -tA_B0/(tA_B1 - tA_B0) < 0 
        expect(tB_A0).toBeLessThan(0);
    });
});
